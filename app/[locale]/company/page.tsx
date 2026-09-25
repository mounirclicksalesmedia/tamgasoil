import { notFound } from "next/navigation";
import CompanyPages from "@/components/CompanyPages";
import { isLocale } from "@/lib/i18n";
import { getCorporate } from "@/lib/corporate";
import { corporateMetadata } from "@/lib/corporate-metadata";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getCorporate(locale);
  return corporateMetadata(locale, "company", t.nav.company, t.companyIntro);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <CompanyPages locale={locale} />;
}
