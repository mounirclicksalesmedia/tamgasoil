import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getLeader } from "@/lib/leadership";

/** The nine-point serrated hoist of the Qatar flag, drawn to its 11:28 proportion. */
function QatarSerration() {
  const points = 9,
    step = 100 / points;
  const zigzag = Array.from({ length: points }, (_, i) => {
    const top = i * step;
    return `L25,${top} L36,${top + step / 2}`;
  }).join(" ");
  return (
    <svg
      aria-hidden
      viewBox="0 0 36 100"
      preserveAspectRatio="none"
      className="qatar-serration"
    >
      <path d={`M0,0 ${zigzag} L25,100 L0,100 Z`} fill="#fff" />
    </svg>
  );
}

export default function LeadershipPortrait({
  locale,
  section,
}: {
  locale: Locale;
  section: string;
}) {
  const person = getLeader(locale, section);
  if (!person) return null;
  return (
    <figure className="leadership-portrait overflow-hidden rounded-3xl border border-line bg-paper">
      <div className="relative aspect-[4/5] overflow-hidden bg-green-950">
        <Image
          src={person.image}
          alt={person.alt}
          fill
          sizes="(min-width:1024px) 360px, (min-width:768px) 45vw, 100vw"
          className="leadership-photo object-cover"
          style={{ objectPosition: person.position }}
        />
        {person.decorative && (
          <>
            <QatarSerration />
            <span className="qatar-mark" lang="ar" aria-hidden>
              قطر
            </span>
          </>
        )}
      </div>
      <figcaption className="p-6 md:p-7">
        <p className="text-xl font-medium leading-snug text-green-950">
          {person.name}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-wine-700">
          {person.role}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-ink-3">
          {person.organisation}
        </p>
      </figcaption>
    </figure>
  );
}
