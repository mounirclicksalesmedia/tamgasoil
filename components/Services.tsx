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
          <a href="#contact" className="arrow-link shrink-0">
            {c.nav.cta}<ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
          {s.items.slice(0, 2).map((item, i) => (
            <Link key={item.no} href={`/${locale}/solutions#solution-${String(i + 1).padStart(2, "0")}`} className="reveal group block">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-green-100">
                <Image src={i === 0 ? "/media/control-room.webp" : "/media/services/svc-02.jpg"} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                <span className="absolute start-5 top-5 rounded-full bg-paper px-3 py-1.5 font-mono text-xs text-wine-700">{item.no}</span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-5">
                <h3 className="text-2xl font-medium leading-tight tracking-[-0.025em] text-green-950 group-hover:text-wine-700">{item.title}</h3>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-wine-700 rtl:-scale-x-100" />
              </div>
              <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.75] text-ink-2">{item.body}</p>
            </Link>
          ))}
        </div>
        <div className="mt-14 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {s.items.slice(2).map((item, i) => (
            <Link key={item.no} href={`/${locale}/solutions#solution-${String(i + 3).padStart(2, "0")}`} className="reveal group border-t border-line py-7">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-wine-700">{item.no}</span>
                <ArrowRight className="h-4 w-4 text-green-700 transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
              </div>
              <h3 className="mt-4 text-lg font-medium leading-snug text-green-950 group-hover:text-wine-700">{item.title}</h3>
              <p className="mt-3 text-sm leading-[1.75] text-ink-2">{item.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
