"use client";

import { useState } from "react";
import type { PagesContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Dark band with a white lead-capture card sitting inside it — the pattern
 * from Customer.io's comparison pages.
 */
export default function LeadBand({
  p,
  locale,
}: {
  p: PagesContent;
  locale: Locale;
}) {
  const b = p.leadBand;
  const k = p.contact;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, reason: b.eyebrow, source: "LEAD_BAND" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-lg border border-line bg-paper px-3.5 py-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-3/70 focus:border-green-700 focus:bg-white";
  const label = "mb-1.5 block font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-3";

  return (
    <section className="relative overflow-hidden bg-green-950 text-white">
      <div className="shell relative grid items-center gap-12 py-20 lg:grid-cols-[1fr_0.92fr] lg:gap-16 lg:py-24">
        <div className="reveal">
          <p className="eyebrow eyebrow-light text-green-300">{b.eyebrow}</p>
          <h2 className="display-2 mt-6 text-balance">
            <span className="block text-white">{b.headingLead}</span>
            <span className="block text-green-300">{b.headingAccent}</span>
          </h2>
          <ul className="mt-9 space-y-4">
            {b.points.map((point) => (
              <li key={point} className="flex gap-3.5">
                <svg className="mt-[6px] h-3.5 w-3.5 shrink-0 text-green-300" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="m2.8 7.3 2.6 2.6L11.2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[0.9375rem] leading-[1.7] text-white/70">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ ["--reveal-delay" as string]: "110ms" }}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-surface p-6 md:p-8"
          >
            <p className="text-[1.0625rem] font-medium tracking-[-0.015em] text-ink">
              {b.formTitle}
            </p>

            <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
              <label className="block">
                <span className={label}>{k.fields.name}</span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className={label}>{k.fields.company}</span>
                <input name="company" required autoComplete="organization" className={field} />
              </label>
            </div>

            <label className="mt-3.5 block">
              <span className={label}>{k.fields.email}</span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>

            <label className="mt-3.5 block">
              <span className={label}>{k.fields.message}</span>
              <textarea
                name="message"
                required
                rows={3}
                placeholder={k.fields.messageHint}
                className={`${field} resize-none`}
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary mt-6 w-full disabled:opacity-60"
            >
              {status === "sending" ? k.sending : k.button}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </button>

            <p className="mt-4 text-center font-mono text-[10.5px] tracking-[0.05em] text-ink-3">
              {k.note}
            </p>

            {status === "sent" && (
              <p role="status" className="mt-4 rounded-lg border border-green-700/25 bg-green-50 px-3.5 py-2.5 text-[0.875rem] text-green-800">
                {k.success}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="mt-4 rounded-lg border border-wine-700/25 bg-wine-100 px-3.5 py-2.5 text-[0.875rem] text-wine-800">
                {k.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
