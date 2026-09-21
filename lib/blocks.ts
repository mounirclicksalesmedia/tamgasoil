/**
 * Block registry. Every section the site can render, with a human label and
 * an empty bilingual content template used when an editor adds a new block.
 * Renderers live in components/blocks; this file is safe to import anywhere.
 */
export const blockTypes = {
  hero: { label: "Homepage hero (video)", template: { eyebrow: "", headline: [{ text: "" }, { text: "" }, { text: "", accent: true }], sub: "", primary: "", secondary: "", badge: "", micro: ["", "", ""] } },
  pageHero: { label: "Page hero", template: { eyebrow: "", title: "", lede: "" } },
  contactHero: { label: "Contact hero (centered)", template: { eyebrow: "", title: "", lede: "" } },
  standards: { label: "Standards line", template: { workingTo: "", items: [""], registration: "", registrationItems: [""] } },
  standardsNote: { label: "Standards note card", template: { heading: "", body: "" } },
  standardsStrip: { label: "Standards strip (dark)", template: { label: "" } },
  pillars: { label: "Five pillars", template: { eyebrow: "", heading: "", intro: "", items: [{ no: "01", title: "", body: "" }] } },
  solutionsRail: { label: "Solutions rail (from Solutions)", template: { eyebrow: "", heading: "" } },
  solutionsList: { label: "Solutions list (from Solutions)", template: { includesLabel: "", enquire: "" } },
  process: { label: "Process (tank animation)", template: { eyebrow: "", heading: "", intro: "", diagramNote: "", stepsLabel: "", steps: [{ no: "01", title: "", body: "" }], diagram: { title: "", dose: "", recover: "", sludge: "", oil: "", chips: [""] } } },
  technology: { label: "Technology (product tiles)", template: { eyebrow: "", heading: "", body: "", stepsLabel: "", steps: [{ no: "01", title: "", body: "" }], tagsLabel: "", tags: [""], lines: [{ name: "", variants: "", body: "" }] } },
  statement: { label: "Value statement", template: { quoteLead: "", quoteA: "", quoteMid: "", quoteB: "", caption: "" } },
  markets: { label: "Markets", template: { eyebrow: "", heading: "", intro: "", statusLabel: "", items: [{ country: "", phase: "", body: "", status: "", tone: "live" }] } },
  hse: { label: "HSE & Quality", template: { eyebrow: "", heading: "", items: [""], cta: "" } },
  growth: { label: "Growth phases", template: { eyebrow: "", heading: "", intro: "", items: [{ no: "01", title: "", period: "", body: "" }] } },
  contact: { label: "Homepage contact (wine)", template: { eyebrow: "", heading: "", body: "", fields: { name: "", company: "", email: "", message: "", messageHint: "" }, button: "", sending: "", note: "", success: "", error: "", detailsLabel: "", details: { emailLabel: "", email: "", phoneLabel: "", phone: "", addressLabel: "", address: "" } } },
  leadBand: { label: "Lead band (dark + form)", template: { eyebrow: "", headingLead: "", headingAccent: "", points: [""], formTitle: "" } },
  belief: { label: "Belief statement", template: { quote: "", caption: "" } },
  story: { label: "Story (heading + paragraphs)", template: { eyebrow: "", heading: "", paragraphs: [""] } },
  contrast: { label: "What we are / are not", template: { eyebrow: "", heading: "", isNotLabel: "", isLabel: "", isNot: [""], is: [""] } },
  partner: { label: "Technology partner", template: { eyebrow: "", heading: "", body: "", points: [""], note: "" } },
  blogIndex: { label: "Blog index (from Blog)", template: { featuredLabel: "", recentLabel: "", allLabel: "", readMore: "", minRead: "", allCategories: "" } },
  contactCards: { label: "Contact cards", template: { cards: [{ icon: "proposal", title: "", body: "", link: "", href: "#enquiry", chips: [""] }], directLabel: "", railLabels: { hours: "", email: "", phone: "", office: "" } } },
  enquiryForm: { label: "Enquiry form", template: { formLabel: "", reasonLabel: "", reasons: [""], fields: { name: "", company: "", email: "", phone: "", message: "", messageHint: "" }, button: "", sending: "", note: "", success: "", error: "", locations: [{ label: "", lines: [""] }], registrationLabel: "", registrationNote: "", hero: { eyebrow: "", title: "", lede: "" }, railLabels: { hours: "", email: "", phone: "", office: "" }, hours: "" } },
  richText: { label: "Rich text", template: { eyebrow: "", heading: "", paragraphs: [""] } },
} as const;

export type BlockType = keyof typeof blockTypes;
export const isBlockType = (t: string): t is BlockType => t in blockTypes;

type J = string | number | boolean | null | J[] | { [k: string]: J };

/**
 * Postgres JSONB does not preserve key order, so content read back from the
 * database would show editors "sub, badge, micro…" with the eyebrow and
 * headline buried. Reorder `value`'s keys to follow `template`'s authoring
 * order (recursively); keys the template does not know go last, untouched.
 */
export function orderLike(template: J, value: J): J {
  if (Array.isArray(value)) {
    const sample = Array.isArray(template) ? template[0] : undefined;
    return value.map((v) => (sample === undefined ? v : orderLike(sample, v)));
  }
  if (value && typeof value === "object" && template && typeof template === "object" && !Array.isArray(template)) {
    const out: { [k: string]: J } = {};
    for (const k of Object.keys(template)) if (k in value) out[k] = orderLike(template[k], (value as { [k: string]: J })[k]);
    for (const k of Object.keys(value)) if (!(k in out)) out[k] = (value as { [k: string]: J })[k];
    return out;
  }
  return value;
}
