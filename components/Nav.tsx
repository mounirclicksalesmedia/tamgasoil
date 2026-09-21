"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PagesContent, SiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { ArrowRight, Logo } from "./Icons";

export default function Nav({
  c,
  p,
  locale,
}: {
  c: SiteContent;
  p: PagesContent;
  locale: Locale;
}) {
  const links = [
    { label: p.nav.about, href: `/${locale}/about` },
    { label: p.nav.services, href: `/${locale}/solutions` },
    { label: p.nav.blog, href: `/${locale}/blog` },
    { label: p.nav.contact, href: `/${locale}/contact` },
  ];

  // The hero is dark, so the bar starts light-on-dark and inverts on scroll.
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const alt = otherLocale(locale);
  const onDark = !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-soft)]",
        onDark
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-paper/90 backdrop-blur-xl",
      ].join(" ")}
    >
      <nav className="shell flex h-[76px] items-center justify-between gap-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label={c.brand.fullName}
        >
          <Logo className="h-9 w-9" onDark={onDark} />
          <span className="flex flex-col leading-none">
            <span
              className={[
                "text-[1.0625rem] font-semibold tracking-[-0.02em] transition-colors duration-500",
                onDark ? "text-white" : "text-ink",
              ].join(" ")}
            >
              {c.brand.name}
            </span>
            <span
              className={[
                "mt-1 font-mono text-[9.5px] uppercase tracking-[0.18em] transition-colors duration-500",
                onDark ? "text-white/45" : "text-ink-3",
              ].join(" ")}
            >
              Oil &amp; Gas Services
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "text-[0.9375rem] transition-colors duration-300",
                onDark ? "text-white/70 hover:text-white" : "text-ink-2 hover:text-ink",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={`/${alt}`}
            hrefLang={alt}
            className={[
              "rounded-full border px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.1em] transition-colors duration-500",
              onDark
                ? "border-white/25 text-white/75 hover:border-white/60 hover:text-white"
                : "border-line bg-surface/70 text-ink-2 hover:border-ink/25 hover:text-ink",
            ].join(" ")}
          >
            {c.brand.localeShort}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className={[
              "btn hidden !py-2.5 !text-sm sm:inline-flex",
              onDark ? "btn-wine" : "btn-primary",
            ].join(" ")}
          >
            {c.nav.cta}
            <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </Link>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? c.nav.close : c.nav.menu}
            className={[
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500 lg:hidden",
              onDark ? "border-white/25" : "border-line bg-surface/70",
            ].join(" ")}
          >
            <span className="relative block h-3 w-4">
              <span
                className={[
                  "absolute inset-x-0 top-0 h-[1.5px] transition-all duration-300",
                  onDark ? "bg-white" : "bg-ink",
                  open ? "translate-y-[5.5px] rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "absolute inset-x-0 bottom-0 h-[1.5px] transition-all duration-300",
                  onDark ? "bg-white" : "bg-ink",
                  open ? "-translate-y-[5.5px] -rotate-45" : "",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        inert={!open}
        aria-hidden={!open}
        className={[
          "overflow-hidden border-t border-line bg-paper transition-[max-height] duration-500 ease-[var(--ease-out-soft)] lg:hidden",
          open ? "max-h-[70vh]" : "max-h-0 border-t-transparent",
        ].join(" ")}
      >
        <div className="shell flex flex-col gap-1 py-6">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-2 py-4 text-lg text-ink transition-colors hover:text-green-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/contact`}
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-5 w-full"
          >
            {c.nav.cta}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </header>
  );
}
