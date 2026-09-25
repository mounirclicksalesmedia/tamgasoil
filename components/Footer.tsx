import Link from "next/link";
import { companyHref, companySections, getCorporate } from "@/lib/corporate";
import type { PagesContent, SiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { Logo } from "./Icons";

export default function Footer({
  c,
  p,
  locale,
}: {
  c: SiteContent;
  p: PagesContent;
  locale: Locale;
}) {
  const f = c.footer;
  const t = getCorporate(locale);
  const alt = otherLocale(locale);
  const links = [
    { label: p.nav.home, href: `/${locale}` },
    { label: t.nav.company, href: `/${locale}/company` },
    { label: t.nav.services, href: `/${locale}/services` },
    { label: t.nav.agreements, href: `/${locale}/agreements` },
    { label: t.nav.news, href: `/${locale}/news` },
    { label: t.nav.contact, href: `/${locale}/contact` },
    { label: t.nav.brochure, href: `/${locale}/brochure` },
    { label: t.nav.proposal, href: `/${locale}/request-proposal` },
  ];

  return (
    <footer className="bg-green-950 text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href={`/${locale}`}
              aria-label={c.brand.fullName}
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Logo className="h-auto w-[280px] max-w-full" onDark />
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-[1.7] text-white/55">
              {f.descriptor}
            </p>
            <p className="mt-5 max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.03em] text-white/35">
              {f.partner}
            </p>
          </div>

          <nav aria-label={f.navLabel}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              {f.navLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.nav.company}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              {t.nav.company}
            </p>
            <ul className="mt-5 space-y-3">
              {companySections.map((section) => (
                <li key={section}>
                  <Link
                    href={companyHref(locale, section)}
                    className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                  >
                    {t.sections[section]}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${alt}`}
                  hrefLang={alt}
                  className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                >
                  {c.brand.localeLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/12 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.8125rem] text-white/40">{f.copyright}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
            tamoilgas.com · Doha, Qatar
          </p>
        </div>
      </div>
    </footer>
  );
}
