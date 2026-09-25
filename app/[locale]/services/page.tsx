import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, getPages } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import ServiceCatalog from "@/components/ServiceCatalog";
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
    s = getPages(locale).services;
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
      <ServiceCatalog c={c} s={s} locale={locale} />
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
