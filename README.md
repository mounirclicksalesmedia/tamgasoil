# tamoilgas.com — TAM for Oil & Gas Services W.L.L.

Bilingual (EN / العربية) marketing site for TAM, Doha, Qatar.
Integrated petroleum tank cleaning, maintenance and asset integrity.

```bash
npm install
npm run dev     # http://localhost:3000 → redirects to /en or /ar
npm run build
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · IBM Plex via `next/font`
· **Postgres + Prisma 6** · Auth.js (credentials, JWT) · `@dnd-kit` for drag-and-drop.

```bash
cp .env.example .env.local     # fill DATABASE_URL, AUTH_SECRET, ADMIN_*
grep ^DATABASE_URL .env.local > .env   # Prisma's CLI reads .env only
npm run db:migrate             # prisma migrate dev
npm run db:seed                # loads the approved TS copy + the admin user
npm run dev                    # http://localhost:3000/admin
```

## Deployment (preview)

- **GitHub:** `mounirclicksalesmedia/tamgasoil`, branch `main`. Pushing to `main` deploys.
- **Vercel:** team `mounirclicksalesmedias-projects`, project **`tamgasoil-11xo`** →
  `https://tamgasoil-11xo.vercel.app`. (An empty project named `tamgasoil` in the
  same team is a leftover from the first import; safe to delete.)
- **Database:** Neon, project `tamgasoil`, region us-east-1. `DATABASE_URL` on Vercel
  is the **pooled** string; run migrations with the unpooled one:
  `DATABASE_URL=<unpooled> npx prisma migrate deploy`.
- The Neon integration was installed with the `tamgasoil_` prefix (a stray
  `DATABASE_URL` blocked the default). Those prefixed variables are unused;
  the app reads plain `DATABASE_URL`, set by hand to the same pooled string.
- Going live on tamoilgas.com = add the domain to this Vercel project once
  GoDaddy access arrives. Nothing else changes.

## The portal — `/admin`

Everything an editor changes lives in Postgres; the TS content files are now
the **seed** and the fallback, not the source of truth.

| Screen | What it manages |
| --- | --- |
| Dashboard | Counts and the latest inquiries |
| Pages | Navigation order (drag), per-page SEO in EN + AR, status, show-in-nav |
| Page → Sections | Drag-and-drop block order, add any block type from the registry, per-block anchor / visibility / settings, and **every string in both languages** through a recursive JSON editor that preserves the block's shape |
| Solutions | Drag order (= homepage rail and Solutions page order), bilingual editor with "what it covers" lines, SEO, image, draft/published |
| Blog | Posts with category, featured flag, cover, read time, publish date, paragraph body, tags, SEO — per language |
| Categories | Blog and Solution categories, bilingual, drag order |
| Inquiries | Every submission from all three site forms (`CONTACT`, `LEAD_BAND`, `HOME`), status workflow NEW → IN PROGRESS → CLOSED, internal notes, search and filters |
| Settings | Brand, nav CTA, footer, contact details, standards, homepage SEO |

Every save calls `revalidateSite()` (`revalidatePath("/", "layout")`) so the
public pages republish immediately.

Auth: `lib/server/auth.ts`. Sessions are 12-hour JWTs; the proxy sends any
`/admin/*` request without one to `/admin/login`. Roles exist (`ADMIN`,
`EDITOR`) but nothing is gated by role yet. Passwords are bcrypt (cost 12).
**Change the seeded admin password before this goes anywhere public.**

Schema: `prisma/schema.prisma`. Content tables all follow the same pattern —
a locale-agnostic row plus a `*Translation` row per locale, unique on
`(parentId, locale)`. Block text is JSON per locale; block `settings` is JSON
shared by both. The block registry with empty templates is `lib/blocks.ts`. Templates also fix the
**field order** in the editor: Postgres JSONB does not preserve key order, so
`orderLike(template, content)` re-sorts what comes back from the database before
it is rendered. Add a block type → add its template, and the editor follows.

**Not done yet:** the public pages still render from the TS files. Phase 3
switches them to read `Page → Block[]` and render through a block registry, at
which point the portal changes go live. Until then, edits in the portal are
stored but not shown on the site.

## Design direction

Modelled on the current **Customer.io** site. The patterns carried over, in the
order they appear:

| Customer.io | Here |
| --- | --- |
| Dark full-bleed hero, huge headline, one line in pale mint, two pills, a checkmark micro-row | Hero, over video |
| Bordered stat rail on the hero's bottom edge | The standards TAM works to — API 653, 2015, 2016, ISGOTT |
| Full-bleed capability strip: duotone photographs butted edge to edge, `+` top-left, label on the bottom edge | The eight services — `public/media/services/svc-01…08.jpg` are frames pulled from the hero footage with ffmpeg at different timestamps and crops, then run through a green duotone in CSS (`grayscale` + gradient overlay). Zero extra footage needed; regenerate distinct stills if the client wants variety |
| Tinted product tiles on a dark ground ("Designed to help you scale") | M-1000 / Para-Bac / Corroso-Bac |
| Section eyebrow = small colour chip + tracked mono label | Every section |
| Hairline-ruled editorial grids, arrow links, generous negative space | Pillars, markets, HSE, growth |

