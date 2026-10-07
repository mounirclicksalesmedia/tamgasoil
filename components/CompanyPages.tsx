import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import {
  companyHref,
  companySections,
  getCorporate,
  type CompanySection,
} from "@/lib/corporate";
import type { Locale } from "@/lib/i18n";
import { getProfile } from "@/lib/profile";
import { ArrowRight } from "./Icons";
import PageHero from "./PageHero";
import Growth from "./Growth";
import PageCta from "./PageCta";
import LeadershipPortrait from "./LeadershipPortrait";
import { getLeader, isLeadershipSection, leadershipSections } from "@/lib/leadership";

export default function CompanyPages({
  locale,
  section = "overview",
}: {
  locale: Locale;
  section?: CompanySection;
}) {
  const t = getCorporate(locale),
    c = getContent(locale),
    p = getProfile(locale);
  const person = getLeader(locale, section);
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
          <Link href={`/${locale}/technology`} className="btn btn-onDark">
            {p.technology.nav}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
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
                <p className="eyebrow text-wine-700">{p.about.eyebrow}</p>
                <h2 className="display-2 mt-6">{p.about.heading}</h2>
                <p className="lede mt-6 text-wine-700">{p.about.lead}</p>
                {p.about.paragraphs.map((text) => (
                  <p key={text} className="mt-5 leading-relaxed text-ink-2">
                    {text}
                  </p>
                ))}
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
          <section className="bg-wine-700 text-white">
            <div className="shell py-14 md:py-20">
              <p className="eyebrow eyebrow-light text-green-300">
                {p.glance.label}
              </p>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                {p.glance.stats.map((stat) => (
                  <div key={stat.label} className="reveal border-t border-white/20 pt-6">
                    <p className="text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-none tracking-[-0.03em]">
                      <bdi>{stat.value}</bdi>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/75">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="section">
            <div className="shell grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {p.about.pillars.map((pillar) => (
                <article key={pillar.title} className="reveal">
                  <span aria-hidden className="block h-1 w-10 rounded-full bg-green-600" />
                  <h3 className="mt-5 text-lg font-medium leading-snug text-wine-700">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">
                    {pillar.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
          <section className="section bg-surface">
            <div className="shell">
              <div className="reveal mb-10 flex items-end justify-between gap-5">
                <h2 className="display-2">{t.leadership}</h2>
                <span className="font-mono text-xs text-ink-3">TAM</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {leadershipSections.map((key) => (
                  <Link
                    key={key}
                    href={companyHref(locale, key)}
                    className="reveal leadership-profile-link block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                  >
                    <LeadershipPortrait locale={locale} section={key} />
                    <span className="mt-5 flex items-center gap-3 px-2 text-sm text-green-800">
                      {t.readMessage}
                      <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                    </span>
                  </Link>
                ))}
              </div>
              <h2 className="display-3 reveal mb-8 mt-20">{t.explore}</h2>
              <div className="grid gap-5 md:grid-cols-2">
                {companySections
                  .filter((key) => key !== "overview" && !isLeadershipSection(key))
                  .map((key, i) => (
                    <Link
                      key={key}
                      href={companyHref(locale, key)}
                      className="reveal modern-card company-strategy-card flex min-h-[220px] flex-col p-7 md:p-9"
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
                    </Link>
                  ))}
                <Link
                  href={`/${locale}/technology`}
                  className="reveal modern-card flex min-h-[220px] flex-col p-7 md:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-wine-700">02</span>
                    <span className="card-arrow">
                      <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-xl font-medium leading-snug">
                    {p.technology.hero.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink-2">
                    {p.technology.hero.lede}
                  </p>
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : isStrategy ? (
        <>
          <section className="section">
            <div className="shell">
              <div className="grid gap-5 md:grid-cols-2">
                {[
                  { ...p.strategy.vision, tone: "bg-wine-700" },
                  { ...p.strategy.mission, tone: "bg-green-800" },
                ].map((item) => (
                  <article
                    key={item.label}
                    className={`reveal rounded-3xl p-8 text-white md:p-12 ${item.tone}`}
                  >
                    <p className="eyebrow eyebrow-light text-green-300">
                      {item.label}
                    </p>
                    <p className="mt-6 text-[clamp(1.25rem,2vw,1.6rem)] font-medium leading-relaxed">
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>
              <h2 className="display-3 reveal mb-8 mt-20">
                {p.strategy.valuesLabel}
              </h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {p.strategy.values.map((value) => (
                  <article
                    key={value.title}
                    className="reveal rounded-2xl bg-surface p-5 md:p-7"
                  >
                    <h3 className="font-medium text-wine-700">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">
                      {value.body}
                    </p>
                  </article>
                ))}
              </div>
              <h2 className="display-3 reveal mb-6 mt-20">
                {p.strategy.objectivesLabel}
              </h2>
              <ol className="border-t border-line">
                {p.strategy.objectives.map((objective, i) => (
                  <li
                    key={objective}
                    className="reveal flex gap-6 border-b border-line py-6 md:gap-10"
                  >
                    <span className="strategy-number text-green-600">
                      {i + 1}
                    </span>
                    <p className="self-center text-lg leading-relaxed text-ink">
                      {objective}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <Growth c={c} />
        </>
      ) : person ? (
        <section className="section">
          <div className="shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div className="reveal self-start lg:sticky lg:top-28">
              <LeadershipPortrait locale={locale} section={section} />
            </div>
            <article className="reveal">
              <p className="eyebrow text-wine-700">{t.messageLabel}</p>
              <blockquote className="leader-quote mt-7">
                <p>{person.quote}</p>
              </blockquote>
              <div className="mt-10 space-y-6 text-[1.0625rem] leading-[1.85] text-ink-2">
                {person.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <footer className="mt-12 border-t border-line pt-8">
                <p className="text-xl font-medium text-wine-700">
                  {person.name}
                </p>
                <p className="mt-2 text-ink-2">{person.role}</p>
                <p className="text-sm text-ink-3">{person.organisation}</p>
              </footer>
              <div className="mt-10 flex flex-wrap gap-4">
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
      ) : null}
      <PageCta locale={locale} />
    </main>
  );
}
