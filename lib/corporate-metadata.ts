import type { Metadata } from "next";
import type { Locale } from "./i18n";
export function corporateMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title: `${title} — TAM`,
    description,
    alternates: {
      canonical: `/${locale}/${path}`,
      languages: { en: `/en/${path}`, ar: `/ar/${path}` },
    },
    openGraph: {
      title: `${title} — TAM`,
      description,
      url: `/${locale}/${path}`,
    },
  };
}
