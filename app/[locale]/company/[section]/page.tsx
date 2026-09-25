import { notFound } from "next/navigation";
import CompanyPages from "@/components/CompanyPages";
import { isLocale, locales } from "@/lib/i18n";
import {
  companySections,
  getCorporate,
  type CompanySection,
} from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
const valid = (section: string): section is CompanySection =>
  companySections.some((key) => key === section && key !== "overview");
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    companySections
      .filter((section) => section !== "overview")
      .map((section) => ({ locale, section })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  if (!isLocale(locale) || !valid(section)) return {};
  const t = getCorporate(locale);
  return corporateMetadata(
    locale,
    `company/${section}`,
    t.sections[section],
    t.sectionIntros[section],
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; section: string }>;
}) {
  const { locale, section } = await params;
  if (!isLocale(locale) || !valid(section)) notFound();
  return <CompanyPages locale={locale} section={section} />;
}
