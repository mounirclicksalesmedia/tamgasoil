import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
import { getProfile } from "@/lib/profile";
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
    p = getProfile(locale).partnership;
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
          <div className="reveal max-w-3xl">
            <p className="eyebrow text-wine-700">{p.eyebrow}</p>
            <h2 className="display-2 mt-6">{p.heading}</h2>
            <p className="lede mt-6">{p.body}</p>
          </div>
          <div className="reveal mt-12 grid overflow-hidden rounded-3xl md:grid-cols-[1fr_auto_1fr]">
            <div className="bg-wine-700 p-7 text-white md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/70">
                {p.tam.place}
              </p>
              <h3 className="mt-4 text-2xl font-medium">{p.tam.name}</h3>
              <p className="mt-4 leading-relaxed text-white/85">{p.tam.body}</p>
            </div>
            <div
              aria-hidden
              className="partner-link flex items-center justify-center bg-green-950 px-6 py-5 text-2xl text-green-300"
            >
              ⇄
            </div>
            <div className="bg-green-800 p-7 text-white md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/70">
                {p.microbac.place}
              </p>
              <h3 className="mt-4 text-2xl font-medium">{p.microbac.name}</h3>
              <p className="mt-4 leading-relaxed text-white/85">
                {p.microbac.body}
              </p>
            </div>
          </div>
          <h2 className="display-3 reveal mb-8 mt-20">{p.recordLabel}</h2>
          <ol className="partner-record grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {p.record.map((item, i) => (
              <li
                key={item.year}
                className="reveal border-t-2 pt-5"
                style={{
                  borderColor:
                    i % 2 ? "var(--color-green-600)" : "var(--color-wine-700)",
                  ["--reveal-delay" as string]: `${70 * i}ms`,
                }}
              >
                <p
                  className={`text-3xl font-medium ${i % 2 ? "text-green-700" : "text-wine-700"}`}
                >
                  {item.year}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-20 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <article className="reveal rounded-3xl bg-surface p-7 md:p-10">
              <h3 className="text-xl font-medium leading-snug text-wine-700">
                {p.standardsLabel}
              </h3>
              <ol className="mt-6 space-y-4">
                {p.standards.map((standard, i) => (
                  <li key={standard} className="flex gap-4 text-lg">
                    <span className="font-medium text-green-700">{i + 1}</span>
                    {standard}
                  </li>
                ))}
              </ol>
            </article>
            <div className="reveal">
              <h3 className="text-xl font-medium text-wine-700">
                {p.bringsLabel}
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8">
                {p.brings.map((item) => (
                  <div key={item.title}>
                    <p className="font-medium text-green-950">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-ink-3">
            {t.partnerNote}
          </p>
          <article className="modern-card reveal mt-10 flex flex-col justify-between gap-8 p-8 md:p-12 lg:flex-row lg:items-center">
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
