import type { SiteContent } from "@/lib/content";

/**
 * Non-entry treatment, drawn as a technical cross-section:
 * dose goes in through an existing nozzle, sludge digests down,
 * recovered oil is drawn off. Loops on a 6s cycle.
 */
export default function TankDiagram({ c }: { c: SiteContent }) {
  const d = c.hero.diagram;

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      {/* dotted technical field */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-[32px] opacity-[0.55]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--color-green-300) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <svg viewBox="0 0 520 470" className="w-full" role="img" aria-label={d.title}>
        <defs>
          <linearGradient id="oilFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-green-600)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-green-700)" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="sludgeFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-wine-600)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--color-wine-800)" stopOpacity="0.95" />
          </linearGradient>
          <clipPath id="tankClip">
            <path d="M120 122v212a14 14 0 0 0 14 14h252a14 14 0 0 0 14-14V122Z" />
          </clipPath>
        </defs>

        {/* ── dosing line in ───────────────────────── */}
        <g>
          <path
            d="M176 46v34"
            stroke="var(--color-green-700)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="160"
            y="80"
            width="32"
            height="18"
            rx="4"
            fill="var(--color-surface)"
            stroke="var(--color-green-700)"
            strokeWidth="1.5"
          />
          <path
            className="anim-dose"
            d="M176 98v86"
            stroke="var(--color-green-600)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="7 6"
          />
          <circle cx="176" cy="46" r="5" fill="var(--color-green-700)" />
          <circle
            className="anim-ring"
            cx="176"
            cy="46"
            r="11"
            fill="none"
            stroke="var(--color-green-600)"
            strokeWidth="1.5"
            style={{ transformOrigin: "176px 46px" }}
          />
        </g>

        {/* ── tank shell ───────────────────────────── */}
        <g clipPath="url(#tankClip)">
          {/* recovered oil band */}
          <rect
            className="anim-oil"
            x="120"
            y="236"
            width="280"
            height="62"
            fill="url(#oilFill)"
          />
          {/* sludge layer, digesting down */}
          <rect
            className="anim-sludge"
            x="120"
            y="252"
            width="280"
            height="96"
            fill="url(#sludgeFill)"
          />
        </g>

        <path
          d="M120 122v212a14 14 0 0 0 14 14h252a14 14 0 0 0 14-14V122"
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity="0.55"
          strokeWidth="1.6"
        />
        {/* floating roof */}
        <ellipse
          cx="260"
          cy="122"
          rx="140"
          ry="22"
          fill="var(--color-surface)"
          stroke="var(--color-ink)"
          strokeOpacity="0.55"
          strokeWidth="1.6"
        />
        <ellipse cx="260" cy="122" rx="112" ry="15" fill="none" stroke="var(--color-line)" strokeWidth="1.2" />
        <ellipse cx="260" cy="122" rx="78" ry="9" fill="none" stroke="var(--color-line)" strokeWidth="1.2" />

        {/* shell seams */}
        <path d="M120 190h280M120 258h280" stroke="var(--color-line)" strokeWidth="1" />

        {/* ── gauge ticks ──────────────────────────── */}
        <g stroke="var(--color-ink)" strokeOpacity="0.28" strokeWidth="1">
          <path d="M98 150h14M98 190h9M98 230h9M98 270h14M98 310h9M98 348h9" />
          <path d="M98 146v206" strokeOpacity="0.18" />
        </g>
        <text
          x="92"
          y="154"
          textAnchor="end"
          className="fill-ink-3 font-mono"
          fontSize="9.5"
          letterSpacing="0.08em"
        >
          100%
        </text>
        <text
          x="92"
          y="274"
          textAnchor="end"
          className="fill-ink-3 font-mono"
          fontSize="9.5"
          letterSpacing="0.08em"
        >
          50%
        </text>

        {/* ── recovery draw-off ────────────────────── */}
        <g>
          <path
            d="M400 318h44a10 10 0 0 0 10-10v-46"
            fill="none"
            stroke="var(--color-green-700)"
            strokeWidth="1.5"
          />
          <path
            className="anim-oil"
            d="M454 262v-16"
            stroke="var(--color-green-600)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M454 234l-6 9h12l-6-9Z"
            fill="var(--color-green-700)"
            className="anim-oil"
          />
          <circle cx="400" cy="318" r="4.5" fill="var(--color-green-700)" />
        </g>

        {/* ── ground line ──────────────────────────── */}
        <path
          d="M74 372h372"
          stroke="var(--color-ink)"
          strokeOpacity="0.16"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <g stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1">
          <path d="M92 372l-10 12M132 372l-10 12M172 372l-10 12M212 372l-10 12M252 372l-10 12M292 372l-10 12M332 372l-10 12M372 372l-10 12M412 372l-10 12" />
        </g>
      </svg>

      {/* ── labels, in page type so they localise ── */}
      <span className="anim-chip absolute start-[4%] top-[14%] rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-green-700 shadow-[0_6px_20px_-12px_rgba(11,23,17,0.4)]">
        {d.dose}
      </span>
      <span
        className="anim-chip absolute end-[2%] top-[38%] rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-green-700 shadow-[0_6px_20px_-12px_rgba(11,23,17,0.4)]"
        style={{ animationDelay: "1.4s" }}
      >
        {d.oil}
      </span>
      <span
        className="anim-chip absolute top-[60%] start-[1%] rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-wine-700 shadow-[0_6px_20px_-12px_rgba(11,23,17,0.4)]"
        style={{ animationDelay: "2.6s" }}
      >
        {d.sludge}
      </span>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {d.chips.map((chip) => (
          <span key={chip} className="tag">
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
