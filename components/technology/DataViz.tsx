"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/profile";

type Results = Profile["technology"]["results"];
type Storage = Profile["technology"]["product"]["storage"];
const EASE = [0.22, 1, 0.36, 1] as const;

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const format = (n: number) =>
    Math.round(n).toLocaleString("en-US");
  const [shown, setShown] = useState(format(value));
  useEffect(() => {
    if (!inView || reduced || value === 0) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (n) => setShown(format(n)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);
  return <span ref={ref}>{shown}</span>;
}

export function ResultStats({ results }: { results: Results }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {results.stats.map((stat) => (
        <article key={stat.label} className="result-stat">
          <p className="result-value">
            <bdi>
              <CountUp value={stat.value} />
              {stat.suffix}
            </bdi>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/80">{stat.label}</p>
        </article>
      ))}
    </div>
  );
}

export function LelChart({ results }: { results: Results }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const max = 70;
  return (
    <div ref={ref}>
      <h3 className="font-medium text-wine-700">{results.lelLabel}</h3>
      <p className="mt-1 text-sm text-ink-3">{results.lelNote}</p>
      <div className="mt-6 flex h-48 items-end gap-5 border-b border-line" dir="ltr">
        {results.lel.map((bar, i) => (
          <div key={bar.day} className="flex h-full flex-1 flex-col justify-end">
            <p className="mb-2 text-center text-sm font-medium text-wine-700">{bar.value}%</p>
            <motion.div
              className="rounded-t-md"
              style={{
                background: i === 2 ? "#15774F" : i === 1 ? "#962A3C" : "#7A1F2F",
                minHeight: 3,
              }}
              initial={{ height: reduced ? `${(bar.value / max) * 100}%` : 0 }}
              animate={inView ? { height: `${(bar.value / max) * 100}%` } : undefined}
              transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.25 * i, ease: EASE }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-5 text-center text-xs text-ink-2" dir="ltr">
        {results.lel.map((bar) => (
          <span key={bar.day} className="flex-1">
            {bar.day}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResidueBars({ results }: { results: Results }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  return (
    <div ref={ref}>
      <h3 className="font-medium text-wine-700">{results.residueLabel}</h3>
      <p className="mt-1 text-sm text-ink-3">{results.residueNote}</p>
      <div className="mt-6 space-y-6">
        {results.residues.map((row, i) => (
          <div key={row.label}>
            <p className="text-sm leading-relaxed text-ink">{row.label}</p>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-wine-100">
              <motion.div
                className="h-full rounded-full bg-green-600"
                style={{ minWidth: 4 }}
                initial={{ width: reduced ? `${row.value}%` : "100%" }}
                animate={inView ? { width: `${row.value}%` } : undefined}
                transition={{ duration: reduced ? 0 : 1.6, delay: reduced ? 0 : 0.3 + 0.2 * i, ease: EASE }}
              />
            </div>
            <p className="mt-1.5 text-sm font-medium text-green-700">{row.display}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Storage window on a 0–45 °C scale, drawn left to right in both languages. */
export function StorageWindow({ storage }: { storage: Storage }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const pct = (c: number) => `${(c / 46) * 100}%`;
  const segments = [
    { from: 0, to: 4, color: "#ECE4E6" },
    { from: 4, to: 13, color: "#9FD8B8" },
    { from: 13, to: 35, color: "#15774F", label: storage.long },
    { from: 35, to: 40, color: "#9FD8B8" },
    { from: 40, to: 43, color: "#ECE4E6" },
    { from: 43, to: 46, color: "#7A1F2F", label: storage.avoid },
  ];
  return (
    <div ref={ref}>
      <p className="mb-3 text-center text-sm text-ink-2">{storage.short}</p>
      <div className="storage-bar" dir="ltr">
        <span className="storage-freeze" aria-hidden />
        {segments.map((s, i) => (
          <motion.span
            key={s.from}
            className="storage-segment"
            style={{ left: pct(s.from), width: pct(s.to - s.from), background: s.color }}
            initial={{ scaleX: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : undefined}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.12 * i, ease: EASE }}
          >
            {s.label && <b>{s.label}</b>}
          </motion.span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-3 text-xs text-ink-3">
        <span>{storage.freeze}</span>
        <span className="max-w-md text-end">{storage.note}</span>
      </div>
    </div>
  );
}
