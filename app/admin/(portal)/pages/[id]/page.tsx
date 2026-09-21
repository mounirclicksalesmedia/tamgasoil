import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/server/db";
import { addBlock, deletePage, reorderBlocks, savePageMeta } from "@/lib/server/actions/pages";
import { blockTypes } from "@/lib/blocks";
import SortableList from "@/components/admin/SortableList";
import { Field, LocaleTabs, SubmitButton, fieldCls } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function PageEditor({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id } = await params;
  const { saved } = await searchParams;
  const page = await db.page.findUnique({ where: { id }, include: { translations: true, blocks: { orderBy: { order: "asc" }, include: { translations: true } } } });
  if (!page) notFound();
  const t = (l: "en" | "ar") => page.translations.find((x) => x.locale === l);
  const reorder = reorderBlocks.bind(null, page.id);
  const add = addBlock.bind(null, page.id);
  const saveMeta = savePageMeta.bind(null, page.id);
  const remove = deletePage.bind(null, page.id);

  const items = page.blocks.map((b) => {
    const en = b.translations.find((x) => x.locale === "en")?.content as Record<string, unknown> | undefined;
    const preview = String(en?.heading ?? en?.title ?? en?.quote ?? en?.headingLead ?? (Array.isArray(en?.headline) ? (en!.headline as { text: string }[]).map((h) => h.text).join(" ") : "") ?? "");
    return {
      id: b.id,
      render: (
        <Link href={`/admin/pages/${page.id}/blocks/${b.id}`} className="flex items-center justify-between gap-4 hover:text-green-700">
          <span className="min-w-0">
            <span className="block text-[14px] font-medium">{blockTypes[b.type as keyof typeof blockTypes]?.label ?? b.type}</span>
            <span className="block truncate text-[12.5px] text-ink-3">{preview || "—"}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em]">
            {b.anchor && <span className="text-ink-3">#{b.anchor}</span>}
            {!b.enabled && <span className="rounded-full bg-line-2 px-2 py-0.5 text-ink-3">hidden</span>}
          </span>
        </Link>
      ),
    };
  });

  const meta = (l: "en" | "ar") => {
    const x = t(l);
    return (
      <div className="space-y-4">
        <Field label="Navigation label"><input name={`${l}.navLabel`} defaultValue={x?.navLabel ?? ""} required className={fieldCls} /></Field>
        <Field label="SEO title"><input name={`${l}.seoTitle`} defaultValue={x?.seoTitle ?? ""} required className={fieldCls} /></Field>
        <Field label="SEO description"><textarea name={`${l}.seoDescription`} rows={3} defaultValue={x?.seoDescription ?? ""} className={fieldCls} /></Field>
        <Field label="Keywords" hint="One per line."><textarea name={`${l}.seoKeywords`} rows={3} defaultValue={(x?.seoKeywords ?? []).join("\n")} className={`${fieldCls} font-mono text-[13px]`} /></Field>
        <Field label="OG image path"><input name={`${l}.ogImage`} defaultValue={x?.ogImage ?? ""} className={`${fieldCls} font-mono text-[13px]`} /></Field>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/admin/pages" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">← Pages</Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">{t("en")?.navLabel} <span className="font-mono text-[13px] font-normal text-ink-3">/{page.slug}</span></h1>
        <Link href={`/en/${page.slug}`} target="_blank" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-green-700 hover:underline">Open page ↗</Link>
      </div>
      {saved && <p className="mt-3 rounded-lg border border-green-700/25 bg-green-50 px-4 py-2.5 text-[14px] text-green-800">Saved. The site has been republished.</p>}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h2 className="text-[15px] font-medium">Sections</h2>
          <p className="mt-1 text-[13px] text-ink-3">Drag to reorder. Click a section to edit its text in both languages.</p>
          <div className="mt-4"><SortableList items={items} onReorder={reorder} /></div>
          <form action={add} className="mt-4 flex items-end gap-3">
            <label className="block flex-1">
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">Add a section</span>
              <select name="type" className={fieldCls}>
                {Object.entries(blockTypes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </label>
            <SubmitButton>Add</SubmitButton>
          </form>
        </section>

        <form action={saveMeta} className="rounded-2xl border border-line bg-surface p-6">
          <h2 className="text-[15px] font-medium">Page settings & SEO</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Status"><select name="status" defaultValue={page.status} className={fieldCls}><option value="PUBLISHED">Published</option><option value="DRAFT">Draft</option></select></Field>
            <label className="flex items-end gap-2 pb-2 text-[14px]"><input type="checkbox" name="showInNav" defaultChecked={page.showInNav} /> Show in navigation</label>
          </div>
          <div className="mt-5"><LocaleTabs en={meta("en")} ar={meta("ar")} /></div>
          <SubmitButton className="mt-5 w-full">Save page settings</SubmitButton>
        </form>
      </div>

      {page.slug !== "" && (
        <form action={remove} className="mt-10"><button className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-wine-700 hover:underline">Delete page</button></form>
      )}
    </div>
  );
}
