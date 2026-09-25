import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPages } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import { ArrowRight } from "@/components/Icons";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCorporate(locale);
  return corporateMetadata(
    locale,
    "agreements",
    t.nav.agreements,
    t.agreementsIntro,
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getCorporate(locale),
    partner = getPages(locale).about.partner;
  return (
    <main>
      <PageHero
        eyebrow={t.nav.agreements}
        title={t.agreementsTitle}
        lede={t.agreementsIntro}
        cover="/media/port-terminal.webp"
      />
      <section className="section">
        <div className="shell">
          <article className="modern-card reveal grid overflow-hidden lg:grid-cols-[.85fr_1.15fr]">
            <div className="relative min-h-[280px]">
              <Image
                src="/media/sampling-lab.webp"
                alt=""
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-7 md:p-12">
              <p className="eyebrow text-wine-700">{t.partnerLabel}</p>
              <h2 className="display-3 mt-6">{partner.heading}</h2>
              <p className="mt-6 leading-relaxed text-ink-2">{partner.body}</p>
              <div className="mt-7 grid gap-3">
                {partner.points.map((point, i) => (
                  <div
                    key={point}
                    className="flex gap-4 rounded-xl bg-green-50 p-4"
                  >
                    <span className="font-mono text-xs text-wine-700">
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-green-900">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-ink-3">
                {t.partnerNote}
              </p>
            </div>
          </article>
          <article className="modern-card reveal mt-7 flex flex-col justify-between gap-8 p-8 md:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="display-3">{t.collaboration}</h2>
              <p className="lede mt-4">{t.collaborationBody}</p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="btn btn-primary shrink-0 self-start lg:self-center"
            >
              {t.nav.contact}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          </article>
        </div>
      </section>
      <PageCta locale={locale} />
    </main>
  );
}
