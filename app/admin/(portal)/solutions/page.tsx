import Link from "next/link";
import { db } from "@/lib/server/db";
import { reorderSolutions } from "@/lib/server/actions/solutions";
import SortableList from "@/components/admin/SortableList";

export const dynamic = "force-dynamic";

export default async function SolutionsAdmin() {
  const rows = await db.solution.findMany({ orderBy: { order: "asc" }, include: { translations: true } });
  const items = rows.map((s) => {
    const en = s.translations.find((t) => t.locale === "en");
    const ar = s.translations.find((t) => t.locale === "ar");
    return {
      id: s.id,
      render: (
        <Link href={`/admin/solutions/${s.id}`} className="flex items-center justify-between gap-4 hover:text-green-700">
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-medium">{en?.title ?? s.slug}</span>
            <span className="block truncate text-[12.5px] text-ink-3" dir="rtl">{ar?.title ?? "—"}</span>
          </span>
          <span className={["shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]", s.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-line-2 text-ink-3"].join(" ")}>{s.status}</span>
        </Link>
      ),
    };
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">Solutions</h1>
          <p className="mt-1 text-[14px] text-ink-3">Drag to reorder. The order here is the order on the homepage rail and the Solutions page.</p>
        </div>
        <Link href="/admin/solutions/new" className="btn btn-primary !py-2.5 !text-[14px]">New solution</Link>
      </div>
      <div className="mt-6">
        <SortableList items={items} onReorder={reorderSolutions} />
      </div>
    </div>
  );
}
