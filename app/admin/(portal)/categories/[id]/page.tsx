import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/server/db";
import { deleteCategory, saveCategory } from "@/lib/server/actions/blog";
import { Field, LocaleTabs, SubmitButton, fieldCls } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function CategoryEditor({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const { saved } = await searchParams;
  const isNew = id === "new";
  const c = isNew ? null : await db.category.findUnique({ where: { id }, include: { translations: true } });
  if (!isNew && !c) notFound();
  const t = (l: "en" | "ar") => c?.translations.find((x) => x.locale === l);
  const save = saveCategory.bind(null, c?.id ?? null);
  const remove = c ? deleteCategory.bind(null, c.id) : null;
  const panel = (l: "en" | "ar") => (
    <div className="space-y-4">
      <Field label="Name"><input name={`${l}.name`} defaultValue={t(l)?.name ?? ""} required className={fieldCls} /></Field>
      <Field label="Description (optional)"><textarea name={`${l}.description`} rows={3} defaultValue={t(l)?.description ?? ""} className={fieldCls} /></Field>
    </div>
  );
  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/categories" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">← Categories</Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{isNew ? "New category" : t("en")?.name}</h1>
      {saved && <p className="mt-3 rounded-lg border border-green-700/25 bg-green-50 px-4 py-2.5 text-[14px] text-green-800">Saved.</p>}
      <form action={save} className="mt-6 rounded-2xl border border-line bg-surface p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Used for"><select name="kind" defaultValue={c?.kind ?? "BLOG"} className={fieldCls}><option value="BLOG">Blog</option><option value="SOLUTION">Solutions</option></select></Field>
          <Field label="Slug"><input name="slug" defaultValue={c?.slug ?? ""} pattern="[a-z0-9-]{2,60}" required className={`${fieldCls} font-mono text-[13px]`} /></Field>
        </div>
        <div className="mt-5"><LocaleTabs en={panel("en")} ar={panel("ar")} /></div>
        <SubmitButton className="mt-5">{isNew ? "Create" : "Save"}</SubmitButton>
      </form>
      {remove && <form action={remove} className="mt-8"><button className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-wine-700 hover:underline">Delete category</button></form>}
    </div>
  );
}
