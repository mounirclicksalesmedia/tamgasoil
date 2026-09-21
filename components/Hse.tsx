import type { SiteContent } from "@/lib/content";
import { ArrowRight } from "./Icons";

export default function Hse({ c }: { c: SiteContent }) {
  const h = c.hse;
  return (
    <section id="hse" className="section bg-surface">
      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-ink-3">{h.eyebrow}</p>
          <h2 className="display-2 mt-6 text-balance">{h.heading}</h2>
          <a href="#contact" className="btn btn-wine mt-9">
            {h.cta}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </div>

        <ul className="lg:pt-2">
          {h.items.map((item, i) => (
            <li
              key={i}
              className="reveal flex gap-6 border-b border-line py-7 first:border-t"
              style={{ ["--reveal-delay" as string]: `${70 * i}ms` }}
            >
              <span className="mt-1 font-mono text-[11px] tracking-[0.14em] text-wine-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[1.0625rem] leading-[1.65] text-ink">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
