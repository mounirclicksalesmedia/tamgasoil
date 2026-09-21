import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/server/db";
import { deleteBlock, saveBlock } from "@/lib/server/actions/pages";
import { blockTypes, isBlockType, orderLike } from "@/lib/blocks";
import JsonFields from "@/components/admin/JsonFields";
import { Field, LocaleTabs, SubmitButton, fieldCls } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function BlockEditor({ params, searchParams }: { params: Promise<{ id: string; blockId: string }>; searchParams: Promise<{ saved?: string }> }) {
  const { id, blockId } = await params;
  const { saved } = await searchParams;
  const block = await db.block.findUnique({ where: { id: blockId, pageId: id }, include: { translations: true, page: { include: { translations: true } } } });
  if (!block) notFound();
  const template = isBlockType(block.type) ? blockTypes[block.type].template : {};
  const content = (l: "en" | "ar") =>
    orderLike(template as never, (block.translations.find((x) => x.locale === l)?.content ?? {}) as never) as Record<string, unknown>;
  const save = saveBlock.bind(null, id, blockId);
  const remove = deleteBlock.bind(null, id, blockId);
  const label = blockTypes[block.type as keyof typeof blockTypes]?.label ?? block.type;
  const pageLabel = block.page.translations.find((x) => x.locale === "en")?.navLabel ?? block.page.slug;

  return (
    <div className="mx-auto max-w-5xl">
      <Link href={`/admin/pages/${id}`} className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">← {pageLabel}</Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">{label}</h1>
      {saved && <p className="mt-3 rounded-lg border border-green-700/25 bg-green-50 px-4 py-2.5 text-[14px] text-green-800">Saved. The site has been republished.</p>}

      <form action={save} className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <LocaleTabs
            en={<JsonFields name="en" value={content("en") as never} dir="ltr" />}
            ar={<JsonFields name="ar" value={content("ar") as never} dir="rtl" />}
          />
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <label className="flex items-center gap-2 text-[14px]"><input type="checkbox" name="enabled" defaultChecked={block.enabled} /> Visible on the site</label>
            <div className="mt-4"><Field label="Anchor id" hint="Lets links jump here, e.g. #process"><input name="anchor" defaultValue={block.anchor ?? ""} pattern="[a-z0-9-]*" className={`${fieldCls} font-mono text-[13px]`} /></Field></div>
            <div className="mt-4">
              <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">Settings (same for both languages)</span>
              <JsonFields name="settings" value={(block.settings ?? {}) as never} />
            </div>
            <SubmitButton className="mt-5 w-full">Save section</SubmitButton>
          </div>
        </aside>
      </form>

      <form action={remove} className="mt-8"><button className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-wine-700 hover:underline">Remove section from page</button></form>
    </div>
  );
}
