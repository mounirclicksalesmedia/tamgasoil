import { getCorporate } from "@/lib/corporate";
import { blogHero } from "@/lib/media";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPages } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import BlogIndex from "@/components/BlogIndex";
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
  const b = getPages(locale).blog;
  return {
    title: b.meta.title,
    description: b.meta.description,
    alternates: {
      canonical: `/${locale}/news`,
      languages: { en: "/en/news", ar: "/ar/news" },
    },
  };
}



export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed = locale as Locale;
  const b = getPages(typed).blog;
  const t = getCorporate(typed);
  const featured = b.posts[0];

  return (
    <main>
      <section className="bg-green-950 text-white">
        <div className="shell pt-32 pb-14 md:pt-40 md:pb-20">
          <p className="eyebrow eyebrow-light text-green-300">{t.nav.news}</p>
          <div className="mt-6 grid gap-7 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-20">
            <h1 className="text-[clamp(2.3rem,4.2vw,4rem)] leading-[1.1] tracking-[-0.035em]">{t.newsTitle}</h1>
            <p className="max-w-md text-base leading-[1.8] text-white/70">{t.newsIntro}</p>
          </div>
        </div>
      </section>
      <section className="bg-paper py-12 md:py-16">
        <div className="shell">
          <Link href={`/${typed}/news/${featured.slug}`} className="modern-card group grid overflow-hidden rounded-2xl bg-surface lg:grid-cols-[1.2fr_1fr]">
            <div className="relative aspect-[3/2] bg-green-100 lg:aspect-auto lg:min-h-[460px]">
              <Image src={blogHero} alt="" fill preload sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
            </div>
            <div className="relative flex flex-col justify-center bg-surface p-7 md:p-10 lg:p-12">
              <p className="eyebrow text-wine-700">{b.featuredLabel}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-ink-3">
                <span className="rounded-full bg-wine-100 px-3 py-1 text-wine-700">{featured.category}</span>
                <span>{featured.readTime} {b.minRead}</span>
              </div>
              <h2 className="mt-5 text-[clamp(1.8rem,2.8vw,2.8rem)] leading-[1.12] tracking-[-0.03em] text-green-950 group-hover:text-wine-700">{featured.title}</h2>
              <p className="mt-5 text-[0.9375rem] leading-[1.8] text-ink-2">{featured.excerpt}</p>
              <span className="arrow-link mt-8">{b.readMore}<ArrowRight className="h-4 w-4" /></span>
            </div>
          </Link>
        </div>
      </section>
      <BlogIndex key={typed} b={b} locale={typed} />
      <section className="bg-wine-900 py-16 text-white md:py-20">
        <div className="shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div><h2 className="display-3 text-white">{b.ctaTitle}</h2><p className="mt-4 max-w-xl leading-relaxed text-white/75">{b.ctaBody}</p></div>
          <Link href={`/${typed}/contact`} className="btn shrink-0 self-start bg-paper text-wine-900 hover:bg-white md:self-auto">{b.ctaLink}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" /></Link>
        </div>
      </section>
    </main>
  );
}
