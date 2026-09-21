import Link from "next/link";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export default async function BlogAdmin() {
  const posts = await db.post.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }], include: { translations: true, category: { include: { translations: true } } } });
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div><h1 className="text-2xl font-semibold tracking-[-0.02em]">Blog</h1><p className="mt-1 text-[14px] text-ink-3">Newest first. Drafts never appear on the site.</p></div>
        <Link href="/admin/blog/new" className="btn btn-primary !py-2.5 !text-[14px]">New post</Link>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface">
        <ul className="divide-y divide-line">
          {posts.map((p) => {
            const en = p.translations.find((t) => t.locale === "en");
            const ar = p.translations.find((t) => t.locale === "ar");
            const cat = p.category?.translations.find((t) => t.locale === "en")?.name;
            return (
              <li key={p.id}>
                <Link href={`/admin/blog/${p.id}`} className="flex items-center gap-4 px-5 py-4 hover:bg-paper">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium">{en?.title ?? p.slug}</span>
                    <span className="block truncate text-[12.5px] text-ink-3" dir="rtl">{ar?.title ?? "—"}</span>
                  </span>
                  <span className="hidden font-mono text-[10.5px] text-ink-3 sm:block">{cat ?? "—"}</span>
                  {p.featured && <span className="rounded-full bg-wine-100 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-wine-800">Featured</span>}
                  <span className={["rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]", p.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-line-2 text-ink-3"].join(" ")}>{p.status}</span>
                  <span className="w-24 shrink-0 text-end font-mono text-[10.5px] text-ink-3">{p.publishedAt?.toISOString().slice(0, 10) ?? "—"}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
