# Corporate website pages

The public navigation is bilingual: Company, Services, Technology, Agreements, News, Contact, Brochure and Request a proposal.

## Routes

- `/[locale]/company`: company overview and links to the company sections and leadership profiles.
- `/[locale]/company/general-assembly`, `/board-chairman`, `/coo`: the three leadership messages, in the order and with the titles of the approved company profile. The former `/chairman`, `/managing-director` and `/ceo` addresses redirect permanently (see `next.config.ts`).
- `/[locale]/company/strategy`: vision, mission, values, strategic objectives and the growth roadmap.
- `/[locale]/technology`: the technical specifications (how the technology works, work stages, product data, advantages, field results, global operators) with scroll and in-view animations built on `motion` and SVG. All animations fall back to their final state under `prefers-reduced-motion`.
- `/[locale]/services`: searchable service cards with native expandable scope details.
- `/[locale]/agreements`: the Micro-Bac partnership, its record of firsts, strain standards and collaboration contact link.
- `/[locale]/news` and `/news/[slug]`: the existing editorial content with search, category filters and article cards.
- `/[locale]/contact`: existing contact page, with updated cards.
- `/[locale]/brochure`: Arabic and English PDF downloads.
- `/[locale]/request-proposal`: existing enquiry form in a dedicated proposal journey. `?service=1` through `8` selects the corresponding service.

`/about` and `/blog` redirect to the new pages. `/solutions` serves the Services page with `/services` canonical metadata, avoiding a loop for visitors who cached the former permanent Services-to-Solutions redirect. Old service anchors remain valid. The obsolete reverse redirect was removed from `proxy.ts`.

## Content source

Company, leadership, services, partnership and technical copy comes from the client-approved *Company Profile & Technical Brochure* and lives in `lib/profile.ts` (EN/AR, typed so Arabic must match English) and `lib/leadership.ts`. The client asked for these exclusions, which must stay out:

- the "Cost of one tank cleaning" comparison and any cost figures from the case studies;
- any wording that credits the technology's chairman or founder personally. The operator list credits "the company behind this technology" / «الشركة المطوِّرة لهذه التقنية».

The Chairman of the Shareholders' General Assembly page uses a decorative image of Doha Bay (`qatar-doha-bay.webp`, generated, no people) with the Qatar flag serration drawn in SVG, in place of a portrait. Replace it with an official portrait if one is supplied.

No new signed agreements, terms, dates or partner claims have been invented. Existing news articles retain their draft notice on article pages.

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
