type IconProps = { className?: string };

export function ArrowRight({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Plus({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function PlayCircle({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.9" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.6 5.6 10.3 8l-3.7 2.4V5.6Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = "h-9 w-9", onDark = false }: IconProps & { onDark?: boolean }) {
  /* Placeholder mark — replace with the client's vector logo when supplied. */
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect
        width="40"
        height="40"
        rx="11"
        className={onDark ? "fill-white/10 stroke-white/25" : "fill-green-800"}
        strokeWidth="1"
      />
      <circle cx="20" cy="20" r="11" stroke="white" strokeOpacity="0.45" strokeWidth="1.5" />
      <path
        d="M9.6 22.4a11 11 0 0 0 20.8 0 22 22 0 0 1-20.8 0Z"
        className="fill-wine-600"
      />
      <path d="M20 9v8.4" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
