import Link from "next/link";
import { ArrowRight } from "./Icons";

export default function SectionCta({
  label,
  dark = false,
  secondary,
}: {
  label: string;
  dark?: boolean;
  secondary?: { label: string; href: string };
}) {
  return (
    <div className="reveal mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row">
      <a href="#contact" className={`btn w-full sm:w-auto ${dark ? "btn-onDark" : "btn-primary"}`}>
        {label}
        <ArrowRight className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
      </a>
      {secondary && (
        <Link
          href={secondary.href}
          className={`btn w-full sm:w-auto ${dark ? "border border-white/35 text-white hover:bg-white/10" : "btn-ghost"}`}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
