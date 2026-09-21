import { db } from "@/lib/server/db";
import { saveSetting } from "@/lib/server/actions/blog";
import JsonFields from "@/components/admin/JsonFields";
import BilingualSetting from "@/components/admin/BilingualSetting";
import { SubmitButton } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

const labels: Record<string, string> = {
  brand: "Brand name & language switch",
  navCta: "Navigation button",
  footer: "Footer",
  contactDetails: "Contact details (email, phone, address)",
  standards: "Standards & vendor registration",
  siteMeta: "Homepage SEO",
};

export default async function SettingsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const settings = await db.setting.findMany({ orderBy: { key: "asc" } });
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">Settings</h1>
      <p className="mt-1 text-[14px] text-ink-3">Site-wide values that are not part of a page. Each saves on its own.</p>
      <div className="mt-6 space-y-6">
        {settings.map((s) => {
          const v = s.value as { en?: unknown; ar?: unknown };
          const bilingual = v && typeof v === "object" && "en" in v && "ar" in v;
          const save = saveSetting.bind(null, s.key);
          return (
            <form key={s.key} action={save} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-medium">{labels[s.key] ?? s.key} <span className="font-mono text-[11px] font-normal text-ink-3">{s.key}</span></h2>
                {saved === s.key && <span className="text-[13px] text-green-800">Saved</span>}
              </div>
              <div className="mt-4">
                {bilingual
                  ? <BilingualSetting value={v as never} />
                  : <JsonFields name="value" value={s.value as never} />}
              </div>
              <SubmitButton className="mt-5">Save</SubmitButton>
            </form>
          );
        })}
      </div>
    </div>
  );
}
