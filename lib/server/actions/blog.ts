"use server";

import { CategoryKind, Locale, Status } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "../db";
import { requireUser } from "../auth";
import { revalidateSite } from "../revalidate";

const lines = (v: FormDataEntryValue | null) => String(v ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
const paragraphs = (v: FormDataEntryValue | null) => String(v ?? "").split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);

export async function savePost(id: string | null, formData: FormData) {
  await requireUser();
  const slug = z.string().regex(/^[a-z0-9-]{3,120}$/).parse(formData.get("slug"));
  const status = formData.get("status") === "PUBLISHED" ? Status.PUBLISHED : Status.DRAFT;
  const publishedAtRaw = String(formData.get("publishedAt") ?? "");
  const data = {
    slug, status,
    publishedAt: publishedAtRaw ? new Date(publishedAtRaw) : status === Status.PUBLISHED ? new Date() : null,
    featured: formData.get("featured") === "on",
    coverImage: String(formData.get("coverImage") ?? "").trim() || null,
    readTime: Math.max(1, Number(formData.get("readTime") ?? 5) || 5),
    authorName: String(formData.get("authorName") ?? "").trim() || null,
    categoryId: String(formData.get("categoryId") ?? "") || null,
  };
  let postId = id;
  if (postId) await db.post.update({ where: { id: postId }, data });
  else postId = (await db.post.create({ data })).id;

  for (const locale of [Locale.en, Locale.ar]) {
    const g = (k: string) => String(formData.get(`${locale}.${k}`) ?? "").trim();
    const t = { title: g("title"), excerpt: g("excerpt"), body: paragraphs(formData.get(`${locale}.body`)), tags: lines(formData.get(`${locale}.tags`)), seoTitle: g("seoTitle") || null, seoDescription: g("seoDescription") || null };
    await db.postTranslation.upsert({ where: { postId_locale: { postId, locale } }, update: t, create: { postId, locale, ...t } });
  }
  revalidatePath("/admin/blog");
  revalidateSite();
  redirect(`/admin/blog/${postId}?saved=1`);
}

export async function deletePost(id: string) {
  await requireUser();
  await db.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidateSite();
  redirect("/admin/blog");
}

export async function saveCategory(id: string | null, formData: FormData) {
  await requireUser();
  const kind = formData.get("kind") === "SOLUTION" ? CategoryKind.SOLUTION : CategoryKind.BLOG;
  const slug = z.string().regex(/^[a-z0-9-]{2,60}$/).parse(formData.get("slug"));
  let catId = id;
  if (catId) await db.category.update({ where: { id: catId }, data: { kind, slug } });
  else {
    const last = await db.category.findFirst({ where: { kind }, orderBy: { order: "desc" } });
    catId = (await db.category.create({ data: { kind, slug, order: (last?.order ?? -1) + 1 } })).id;
  }
  for (const locale of [Locale.en, Locale.ar]) {
    const name = String(formData.get(`${locale}.name`) ?? "").trim();
    const description = String(formData.get(`${locale}.description`) ?? "").trim() || null;
    await db.categoryTranslation.upsert({ where: { categoryId_locale: { categoryId: catId, locale } }, update: { name, description }, create: { categoryId: catId, locale, name, description } });
  }
  revalidatePath("/admin/categories");
  revalidateSite();
  redirect(`/admin/categories/${catId}?saved=1`);
}

export async function reorderCategories(ids: string[]) {
  await requireUser();
  await db.$transaction(ids.map((id, order) => db.category.update({ where: { id }, data: { order } })));
  revalidatePath("/admin/categories");
  revalidateSite();
}

export async function deleteCategory(id: string) {
  await requireUser();
  await db.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidateSite();
  redirect("/admin/categories");
}

export async function saveSetting(key: string, formData: FormData) {
  await requireUser();
  const value = JSON.parse(String(formData.get("value") ?? "{}"));
  await db.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  revalidatePath("/admin/settings");
  revalidateSite();
  redirect(`/admin/settings?saved=${key}`);
}
