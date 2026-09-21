import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getContent, getPages } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";
import { ArrowRight } from "@/components/Icons";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const k = getPages(locale).contact;
  return {
    title: k.meta.title,
    description: k.meta.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", ar: "/ar/contact" },
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const c = getContent(typed);
  const k = getPages(typed).contact;
  const href = (value: string) => value.startsWith("#") ? value : `/${typed}${value === "/process" ? "#process" : value}`;
  const email = c.contact.details.email;
  const phone = c.contact.details.phone;

  return (
    <main>
      <section className="bg-green-950 text-white">
        <div className="shell grid gap-12 pt-32 pb-16 md:pt-40 md:pb-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow eyebrow-light text-green-300">{k.hero.eyebrow}</p>
            <h1 className="mt-6 max-w-lg text-[clamp(2.8rem,5.2vw,4.8rem)] leading-[1.04] tracking-[-0.04em]">{k.hero.title}</h1>
            <p className="mt-7 max-w-lg text-lg leading-[1.75] text-white/75">{k.hero.lede}</p>
            <div className="relative mt-10 hidden aspect-[16/9] lg:block overflow-hidden rounded-2xl bg-green-900">
              <Image src="/media/safety-team.webp" alt="" fill preload sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[center_40%]" />
            </div>
            <dl className="mt-7 hidden flex-wrap gap-x-12 lg:flex gap-y-5">
              <div><dt className="text-xs text-green-300">{k.railLabels.office}</dt><dd className="mt-1.5 text-sm">{k.locations[0].lines[1]}</dd></div>
              <div><dt className="text-xs text-green-300">{k.railLabels.hours}</dt><dd className="mt-1.5 text-sm">{k.hours}</dd></div>
            </dl>
          </div>
          <div id="enquiry" className="self-start rounded-2xl bg-paper p-6 text-ink sm:p-8 lg:p-10">
            <p className="eyebrow text-wine-700">{k.formLabel}</p>
            <h2 className="mt-4 text-[1.7rem] leading-tight tracking-[-0.025em]">{k.formHeading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{k.note}</p>
            <div className="mt-7"><ContactForm key={typed} k={k} locale={typed} /></div>
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="shell">
          <div className="reveal grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20">
            <h2 className="display-2 max-w-2xl text-green-950">{k.helpHeading}</h2>
            <p className="lede max-w-md">{k.helpIntro}</p>
          </div>
          <div className="mt-14 grid gap-x-12 md:grid-cols-2 lg:gap-x-20">
            {k.cards.map((card, i) => (
              <article key={card.title} className="reveal flex gap-5 border-t border-line py-8">
                <span className="pt-1 font-mono text-xs text-wine-700">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.02em]">{card.title}</h3>
                  <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.75] text-ink-2">{card.body}</p>
                  <Link href={href(card.href)} className="arrow-link mt-5">{card.link}<ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
          {!email.includes("[") && !phone.includes("[") && (
            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-line pt-8">
              <p className="text-ink-2">{k.directLabel}</p>
              <a href={`mailto:${email}`} className="arrow-link">{email}</a>
              <a href={`tel:${phone.replace(/[^+0-9]/g, "")}`} className="arrow-link">{phone}</a>
            </div>
          )}
        </div>
      </section>
      <section className="bg-wine-900 py-14 text-white md:py-20">
        <div className="shell grid gap-9 md:grid-cols-3 md:gap-12">
          {k.locations.map((location) => (
            <div key={location.label}>
              <p className="eyebrow eyebrow-light text-wine-300">{location.label}</p>
              {location.lines.filter(line => !line.includes("[")).map(line => <p key={line} className="mt-4 text-xl leading-relaxed">{line}</p>)}
            </div>
          ))}
        </div>
      </section>
      <section className="bg-surface">
        <div className="shell flex flex-wrap items-center gap-x-8 gap-y-4 py-8">
          <p className="text-xs text-ink-3">{k.standardsLabel}</p>
          {c.standards.items.map(item => <span key={item} className="text-sm font-medium text-green-800">{item}</span>)}
        </div>
      </section>
    </main>
  );
}
