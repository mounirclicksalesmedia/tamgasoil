import SectionCta from "./SectionCta";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";

export default function Pillars({ c }: { c: SiteContent }) {
  const p = c.pillars;
  return (
    <section id="why-tam" className="section">
      <div className="shell">
        <div className="reveal grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink-3">{p.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{p.heading}</h2>
          </div>
          <p className="lede max-w-md">{p.intro}</p>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="reveal relative min-h-[280px] overflow-hidden rounded-2xl bg-green-100 lg:min-h-[520px]">
            <Image src="/media/tank-farm-enhanced.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="grid grid-cols-2 content-center gap-x-5 sm:gap-x-9">
            {p.items.map((item, i) => (
              <article key={item.no} className={`reveal py-6 ${i === 4 ? "col-span-2" : ""}`}>
                <span className="font-mono text-xs text-wine-700">{item.no}</span>
                <h3 className="mt-3 text-base sm:text-xl font-medium leading-tight tracking-[-0.02em] text-green-950">{item.title}</h3>
                <p className="mt-3 max-w-lg text-[0.8125rem] leading-[1.65] sm:text-[0.9375rem] sm:leading-[1.7] text-ink-2">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
        <SectionCta label={c.sectionCtas.whyTam} />
      </div>
    </section>
  );
}
