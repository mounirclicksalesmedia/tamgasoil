"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PagesContent, SiteContent } from "@/lib/content";
import { getCorporate } from "@/lib/corporate";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

export default function ServiceCatalog({
  c,
  s,
  locale,
}: {
  c: SiteContent;
  s: PagesContent["services"];
  locale: Locale;
}) {
  const t = getCorporate(locale);
  const [query, setQuery] = useState("");
  const normalize = (value: string) =>
    value
      .normalize("NFKD")
      .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
      .toLocaleLowerCase(locale);
  const items = c.services.items
    .map((item, i) => ({ ...item, index: i }))
    .filter((item) =>
      normalize(`${item.title} ${item.body}`).includes(normalize(query.trim())),
    );
  return (
    <section className="section bg-surface" id="catalog">
      <div className="shell">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-wine-700">{t.technical}</p>
            <h2 className="display-3 mt-4">{t.allServices}</h2>
          </div>
          <label className="w-full sm:max-w-xs">
            <span className="mb-2 block text-xs text-ink-2">
              {locale === "ar" ? "ابحث عن خدمة" : "Find a service"}
            </span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm focus:outline-2 focus:outline-green-700"
            />
          </label>
        </div>
        <p role="status" className="mb-5 text-xs text-ink-3">
          {locale === "ar" ? "الخدمات المتاحة" : "Services available"} ·{" "}
          {items.length.toLocaleString(locale)}
        </p>
        <div className="grid items-start gap-5 md:grid-cols-2 lg:gap-7">
          {items.map((item) => (
            <article
              key={item.no}
              id={`solution-${String(item.index + 1).padStart(2, "0")}`}
              className="modern-card service-card scroll-mt-28 overflow-hidden"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={`/media/services/svc-${String(item.index + 1).padStart(2, "0")}.jpg`}
                  alt=""
                  fill
                  sizes="(min-width:768px) 45vw, 100vw"
                  className="card-photo object-cover"
                />
                <span className="absolute start-5 top-5 rounded-full bg-paper px-3 py-2 font-mono text-xs text-wine-700">
                  {item.no}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-medium leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-2">
                  {item.body}
                </p>
                <details className="service-details mt-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-t border-line py-5 text-sm font-medium text-green-800">
                    {t.serviceDetails}
                    <span aria-hidden className="details-plus">
                      +
                    </span>
                  </summary>
                  <div className="scope-content pb-3">
                    <p className="mb-3 text-xs font-medium text-wine-700">
                      {s.includesLabel}
                    </p>
                    <ul className="space-y-3">
                      {s.includes[item.index].map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-sm leading-relaxed text-ink-2"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-700"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${locale}/request-proposal?service=${item.index + 1}`}
                      className="btn btn-primary mt-7 w-full"
                    >
                      {t.nav.proposal}
                      <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                    </Link>
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
        {items.length === 0 && (
          <div className="modern-card p-12 text-center">
            <p>
              {locale === "ar"
                ? "لا توجد خدمة مطابقة لبحثك."
                : "No services match your search."}
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="btn btn-primary mt-6"
            >
              {t.allServices}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
