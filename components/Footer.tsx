import Link from "next/link";
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
  const alt = otherLocale(locale);
  const links = [
    { label: p.nav.home, href: `/${locale}` },
    { label: p.nav.about, href: `/${locale}/about` },
    { label: p.nav.services, href: `/${locale}/solutions` },
    { label: p.nav.blog, href: `/${locale}/blog` },
    { label: p.nav.contact, href: `/${locale}/contact` },
  ];

  return (
    <footer className="bg-green-950 text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-[-0.02em]">{c.brand.name}</span>
                <span className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">
                  Oil &amp; Gas Services
                </span>
              </span>
            </div>
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

          <nav aria-label={f.legalLabel}>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              {f.legalLabel}
            </p>
            <ul className="mt-5 space-y-3">
              {f.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.9375rem] text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
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
