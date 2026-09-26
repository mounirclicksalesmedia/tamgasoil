import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getLeader } from "@/lib/leadership";

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
      </div>
      <figcaption className="p-6 md:p-7">
        <p className="text-xl font-medium leading-snug text-green-950">
          {person.name}
        </p>
        <p
          className={`mt-3 text-sm leading-relaxed ${person.symbolic ? "text-ink-3" : "text-wine-700"}`}
        >
          {person.role}
        </p>
      </figcaption>
    </figure>
  );
}
