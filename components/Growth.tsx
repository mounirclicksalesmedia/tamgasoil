import type { SiteContent } from "@/lib/content";

export default function Growth({ c }: { c: SiteContent }) {
  const g = c.growth;
  return (
    <section id="about" className="section">
      <div className="shell">
        <div className="reveal max-w-2xl">
          <p className="eyebrow text-ink-3">{g.eyebrow}</p>
          <h2 className="display-2 mt-6 text-balance">{g.heading}</h2>
          <p className="lede mt-6">{g.intro}</p>
        </div>

        <div className="relative mt-16">
          <span
            aria-hidden
            className="absolute inset-x-0 top-[7px] hidden h-px bg-line md:block"
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {g.items.map((item, i) => (
              <article
                key={item.no}
                className="reveal relative md:pe-8"
                style={{ ["--reveal-delay" as string]: `${100 * i}ms` }}
              >
                <span
                  aria-hidden
                  className="absolute top-0 start-0 hidden h-[15px] w-[15px] rounded-full border-[3px] border-paper bg-green-700 md:block"
                />
                <div className="md:pt-12">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-wine-700">
                      {item.no}
                    </span>
                    <span className="h-px flex-1 bg-line md:hidden" />
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.35rem] font-medium tracking-[-0.022em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-2">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
