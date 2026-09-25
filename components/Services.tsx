import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

export default function Services({ c, locale }: { c: SiteContent; locale: Locale }) {
  const s = c.services;
  return (
    <section id="solutions" className="section bg-surface">
      <div className="shell">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink-3">{s.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{s.heading}</h2>
          </div>
          <a href="#contact" className="btn btn-primary shrink-0 self-start">
            {c.nav.cta}<ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-8 md:gap-10">
          {s.items.slice(0, 2).map((item, i) => (
            <Link key={item.no} href={`/${locale}/services#solution-${String(i + 1).padStart(2, "0")}`} className="reveal group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-green-100">
                <Image src={i === 0 ? "/media/control-room.webp" : "/media/services/svc-02.jpg"} alt="" fill sizes="(min-width: 1280px) 600px, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                <span className="absolute start-3 top-3 rounded-full bg-paper px-2 py-1 font-mono text-[10px] sm:start-5 sm:top-5 sm:px-3 sm:py-1.5 sm:text-xs text-wine-700">{item.no}</span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-2 sm:mt-6 sm:gap-5">
                <h3 className="text-base sm:text-2xl font-medium leading-tight tracking-[-0.025em] text-green-950 group-hover:text-wine-700">{item.title}</h3>
                <ArrowRight className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-wine-700 rtl:-scale-x-100" />
              </div>
              <p className="mt-3 max-w-lg text-[0.8125rem] leading-[1.65] sm:text-[0.9375rem] sm:leading-[1.75] text-ink-2">{item.body}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 sm:mt-14 sm:gap-x-10">
          {s.items.slice(2).map((item, i) => (
            <Link key={item.no} href={`/${locale}/services#solution-${String(i + 3).padStart(2, "0")}`} className="reveal group border-t border-line py-7">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-wine-700">{item.no}</span>
                <ArrowRight className="h-4 w-4 text-green-700 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
              </div>
              <h3 className="mt-4 text-base sm:text-lg font-medium leading-snug text-green-950 group-hover:text-wine-700">{item.title}</h3>
              <p className="mt-3 text-[0.8125rem] leading-[1.65] sm:text-sm sm:leading-[1.75] text-ink-2">{item.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
