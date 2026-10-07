"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const LOOP = { duration: 6, repeat: Infinity, ease: "easeInOut" as const };

/** A bacterial cell bridges two oil droplets; they spread across it and coalesce. */
export function EmulsionBreaking({ before, after }: { before: string; after: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const play = inView && !reduced;
  const times = [0, 0.3, 0.55, 0.85, 1];
  return (
    <div ref={ref} className="micro-figure">
      <svg viewBox="0 0 420 180" className="w-full" aria-hidden direction="ltr">
        {/* Separate droplets */}
        <motion.circle
          cy="80"
          fill="#7A1F2F"
          initial={false}
          animate={
            play
              ? { cx: [118, 118, 160, 192, 118], r: [52, 52, 50, 0, 52], opacity: [1, 1, 1, 0, 1] }
              : reduced
                ? { cx: 118, r: 52, opacity: 1 }
                : { cx: 118, r: 52, opacity: 1 }
          }
          transition={play ? { ...LOOP, times } : { duration: 0 }}
        />
        <motion.circle
          cy="80"
          fill="#7A1F2F"
          initial={false}
          animate={
            play
              ? { cx: [302, 302, 260, 228, 302], r: [52, 52, 50, 0, 52], opacity: [1, 1, 1, 0, 1] }
              : { cx: 302, r: 52, opacity: 1 }
          }
          transition={play ? { ...LOOP, times } : { duration: 0 }}
        />
        {/* Coalesced droplet */}
        <motion.ellipse
          cx="210"
          cy="80"
          fill="#7A1F2F"
          initial={false}
          animate={
            play
              ? { rx: [0, 0, 70, 92, 0], ry: [0, 0, 55, 64, 0], opacity: [0, 0, 1, 1, 0] }
              : { rx: 0, ry: 0, opacity: 0 }
          }
          transition={play ? { ...LOOP, times } : { duration: 0 }}
        />
        {/* Bacterial cell acting as a wetting bridge */}
        <motion.rect
          width="96"
          height="26"
          rx="13"
          fill="#3FBF7F"
          stroke="#0C4733"
          strokeWidth="2"
          initial={false}
          animate={
            play
              ? { x: [162, 162, 162, 162, 162], y: [67, 67, 67, 128, 67] }
              : { x: 162, y: 67 }
          }
          transition={play ? { ...LOOP, times } : { duration: 0 }}
        />
        <text x="118" y="168" textAnchor="middle" fontSize="13" fill="#45564D">
          {before}
        </text>
        <text x="302" y="168" textAnchor="middle" fontSize="13" fill="#45564D">
          {after}
        </text>
      </svg>
    </div>
  );
}

/** Long paraffin chains are cut into shorter, lighter fractions. */
export function ChainBreaking({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const play = inView && !reduced;
  const atoms = 18,
    gap = 21;
  // Cuts after atoms 5 and 11 split the chain into three shorter molecules.
  const shift = (i: number) => (i > 11 ? 36 : i > 5 ? 18 : 0);
  return (
    <div ref={ref} className="micro-figure">
      <svg viewBox="0 0 440 120" className="w-full" aria-hidden direction="ltr">
        {Array.from({ length: atoms - 1 }, (_, i) => {
          const cut = i === 5 || i === 11;
          return (
            <motion.line
              key={`b${i}`}
              y1="58"
              y2="58"
              stroke="#962A3C"
              strokeWidth="3"
              initial={false}
              animate={
                play
                  ? {
                      x1: [24 + i * gap, 24 + i * gap + (cut ? 0 : shift(i))],
                      x2: [24 + (i + 1) * gap, 24 + (i + 1) * gap + (cut ? 0 : shift(i + 1))],
                      opacity: cut ? [1, 0] : [1, 1],
                    }
                  : {
                      x1: 24 + i * gap + (reduced && !cut ? shift(i) : 0),
                      x2: 24 + (i + 1) * gap + (reduced && !cut ? shift(i + 1) : 0),
                      opacity: reduced && cut ? 0 : 1,
                    }
              }
              transition={
                play
                  ? { duration: 1.2, delay: 1.6, repeat: Infinity, repeatDelay: 2.6, repeatType: "reverse" }
                  : { duration: 0 }
              }
            />
          );
        })}
        {Array.from({ length: atoms }, (_, i) => (
          <motion.circle
            key={`a${i}`}
            cy="58"
            r="7"
            fill="#7A1F2F"
            initial={false}
            animate={
              play
                ? { cx: [24 + i * gap, 24 + i * gap + shift(i)] }
                : { cx: 24 + i * gap + (reduced ? shift(i) : 0) }
            }
            transition={
              play
                ? { duration: 1.2, delay: 1.6, repeat: Infinity, repeatDelay: 2.6, repeatType: "reverse" }
                : { duration: 0 }
            }
          />
        ))}
        {!reduced && (
          <motion.ellipse
            cy="34"
            rx="13"
            ry="7"
            fill="#3FBF7F"
            stroke="#0C4733"
            strokeWidth="1.5"
            initial={{ cx: 20, opacity: 0 }}
            animate={play ? { cx: [20, 140, 270, 420], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.6, ease: "linear" }}
          />
        )}
        <text x="220" y="108" textAnchor="middle" fontSize="12" fill="#617168">
          {label}
        </text>
      </svg>
    </div>
  );
}
