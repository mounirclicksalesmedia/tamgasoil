import Link from "next/link";
import { getCorporate } from "@/lib/corporate";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

export default function PageCta({ locale }: { locale: Locale }) {
  const t = getCorporate(locale);
  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="shell page-cta reveal rounded-[2rem] py-12 md:py-16">
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-light text-green-300">
              {t.nav.proposal}
            </p>
            <h2 className="display-3 mt-5 text-white">{t.proposalTitle}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/65">
              {t.proposalIntro}
            </p>
          </div>
          <Link
            href={`/${locale}/request-proposal`}
            className="btn btn-onDark shrink-0 self-start lg:self-center"
          >
            {t.nav.proposal}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
