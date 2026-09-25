import { notFound } from "next/navigation";
import { getPages } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
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
    "request-proposal",
    t.nav.proposal,
    t.proposalIntro,
  );
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getCorporate(locale),
    k = getPages(locale).contact;
  const service = Number((await searchParams).service);
  const initialReason =
    Number.isInteger(service) && service >= 1 && service <= 8
      ? k.reasons[service - 1]
      : k.reasons[0];
  return (
    <main>
      <PageHero
        eyebrow={t.nav.proposal}
        title={t.proposalTitle}
        lede={t.proposalIntro}
        cover="/media/inspection-instruments.webp"
      />
      <section className="section bg-surface">
        <div className="shell grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div className="space-y-5">
            {t.proposalSteps.map((step, i) => (
              <article className="modern-card reveal p-7" key={step.title}>
                <span className="font-mono text-xs text-wine-700">
                  0{i + 1}
                </span>
                <h2 className="mt-4 text-xl font-medium">{step.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
          <div className="modern-card p-6 sm:p-9" id="enquiry">
            <p className="eyebrow text-wine-700">{t.nav.proposal}</p>
            <h2 className="display-3 mt-5">{t.proposalForm}</h2>
            <p className="mb-8 mt-4 text-sm leading-relaxed text-ink-2">
              {t.proposalHint}
            </p>
            <ContactForm
              key={`${locale}-${initialReason}`}
              k={k}
              locale={locale}
              initialReason={initialReason}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
