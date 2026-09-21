"use server";

import { Locale, Status } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { requireUser } from "../auth";
import { revalidateSite } from "../revalidate";
import { blockTypes, isBlockType } from "@/lib/blocks";

const lines = (v: FormDataEntryValue | null) => String(v ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
const json = (v: unknown) => JSON.parse(JSON.stringify(v));

export async function savePageMeta(pageId: string, formData: FormData) {
  await requireUser();
  const status = formData.get("status") === "DRAFT" ? Status.DRAFT : Status.PUBLISHED;
  const showInNav = formData.get("showInNav") === "on";
  await db.page.update({ where: { id: pageId }, data: { status, showInNav } });
  for (const locale of [Locale.en, Locale.ar]) {
    const g = (k: string) => String(formData.get(`${locale}.${k}`) ?? "").trim();
    const data = { navLabel: g("navLabel"), seoTitle: g("seoTitle"), seoDescription: g("seoDescription"), seoKeywords: lines(formData.get(`${locale}.seoKeywords`)), ogImage: g("ogImage") || null };
    await db.pageTranslation.upsert({ where: { pageId_locale: { pageId, locale } }, update: data, create: { pageId, locale, ...data } });
  }
  revalidatePath(`/admin/pages/${pageId}`);
  revalidateSite();
  redirect(`/admin/pages/${pageId}?saved=1`);
}

export async function reorderBlocks(pageId: string, ids: string[]) {
  await requireUser();
  await db.$transaction(ids.map((id, order) => db.block.update({ where: { id, pageId }, data: { order } })));
  revalidatePath(`/admin/pages/${pageId}`);
  revalidateSite();
}

export async function addBlock(pageId: string, formData: FormData) {
  await requireUser();
  const type = String(formData.get("type") ?? "");
  if (!isBlockType(type)) throw new Error("Unknown block type");
  const last = await db.block.findFirst({ where: { pageId }, orderBy: { order: "desc" } });
  const template = json(blockTypes[type].template);
  const block = await db.block.create({ data: { pageId, type, order: (last?.order ?? -1) + 1, settings: {} } });
  await db.blockTranslation.createMany({ data: [{ blockId: block.id, locale: Locale.en, content: template }, { blockId: block.id, locale: Locale.ar, content: template }] });
  revalidatePath(`/admin/pages/${pageId}`);
  redirect(`/admin/pages/${pageId}/blocks/${block.id}`);
}

const blockSchema = z.object({
  anchor: z.string().max(60).regex(/^[a-z0-9-]*$/).optional().default(""),
  enabled: z.boolean(),
  settings: z.record(z.string(), z.unknown()),
  en: z.record(z.string(), z.unknown()),
  ar: z.record(z.string(), z.unknown()),
});

export async function saveBlock(pageId: string, blockId: string, formData: FormData) {
  await requireUser();
  const parse = (k: string) => JSON.parse(String(formData.get(k) ?? "{}"));
  const parsed = blockSchema.parse({ anchor: String(formData.get("anchor") ?? ""), enabled: formData.get("enabled") === "on", settings: parse("settings"), en: parse("en"), ar: parse("ar") });
  await db.block.update({ where: { id: blockId, pageId }, data: { anchor: parsed.anchor || null, enabled: parsed.enabled, settings: json(parsed.settings) } });
  for (const locale of [Locale.en, Locale.ar]) {
    const content = json(parsed[locale]);
    await db.blockTranslation.upsert({ where: { blockId_locale: { blockId, locale } }, update: { content }, create: { blockId, locale, content } });
  }
  revalidatePath(`/admin/pages/${pageId}`);
  revalidateSite();
  redirect(`/admin/pages/${pageId}/blocks/${blockId}?saved=1`);
}

export async function deleteBlock(pageId: string, blockId: string) {
  await requireUser();
  await db.block.delete({ where: { id: blockId, pageId } });
  revalidatePath(`/admin/pages/${pageId}`);
  revalidateSite();
  redirect(`/admin/pages/${pageId}`);
}

export async function createPage(formData: FormData) {
  await requireUser();
  const slug = z.string().regex(/^[a-z0-9-]{2,60}$/).parse(formData.get("slug"));
  const last = await db.page.findFirst({ orderBy: { order: "desc" } });
  const page = await db.page.create({ data: { slug, status: Status.DRAFT, order: (last?.order ?? -1) + 1 } });
  for (const locale of [Locale.en, Locale.ar]) {
    await db.pageTranslation.create({ data: { pageId: page.id, locale, navLabel: slug, seoTitle: slug, seoDescription: "" } });
  }
  revalidatePath("/admin/pages");
  redirect(`/admin/pages/${page.id}`);
}

export async function reorderPages(ids: string[]) {
  await requireUser();
  await db.$transaction(ids.map((id, order) => db.page.update({ where: { id }, data: { order } })));
  revalidatePath("/admin/pages");
  revalidateSite();
}

export async function deletePage(pageId: string) {
  await requireUser();
  const page = await db.page.findUnique({ where: { id: pageId } });
  if (!page || page.slug === "") throw new Error("The homepage cannot be deleted");
  await db.page.delete({ where: { id: pageId } });
  revalidatePath("/admin/pages");
  revalidateSite();
  redirect("/admin/pages");
}