The palette is TAM's: **royal green** and **العنابي** (wine). The page alternates
dark and light the way the reference does — dark hero, light pillars, dark
service rail, light process, dark technology, light markets, wine contact.

| Token | Value | Used for |
| --- | --- | --- |
| `green-950` | `#05211A` | Technology section, footer |
| `green-800` / `green-700` | `#0C4733` / `#0E5A3C` | primary buttons, logo, accents |
| `green-100` / `green-50` | `#E4EFE8` / `#F1F7F3` | status chips, hover fills |
| `wine-900` | `#4E1320` | contact section |
| `wine-700` | `#7A1F2F` | eyebrow chips, numerals, accent headline |
| `paper` / `surface` | `#FBFAF7` / `#FFFFFF` | page ground, panel ground |
| `ink` / `ink-2` / `ink-3` | `#0B1711` / `#45564D` / `#74837B` | text hierarchy |

Type: **IBM Plex Sans** (Latin) + **IBM Plex Sans Arabic** (Arabic) + **IBM Plex
Mono** (labels, tags, standards). One stack serves both scripts — Plex Sans has
no Arabic glyphs, so Arabic falls through to Plex Arabic per glyph, and Latin
strings inside Arabic copy (API 653, Micro-Bac, M-1000) stay in Plex Sans.

Arabic gets looser leading and **zero letter-spacing** on tracked labels —
tracking breaks Arabic letter joining.

**The trap that cost us the Arabic once:** `next/font` emits an automatic
CLS-fallback face per font (`"IBM Plex Sans Fallback"`) declared with
`unicode-range: U+0-10FFFF`. In a stack of `Plex Sans, Plex Arabic` that
fallback sits *between* the two and renders every Arabic glyph in a
metric-adjusted Arial. `adjustFontFallback: false` did not remove it. The fix is
at the bottom of `app/globals.css`: on `[lang="ar"]`, Plex Arabic leads the sans
stack, and the mono stack names `"IBM Plex Mono"` directly so Latin keeps the
mono while Arabic reaches Plex Arabic. If you touch the font config, re-verify
by measuring rendered text width against `"IBM Plex Sans Arabic"` — use a string
with **no spaces**, since the space glyph legitimately comes from Plex Mono.

## Pages

| Route | Reference pattern |
| --- | --- |
| `/[locale]` | Customer.io — dark video hero, capability rail, product tiles |
| `/[locale]/about` | PayPal / GitBook about hero + belief statement; a "what we are not / what we are" split |
| `/[locale]/solutions` | Instrument "Our offerings" — hairline rows, big solution name, two-column coverage list. Was `/services` until 2026-09-20; `proxy.ts` 308-redirects the old path. The content key is still `pages.services` / `c.services` — only user-facing strings and the route changed |
| `/[locale]/blog` | Desktop: Mural — featured post + recent rail, then a Typeform-style card grid with a cover on every card. Mobile: Finimize / The Atlantic — headline-led rows with a 68px photo thumbnail, and F1's horizontally scrollable category chips |
| `/[locale]/blog/[slug]` | Article template, prerendered per post per locale |
| `/[locale]/contact` | customer.io/contact itself — dark page, centered "How can we help?", a 3×2 grid of cards (line icon, body, arrow link, chip collage), a quiet direct-contact row, the enquiry form as one wide light card (`#enquiry`), then a standards strip where they put GDPR / SOC / HIPAA. Cards live in `pages.contact.cards`; icons are keyed by `card.icon` in the page file |

