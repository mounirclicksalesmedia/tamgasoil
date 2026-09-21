import Link from "next/link";
import { db } from "@/lib/server/db";
import { reorderCategories } from "@/lib/server/actions/blog";
import SortableList from "@/components/admin/SortableList";

export const dynamic = "force-dynamic";

export default async function CategoriesAdmin() {
  const cats = await db.category.findMany({ orderBy: [{ kind: "asc" }, { order: "asc" }], include: { translations: true, _count: { select: { posts: true, solutions: true } } } });
  const group = (kind: "BLOG" | "SOLUTION") => cats.filter((c) => c.kind === kind).map((c) => ({
    id: c.id,
    render: (
      <Link href={`/admin/categories/${c.id}`} className="flex items-center justify-between gap-4 hover:text-green-700">
        <span><span className="block text-[14px] font-medium">{c.translations.find((t) => t.locale === "en")?.name ?? c.slug}</span><span className="block text-[12.5px] text-ink-3" dir="rtl">{c.translations.find((t) => t.locale === "ar")?.name ?? "—"}</span></span>
        <span className="font-mono text-[10.5px] text-ink-3">{kind === "BLOG" ? `${c._count.posts} posts` : `${c._count.solutions} solutions`}</span>
      </Link>
    ),
  }));
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">Categories</h1>
        <Link href="/admin/categories/new" className="btn btn-primary !py-2.5 !text-[14px]">New category</Link>
      </div>
      <h2 className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">Blog</h2>
      <div className="mt-3">{group("BLOG").length ? <SortableList items={group("BLOG")} onReorder={reorderCategories} /> : <p className="text-[14px] text-ink-3">None yet.</p>}</div>
      <h2 className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">Solutions</h2>
      <div className="mt-3">{group("SOLUTION").length ? <SortableList items={group("SOLUTION")} onReorder={reorderCategories} /> : <p className="text-[14px] text-ink-3">None yet — optional grouping for the Solutions page.</p>}</div>
    </div>
  );
}
