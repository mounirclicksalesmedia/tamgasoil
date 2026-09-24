import { ArrowRight } from "./Icons";

export default function SectionCta({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className="reveal mt-10 flex sm:mt-12">
      <a href="#contact" className={`btn w-full sm:w-auto ${dark ? "btn-onDark" : "btn-primary"}`}>
        {label}
        <ArrowRight className="h-4 w-4 shrink-0 rtl:-scale-x-100" />
      </a>
    </div>
  );
}
