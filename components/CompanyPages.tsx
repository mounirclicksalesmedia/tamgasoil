import Image from "next/image";
import Link from "next/link";
import { getContent, getPages } from "@/lib/content";
import {
  companyHref,
  companySections,
  getCorporate,
  type CompanySection,
} from "@/lib/corporate";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";
import PageHero from "./PageHero";
import Growth from "./Growth";
import PageCta from "./PageCta";

export default function CompanyPages({
  locale,
  section = "overview",
}: {
  locale: Locale;
  section?: CompanySection;
}) {
  const t = getCorporate(locale),
    c = getContent(locale),
    a = getPages(locale).about;
  const isOverview = section === "overview",
    isStrategy = section === "strategy";
  return (
    <main>
      <PageHero
        eyebrow={`${t.company} / ${t.sections[section]}`}
        title={
          isOverview
            ? t.companyTitle
            : isStrategy
              ? t.strategyTitle
              : t.sections[section]
        }
        lede={
          isOverview
            ? t.companyIntro
            : isStrategy
              ? t.strategyIntro
              : t.sectionIntros[section]
        }
        cover={
          isStrategy
            ? "/media/port-terminal.webp"
            : "/media/tank-farm-enhanced.webp"
        }
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={`/${locale}/request-proposal`} className="btn btn-wine">
            {t.nav.proposal}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
          <Link href={`/${locale}/brochure`} className="btn btn-onDark">
            {t.nav.brochure}
            <span aria-hidden>↓</span>
          </Link>
        </div>
      </PageHero>
      <nav
        className="company-tabs border-b border-line bg-surface"
        aria-label={t.company}
      >
        <div className="shell flex gap-2 overflow-x-auto py-4">
          {companySections.map((key) => (
            <Link
              key={key}
              href={companyHref(locale, key)}
              aria-current={section === key ? "page" : undefined}
              className={`shrink-0 rounded-full px-5 py-3 text-sm transition-colors ${section === key ? "bg-green-800 text-white" : "text-ink-2 hover:bg-green-50"}`}
            >
              {t.sections[key]}
            </Link>
          ))}
        </div>
      </nav>
      {isOverview ? (
        <>
          <section className="section">
            <div className="shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-20">
              <div className="reveal">
                <p className="eyebrow text-wine-700">{t.sections.overview}</p>
                <h2 className="display-2 mt-6">{a.story.heading}</h2>
                <p className="lede mt-6">{t.companyIntro}</p>
                <p className="mt-5 leading-relaxed text-ink-2">
                  {a.story.paragraphs[1]}
                </p>
                <Link href={`/${locale}/services`} className="arrow-link mt-8">
                  {t.nav.services}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
              </div>
              <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src="/media/precision-pipework.webp"
                  alt=""
                  fill
                  sizes="(min-width:1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-transparent to-transparent" />
                <div className="absolute inset-x-7 bottom-8 text-white">
                  <p className="eyebrow eyebrow-light">TAM · DOHA</p>
                  <p className="mt-4 text-2xl leading-relaxed">
                    {c.hero.headline[0].text}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="section bg-surface">
            <div className="shell">
              <div className="reveal mb-10 flex items-end justify-between gap-5">
                <h2 className="display-2">{t.explore}</h2>
                <span className="font-mono text-xs text-ink-3">01 — 05</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {companySections.map((key, i) => (
                  <Link
                    key={key}
                    href={companyHref(locale, key)}
                    className={`reveal modern-card flex min-h-[250px] flex-col p-7 md:p-9 ${key === "strategy" ? "md:col-span-2 company-strategy-card" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-wine-700">
                        0{i + 1}
                      </span>
                      <span className="card-arrow">
                        <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium leading-snug">
                      {t.sections[key]}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-2">
                      {t.sectionIntros[key]}
                    </p>
                    <span className="mt-auto pt-7 text-xs font-medium text-green-700">
                      {t.discover}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : isStrategy ? (
        <>
          <section className="section">
            <div className="shell grid gap-5 md:grid-cols-2">
              {t.priorities.map((item, i) => (
                <article
                  key={item.title}
                  className="modern-card reveal p-8 md:p-10"
                >
                  <span className="strategy-number">0{i + 1}</span>
                  <h2 className="mt-6 text-2xl font-medium">{item.title}</h2>
                  <p className="mt-4 max-w-lg leading-relaxed text-ink-2">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <Growth c={c} />
        </>
      ) : (
        <section className="section">
          <div className="shell grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div className="reveal leadership-panel">
              <div aria-hidden className="leadership-lines" />
              <p className="eyebrow eyebrow-light relative text-green-300">
                {t.leadership}
              </p>
              <span
                aria-hidden
                className="relative my-12 block text-[5rem] font-light tracking-tighter text-white/15"
              >
                TAM
              </span>
              <h2 className="relative max-w-xs text-2xl leading-relaxed text-white">
                {t.sections[section]}
              </h2>
            </div>
            <article className="modern-card reveal flex flex-col justify-center p-8 md:p-14">
              <span className="tag w-fit">{t.pendingBadge}</span>
              <h2 className="display-3 mt-8">{t.pendingTitle}</h2>
              <p className="lede mt-5 max-w-xl">{t.pendingBody}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href={companyHref(locale, "strategy")}
                  className="btn btn-primary"
                >
                  {t.sections.strategy}
                  <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                </Link>
                <Link href={`/${locale}/contact`} className="btn btn-ghost">
                  {t.nav.contact}
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}
      <PageCta locale={locale} />
    </main>
  );
}
