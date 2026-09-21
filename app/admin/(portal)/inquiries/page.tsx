import Link from "next/link";
import { InquiryStatus } from "@prisma/client";
import { db } from "@/lib/server/db";

export const dynamic = "force-dynamic";

const statuses: { key: InquiryStatus | "ALL"; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "NEW", label: "New" },
  { key: "IN_PROGRESS", label: "In progress" },
  { key: "CLOSED", label: "Closed" },
];

export default async function InquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status = "ALL", q = "" } = await searchParams;
  const where = {
    ...(status !== "ALL" && (statuses.some((s) => s.key === status)) ? { status: status as InquiryStatus } : {}),
    ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" as const } }, { company: { contains: q, mode: "insensitive" as const } }, { email: { contains: q, mode: "insensitive" as const } }, { message: { contains: q, mode: "insensitive" as const } }] } : {}),
  };
  const rows = await db.inquiry.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">Inquiries</h1>
        <form className="flex gap-2">
          <input type="hidden" name="status" value={status} />
          <input name="q" defaultValue={q} placeholder="Search name, company, email…" className="w-72 rounded-lg border border-line bg-surface px-3 py-2 text-[14px] outline-none focus:border-green-700" />
          <button className="btn btn-ghost !py-2 !text-[13px]">Search</button>
        </form>
      </div>

      <div className="mt-5 flex gap-2">
        {statuses.map((s) => (
          <Link key={s.key} href={`/admin/inquiries?status=${s.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`} className={["rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.06em]", status === s.key ? "border-green-700 bg-green-700 text-white" : "border-line bg-surface text-ink-2"].join(" ")}>
            {s.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-[14px]">
          <thead className="bg-paper font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            <tr>
              <th className="px-4 py-3 text-start font-medium">Status</th>
              <th className="px-4 py-3 text-start font-medium">Contact</th>
              <th className="px-4 py-3 text-start font-medium">Reason</th>
              <th className="px-4 py-3 text-start font-medium">Message</th>
              <th className="px-4 py-3 text-start font-medium">Source</th>
              <th className="px-4 py-3 text-start font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-ink-3">Nothing here.</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-paper">
                <td className="px-4 py-3">
                  <span className={["inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]", r.status === "NEW" ? "bg-wine-100 text-wine-800" : r.status === "IN_PROGRESS" ? "bg-green-100 text-green-800" : "bg-line-2 text-ink-3"].join(" ")}>{r.status.replace("_", " ")}</span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/inquiries/${r.id}`} className="font-medium text-ink hover:text-green-700">{r.name}</Link>
                  <div className="text-[12.5px] text-ink-3">{r.company} · {r.email}</div>
                </td>
                <td className="px-4 py-3 text-ink-2">{r.reason ?? "—"}</td>
                <td className="max-w-[26rem] truncate px-4 py-3 text-ink-2">{r.message}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-ink-3">{r.source} · {r.locale}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-ink-3">{r.createdAt.toISOString().slice(0, 16).replace("T", " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
