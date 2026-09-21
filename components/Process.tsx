import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import TankDiagram from "./TankDiagram";

/**
 * The non-entry cycle, given its own room: the animated cross-section on one
 * side, the four steps on the other.
 */
export default function Process({ c }: { c: SiteContent }) {
  const p = c.process;
  const steps = c.technology.steps;

  return (
    <section id="process" className="section bg-surface">
      <div className="shell">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-ink-3">{p.eyebrow}</p>
            <h2 className="display-2 mt-6 text-balance">{p.heading}</h2>
          </div>
          <p className="max-w-sm text-[0.9375rem] leading-[1.7] text-ink-2 lg:pb-2">{p.intro}</p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="reveal rounded-2xl bg-green-50 px-4 py-8 md:px-10 md:py-12">
            <TankDiagram c={c} />
            <p className="mt-6 text-center font-mono text-[10.5px] leading-relaxed tracking-[0.04em] text-ink-3">
              {p.diagramNote}
            </p>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-green-100">
              <Image src="/media/sampling-lab.webp" alt="" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
            </div>
          </div>

          <ol className="relative">
            <span
              aria-hidden
              className="absolute bottom-8 top-8 start-[19px] w-px bg-line"
            />
            {steps.map((step, i) => (
              <li
                key={step.no}
                className="reveal relative flex gap-6 py-5"
                style={{ ["--reveal-delay" as string]: `${80 * i}ms` }}
              >
                <span className="relative z-10 mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-[11px] tracking-[0.06em] text-wine-700">
                  {step.no}
                </span>
                <div>
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.02em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink-2">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
