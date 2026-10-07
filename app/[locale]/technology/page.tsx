import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { corporateMetadata } from "@/lib/corporate-metadata";
import { getProfile } from "@/lib/profile";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";
import Solubilisation from "@/components/technology/Solubilisation";
import CirculationLoop from "@/components/technology/CirculationLoop";
import {
  ChainBreaking,
  EmulsionBreaking,
} from "@/components/technology/MicroAnimations";
import {
  LelChart,
  ResidueBars,
  ResultStats,
  StorageWindow,
} from "@/components/technology/DataViz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getProfile(locale).technology;
  return {
    ...corporateMetadata(locale, "technology", t.hero.title.replace(/\.$/, ""), t.hero.lede),
    title: t.metaTitle,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getProfile(locale).technology;
  return (
    <main className="technology-page">
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        lede={t.hero.lede}
        cover="/media/precision-pipework.webp"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#how" className="btn btn-onDark">
            {t.hero.jump}
            <span aria-hidden>↓</span>
          </a>
          <Link href={`/${locale}/request-proposal`} className="btn btn-wine">
            {t.cta.primary}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </PageHero>

      {/* 01 · The science */}
      <section id="how" className="section scroll-mt-20">
        <div className="shell">
          <div className="reveal max-w-3xl">
            <p className="eyebrow text-wine-700">{t.how.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{t.how.heading}</h2>
            <p className="lede mt-6">{t.how.body}</p>
          </div>
          <div className="mt-14">
            <Solubilisation how={t.how} />
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="shell grid gap-6 lg:grid-cols-2">
          <article className="tech-panel reveal">
            <h3 className="text-xl font-medium text-wine-700">{t.emulsion.heading}</h3>
            <div className="mt-6">
              <EmulsionBreaking before={t.emulsion.before} after={t.emulsion.after} />
            </div>
            <p className="mt-6 leading-relaxed text-ink-2">{t.emulsion.body}</p>
          </article>
          <article className="tech-panel reveal">
            <h3 className="text-xl font-medium text-wine-700">{t.mechanisms.heading}</h3>
            <ol className="mt-5 space-y-3">
              {t.mechanisms.items.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="text-lg font-medium text-green-600">{i + 1}</span>
                  <p className="leading-relaxed text-ink-2">
                    <strong className="font-medium text-ink">{item.title}</strong>{" "}
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6 border-t border-line pt-6">
              <ChainBreaking label={t.effect.chartLabel} />
              <h4 className="mt-5 font-mono text-xs uppercase tracking-[0.12em] text-ink-3">
                {t.effect.heading}
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {t.effect.items.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-3">{t.effect.note}</p>
            </div>
          </article>
          <div className="reveal grid overflow-hidden rounded-3xl border border-line md:grid-cols-2 lg:col-span-2">
            <div className="bg-paper p-7 md:p-9">
              <h3 className="font-medium text-ink">{t.compare.chemical.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{t.compare.chemical.body}</p>
            </div>
            <div className="bg-green-50 p-7 md:p-9">
              <h3 className="font-medium text-green-700">{t.compare.microbial.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{t.compare.microbial.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · Work stages */}
      <section id="stages" className="section">
        <div className="shell">
          <div className="reveal grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow text-wine-700">{t.stages.eyebrow}</p>
              <h2 className="display-2 mt-6 text-balance">{t.stages.heading}</h2>
            </div>
            <p className="lede">{t.stages.body}</p>
          </div>
          <div className="mt-12">
            <CirculationLoop stages={t.stages} layers={t.how.layers} />
          </div>
        </div>
        <div className="shell mt-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-wine-800 lg:grid-cols-4">
            {t.stages.params.map((param) => (
              <div key={param.value} className="reveal bg-wine-700 p-6 text-white md:p-8">
                <p className="text-lg font-medium leading-snug md:text-2xl">{param.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{param.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 · Product data */}
      <section id="product" className="section bg-surface">
        <div className="shell">
          <div className="reveal max-w-3xl">
            <p className="eyebrow text-wine-700">{t.product.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{t.product.heading}</h2>
          </div>
          <div className="reveal mt-12 overflow-hidden rounded-3xl border border-line bg-paper">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-ink px-6 py-4 text-white md:px-8">
              <h3 className="font-medium">{t.product.sdsTitle}</h3>
              <span className="text-xs text-green-300">{t.product.sdsNote}</span>
            </div>
            <div className="grid md:grid-cols-2">
              {[t.product.left, t.product.right].map((rows, col) => (
                <dl key={col} className={col ? "md:border-s md:border-line" : ""}>
                  {rows.map(([label, value]) => (
                    <div key={label} className="sds-row">
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              ))}
            </div>
          </div>
          <h3 className="display-3 reveal mb-7 mt-16">{t.product.familiesLabel}</h3>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
            {t.product.families.map((family, i) => (
              <article
                key={family.name}
                className="reveal border-t-2 pt-5"
                style={{ borderColor: i > 1 ? "var(--color-green-600)" : "var(--color-wine-700)" }}
              >
                <h4 className="text-lg font-medium text-wine-700" dir="ltr">
                  {family.name}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{family.body}</p>
              </article>
            ))}
          </div>
          <h3 className="display-3 reveal mb-7 mt-16">{t.product.storageLabel}</h3>
          <div className="reveal">
            <StorageWindow storage={t.product.storage} />
          </div>
          <div className="reveal mt-12 grid overflow-hidden rounded-3xl border border-line md:grid-cols-2">
            {[
              { ...t.product.always, tone: "text-green-700", bg: "bg-paper", mark: "✓" },
              { ...t.product.never, tone: "text-wine-700", bg: "bg-wine-100/50", mark: "✕" },
            ].map((list) => (
              <div key={list.title} className={`${list.bg} p-7 md:p-9`}>
                <h4 className={`font-medium ${list.tone}`}>{list.title}</h4>
                <ul className="mt-5 space-y-3">
                  {list.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <span aria-hidden className={`${list.tone} font-medium`}>
                        {list.mark}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="reveal mt-6 text-sm leading-relaxed text-ink-3">{t.product.summary}</p>
        </div>
      </section>

      {/* 04 · Advantages */}
      <section id="advantages" className="section">
        <div className="shell">
          <div className="reveal max-w-3xl">
            <p className="eyebrow text-wine-700">{t.advantages.eyebrow}</p>
            <h2 className="display-2 mt-6">{t.advantages.heading}</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
            {t.advantages.items.map((item, i) => (
              <article
                key={item.title}
                className={`reveal rounded-2xl p-5 md:p-7 ${i < 3 ? "bg-wine-700 text-white" : "bg-surface"}`}
                style={{ ["--reveal-delay" as string]: `${50 * (i % 3)}ms` }}
              >
                <h3 className={`font-medium leading-snug ${i < 3 ? "text-white" : "text-wine-700"}`}>
                  {item.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${i < 3 ? "text-white/80" : "text-ink-2"}`}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
          <h3 className="display-3 reveal mb-7 mt-20">{t.advantages.compareLabel}</h3>
          <div className="compare-table reveal" role="table" aria-label={t.advantages.compareLabel}>
            <div className="compare-head" role="row">
              {t.advantages.columns.map((col, i) => (
                <span key={col} role="columnheader" className={i === 2 ? "text-green-300" : ""}>
                  {col}
                </span>
              ))}
            </div>
            {t.advantages.rows.map(([aspect, conventional, tam]) => (
              <div key={aspect} className="compare-row" role="row">
                <span role="rowheader" className="font-medium text-wine-700">
                  {aspect}
                </span>
                <span role="cell" className="compare-old">
                  <i className="md:hidden">{t.advantages.columns[1]}</i>
                  {conventional}
                </span>
                <span role="cell" className="compare-new">
                  <i className="md:hidden">{t.advantages.columns[2]}</i>
                  {tam}
                </span>
              </div>
            ))}
          </div>
          <p className="reveal mt-6 rounded-2xl bg-green-50 p-6 leading-relaxed text-green-900 md:p-8">
            {t.advantages.closing}
          </p>
        </div>
      </section>

      {/* 05 · Field-proven results */}
      <section id="results" className="bg-wine-900 text-white">
        <div className="shell section">
          <div className="reveal max-w-3xl">
            <p className="eyebrow eyebrow-light text-green-300">{t.results.eyebrow}</p>
            <h2 className="display-2 mt-6 text-white">{t.results.heading}</h2>
          </div>
          <div className="mt-12">
            <ResultStats results={t.results} />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="reveal">
              <LelChart results={t.results} />
            </div>
            <div className="reveal">
              <ResidueBars results={t.results} />
            </div>
          </div>
          <div className="case-table reveal mt-16" role="table">
            <div className="case-head" role="row">
              {t.results.columns.map((col, i) => (
                <span key={col} role="columnheader" className={i === 2 ? "text-green-300" : ""}>
                  {col}
                </span>
              ))}
            </div>
            {t.results.cases.map((row) => (
              <div key={row.tank} className="case-row" role="row">
                <span role="rowheader">
                  <strong className="block font-medium text-ink">{row.tank}</strong>
                  <span className="text-sm text-ink-2">{row.detail}</span>
                </span>
                <span role="cell" className="text-sm text-ink-2">
                  {row.treatment}
                </span>
                <span role="cell" className="text-sm font-medium text-ink">
                  {row.outcome}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-ink-3">{t.results.source}</p>
        </div>
      </section>

      {/* 06 · Global operators */}
      <section id="operators" className="section bg-surface">
        <div className="shell">
          <div className="reveal grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow text-wine-700">{t.operators.eyebrow}</p>
              <h2 className="display-2 mt-6 text-balance">{t.operators.heading}</h2>
            </div>
            <p className="lede">{t.operators.body}</p>
          </div>
          <div className="mt-12 border-t border-line">
            {t.operators.regions.map((region, r) => (
              <div
                key={region.region}
                className="reveal grid gap-4 border-b border-line py-6 md:grid-cols-[200px_1fr] md:items-center"
              >
                <p className="font-medium text-green-700">{region.region}</p>
                <div className="flex flex-wrap gap-2.5">
                  {region.names.map((name) => (
                    <span key={name} className={`operator-chip ${r === 0 ? "is-featured" : ""}`}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ink-3">{t.operators.disclaimer}</p>
          <div className="reveal mt-14 rounded-3xl bg-paper p-7 md:p-10">
            <h3 className="display-3">{t.operators.site.heading}</h3>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3">
              {t.operators.site.items.map((item) => (
                <div key={item.title}>
                  <p className="font-medium text-ink">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The next step */}
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="shell tech-cta reveal rounded-[2rem] bg-wine-700 py-12 text-white md:py-16">
          <p className="eyebrow eyebrow-light text-green-300">{t.cta.eyebrow}</p>
          <h2 className="display-2 mt-6 text-white">{t.cta.heading}</h2>
          <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/80">{t.cta.body}</p>
          <ol className="mt-10 grid border-y border-white/20 md:grid-cols-3">
            {t.cta.steps.map((step, i) => (
              <li
                key={step.title}
                className="border-white/20 py-6 md:px-6 md:first:ps-0 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:border-s"
              >
                <span className="text-2xl font-medium text-green-300">{i + 1}</span>
                <p className="mt-3 font-medium">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/${locale}/request-proposal`} className="btn btn-onDark">
              {t.cta.primary}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
            <Link href={`/${locale}/contact`} className="btn border border-white/40 text-white hover:bg-white/10">
              {t.cta.secondary}
            </Link>
          </div>
        </div>
        <p className="shell mt-6 text-xs leading-relaxed text-ink-3">{t.trademarks}</p>
      </section>
    </main>
  );
}
