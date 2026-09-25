import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCorporate(locale);
  return corporateMetadata(locale, "brochure", t.nav.brochure, t.brochureIntro);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getCorporate(locale);
  return (
    <main>
      <PageHero
        eyebrow={t.nav.brochure}
        title={t.brochureTitle}
        lede={t.brochureIntro}
      />
      <section className="section">
        <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal brochure-stage rounded-[2rem] bg-green-50 p-10 md:p-16">
            <div className="brochure-cover relative mx-auto aspect-[3/4] max-w-[350px] overflow-hidden rounded-lg bg-green-950 shadow-2xl">
              <Image
                src="/media/tank-farm-enhanced.webp"
                alt=""
                fill
                sizes="350px"
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/30 to-transparent" />
              <div className="absolute inset-x-7 top-8 font-mono text-xs tracking-widest text-white/70">
                TAM · DOHA
              </div>
              <div className="absolute inset-x-7 bottom-9 text-white">
                <p className="text-sm text-green-300">{t.brochureLabel}</p>
                <h2 className="mt-4 text-3xl leading-snug">{t.companyTitle}</h2>
                <p className="mt-6 font-mono text-xs text-white/50">
                  2026 / PDF
                </p>
              </div>
            </div>
          </div>
          <div className="reveal">
            <p className="eyebrow text-wine-700">{t.brochureLabel}</p>
            <h2 className="display-3 mt-5">{t.brochureTitle}</h2>
            <div className="my-8 space-y-4">
              {t.brochureItems.map((item, i) => (
                <div
                  key={item}
                  className="flex gap-4 border-b border-line pb-4"
                >
                  <span className="font-mono text-xs text-wine-700">
                    0{i + 1}
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {([locale, locale === "ar" ? "en" : "ar"] as const).map(
                (lang) => (
                  <a
                    key={lang}
                    href={`/downloads/tam-company-overview-${lang}.pdf`}
                    download
                    className={`btn ${lang === locale ? "btn-primary" : "btn-ghost"}`}
                  >
                    <span aria-hidden>↓</span>
                    {t.download} · {lang === "ar" ? "العربية" : "English"}
                  </a>
                ),
              )}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-ink-3">
              {t.brochureNote}
            </p>
          </div>
        </div>
      </section>
      <PageCta locale={locale} />
    </main>
  );
}
