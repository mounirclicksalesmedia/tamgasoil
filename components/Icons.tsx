import Image from "next/image";

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

export function Logo({ className = "h-auto w-52", onDark = false }: IconProps & { onDark?: boolean }) {
  return (
    <Image
      src="/brand/tam-logo.webp"
      alt="Tam Oil & Gas Services Co., W.L.L."
      width={1200}
      height={354}
      unoptimized
      className={`${className} object-contain ${onDark ? "brightness-0 invert" : ""}`}
    />
  );
}
