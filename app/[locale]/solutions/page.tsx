import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getContent, getPages } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";
import LeadBand from "@/components/LeadBand";
import { ArrowRight } from "@/components/Icons";

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
  const s = getPages(locale).services;
  return {
    title: s.meta.title,
    description: s.meta.description,
    alternates: {
      canonical: `/${locale}/solutions`,
      languages: { en: "/en/solutions", ar: "/ar/solutions" },
    },
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = getContent(typed);
  const s = getPages(typed).services;

  const slug = (i: number) => `solution-${String(i + 1).padStart(2, "0")}`;

  return (
    <main>
      <PageHero
        eyebrow={s.hero.eyebrow}
        title={s.hero.title}
        lede={s.hero.lede}
        cover="/media/coating-maintenance.webp"
      >
        {/* index rail on the hero's bottom edge */}
        <div className="mt-14 border-t border-white/12 pt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            {s.indexLabel}
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.items.map((item, i) => (
              <li key={item.no}>
                <a
                  href={`#${slug(i)}`}
                  className="group flex items-baseline gap-3 text-[0.9375rem] text-white/60 transition-colors hover:text-white"
                >
                  <span className="font-mono text-[10.5px] tracking-[0.12em] text-green-300/70">
                    {item.no}
                  </span>
                  <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-white/40">
                    {item.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      {/* the eight services, one hairline-ruled row each */}
      <section className="section">
        <div className="shell">
          {c.services.items.map((item, i) => (
            <article
              key={item.no}
              id={slug(i)}
              className="reveal scroll-mt-28 border-t border-line py-12 first:border-t-0 first:pt-0 lg:py-16"
            >
              <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-wine-700">
                    {item.no}
                  </span>
                  <h2 className="display-3 mt-4 text-balance">{item.title}</h2>
                </div>

                <div>
                  <p className="lede">{item.body}</p>

                  <p className="mt-9 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                    {s.includesLabel}
                  </p>
                  <ul className="mt-5 grid gap-x-10 gap-y-0 sm:grid-cols-2">
                    {s.includes[i].map((sub) => (
                      <li
                        key={sub}
                        className="border-b border-line-2 py-3 text-[0.9375rem] leading-[1.6] text-ink-2"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/${typed}/contact`} className="arrow-link mt-8">
                    {s.enquire}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* standards note */}
      <section className="bg-surface">
        <div className="shell py-16 md:py-20">
          <div className="reveal grid gap-8 rounded-2xl bg-green-50 p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
            <h2 className="display-3 text-balance">{s.standards.heading}</h2>
            <div>
              <p className="text-[1.0625rem] leading-[1.75] text-ink-2">{s.standards.body}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {c.standards.items.map((std) => (
                  <span key={std} className="tag">
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadBand p={getPages(typed)} locale={typed} />
    </main>
  );
}
