import { articleCover } from "@/lib/media";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPages } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import LeadBand from "@/components/LeadBand";
import { ArrowRight } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPages(locale).blog.posts.map((post) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPages(locale).blog.posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — TAM`,
    description: post.excerpt,
    alternates: {
      canonical: `/${locale}/news/${slug}`,
      languages: { en: `/en/news/${slug}`, ar: `/ar/news/${slug}` },
    },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-QA" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const b = getPages(typed).blog;
  const post = b.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = b.posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main>
      <article>
        <header className="relative isolate overflow-hidden bg-green-950 text-white">
          <Image
            src={articleCover(post.slug)}
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover opacity-[0.65] "
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(100deg, var(--color-green-950) 0%, color-mix(in srgb, var(--color-green-950) 88%, transparent) 45%, color-mix(in srgb, var(--color-green-950) 55%, transparent) 100%)",
            }}
          />
          <div className="shell relative pt-[124px] pb-12 md:pt-[180px] md:pb-20">
            <Link href={`/${typed}/news`} className="arrow-link !text-white/60 hover:!text-white">
              <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" />
              {b.backToBlog}
            </Link>

            <p className="eyebrow eyebrow-light mt-8 text-green-300">{post.category}</p>
            <h1 className="display-2 mt-5 max-w-4xl text-balance text-white md:mt-6">{post.title}</h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 md:mt-8 md:text-[10.5px]">
              <span>
                {b.byLabel} {post.author}
              </span>
              <span>·</span>
              <span>{formatDate(post.date, typed)}</span>
              <span>·</span>
              <span>
                {post.readTime} {b.minRead}
              </span>
            </div>
          </div>
        </header>

        <div className="section">
          <div className="shell">

            <div className="mx-auto mt-10 max-w-[42rem] md:mt-12">
              <p className="reveal text-[1.15rem] font-medium leading-[1.45] tracking-[-0.015em] text-ink md:text-[1.45rem] md:leading-[1.35]">
                {post.excerpt}
              </p>
              <div className="mt-10 space-y-6">
                {post.body.map((para, i) => (
                  <p
                    key={i}
                    className="reveal text-[1.0625rem] leading-[1.75] text-ink-2 md:leading-[1.8]"
                    style={{ ["--reveal-delay" as string]: `${50 * i}ms` }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* more reading */}
        <section className="bg-surface">
          <div className="shell py-16 md:py-20">
            <h2 className="reveal display-3 border-b border-line pb-6">{b.allLabel}</h2>
            <div className="mt-8 grid gap-x-6 gap-y-0 sm:grid-cols-3 sm:gap-y-8">
              {more.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/${typed}/news/${p.slug}`}
                  className="reveal group block border-b border-line py-5 sm:border-b-0 sm:border-t sm:pb-0 sm:pt-5"
                  style={{ ["--reveal-delay" as string]: `${70 * i}ms` }}
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-wine-700">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-[1.0625rem] font-medium leading-[1.35] tracking-[-0.015em] text-ink transition-colors group-hover:text-green-700">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <LeadBand p={getPages(typed)} locale={typed} />
    </main>
  );
}