`components/LeadBand.tsx` (dark band + white lead-capture card) closes the
about, services and article pages. It is modelled on Customer.io's comparison-page
section, [mobbin.com/sites/sections/ce82ce77-626e-4df3-bdfb-04a46fd13451](https://mobbin.com/sites/sections/ce82ce77-626e-4df3-bdfb-04a46fd13451).

## Structure

```
app/[locale]/layout.tsx   root layout: lang, dir, fonts, metadata, JSON-LD, nav, footer
app/[locale]/page.tsx     the homepage, composed of the section components
app/[locale]/{about,services,blog,contact}/  the interior pages
lib/pages-en.ts           interior-page copy + the PagesContent shape
lib/pages-ar.ts           Arabic, typed against it
public/media/            hero-loop.mp4 (504 KB, silent) + hero-poster.jpg
app/api/contact/route.ts  proposal form endpoint (name, company, email, phone, reason, message)
proxy.ts                  bare paths → /en or /ar (Accept-Language aware)
lib/content-en.ts         English source copy + the SiteContent shape
lib/content-ar.ts         Arabic copy, typed against that same shape
components/               one file per section
```

`lib/content-ar.ts` is typed `SiteContent`, so the two locales can never drift
out of shape — a missing Arabic key is a build error.

RTL is handled with logical properties (`ms-`, `pe-`, `start-`, `text-start`)
plus `rtl:-scale-x-100` on directional arrows. No duplicated stylesheets.

## Hero video

`public/media/hero-loop.mp4` — a 5s silent aerial over a tank farm at golden
hour, generated with Higgsfield (seedance_2_5, 35 credits) on 2026-09-20 and
re-encoded to 504 KB with the audio track stripped. It plays `autoPlay muted
loop playsInline` behind a green gradient scrim at 52% opacity, with
`hero-poster.jpg` as the poster frame.

To swap in real TAM site footage, drop a file at the same path — no code
changes. Keep it silent, under ~1 MB, and dark enough on the text side that the
headline stays legible; the scrim does most of that work already.

## The process diagram

`components/TankDiagram.tsx` is a hand-built SVG cross-section of the non-entry
cycle — dose in through an existing nozzle, sludge digesting down, oil drawn
off — on a 6s loop. It has its own section (`#process`) rather than sitting in
the hero. SVG scale animations need `transform-box: fill-box`, or the transform
origin resolves against the SVG root and the shape collapses out of view.

## Covers

Every interior hero takes a `cover` prop (`components/PageHero.tsx`) — a
duotone still at 28% behind the title, same treatment as the article header.

Every post has a cover at `public/media/blog/<slug>.jpg`, keyed by slug so
reordering posts never shifts imagery. Like the services rail, the four current
covers are frames pulled from the hero footage at different timestamps and
crops, duotoned in CSS. The same file serves the featured card, the grid card,
the mobile thumbnail and the article header. Adding a post means adding one
JPEG with its slug as the filename — nothing else to wire.

## Large screens

The type scale and the `.shell` both keep growing past 1440. Before this, every
`clamp()` maxed out at roughly 1365px and the shell stopped at 1240, so a 1920 or
2560 display got a 46px H1 in a column with 18–26% gutters either side.

| Width | Shell | H1 |
| --- | --- | --- |
| 1280 | full width, 40px padding | 64px |
| 1440 | 1340px | 72px |
| 1920 | 1480px | 84px |
| 2560 | 1480px, 21% gutters | 84px |

The hero footage is 1280×720, so it is upscaled 1.5× at 1920 and 2× at 2560.
The 52% opacity and the scrim mask most of the softness; regenerate or upscale
it if the client reviews on a large display.

## Scroll reveal

`components/ScrollReveal.tsx` fades `.reveal` elements in. It is mounted in the
layout, so it does **not** remount on a client-side navigation — it keys off
`usePathname()` and re-queries the document each time. Without that, soft
navigation left the new page's elements unobserved and therefore stuck at
`opacity: 0` until a hard refresh. It also reveals anything already at or above
the fold (restored scroll positions never fire an intersection) and watches for
late-mounted nodes with a MutationObserver.

If you add a section, just give it `className="reveal"` — no wiring needed.

## Content source

All copy comes from Notion → **Website Content — Homepage (EN / العربية)**.
Edit there first, then mirror into `lib/content-*.ts`.

Deliberately absent, per the brief: no statistics, no project counts, no
years-of-experience claims, no ISO badges, no recovery percentages. TAM is new
and procurement teams verify those numbers.

## Before launch

Blocked on the client:

- [ ] Vector logo — `components/Icons.tsx` `<Logo>` is a placeholder mark
- [ ] Office address, phone, email — `[BRACKETED]` in `lib/content-*.ts`
- [ ] Arabic copy sign-off (now covers four more pages — see `lib/pages-ar.ts`)
- [ ] Replace the four sample blog posts in `lib/pages-*.ts` with reviewed
      articles, or remove the blog from the nav until there is one. **Nothing on
      the page marks them as samples** — the on-page notice was removed because
      it read as an error banner — so this checklist is the only flag.
- [ ] Markets heading was changed from "Qatar first. Then the Gulf." — Notion
      still has the old line, so the two are out of sync
- [ ] Written permission from Micro-Bac to use their name (currently in the
      hero sub-headline, technology eyebrow and footer)
- [ ] OG image at `app/[locale]/opengraph-image.*`
- [ ] Decide whether to keep the generated hero footage or supply real site
      footage (see **Hero video**)
- [ ] Contact delivery: copy `.env.example` to `.env.local`, fill it, and
      uncomment the send block in `app/api/contact/route.ts`
- [ ] Confirm certifications actually held before adding any badge

Legal/careers footer links are `#` placeholders until those pages exist.
