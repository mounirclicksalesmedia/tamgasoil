"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/profile";

type Stages = Profile["technology"]["stages"];
type Layers = Profile["technology"]["how"]["layers"];

const STEP_MS = 4600;
const BOTTOM = 280;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Per stage: top of the liquid, top of the sludge, water band, whether separated. */
const LEVELS = [
  { liquid: 104, sludge: 214, water: 0, separated: false },
  { liquid: 104, sludge: 214, water: 0, separated: false },
  { liquid: 104, sludge: 214, water: 0, separated: false },
  { liquid: 146, sludge: 214, water: 0, separated: false },
  { liquid: 146, sludge: 236, water: 0, separated: false },
  { liquid: 146, sludge: 262, water: 28, separated: true },
];

const SUCTION = "M300 262 H186";
const DISCHARGE = "M160 224 V150 H300";

export default function CirculationLoop({
  stages,
  layers,
}: {
  stages: Stages;
  layers: Layers;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);
  const [resting, setResting] = useState(false);
  const playing = inView && !reduced && auto;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStage((s) => (s + 1) % 6), STEP_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  // Circulation runs intermittently: on, then at rest so the oil can break out.
  useEffect(() => {
    if (stage !== 4 || reduced) return;
    const timer = window.setInterval(() => setResting((r) => !r), 1500);
    return () => window.clearInterval(timer);
  }, [stage, reduced]);
  const atRest = stage === 4 && !reduced && resting;

  const level = LEVELS[stage];
  const t = reduced ? { duration: 0 } : { duration: 1.2, ease: EASE };
  const pipesShown = stage >= 2;
  const flowing = stage === 4 && !atRest && !reduced;
  const waterTop = level.sludge - level.water;
  const select = (i: number) => {
    setAuto(false);
    setStage(i);
  };

  return (
    <div ref={ref} className="loop">
      <div className="loop-stage">
        <div className="loop-topline">
          <span>{stages.loopLabel}</span>
          <span className="text-ink-3">{stages.note}</span>
        </div>
        <svg
          viewBox="0 0 720 300"
          className="loop-svg"
          role="img"
          aria-label={`${stages.loopLabel}: ${stages.items[stage].title}`}
          direction="ltr"
        >
          <defs>
            <clipPath id="loop-tank">
              <rect x="330" y="60" width="330" height={BOTTOM - 60} />
            </clipPath>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="#15774F" />
            </marker>
          </defs>
          <line x1="20" x2="700" y1={BOTTOM + 2} y2={BOTTOM + 2} stroke="#C9D2CC" strokeWidth="2" />
          {/* Tank contents */}
          <g clipPath="url(#loop-tank)">
            <motion.rect
              x="330"
              width="330"
              initial={false}
              animate={{
                y: level.liquid,
                height: waterTop - level.liquid,
                fill: level.separated ? "#7A1F2F" : "#E9C9D0",
              }}
              transition={t}
            />
            <motion.rect
              x="330"
              width="330"
              fill="#CFE3EC"
              initial={false}
              animate={{ y: waterTop, height: level.water }}
              transition={t}
            />
            <motion.rect
              x="330"
              width="330"
              initial={false}
              animate={{
                y: level.sludge,
                height: BOTTOM - level.sludge,
                fill: level.separated ? "#C8B386" : "#340B14",
              }}
              transition={t}
            />
            {/* Circulation arrows inside the tank */}
            <motion.path
              d="M352 176 Q500 150 640 200"
              fill="none"
              stroke="#962A3C"
              strokeWidth="2.5"
              strokeDasharray="9 8"
              markerEnd="url(#loop-arrow)"
              initial={false}
              animate={{ opacity: stage === 4 ? 1 : 0, strokeDashoffset: flowing ? [0, -68] : 0 }}
              transition={{ opacity: t, strokeDashoffset: flowing ? { duration: 1.2, repeat: Infinity, ease: "linear" } : { duration: 0 } }}
            />
            <motion.path
              d="M640 272 Q500 278 352 270"
              fill="none"
              stroke="#8FBFA8"
              strokeWidth="2.5"
              strokeDasharray="9 8"
              markerEnd="url(#loop-arrow)"
              initial={false}
              animate={{ opacity: stage === 4 ? 1 : 0, strokeDashoffset: flowing ? [0, -68] : 0 }}
              transition={{ opacity: t, strokeDashoffset: flowing ? { duration: 1.2, repeat: Infinity, ease: "linear" } : { duration: 0 } }}
            />
            {/* Oil breaking out of the sludge while at rest */}
            {atRest &&
              [380, 450, 520, 590, 625].map((x, i) => (
                <motion.circle
                  key={x}
                  cx={x}
                  r="4"
                  fill="#B9475B"
                  initial={{ cy: 262, opacity: 0 }}
                  animate={{ cy: 190, opacity: [0, 1, 0] }}
                  transition={{ duration: 1.4, delay: i * 0.12 }}
                />
              ))}
            {/* Cultures entering the tank */}
            {stage === 3 && !reduced &&
              [470, 500, 530, 515, 485].map((x, i) => (
                <motion.ellipse
                  key={`c${i}`}
                  cx={x}
                  rx="5"
                  ry="2.6"
                  fill="#3FBF7F"
                  initial={{ cy: 70, opacity: 0 }}
                  animate={{ cy: 250 - (i % 3) * 10, opacity: [0, 1, 1] }}
                  transition={{ duration: 1.8, delay: 0.5 + i * 0.35, ease: "easeIn" }}
                />
              ))}
            {stage >= 4 &&
              [370, 430, 500, 560, 620].map((x, i) => (
                <ellipse key={`m${i}`} cx={x} cy={level.sludge + 10 + (i % 2) * 8} rx="5" ry="2.6" fill="#3FBF7F" opacity={stage === 5 ? 0.4 : 1} />
              ))}
          </g>
          {/* Tank shell and roof */}
          <path d="M330 60 V280 H660 V60" fill="none" stroke="#0B1711" strokeWidth="2.5" />
          <path d="M326 60 Q495 30 664 60" fill="none" stroke="#0B1711" strokeWidth="2.5" />
          {/* Survey: sampling probe through the roof */}
          <AnimatePresence>
            {stage === 0 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.line
                  x1="600"
                  x2="600"
                  y1="42"
                  stroke="#0E5A3C"
                  strokeWidth="3"
                  initial={{ y2: 42 }}
                  animate={{ y2: 268 }}
                  transition={reduced ? { duration: 0 } : { duration: 1.6, ease: EASE }}
                />
                <rect x="590" y="24" width="20" height="18" rx="3" fill="#0E5A3C" />
              </motion.g>
            )}
          </AnimatePresence>
          {/* Laboratory: a sample settles into its phases */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.g initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <rect x="60" y="40" width="48" height="140" rx="22" fill="#fff" stroke="#0B1711" strokeWidth="2" />
                <motion.rect x="64" width="40" fill="#7A1F2F" initial={{ y: 130, height: 0 }} animate={{ y: 70, height: 50 }} transition={{ duration: 1.4, delay: 0.3 }} />
                <motion.rect x="64" width="40" fill="#CFE3EC" initial={{ height: 0, y: 150 }} animate={{ y: 120, height: 30 }} transition={{ duration: 1.4, delay: 0.3 }} />
                <rect x="64" y="150" width="40" height="24" rx="18" fill="#C8B386" />
                <text x="84" y="206" textAnchor="middle" fontSize="13" fill="#45564D" className="loop-svg-label">GC</text>
              </motion.g>
            )}
          </AnimatePresence>
          {/* Pump and piping */}
          <motion.g initial={false} animate={{ opacity: pipesShown ? 1 : 0.14 }} transition={t}>
            {[SUCTION, DISCHARGE].map((d) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#15774F"
                strokeWidth="9"
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: pipesShown ? 1 : 0.02 }}
                transition={reduced ? { duration: 0 } : { duration: stage === 2 ? 1.6 : 0.4, ease: EASE }}
              />
            ))}
            {[SUCTION, DISCHARGE].map((d, i) => (
              <motion.path
                key={`flow-${d}`}
                d={d}
                fill="none"
                stroke="#E4EFE8"
                strokeWidth="3"
                strokeDasharray="8 10"
                initial={false}
                animate={{
                  opacity: flowing ? 1 : 0,
                  strokeDashoffset: flowing ? [0, i === 0 ? 72 : -72] : 0,
                }}
                transition={flowing ? { strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.3 } } : { duration: 0.3 }}
              />
            ))}
            {[
              [240, 262],
              [240, 150],
            ].map(([x, y]) => (
              <path key={`${x}-${y}`} d={`M${x - 10} ${y - 9} L${x + 10} ${y + 9} V${y - 9} L${x - 10} ${y + 9} Z`} fill="#fff" stroke="#0B1711" strokeWidth="2" />
            ))}
            <circle cx="160" cy="250" r="26" fill="#fff" stroke="#15774F" strokeWidth="5" />
            <motion.path
              d="M160 236 L172 258 H148 Z"
              fill="#15774F"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={false}
              animate={{ rotate: flowing ? 360 : 0 }}
              transition={flowing ? { duration: 1.6, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
            />
            <text x="160" y="214" textAnchor="middle" fontSize="14" fontWeight="600" fill="#15774F" className="loop-svg-label" transform="translate(-58 30)">
              {stages.labels.pump}
            </text>
            <text x="240" y="132" textAnchor="middle" fontSize="12" fill="#45564D" className="loop-svg-label">
              {stages.labels.discharge}
            </text>
            <text x="240" y="294" textAnchor="middle" fontSize="12" fill="#45564D" className="loop-svg-label">
              {stages.labels.suction}
            </text>
          </motion.g>
          {/* Dosing point */}
          <motion.g initial={false} animate={{ opacity: stage === 3 ? 1 : 0.18 }} transition={t}>
            <line x1="495" x2="495" y1="0" y2="92" stroke="#15774F" strokeWidth="3" markerEnd="url(#loop-arrow)" />
          </motion.g>
          {/* Layer labels */}
          <g fontSize="13" textAnchor="middle" className="loop-svg-label">
            <motion.text
              x="495"
              initial={false}
              animate={{ y: (level.liquid + waterTop) / 2 + 4 }}
              transition={t}
              fill={level.separated ? "#fff" : "#4E1320"}
              fontWeight="600"
            >
              {level.separated ? layers.oil : stages.labels.crude}
            </motion.text>
            {level.separated && (
              <motion.text x="495" initial={{ opacity: 0 }} animate={{ opacity: 1, y: waterTop + level.water / 2 + 4 }} fill="#0C4733">
                {layers.water}
              </motion.text>
            )}
            <motion.text
              x="495"
              initial={false}
              animate={{ y: (level.sludge + BOTTOM) / 2 + 5 }}
              transition={t}
              fill={level.separated ? "#340B14" : "#fff"}
              fontWeight="600"
            >
              {level.separated ? layers.solids : stages.labels.sludge}
            </motion.text>
          </g>
        </svg>
        <div className="loop-status" aria-live="polite">
          <span className={`tank-live-dot ${flowing ? "" : "is-idle"}`} aria-hidden />
          {stage === 4 ? (atRest ? stages.resting : stages.circulating) : stages.items[stage].title}
        </div>
      </div>
      <ol className="loop-steps">
        {stages.items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => select(i)}
              aria-current={stage === i ? "step" : undefined}
              className="loop-step"
            >
              <span className="loop-step-no">{i + 1}</span>
              <span className="loop-step-title">{item.title}</span>
              <span className="loop-step-body">{item.body}</span>
              {stage === i && playing && (
                <i aria-hidden className="loop-progress" style={{ animationDuration: `${STEP_MS}ms` }} />
              )}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-ink-3">{stages.labels.dosing} · {stages.labels.pumps}</p>
    </div>
  );
}
