import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";

/** The official bilingual (English + Arabic) company profile. */
const PROFILE_PDF = "/downloads/tam-company-profile.pdf";

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
            <a
              href={PROFILE_PDF}
              target="_blank"
              rel="noopener"
              aria-label={t.brochureView}
              className="brochure-cover mx-auto block max-w-[360px]"
            >
              <Image
                src="/media/company-profile-cover.webp"
                alt={t.brochureCoverAlt}
                width={987}
                height={1128}
                sizes="360px"
                className="h-auto w-full drop-shadow-[0_28px_36px_rgba(52,11,20,0.32)]"
              />
            </a>
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
              <a
                href={PROFILE_PDF}
                download="TAM-Oil-Gas-Company-Profile.pdf"
                className="btn btn-primary"
              >
                <span aria-hidden>↓</span>
                {t.download}
              </a>
              <a
                href={PROFILE_PDF}
                target="_blank"
                rel="noopener"
                className="btn btn-ghost"
              >
                {t.brochureView}
                <span aria-hidden className="inline-block rtl:-scale-x-100">↗</span>
              </a>
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
