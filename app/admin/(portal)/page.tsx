import Link from "next/link";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const [pages, solutions, posts, drafts, inquiriesNew, inquiriesAll] = await Promise.all([
    db.page.count(),
    db.solution.count(),
    db.post.count({ where: { status: "PUBLISHED" } }),
    db.post.count({ where: { status: "DRAFT" } }),
    db.inquiry.count({ where: { status: "NEW" } }),
    db.inquiry.count(),
  ]);
  const recent = await db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 6 });

  const tiles = [
    { label: "Pages", value: pages, href: "/admin/pages" },
    { label: "Solutions", value: solutions, href: "/admin/solutions" },
    { label: "Published posts", value: posts, sub: `${drafts} draft`, href: "/admin/blog" },
    { label: "New inquiries", value: inquiriesNew, sub: `${inquiriesAll} total`, href: "/admin/inquiries", accent: inquiriesNew > 0 },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className={["rounded-2xl border p-5 transition-colors hover:border-green-700/40", t.accent ? "border-wine-700/30 bg-wine-100" : "border-line bg-surface"].join(" ")}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">{t.label}</p>
            <p className="mt-3 text-3xl font-medium tracking-[-0.03em]">{t.value}</p>
            {t.sub && <p className="mt-1 text-[12px] text-ink-3">{t.sub}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-[15px] font-medium">Latest inquiries</h2>
          <Link href="/admin/inquiries" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-green-700 hover:underline">All</Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-[14px] text-ink-3">No inquiries yet. Submissions from the site land here.</p>
        ) : (
          <ul className="divide-y divide-line">
            {recent.map((q) => (
              <li key={q.id}>
                <Link href={`/admin/inquiries/${q.id}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-paper">
                  <span className={["h-2 w-2 shrink-0 rounded-full", q.status === "NEW" ? "bg-wine-700" : q.status === "IN_PROGRESS" ? "bg-green-600" : "bg-line"].join(" ")} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium">{q.name} · {q.company}</span>
                    <span className="block truncate text-[12.5px] text-ink-3">{q.reason ?? q.source} — {q.message}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[10.5px] text-ink-3">{q.createdAt.toISOString().slice(0, 10)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
