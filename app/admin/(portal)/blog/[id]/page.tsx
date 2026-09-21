import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/server/db";
import { deletePost, savePost } from "@/lib/server/actions/blog";
import { Field, LocaleTabs, SubmitButton, fieldCls } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function PostEditor({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const { saved } = await searchParams;
  const isNew = id === "new";
  const [post, categories] = await Promise.all([
    isNew ? null : db.post.findUnique({ where: { id }, include: { translations: true } }),
    db.category.findMany({ where: { kind: "BLOG" }, orderBy: { order: "asc" }, include: { translations: true } }),
  ]);
  if (!isNew && !post) notFound();
  const t = (l: "en" | "ar") => post?.translations.find((x) => x.locale === l);
  const save = savePost.bind(null, post?.id ?? null);
  const remove = post ? deletePost.bind(null, post.id) : null;

  const panel = (l: "en" | "ar") => {
    const x = t(l);
    const body = Array.isArray(x?.body) ? (x!.body as string[]).join("\n\n") : "";
    return (
      <div className="space-y-4">
        <Field label="Title"><input name={`${l}.title`} defaultValue={x?.title ?? ""} required className={fieldCls} /></Field>
        <Field label="Excerpt" hint="Shows on cards and as the article's opening line."><textarea name={`${l}.excerpt`} rows={3} defaultValue={x?.excerpt ?? ""} required className={fieldCls} /></Field>
        <Field label="Body" hint="Paragraphs separated by a blank line."><textarea name={`${l}.body`} rows={18} defaultValue={body} className={`${fieldCls} leading-[1.7]`} /></Field>
        <Field label="Tags" hint="One per line."><textarea name={`${l}.tags`} rows={3} defaultValue={(x?.tags ?? []).join("\n")} className={`${fieldCls} font-mono text-[13px]`} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="SEO title"><input name={`${l}.seoTitle`} defaultValue={x?.seoTitle ?? ""} className={fieldCls} /></Field>
          <Field label="SEO description"><input name={`${l}.seoDescription`} defaultValue={x?.seoDescription ?? ""} className={fieldCls} /></Field>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/admin/blog" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">← Blog</Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{isNew ? "New post" : t("en")?.title}</h1>
      {saved && <p className="mt-3 rounded-lg border border-green-700/25 bg-green-50 px-4 py-2.5 text-[14px] text-green-800">Saved. The site has been republished.</p>}

      <form action={save} className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-line bg-surface p-6"><LocaleTabs en={panel("en")} ar={panel("ar")} /></div>
        <aside>
          <div className="space-y-4 rounded-2xl border border-line bg-surface p-5">
            <Field label="Status"><select name="status" defaultValue={post?.status ?? "DRAFT"} className={fieldCls}><option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option></select></Field>
            <Field label="Publish date"><input type="date" name="publishedAt" defaultValue={post?.publishedAt?.toISOString().slice(0, 10) ?? ""} className={fieldCls} /></Field>
            <label className="flex items-center gap-2 text-[14px]"><input type="checkbox" name="featured" defaultChecked={post?.featured ?? false} /> Featured post</label>
            <Field label="Category"><select name="categoryId" defaultValue={post?.categoryId ?? ""} className={fieldCls}><option value="">—</option>{categories.map((c) => <option key={c.id} value={c.id}>{c.translations.find((x) => x.locale === "en")?.name ?? c.slug}</option>)}</select></Field>
            <Field label="Slug" hint="Shared by both languages."><input name="slug" defaultValue={post?.slug ?? ""} pattern="[a-z0-9-]{3,120}" required className={`${fieldCls} font-mono text-[13px]`} /></Field>
            <Field label="Cover image path" hint="e.g. /media/blog/my-post.jpg"><input name="coverImage" defaultValue={post?.coverImage ?? ""} className={`${fieldCls} font-mono text-[13px]`} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Read time (min)"><input type="number" name="readTime" min={1} defaultValue={post?.readTime ?? 5} className={fieldCls} /></Field>
              <Field label="Author"><input name="authorName" defaultValue={post?.authorName ?? ""} className={fieldCls} /></Field>
            </div>
            <SubmitButton className="w-full">{isNew ? "Create" : "Save"}</SubmitButton>
          </div>
        </aside>
      </form>
      {remove && <form action={remove} className="mt-8"><button className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-wine-700 hover:underline">Delete post</button></form>}
    </div>
  );
}
