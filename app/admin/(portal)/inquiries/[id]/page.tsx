import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/server/db";
import { deleteInquiry, updateInquiry } from "@/lib/server/actions/inquiries";
import { SubmitButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function InquiryDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const q = await db.inquiry.findUnique({ where: { id } });
  if (!q) notFound();

  const update = updateInquiry.bind(null, id);
  const remove = deleteInquiry.bind(null, id);
  const label = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3";

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/admin/inquiries" className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">← Inquiries</Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{q.name} · {q.company}</h1>
      <p className="mt-1 font-mono text-[11px] text-ink-3">{q.source} · {q.locale} · {q.createdAt.toISOString().replace("T", " ").slice(0, 16)}</p>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div><dt className={label}>Email</dt><dd><a href={`mailto:${q.email}`} className="text-green-700 hover:underline">{q.email}</a></dd></div>
            <div><dt className={label}>Phone</dt><dd>{q.phone ?? "—"}</dd></div>
            <div className="sm:col-span-2"><dt className={label}>Reason</dt><dd>{q.reason ?? "—"}</dd></div>
            <div className="sm:col-span-2"><dt className={label}>Message</dt><dd className="whitespace-pre-wrap leading-[1.7]">{q.message}</dd></div>
          </dl>
        </div>

        <form action={update} className="rounded-2xl border border-line bg-surface p-6">
          <label className="block">
            <span className={label}>Status</span>
            <select name="status" defaultValue={q.status} className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-[14px]">
              <option value="NEW">New</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="CLOSED">Closed</option>
            </select>
          </label>
          <label className="mt-4 block">
            <span className={label}>Internal notes</span>
            <textarea name="notes" rows={6} defaultValue={q.notes ?? ""} className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-[14px]" />
          </label>
          <SubmitButton className="mt-4 w-full">Save</SubmitButton>
        </form>
      </div>

      <form action={remove} className="mt-8">
        <button className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-wine-700 hover:underline">Delete inquiry</button>
      </form>
    </div>
  );
}
