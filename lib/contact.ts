/** Links for the public phone and WhatsApp numbers held in the content files. */

/** True while a content value is still an unfilled "[PLACEHOLDER]". */
export const isPlaceholder = (value: string) => value.includes("[");

/** "+974 3133 3812" → "tel:+97431333812" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+0-9]/g, "")}`;

/** "+974 3133 3812" → "https://wa.me/97431333812" (wa.me takes digits only) */
export const whatsappHref = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

export const socialLinks = [
  { network: "instagram", label: "Instagram", href: "https://www.instagram.com/tamoilgas" },
  { network: "x", label: "X", href: "https://x.com/tamoilgas" },
  { network: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/tamoilgas" },
  { network: "facebook", label: "Facebook", href: "https://www.facebook.com/tamoilgas" },
] as const;

export type SocialNetwork = (typeof socialLinks)[number]["network"];
