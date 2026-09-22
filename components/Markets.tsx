import Image from "next/image";
import type { SiteContent } from "@/lib/content";

const toneStyles = {
  live: "border-green-700/25 bg-green-100 text-green-800",
  progress: "border-wine-700/20 bg-wine-100 text-wine-800",
  planned: "border-line bg-paper text-ink-3",
} as const;

export default function Markets({ c }: { c: SiteContent }) {
  const m = c.markets;
  return (
    <section id="markets" className="section bg-green-50">
      <div className="shell">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-ink-3">{m.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{m.heading}</h2>
          </div>
          <p className="max-w-md text-[0.9375rem] leading-[1.7] text-ink-2">{m.intro}</p>
        </div>

        <div className="reveal relative mt-12 aspect-[2.2/1] overflow-hidden rounded-2xl bg-green-100">
          <Image src="/media/port-terminal.webp" alt="" fill sizes="100vw" className="object-cover" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:mt-14 md:grid-cols-3 [&>*:last-child]:col-span-2 md:[&>*:last-child]:col-span-1">
          {m.items.map((item, i) => (
            <article
              key={item.country}
              className="reveal flex flex-col border-t border-green-800/20 pt-7 md:pe-8"
              style={{ ["--reveal-delay" as string]: `${90 * i}ms` }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                {item.phase}
              </p>

              <h3 className="mt-5 text-[2rem] font-medium tracking-[-0.025em] text-ink">
                {item.country}
              </h3>

              <p className="mt-3 flex-1 text-[0.8125rem] leading-[1.6] text-ink-2 sm:mt-4 sm:text-[0.9375rem] sm:leading-[1.7]">
                {item.body}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4 sm:mt-7 sm:gap-3 sm:pt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                  {m.statusLabel}
                </span>
                <span
                  className={[
                    "rounded-full px-3 py-1 text-[12px] font-medium",
                    toneStyles[item.tone],
                  ].join(" ")}
                >
                  {item.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
