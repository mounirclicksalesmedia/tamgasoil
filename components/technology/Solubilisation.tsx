"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/profile";

type How = Profile["technology"]["how"];

const TOP = 24,
  HEIGHT = 300,
  LEFT = 24,
  WIDTH = 352;

/** Layer shares from the bottom up, per stage: [bottom, water, oil]. */
const SHARES = [
  [1, 0, 0],
  [0.76, 0, 0.24],
  [0.5, 0.16, 0.34],
  [0.16, 0.24, 0.6],
];
const BOTTOM_FILL = ["#340B14", "#4E1320", "#4E1320", "#C8B386"];
const OIL_FILL = ["#962A3C", "#962A3C", "#7A1F2F", "#7A1F2F"];

const MICROBES = [
  [70, 0.82],
  [128, 0.62],
  [196, 0.88],
  [262, 0.7],
  [318, 0.84],
  [98, 0.94],
  [236, 0.95],
];

function Step({
  index,
  onActive,
  children,
}: {
  index: number;
  onActive: (i: number) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <li ref={ref} className="solub-step" data-step={index}>
      {children}
    </li>
  );
}

export default function Solubilisation({ how }: { how: How }) {
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();
  const [bottom, water, oil] = SHARES[stage];
  const bottomH = bottom * HEIGHT,
    waterH = water * HEIGHT,
    oilH = oil * HEIGHT;
  const bottomY = TOP + HEIGHT - bottomH,
    waterY = bottomY - waterH,
    oilY = waterY - oilH;
  const transition = reduced
    ? { duration: 0 }
    : { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const };
  const bottomLabel =
    stage === 0 ? how.layers.bound : stage === 3 ? how.layers.solids : how.layers.sludge;
  const oilLabel = stage === 3 ? how.layers.hydrocarbons : how.layers.oil;
  const animateLife = !reduced && stage > 0 && stage < 3;

  return (
    <div className="solub grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
      <div className="solub-sticky">
        <figure className="solub-figure">
          <svg
            viewBox="0 0 400 360"
            role="img"
            aria-label={`${how.heading}: ${how.stages[stage].label}`}
            className="h-full w-full"
            direction="ltr"
          >
            <defs>
              <clipPath id="solub-clip">
                <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} rx="6" />
              </clipPath>
              <pattern id="solub-grain" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="4" r="1.1" fill="#ffffff14" />
                <circle cx="10" cy="11" r=".9" fill="#ffffff10" />
              </pattern>
            </defs>
            <g clipPath="url(#solub-clip)">
              <rect x={LEFT} y={TOP} width={WIDTH} height={HEIGHT} fill="#F6E8EB" />
              <motion.rect
                x={LEFT}
                width={WIDTH}
                initial={false}
                animate={{ y: oilY, height: oilH, fill: OIL_FILL[stage] }}
                transition={transition}
              />
              <motion.rect
                x={LEFT}
                width={WIDTH}
                initial={false}
                animate={{ y: waterY, height: waterH }}
                transition={transition}
                fill="#CFE3EC"
              />
              <motion.rect
                x={LEFT}
                width={WIDTH}
                initial={false}
                animate={{ y: bottomY, height: bottomH, fill: BOTTOM_FILL[stage] }}
                transition={transition}
              />
              {stage < 3 && (
                <motion.rect
                  x={LEFT}
                  width={WIDTH}
                  fill="url(#solub-grain)"
                  initial={false}
                  animate={{ y: bottomY, height: bottomH }}
                  transition={transition}
                />
              )}
              {stage > 0 &&
                MICROBES.map(([x, depth], i) => {
                  const y = bottomY + bottomH * (1 - depth) + 8;
                  return (
                    <motion.ellipse
                      key={i}
                      rx="5"
                      ry="2.6"
                      fill="#3FBF7F"
                      initial={false}
                      animate={
                        animateLife
                          ? {
                              cx: [x, x + 14, x - 6, x],
                              cy: [y, y - 8, y + 4, y],
                              opacity: 1,
                            }
                          : { cx: x, cy: y, opacity: stage === 3 ? 0.35 : 1 }
                      }
                      transition={
                        animateLife
                          ? { duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut" }
                          : transition
                      }
                    />
                  );
                })}
              {animateLife &&
                [90, 170, 250, 320, 140, 290].map((x, i) => (
                  <motion.circle
                    key={`drop-${stage}-${i}`}
                    cx={x}
                    r={3 + (i % 3)}
                    fill="#B9475B"
                    initial={{ cy: TOP + HEIGHT - 12, opacity: 0 }}
                    animate={{ cy: oilY + oilH / 2, opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 3.4,
                      delay: i * 0.55,
                      repeat: Infinity,
                      repeatDelay: 0.8,
                      ease: "easeIn",
                    }}
                  />
                ))}
            </g>
            <rect
              x={LEFT}
              y={TOP}
              width={WIDTH}
              height={HEIGHT}
              rx="6"
              fill="none"
              stroke="#0C4733"
              strokeWidth="2"
            />
            <g className="solub-labels" fontSize="13" textAnchor="middle">
              {oilH > 26 && (
                <motion.text
                  x={200}
                  fill="#fff"
                  initial={false}
                  animate={{ y: oilY + oilH / 2 + 5 }}
                  transition={transition}
                >
                  {oilLabel}
                </motion.text>
              )}
              {waterH > 26 && (
                <motion.text
                  x={200}
                  fill="#0C4733"
                  initial={false}
                  animate={{ y: waterY + waterH / 2 + 5 }}
                  transition={transition}
                >
                  {how.layers.water}
                </motion.text>
              )}
              <motion.text
                x={200}
                fill={stage === 3 ? "#340B14" : "#fff"}
                initial={false}
                animate={{ y: bottomY + bottomH / 2 + 5 }}
                transition={transition}
              >
                {bottomLabel}
              </motion.text>
            </g>
          </svg>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-xs text-ink-3">
            <span className="flex gap-1.5" aria-hidden>
              {how.stages.map((s, i) => (
                <i
                  key={s.label}
                  className={`block h-1.5 rounded-full transition-all duration-500 ${i === stage ? "w-8 bg-wine-700" : "w-3 bg-line"}`}
                />
              ))}
            </span>
            {how.note}
          </figcaption>
        </figure>
      </div>
      <ol className="solub-steps">
        {how.stages.map((s, i) => (
          <Step key={s.label} index={i} onActive={setStage}>
            <div className={`solub-card ${stage === i ? "is-active" : ""}`}>
              <p className="text-lg font-medium text-wine-700">{s.label}</p>
              <p className="mt-3 text-ink-2">{s.body}</p>
            </div>
          </Step>
        ))}
      </ol>
    </div>
  );
}
