import SectionCta from "./SectionCta";
import type { SiteContent } from "@/lib/content";
import TankExperience from "./process/TankExperience";

export default function Process({ c }: { c: SiteContent }) {
  return (
    <section id="process" className="section process-section bg-surface">
      <div className="shell">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl"><p className="eyebrow text-ink-3">{c.process.eyebrow}</p><h2 className="display-2 mt-6 text-balance">{c.process.heading}</h2></div>
          <p className="max-w-sm text-[0.9375rem] leading-[1.7] text-ink-2 lg:pb-2">{c.process.intro}</p>
        </div>
        <div className="process-explorer mt-12"><TankExperience c={c} /></div>
        <SectionCta label={c.sectionCtas.process} />
      </div>
    </section>
  );
}
