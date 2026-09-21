"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`btn btn-primary !py-2.5 !text-[14px] disabled:opacity-60 ${className}`}>
      {pending ? "Saving…" : children}
    </button>
  );
}

export const fieldCls = "w-full rounded-lg border border-line bg-paper px-3 py-2 text-[14px] outline-none focus:border-green-700 focus:bg-surface";
export const labelCls = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[12px] text-ink-3">{hint}</span>}
    </label>
  );
}

/** EN / AR tabs. Both panels stay mounted so a single form submits both locales. */
export function LocaleTabs({ en, ar }: { en: React.ReactNode; ar: React.ReactNode }) {
  const [tab, setTab] = useState<"en" | "ar">("en");
  return (
    <div>
      <div className="mb-4 flex gap-1 rounded-lg bg-line-2 p-1">
        {(["en", "ar"] as const).map((l) => (
          <button key={l} type="button" onClick={() => setTab(l)} className={["flex-1 rounded-md px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]", tab === l ? "bg-surface text-ink shadow-sm" : "text-ink-3"].join(" ")}>
            {l === "en" ? "English" : "العربية"}
          </button>
        ))}
      </div>
      <div className={tab === "en" ? "" : "hidden"}>{en}</div>
      <div className={tab === "ar" ? "" : "hidden"} dir="rtl">{ar}</div>
    </div>
  );
}
