import type { Locale } from "./i18n";

export const leadershipSections = ["managing-director", "ceo", "coo"] as const;
export type LeadershipSection = (typeof leadershipSections)[number];

const profiles = {
  chairman: {
    image: "/media/leadership/ceo-avatar-qatar.png",
    position: "50% 50%",
    symbolic: true,
    ar: { name: "رئيس مجلس الإدارة", role: "صورة رمزية مؤقتة" },
    en: { name: "Chairman", role: "Temporary avatar" },
  },
  "managing-director": {
    image: "/media/leadership/yahya-abo-najab.jpg",
    position: "50% 40%",
    symbolic: false,
    ar: { name: "يحيى أبو نجم", role: "العضو المنتدب لمجموعة تم القابضة" },
    en: {
      name: "Yahya Abu Najm",
      role: "Managing Director, TAM Holding Group",
    },
  },
  ceo: {
    image: "/media/leadership/ceo-avatar-qatar.png",
    position: "50% 50%",
    symbolic: true,
    ar: { name: "الرئيس التنفيذي", role: "صورة رمزية مؤقتة" },
    en: { name: "Chief Executive Officer", role: "Temporary avatar" },
  },
  coo: {
    image: "/media/leadership/yasir-taj-din.jpg",
    position: "50% 40%",
    symbolic: false,
    ar: { name: "م. ياسر تاج الدين", role: "الرئيس التنفيذي للعمليات" },
    en: { name: "Eng. Yasir Taj Din", role: "Chief Operating Officer" },
  },
};

export function getLeader(locale: Locale, section: string) {
  if (!Object.prototype.hasOwnProperty.call(profiles, section)) return null;
  const profile = profiles[section as keyof typeof profiles];
  return {
    ...profile[locale],
    image: profile.image,
    position: profile.position,
    symbolic: profile.symbolic,
    alt: profile.symbolic
      ? locale === "ar"
        ? `أفاتار رمزي — ${profile.ar.name} — بجانب علم قطر، وليس صورة لشخص حقيقي`
        : `Symbolic ${profile.en.name} avatar beside the Qatar flag, not a portrait of a real person`
      : profile[locale].name,
  };
}
