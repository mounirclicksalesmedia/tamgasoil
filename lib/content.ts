import { en, type SiteContent } from "./content-en";
import { ar } from "./content-ar";
import { pagesEn, type PagesContent } from "./pages-en";
import { pagesAr } from "./pages-ar";
import type { Locale } from "./i18n";

export const dictionaries: Record<Locale, SiteContent> = { en, ar };
export const pageDictionaries: Record<Locale, PagesContent> = {
  en: pagesEn,
  ar: pagesAr,
};

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}

export function getPages(locale: Locale): PagesContent {
  return pageDictionaries[locale];
}

export type { SiteContent, PagesContent };
