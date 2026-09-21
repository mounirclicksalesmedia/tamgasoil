/**
 * Seeds Postgres from the typed content files. Idempotent: re-running
 * updates in place by slug/key rather than duplicating.
 *
 *   npm run db:seed
 */
import { PrismaClient, CategoryKind, Locale, Role, Status } from "@prisma/client";
import { hash } from "bcryptjs";
import { en } from "../lib/content-en";
import { ar } from "../lib/content-ar";
import { pagesEn } from "../lib/pages-en";
import { pagesAr } from "../lib/pages-ar";

const db = new PrismaClient();
const both = <T>(e: T, a: T) => ({ en: e, ar: a });
const json = (v: unknown) => JSON.parse(JSON.stringify(v));

async function upsertUser() {
  const email = (process.env.ADMIN_EMAIL ?? "admin@tamoilgas.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "change-me-on-first-login";
  const name = process.env.ADMIN_NAME ?? "TAM Admin";
  await db.user.upsert({
    where: { email },
    update: { name },
    create: { email, name, role: Role.ADMIN, passwordHash: await hash(password, 12) },
  });
  console.log("user:", email);
}

async function upsertSettings() {
  const settings: Record<string, unknown> = {
    brand: both(en.brand, ar.brand),
    navCta: both(en.nav.cta, ar.nav.cta),
    footer: both(en.footer, ar.footer),
    contactDetails: both(en.contact.details, ar.contact.details),
    standards: both(en.standards, ar.standards),
    siteMeta: both(en.meta, ar.meta),
  };
  for (const [key, value] of Object.entries(settings)) {
    await db.setting.upsert({ where: { key }, update: { value: json(value) }, create: { key, value: json(value) } });
  }
  console.log("settings:", Object.keys(settings).length);
}

type BlockSeed = { type: string; anchor?: string; settings?: Record<string, unknown>; en: unknown; ar: unknown };

async function upsertPage(
  slug: string,
  order: number,
  tr: { en: { navLabel: string; seoTitle: string; seoDescription: string; seoKeywords?: string[] }; ar: typeof tr.en },
  blocks: BlockSeed[],
) {
  const page = await db.page.upsert({
    where: { slug },
    update: { order },
    create: { slug, order, status: Status.PUBLISHED },
  });
  for (const locale of [Locale.en, Locale.ar]) {
    const t = tr[locale];
    await db.pageTranslation.upsert({
      where: { pageId_locale: { pageId: page.id, locale } },
      update: { navLabel: t.navLabel, seoTitle: t.seoTitle, seoDescription: t.seoDescription, seoKeywords: t.seoKeywords ?? [] },
      create: { pageId: page.id, locale, navLabel: t.navLabel, seoTitle: t.seoTitle, seoDescription: t.seoDescription, seoKeywords: t.seoKeywords ?? [] },
    });
  }
  // Blocks are replaced wholesale so the seed stays the source of truth until
  // the portal takes over. (After that, do not re-run the seed on production.)
  await db.block.deleteMany({ where: { pageId: page.id } });
  let i = 0;
  for (const b of blocks) {
    const block = await db.block.create({
      data: { pageId: page.id, type: b.type, order: i++, anchor: b.anchor, settings: json(b.settings ?? {}) },
    });
    await db.blockTranslation.createMany({
      data: [
        { blockId: block.id, locale: Locale.en, content: json(b.en) },
        { blockId: block.id, locale: Locale.ar, content: json(b.ar) },
      ],
    });
  }
  console.log(`page /${slug || ""}: ${blocks.length} blocks`);
}

async function upsertSolutions() {
  for (let i = 0; i < en.services.items.length; i++) {
    const slug = `solution-${String(i + 1).padStart(2, "0")}`;
    const s = await db.solution.upsert({
      where: { slug },
      update: { order: i },
      create: { slug, order: i, status: Status.PUBLISHED, image: `/media/services/svc-${String(i + 1).padStart(2, "0")}.jpg` },
    });
    const pairs = [
      [Locale.en, en.services.items[i], pagesEn.services.includes[i]],
      [Locale.ar, ar.services.items[i], pagesAr.services.includes[i]],
    ] as const;
    for (const [locale, item, includes] of pairs) {
      await db.solutionTranslation.upsert({
        where: { solutionId_locale: { solutionId: s.id, locale } },
        update: { title: item.title, summary: item.body, includes: [...includes] },
        create: { solutionId: s.id, locale, title: item.title, summary: item.body, includes: [...includes] },
      });
    }
  }
  console.log("solutions:", en.services.items.length);
}

async function upsertBlog() {
  // categories: skip the "All" chip
  const names = pagesEn.blog.categories.slice(1);
  const namesAr = pagesAr.blog.categories.slice(1);
  const byName = new Map<string, string>();
  for (let i = 0; i < names.length; i++) {
    const slug = names[i].toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const cat = await db.category.upsert({
      where: { kind_slug: { kind: CategoryKind.BLOG, slug } },
      update: { order: i },
      create: { kind: CategoryKind.BLOG, slug, order: i },
    });
    for (const [locale, name] of [[Locale.en, names[i]], [Locale.ar, namesAr[i]]] as const) {
      await db.categoryTranslation.upsert({
        where: { categoryId_locale: { categoryId: cat.id, locale } },
        update: { name },
        create: { categoryId: cat.id, locale, name },
      });
    }
    byName.set(names[i], cat.id);
  }

  for (let i = 0; i < pagesEn.blog.posts.length; i++) {
    const pe = pagesEn.blog.posts[i];
    const pa = pagesAr.blog.posts.find((p) => p.slug === pe.slug) ?? pagesAr.blog.posts[i];
    const post = await db.post.upsert({
      where: { slug: pe.slug },
      update: { categoryId: byName.get(pe.category) ?? null, readTime: pe.readTime, featured: i === 0 },
      create: {
        slug: pe.slug,
        status: Status.PUBLISHED,
        publishedAt: new Date(pe.date),
        featured: i === 0,
        coverImage: `/media/blog/${pe.slug}.jpg`,
        readTime: pe.readTime,
        authorName: pe.author,
        categoryId: byName.get(pe.category) ?? null,
      },
    });
    for (const [locale, p] of [[Locale.en, pe], [Locale.ar, pa]] as const) {
      await db.postTranslation.upsert({
        where: { postId_locale: { postId: post.id, locale } },
        update: { title: p.title, excerpt: p.excerpt, body: json(p.body) },
        create: { postId: post.id, locale, title: p.title, excerpt: p.excerpt, body: json(p.body) },
      });
    }
  }
  console.log("posts:", pagesEn.blog.posts.length, "categories:", names.length);
}

async function main() {
  await upsertUser();
  await upsertSettings();

  await upsertPage("", 0,
    both(
      { navLabel: pagesEn.nav.home, seoTitle: en.meta.title, seoDescription: en.meta.description, seoKeywords: [...en.meta.keywords] },
      { navLabel: pagesAr.nav.home, seoTitle: ar.meta.title, seoDescription: ar.meta.description, seoKeywords: [...ar.meta.keywords] },
    ),
    [
      { type: "hero", en: en.hero, ar: ar.hero },
      { type: "standards", en: en.standards, ar: ar.standards },
      { type: "pillars", en: en.pillars, ar: ar.pillars },
      { type: "solutionsRail", anchor: "solutions", en: { eyebrow: en.services.eyebrow, heading: en.services.heading }, ar: { eyebrow: ar.services.eyebrow, heading: ar.services.heading } },
      { type: "process", anchor: "process", en: { ...en.process, steps: en.technology.steps, stepsLabel: en.technology.stepsLabel, diagram: en.hero.diagram }, ar: { ...ar.process, steps: ar.technology.steps, stepsLabel: ar.technology.stepsLabel, diagram: ar.hero.diagram } },
      { type: "technology", anchor: "technology", en: en.technology, ar: ar.technology },
      { type: "statement", en: en.statement, ar: ar.statement },
      { type: "markets", anchor: "markets", en: en.markets, ar: ar.markets },
      { type: "hse", anchor: "hse", en: en.hse, ar: ar.hse },
      { type: "growth", anchor: "about", en: en.growth, ar: ar.growth },
      { type: "contact", anchor: "contact", en: en.contact, ar: ar.contact },
    ],
  );

  await upsertPage("about", 1,
    both(
      { navLabel: pagesEn.nav.about, seoTitle: pagesEn.about.meta.title, seoDescription: pagesEn.about.meta.description },
      { navLabel: pagesAr.nav.about, seoTitle: pagesAr.about.meta.title, seoDescription: pagesAr.about.meta.description },
    ),
    [
      { type: "pageHero", settings: { cover: "/media/services/svc-07.jpg" }, en: pagesEn.about.hero, ar: pagesAr.about.hero },
      { type: "belief", en: pagesEn.about.belief, ar: pagesAr.about.belief },
      { type: "story", en: pagesEn.about.story, ar: pagesAr.about.story },
      { type: "contrast", en: pagesEn.about.contrast, ar: pagesAr.about.contrast },
      { type: "partner", en: pagesEn.about.partner, ar: pagesAr.about.partner },
      { type: "growth", en: en.growth, ar: ar.growth },
      { type: "leadBand", en: pagesEn.leadBand, ar: pagesAr.leadBand },
    ],
  );

  await upsertPage("solutions", 2,
    both(
      { navLabel: pagesEn.nav.services, seoTitle: pagesEn.services.meta.title, seoDescription: pagesEn.services.meta.description },
      { navLabel: pagesAr.nav.services, seoTitle: pagesAr.services.meta.title, seoDescription: pagesAr.services.meta.description },
    ),
    [
      { type: "pageHero", settings: { cover: "/media/services/svc-05.jpg", showSolutionIndex: true }, en: { ...pagesEn.services.hero, indexLabel: pagesEn.services.indexLabel }, ar: { ...pagesAr.services.hero, indexLabel: pagesAr.services.indexLabel } },
      { type: "solutionsList", en: { includesLabel: pagesEn.services.includesLabel, enquire: pagesEn.services.enquire }, ar: { includesLabel: pagesAr.services.includesLabel, enquire: pagesAr.services.enquire } },
      { type: "standardsNote", en: pagesEn.services.standards, ar: pagesAr.services.standards },
      { type: "leadBand", en: pagesEn.leadBand, ar: pagesAr.leadBand },
    ],
  );

  await upsertPage("blog", 3,
    both(
      { navLabel: pagesEn.nav.blog, seoTitle: pagesEn.blog.meta.title, seoDescription: pagesEn.blog.meta.description },
      { navLabel: pagesAr.nav.blog, seoTitle: pagesAr.blog.meta.title, seoDescription: pagesAr.blog.meta.description },
    ),
    [
      { type: "pageHero", en: pagesEn.blog.hero, ar: pagesAr.blog.hero },
      { type: "blogIndex", en: { featuredLabel: pagesEn.blog.featuredLabel, recentLabel: pagesEn.blog.recentLabel, allLabel: pagesEn.blog.allLabel, readMore: pagesEn.blog.readMore, minRead: pagesEn.blog.minRead, allCategories: pagesEn.blog.categories[0] }, ar: { featuredLabel: pagesAr.blog.featuredLabel, recentLabel: pagesAr.blog.recentLabel, allLabel: pagesAr.blog.allLabel, readMore: pagesAr.blog.readMore, minRead: pagesAr.blog.minRead, allCategories: pagesAr.blog.categories[0] } },
    ],
  );

  await upsertPage("contact", 4,
    both(
      { navLabel: pagesEn.nav.contact, seoTitle: pagesEn.contact.meta.title, seoDescription: pagesEn.contact.meta.description },
      { navLabel: pagesAr.nav.contact, seoTitle: pagesAr.contact.meta.title, seoDescription: pagesAr.contact.meta.description },
    ),
    [
      { type: "contactHero", en: pagesEn.contact.hero, ar: pagesAr.contact.hero },
      { type: "contactCards", en: { cards: pagesEn.contact.cards, directLabel: pagesEn.contact.directLabel, railLabels: pagesEn.contact.railLabels }, ar: { cards: pagesAr.contact.cards, directLabel: pagesAr.contact.directLabel, railLabels: pagesAr.contact.railLabels } },
      { type: "enquiryForm", anchor: "enquiry", en: pagesEn.contact, ar: pagesAr.contact },
      { type: "standardsStrip", en: { label: pagesEn.contact.standardsLabel }, ar: { label: pagesAr.contact.standardsLabel } },
    ],
  );

  await upsertSolutions();
  await upsertBlog();
}

main()
  .then(() => db.$disconnect())
  .catch((e) => {
    console.error(e);
    db.$disconnect();
    process.exit(1);
  });
