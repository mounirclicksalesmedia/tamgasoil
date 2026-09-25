"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PagesContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { articleThumb } from "@/lib/media";
import { ArrowRight } from "./Icons";

export default function BlogIndex({ b, locale }: { b: PagesContent["blog"]; locale: Locale }) {
  const [category, setCategory] = useState(b.categories[0]);
  const [query, setQuery] = useState("");
  const normalize = (value: string) => value.normalize("NFKD").replace(/[\u064B-\u065F\u0670\u0640]/g, "").toLocaleLowerCase(locale);
  const visible = b.posts.filter(post =>
    (category === b.categories[0] || post.category === category) &&
    normalize(`${post.title} ${post.excerpt} ${post.category}`).includes(normalize(query.trim()))
  );
  const clear = () => { setQuery(""); setCategory(b.categories[0]); };

  return (
    <section id="journal" className="section bg-surface">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-wine-700">{b.browseLabel}</p>
            <h2 className="display-2 mt-4 text-green-950">{b.allLabel}</h2>
          </div>
          <label className="w-full md:max-w-xs">
            <span className="mb-2 block text-xs font-medium text-ink-2">{b.searchLabel}</span>
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={b.searchPlaceholder} className="w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm outline-none transition-shadow focus:border-green-700 focus:ring-2 focus:ring-green-100" />
          </label>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-b border-line pb-6">
          <div className="flex flex-wrap gap-2" role="group" aria-label={b.browseLabel}>
            {b.categories.map(item => (
              <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm transition-colors ${category === item ? "bg-green-800 text-white" : "bg-paper text-ink-2 hover:bg-green-100"}`}>{item}</button>
            ))}
          </div>
          <p role="status" className="text-xs text-ink-3">{b.resultsLabel} · {visible.length.toLocaleString(locale)}</p>
        </div>
        {visible.length > 0 ? (
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {visible.map(post => (
              <article key={post.slug}>
                <Link href={`/${locale}/news/${post.slug}`} className="modern-card group grid gap-5 p-5 sm:grid-cols-[0.8fr_1fr] md:grid-cols-1 xl:grid-cols-[0.8fr_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-green-100">
                    <Image src={articleThumb(post.slug)} alt="" fill sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, (min-width: 640px) 40vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-col items-start py-1">
                    <span className="text-xs font-medium text-wine-700">{post.category}</span>
                    <h3 className="mt-3 text-xl font-medium leading-[1.3] tracking-[-0.02em] text-green-950 group-hover:text-wine-700">{post.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-[1.7] text-ink-2">{post.excerpt}</p>
                    <p className="mt-4 text-xs text-ink-3">{new Intl.DateTimeFormat(locale === "ar" ? "ar-QA" : "en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(post.date))} <span aria-hidden>·</span> {post.readTime} {b.minRead}</p>
                    <span className="arrow-link mt-4 text-sm">{b.readMore}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" /></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <h3 className="text-2xl text-green-950">{b.emptyTitle}</h3>
            <p className="mt-3 text-ink-2">{b.emptyBody}</p>
            <button type="button" className="btn btn-primary mt-6" onClick={clear}>{b.clearFilters}</button>
          </div>
        )}
      </div>
    </section>
  );
}
