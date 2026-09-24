import { notFound } from "next/navigation";

import { getContent } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

import Hero from "@/components/Hero";
import Standards from "@/components/Standards";
import Pillars from "@/components/Pillars";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Technology from "@/components/Technology";
import Statement from "@/components/Statement";
import Markets from "@/components/Markets";
import Hse from "@/components/Hse";
import Growth from "@/components/Growth";
import Contact from "@/components/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const c = getContent(typed);

  return (
    <main>
        <Hero c={c} />
        <Standards c={c} />
        <Pillars c={c} />
        <Process c={c} />
        <Services c={c} locale={typed} />
        <Technology c={c} />
        <Statement c={c} />
        <Markets c={c} />
        <Hse c={c} />
        <Growth c={c} />
        <Contact c={c} locale={typed} />
    </main>
  );
}
