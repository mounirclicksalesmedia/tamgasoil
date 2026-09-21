import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getContent, getPages } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import LeadBand from "@/components/LeadBand";
import Growth from "@/components/Growth";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const a = getPages(locale).about;
  return {
    title: a.meta.title,
    description: a.meta.description,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: "/en/about", ar: "/ar/about" },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = getContent(typed);
  const a = getPages(typed).about;

  return (
    <main>
      <PageHero
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        lede={a.hero.lede}
        cover="/media/inspection-instruments.webp"
      />

      {/* belief statement */}
      <section className="section bg-surface">
        <div className="shell">
          <figure className="reveal mx-auto max-w-4xl text-center">
            <span
              aria-hidden
              className="mx-auto mb-10 block h-10 w-px bg-gradient-to-b from-transparent to-wine-700"
            />
            <blockquote className="display-3 text-balance text-ink">
              {a.belief.quote}
            </blockquote>
            <figcaption className="mt-9 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
              {a.belief.caption}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* story */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-ink-3">{a.story.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{a.story.heading}</h2>
          </div>
          <div className="space-y-6">
            {a.story.paragraphs.map((para, i) => (
              <p
                key={i}
                className="reveal text-[1.0625rem] leading-[1.75] text-ink-2"
                style={{ ["--reveal-delay" as string]: `${70 * i}ms` }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* what we are not / what we are */}
      <section className="section bg-surface">
        <div className="shell">
          <div className="reveal max-w-2xl">
            <p className="eyebrow text-ink-3">{a.contrast.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{a.contrast.heading}</h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <div className="reveal rounded-2xl bg-paper p-8">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                {a.contrast.isNotLabel}
              </p>
              <ul className="mt-6 space-y-4">
                {a.contrast.isNot.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                    <svg className="mt-[7px] h-3 w-3 shrink-0 text-ink-3" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span className="text-[0.9375rem] leading-[1.7] text-ink-3 line-through decoration-ink-3/30">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal rounded-2xl bg-green-50 p-8" style={{ ["--reveal-delay" as string]: "90ms" }}>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-green-700">
                {a.contrast.isLabel}
              </p>
              <ul className="mt-6 space-y-4">
                {a.contrast.is.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-green-700/15 pb-4 last:border-0 last:pb-0">
                    <svg className="mt-[5px] h-3.5 w-3.5 shrink-0 text-green-700" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="m2.8 7.3 2.6 2.6L11.2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[0.9375rem] leading-[1.7] text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* technology partner */}
      <section className="relative overflow-hidden bg-green-900 text-white">
        <div className="shell section relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow eyebrow-light text-green-300">{a.partner.eyebrow}</p>
            <h2 className="display-2 mt-6 text-white">{a.partner.heading}</h2>
          </div>
          <div className="reveal" style={{ ["--reveal-delay" as string]: "90ms" }}>
            <p className="text-[1.0625rem] leading-[1.75] text-white/70">{a.partner.body}</p>
            <ul className="mt-9">
              {a.partner.points.map((point, i) => (
                <li key={i} className="flex gap-5 border-b border-white/12 py-5 first:border-t">
                  <span className="mt-1 font-mono text-[11px] tracking-[0.12em] text-green-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-[1.7] text-white/75">{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 font-mono text-[11px] leading-relaxed tracking-[0.03em] text-white/35">
              {a.partner.note}
            </p>
          </div>
        </div>
      </section>

      <Growth c={c} />

      <LeadBand p={getPages(typed)} locale={typed} />
    </main>
  );
}
