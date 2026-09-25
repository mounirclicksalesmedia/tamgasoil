import Image from "next/image";
import type { ReactNode } from "react";

/** Compact dark hero for interior pages — the homepage hero without the video. */
export default function PageHero({
  eyebrow,
  title,
  lede,
  cover,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  /** Editorial photograph behind the page title. */
  cover?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-green-950 text-white">
      {cover && (
        <>
          <Image
            src={cover}
            alt=""
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover opacity-[0.65]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(100deg, var(--color-green-950) 0%, color-mix(in srgb, var(--color-green-950) 88%, transparent) 45%, color-mix(in srgb, var(--color-green-950) 55%, transparent) 100%)",
            }}
          />
        </>
      )}
      <div className="corporate-hero-copy shell relative pt-[150px] pb-20 md:pt-[180px] md:pb-24">
        <p className="eyebrow eyebrow-light text-white/55">{eyebrow}</p>
        <h1 className="display-2 mt-7 max-w-4xl text-balance text-white">{title}</h1>
        <p className="mt-7 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-white/65 md:text-[1.15rem]">
          {lede}
        </p>
        {children}
      </div>
    </section>
  );
}
