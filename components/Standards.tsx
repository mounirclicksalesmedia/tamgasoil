import type { SiteContent } from "@/lib/content";

/** Vendor-registration line that runs directly under the hero's standards rail. */
export default function Standards({ c }: { c: SiteContent }) {
  const s = c.standards;
  return (
    <section className="shell">
      <div className="reveal flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-8 md:py-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          {s.registration}
        </span>
        <span className="h-3 w-px bg-line" />
        {s.registrationItems.map((item, i) => (
          <span key={item} className="flex items-center gap-3">
            <span className="text-sm text-ink-2">{item}</span>
            {i < s.registrationItems.length - 1 && <span className="text-ink-3/60">·</span>}
          </span>
        ))}
      </div>
    </section>
  );
}
