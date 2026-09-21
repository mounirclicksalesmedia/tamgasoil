import Image from "next/image";
import type { SiteContent } from "@/lib/content";

export default function Technology({ c }: { c: SiteContent }) {
  const t = c.technology;
  return (
    <section id="technology" className="bg-green-950 text-white">
      <div className="shell section">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="reveal">
            <p className="eyebrow eyebrow-light text-green-300">{t.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance text-white">{t.heading}</h2>
            <p className="mt-7 text-[1.0625rem] leading-[1.75] text-white/70">{t.body}</p>
          </div>
          <div className="reveal relative aspect-[6/5] overflow-hidden rounded-2xl bg-green-900">
            <Image src="/media/precision-pipework.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          {t.lines.map((line) => (
            <article key={line.name} className="reveal border-t border-white/20 pt-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-green-300">{line.variants}</p>
              <h3 className="mt-5 text-[2rem] font-normal tracking-[-0.03em]">{line.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-[1.75] text-white/70">{line.body}</p>
            </article>
          ))}
        </div>
        <div className="reveal mt-12 flex flex-wrap items-center gap-3">
          <span className="me-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">{t.tagsLabel}</span>
          {t.tags.map((tag) => <span key={tag} className="tag-onDark">{tag}</span>)}
        </div>
      </div>
    </section>
  );
}
