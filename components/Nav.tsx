"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { companyHref, companySections, getCorporate } from "@/lib/corporate";
import { ArrowRight, Logo } from "./Icons";

export default function Nav({ c, locale }: { c: SiteContent; locale: Locale }) {
  const t = getCorporate(locale);
  const pathname = usePathname();
  const links = [
    { label: t.nav.services, path: "services" },
    { label: t.nav.agreements, path: "agreements" },
    { label: t.nav.news, path: "news" },
    { label: t.nav.contact, path: "contact" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const companyButton = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const alt = otherLocale(locale);
  const onDark = !scrolled && !open;
  const close = () => {
    setOpen(false);
    setCompanyOpen(false);
  };
  const active = (path: string) =>
    pathname === `/${locale}/${path}` ||
    pathname.startsWith(`/${locale}/${path}/`);
  const linkStyle = (path: string) =>
    `nav-link ${active(path) ? "is-active" : ""}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (open) {
          setOpen(false);
          menuButton.current?.focus();
        }
        if (companyOpen) {
          setCompanyOpen(false);
          companyButton.current?.focus();
        }
      }
      if (event.key === "Tab" && open) {
        const nodes = [
          menuButton.current,
          ...Array.from(
            mobilePanel.current?.querySelectorAll<HTMLElement>(
              "a[href], button",
            ) ?? [],
          ),
        ].filter(
          (node): node is HTMLElement =>
            !!node && node.getClientRects().length > 0,
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (dropdown.current && !dropdown.current.contains(event.target as Node))
        setCompanyOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open, companyOpen]);

  return (
    <header
      className={`site-nav fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${onDark ? "nav-dark border-transparent bg-transparent text-white" : "border-line bg-paper/95 text-green-950 backdrop-blur-xl"}`}
    >
      <nav
        className="shell flex h-[80px] items-center justify-between gap-3 sm:gap-5"
        aria-label={locale === "ar" ? "القائمة الرئيسية" : "Main navigation"}
      >
        <Link
          href={`/${locale}`}
          onClick={close}
          className="shrink-0"
          aria-label={c.brand.fullName}
        >
          <Logo
            className="h-auto w-[164px] sm:w-[190px] xl:w-[180px]"
            onDark={onDark}
          />
        </Link>
        <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          <div
            ref={dropdown}
            className="relative"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setCompanyOpen(false);
            }}
          >
            <button
              ref={companyButton}
              type="button"
              className={`${linkStyle("company")} flex items-center gap-2`}
              aria-expanded={companyOpen}
              aria-controls="company-navigation"
              onClick={() => setCompanyOpen((v) => !v)}
            >
              {t.nav.company}
              <span
                aria-hidden
                className={`nav-chevron ${companyOpen ? "is-open" : ""}`}
              />
            </button>
            {companyOpen && (
              <div id="company-navigation" className="company-dropdown">
                <p className="px-4 pb-3 pt-2 text-xs text-ink-3">{t.explore}</p>
                {companySections.map((section, i) => (
                  <Link
                    key={section}
                    href={companyHref(locale, section)}
                    onClick={close}
                    aria-current={
                      pathname === companyHref(locale, section)
                        ? "page"
                        : undefined
                    }
                    className="flex items-center gap-4 rounded-xl p-4 text-sm text-green-950 transition-colors hover:bg-green-50 focus-visible:bg-green-50"
                  >
                    <span className="font-mono text-[10px] text-wine-700">
                      0{i + 1}
                    </span>
                    {t.sections[section]}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {links.map((item) => (
            <Link
              key={item.path}
              href={`/${locale}/${item.path}`}
              className={linkStyle(item.path)}
              aria-current={active(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${alt}`)}
            hrefLang={alt}
            onClick={close}
            aria-label={c.brand.localeLabel}
            className="nav-language"
          >
            {c.brand.localeShort}
          </Link>
          <Link
            href={`/${locale}/brochure`}
            className="nav-link hidden items-center gap-2 xl:flex"
          >
            <span aria-hidden>↓</span>
            {t.nav.brochure}
          </Link>
          <Link
            href={`/${locale}/request-proposal`}
            onClick={close}
            className={`btn hidden !px-5 !py-3 !text-xs sm:inline-flex ${onDark ? "btn-wine" : "btn-primary"}`}
          >
            {t.nav.proposal}
            <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </Link>
          <button
            ref={menuButton}
            type="button"
            onClick={() => {
              setOpen((v) => !v);
              setCompanyOpen(false);
            }}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? c.nav.close : c.nav.menu}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/20 xl:hidden"
          >
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>
      <div
        id="mobile-navigation"
        ref={mobilePanel}
        inert={!open}
        aria-hidden={!open}
        className={`mobile-navigation border-t border-line bg-paper text-green-950 xl:hidden ${open ? "is-open" : ""}`}
      >
        <div className="shell pb-8 pt-4">
          <p className="mb-3 text-sm font-medium text-wine-700">
            {t.nav.company}
          </p>
          <div className="grid gap-1 border-b border-line pb-4 sm:grid-cols-2">
            {companySections.map((section, i) => (
              <Link
                key={section}
                href={companyHref(locale, section)}
                onClick={close}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-green-50"
              >
                <span className="font-mono text-[10px] text-ink-3">
                  0{i + 1}
                </span>
                {t.sections[section]}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            {links.map((item) => (
              <Link
                key={item.path}
                href={`/${locale}/${item.path}`}
                onClick={close}
                className="border-b border-line py-4 text-base"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/brochure`}
            onClick={close}
            className="mt-5 flex items-center justify-between rounded-xl border border-line p-4 text-sm"
          >
            {t.nav.brochure}
            <span aria-hidden>↓</span>
          </Link>
          <Link
            href={`/${locale}/request-proposal`}
            onClick={close}
            className="btn btn-primary mt-3 w-full"
          >
            {t.nav.proposal}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </header>
  );
}
