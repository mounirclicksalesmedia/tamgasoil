import Link from "next/link";
import { db } from "@/lib/server/db";
import { createPage, reorderPages } from "@/lib/server/actions/pages";
import SortableList from "@/components/admin/SortableList";
import { SubmitButton, fieldCls } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function PagesAdmin() {
  const pages = await db.page.findMany({ orderBy: { order: "asc" }, include: { translations: true, _count: { select: { blocks: true } } } });
  const items = pages.map((p) => {
    const en = p.translations.find((t) => t.locale === "en");
    const ar = p.translations.find((t) => t.locale === "ar");
    return {
      id: p.id,
      render: (
        <Link href={`/admin/pages/${p.id}`} className="flex items-center justify-between gap-4 hover:text-green-700">
          <span className="min-w-0">
            <span className="block text-[14px] font-medium">{en?.navLabel} <span className="font-mono text-[11px] text-ink-3">/{p.slug}</span></span>
            <span className="block text-[12.5px] text-ink-3" dir="rtl">{ar?.navLabel}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            <span className="font-mono text-[10.5px] text-ink-3">{p._count.blocks} blocks</span>
            <span className={["rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]", p.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-line-2 text-ink-3"].join(" ")}>{p.status}</span>
          </span>
        </Link>
      ),
    };
  });

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Pages</h1>
      <p className="mt-1 text-[14px] text-ink-3">Drag to set the navigation order. Open a page to edit its SEO and rearrange its sections.</p>
      <div className="mt-6"><SortableList items={items} onReorder={reorderPages} /></div>
      <form action={createPage} className="mt-8 flex items-end gap-3 rounded-2xl border border-line bg-surface p-5">
        <label className="flex-1 block">
          <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">New page slug</span>
          <input name="slug" placeholder="e.g. careers" pattern="[a-z0-9-]{2,60}" required className={`${fieldCls} font-mono text-[13px]`} />
        </label>
        <SubmitButton>Create page</SubmitButton>
      </form>
    </div>
  );
}
