# Corporate website pages

The public navigation is bilingual: Company, Services, Agreements, News, Contact, Brochure and Request a proposal.

## Routes

- `/[locale]/company`: company overview and links to all five company sections.
- `/[locale]/company/chairman`, `/managing-director`, `/coo`: dedicated leadership message layouts.
- `/[locale]/company/strategy`: strategic priorities and the existing growth roadmap.
- `/[locale]/services`: searchable service cards with native expandable scope details.
- `/[locale]/agreements`: the existing Micro-Bac technology relationship and collaboration contact link.
- `/[locale]/news` and `/news/[slug]`: the existing editorial content with search, category filters and article cards.
- `/[locale]/contact`: existing contact page, with updated cards.
- `/[locale]/brochure`: Arabic and English PDF downloads.
- `/[locale]/request-proposal`: existing enquiry form in a dedicated proposal journey. `?service=1` through `8` selects the corresponding service.

`/about` and `/blog` redirect to the new pages. `/solutions` serves the Services page with `/services` canonical metadata, avoiding a loop for visitors who cached the former permanent Services-to-Solutions redirect. Old service anchors remain valid. The obsolete reverse redirect was removed from `proxy.ts`.

## Content to supply

Official leadership messages, names and portraits have not been provided. Those three pages intentionally state that the message is coming soon, rather than attributing invented quotes to officers. Add approved copy to `lib/corporate.ts` and the leadership branch in `components/CompanyPages.tsx` when available.

No new signed agreements, terms, dates or partner claims have been invented. The Agreements page uses the existing technology-source description. Existing news articles retain their draft notice on article pages.

The downloadable PDFs are company overviews prepared from current website copy, not an uploaded official brochure. They are labelled accordingly on the download page and within the documents. Replace files at `public/downloads/tam-company-overview-{en,ar}.pdf` if an official brochure is supplied.

## Regenerating brochures

1. `npx tsx scripts/export-company-brochure.ts`
2. Run `scripts/build-company-brochure.py` with Python containing ReportLab, Pillow, arabic-reshaper and python-bidi. The script uses the macOS Tahoma fonts; adjust the font path for other environments.
3. Render both files in `output/pdf` with `pdftoppm` and review all pages. The script also writes their published copies to `public/downloads`.

## Validation

- Production build and targeted lint/type checks.
- Both languages: all eleven interior routes return 200; both PDFs return application/pdf.
- Browser: company dropdown, leadership layout, mobile navigation, language-equivalent links, service search/disclosure, service selection carried to proposal form, news search/reset and brochure links.
- Arabic and English PDF pages rendered and visually reviewed.
- Existing contact delivery configuration is unchanged; no live enquiry was submitted during testing.
