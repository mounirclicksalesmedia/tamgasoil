import type { SiteContent } from "@/lib/content";
import { ArrowRight, PlayCircle } from "./Icons";

export default function Hero({ c }: { c: SiteContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-green-950 text-white">
      {/* ── video bed ─────────────────────────────── */}
      <video
        className="hero-video absolute inset-0 -z-20 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/media/hero-loop.mp4" type="video/mp4" />
      </video>

      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-56"
        style={{
          background:
            "linear-gradient(to top, var(--color-green-950), transparent)",
        }}
      />

      <div className="shell relative pt-[150px] pb-0 md:pt-[190px]">
        <div className="max-w-4xl">
          <p className="eyebrow eyebrow-light text-white/55">{c.hero.eyebrow}</p>

          <h1 className="display-1 mt-8 text-balance">
            {c.hero.headline.map((line, i) => (
              <span key={i} className="block">
                <span className={"accent" in line && line.accent ? "text-green-300" : "text-white"}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-white/70 md:text-[1.15rem]">
            {c.hero.sub}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-wine">
              {c.hero.primary}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </a>
            <a href="#process" className="btn btn-onDark">
              <PlayCircle className="h-4 w-4 text-green-300" />
              {c.hero.secondary}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            {c.hero.micro.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-mono text-[11.5px] tracking-[0.04em] text-white/55"
              >
                <svg className="h-3 w-3 shrink-0 text-green-300" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <circle cx="6" cy="6" r="5.2" stroke="currentColor" strokeWidth="1" />
                  <path d="m3.8 6.1 1.6 1.6 2.9-3.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* standards sit on the hero's bottom edge, like the reference's stat rail */}
        <div className="mt-16 md:mt-24">
          <div className="grid grid-cols-2 gap-x-6 border-t border-white/15 py-3 md:grid-cols-3 lg:grid-cols-5">
            {c.standards.items.map((item) => (
              <div key={item} className="py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  {c.standards.workingTo}
                </p>
                <p className="mt-3 text-[1.0625rem] font-medium tracking-[-0.01em] text-white md:text-[1.15rem]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
