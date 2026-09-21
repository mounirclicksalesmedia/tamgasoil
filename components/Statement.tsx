import type { SiteContent } from "@/lib/content";

export default function Statement({ c }: { c: SiteContent }) {
  const s = c.statement;
  return (
    <section className="section bg-surface">
      <div className="shell">
        <figure className="reveal mx-auto max-w-4xl text-center">
          <span
            aria-hidden
            className="mx-auto mb-10 block h-10 w-px bg-gradient-to-b from-transparent to-wine-700"
          />
          <blockquote className="display-3 text-balance text-ink">
            <span className="text-ink-2">{s.quoteLead}</span>{" "}
            <span className="text-wine-700">{s.quoteA}</span>{" "}
            <span className="text-ink-2">{s.quoteMid}</span>{" "}
            <span className="text-green-800">{s.quoteB}</span>
          </blockquote>
          <figcaption className="mt-9 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-3">
            {s.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
