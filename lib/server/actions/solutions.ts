"use server";

import { Locale, Status } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { requireUser } from "../auth";
import { revalidateSite } from "../revalidate";

const lines = (v: FormDataEntryValue | null) =>
  String(v ?? "").split("\n").map((s) => s.trim()).filter(Boolean);

const trSchema = z.object({
  title: z.string().min(1).max(160),
  summary: z.string().min(1).max(1200),
  body: z.string().max(8000).optional().default(""),
  seoTitle: z.string().max(160).optional().default(""),
  seoDescription: z.string().max(320).optional().default(""),
});

function readTranslation(formData: FormData, locale: Locale) {
  const g = (k: string) => formData.get(`${locale}.${k}`);
  const parsed = trSchema.parse({ title: g("title"), summary: g("summary"), body: g("body") ?? "", seoTitle: g("seoTitle") ?? "", seoDescription: g("seoDescription") ?? "" });
  return { ...parsed, includes: lines(g("includes")), body: parsed.body || null, seoTitle: parsed.seoTitle || null, seoDescription: parsed.seoDescription || null };
}

export async function reorderSolutions(ids: string[]) {
  await requireUser();
  await db.$transaction(ids.map((id, order) => db.solution.update({ where: { id }, data: { order } })));
  revalidatePath("/admin/solutions");
  revalidateSite();
}

export async function saveSolution(id: string | null, formData: FormData) {
  await requireUser();
  const slug = z.string().regex(/^[a-z0-9-]{2,80}$/).parse(formData.get("slug"));
  const status = formData.get("status") === "DRAFT" ? Status.DRAFT : Status.PUBLISHED;
  const image = String(formData.get("image") ?? "").trim() || null;
  const icon = String(formData.get("icon") ?? "").trim() || null;
  const en = readTranslation(formData, Locale.en);
  const ar = readTranslation(formData, Locale.ar);

  let solutionId = id;
  if (solutionId) {
    await db.solution.update({ where: { id: solutionId }, data: { slug, status, image, icon } });
  } else {
    const last = await db.solution.findFirst({ orderBy: { order: "desc" } });
    const created = await db.solution.create({ data: { slug, status, image, icon, order: (last?.order ?? -1) + 1 } });
    solutionId = created.id;
  }
  for (const [locale, t] of [[Locale.en, en], [Locale.ar, ar]] as const) {
    await db.solutionTranslation.upsert({
      where: { solutionId_locale: { solutionId, locale } },
      update: t,
      create: { solutionId, locale, ...t },
    });
  }
  revalidatePath("/admin/solutions");
  revalidateSite();
  redirect(`/admin/solutions/${solutionId}?saved=1`);
}

export async function deleteSolution(id: string) {
  await requireUser();
  await db.solution.delete({ where: { id } });
  revalidatePath("/admin/solutions");
  revalidateSite();
  redirect("/admin/solutions");
}
