import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getPages } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import ServiceCatalog from "@/components/ServiceCatalog";
import { getProfile } from "@/lib/profile";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCorporate(locale);
  return corporateMetadata(locale, "services", t.nav.services, t.servicesIntro);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getCorporate(locale),
    c = getContent(locale),
    s = getPages(locale).services,
    p = getProfile(locale).services;
  return (
    <main>
      <PageHero
        eyebrow={t.nav.services}
        title={t.servicesTitle}
        lede={t.servicesIntro}
        cover="/media/coating-maintenance.webp"
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <a href="#catalog" className="btn btn-onDark">
            {t.allServices}
            <span aria-hidden>↓</span>
          </a>
          <Link href={`/${locale}/request-proposal`} className="btn btn-wine">
            {t.nav.proposal}
          </Link>
        </div>
      </PageHero>
      <section className="bg-wine-700 text-white">
        <div className="shell grid gap-6 py-12 md:grid-cols-[auto_1fr] md:items-center md:gap-16 md:py-16">
          <p className="eyebrow eyebrow-light text-green-300">{p.scopeLabel}</p>
          <p className="text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium leading-snug">
            {p.scope}
          </p>
        </div>
      </section>
      <ServiceCatalog c={c} s={s} locale={locale} />
      <section className="section pb-0">
        <div className="shell reveal rounded-3xl bg-surface p-7 md:p-12">
          <h2 className="display-3">{p.assetsLabel}</h2>
          <div className="mt-7 flex flex-wrap gap-3">
            {p.assets.map((asset) => (
              <span key={asset} className="tag border-wine-700/40 text-wine-700">
                {asset}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-ink-2">{p.assetsNote}</p>
          <Link href={`/${locale}/technology`} className="arrow-link mt-7">
            {getProfile(locale).technology.hero.title}
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="shell reveal">
          <h2 className="display-3 max-w-3xl">{s.standards.heading}</h2>
          <p className="lede mt-5 max-w-3xl">{s.standards.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {c.standards.items.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
      <PageCta locale={locale} />
    </main>
  );
}
