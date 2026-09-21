import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/server/db";
import { deleteSolution, saveSolution } from "@/lib/server/actions/solutions";
import { Field, LocaleTabs, SubmitButton, fieldCls } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function SolutionEditor({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const { saved } = await searchParams;
  const isNew = id === "new";
  const s = isNew ? null : await db.solution.findUnique({ where: { id }, include: { translations: true } });
  if (!isNew && !s) notFound();

  const t = (locale: "en" | "ar") => s?.translations.find((x) => x.locale === locale);
  const save = saveSolution.bind(null, s?.id ?? null);
  const remove = s ? deleteSolution.bind(null, s.id) : null;

  const panel = (locale: "en" | "ar") => {
    const x = t(locale);
    return (
      <div className="space-y-4">
        <Field label="Title"><input name={`${locale}.title`} defaultValue={x?.title ?? ""} required className={fieldCls} /></Field>
        <Field label="Summary" hint="One or two sentences. Shows on the homepage rail and the Solutions page."><textarea name={`${locale}.summary`} rows={3} defaultValue={x?.summary ?? ""} required className={fieldCls} /></Field>
        <Field label="What it covers" hint="One item per line."><textarea name={`${locale}.includes`} rows={7} defaultValue={(x?.includes ?? []).join("\n")} className={`${fieldCls} font-mono text-[13px]`} /></Field>
        <Field label="Long description (optional)"><textarea name={`${locale}.body`} rows={6} defaultValue={x?.body ?? ""} className={fieldCls} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="SEO title"><input name={`${locale}.seoTitle`} defaultValue={x?.seoTitle ?? ""} className={fieldCls} /></Field>
          <Field label="SEO description"><input name={`${locale}.seoDescription`} defaultValue={x?.seoDescription ?? ""} className={fieldCls} /></Field>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/solutions" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">← Solutions</Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{isNew ? "New solution" : t("en")?.title}</h1>
      {saved && <p className="mt-3 rounded-lg border border-green-700/25 bg-green-50 px-4 py-2.5 text-[14px] text-green-800">Saved. The site has been republished.</p>}

      <form action={save} className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <LocaleTabs en={panel("en")} ar={panel("ar")} />
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <Field label="Status">
              <select name="status" defaultValue={s?.status ?? "PUBLISHED"} className={fieldCls}>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </Field>
            <div className="mt-4"><Field label="Slug" hint="Lowercase, hyphens."><input name="slug" defaultValue={s?.slug ?? ""} pattern="[a-z0-9-]{2,80}" required className={`${fieldCls} font-mono text-[13px]`} /></Field></div>
            <div className="mt-4"><Field label="Image path" hint="Under /public, e.g. /media/services/svc-01.jpg"><input name="image" defaultValue={s?.image ?? ""} className={`${fieldCls} font-mono text-[13px]`} /></Field></div>
            <div className="mt-4"><Field label="Icon key (optional)"><input name="icon" defaultValue={s?.icon ?? ""} className={`${fieldCls} font-mono text-[13px]`} /></Field></div>
            <SubmitButton className="mt-5 w-full">{isNew ? "Create" : "Save"}</SubmitButton>
          </div>
        </aside>
      </form>

      {remove && (
        <form action={remove} className="mt-8">
          <button className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-wine-700 hover:underline">Delete solution</button>
        </form>
      )}
    </div>
  );
}
