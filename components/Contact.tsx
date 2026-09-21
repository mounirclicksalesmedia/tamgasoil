"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ c, locale }: { c: SiteContent; locale: Locale }) {
  const k = c.contact;
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
        body: JSON.stringify({ ...data, locale, source: "HOME" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3.5 text-[0.9375rem] text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/45 focus:bg-white/10";

  return (
    <section id="contact" className="relative overflow-hidden bg-wine-900 text-white">
      <div className="shell section relative grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow eyebrow-light text-wine-300">{k.eyebrow}</p>
          <h2 className="display-2 mt-6 text-balance text-white">{k.heading}</h2>
          <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.7] text-white/70">{k.body}</p>

          <dl className="mt-12 space-y-5 border-t border-white/15 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              {k.detailsLabel}
            </p>
            {[
              [k.details.emailLabel, k.details.email],
              [k.details.phoneLabel, k.details.phone],
              [k.details.addressLabel, k.details.address],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-wrap gap-x-4 gap-y-1">
                <dt className="min-w-[7.5rem] text-[0.875rem] text-white/45">{label}</dt>
                <dd className="text-[0.9375rem] text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="reveal" style={{ ["--reveal-delay" as string]: "120ms" }}>
          <form
            onSubmit={onSubmit}
            className="contact-form rounded-2xl bg-paper p-6 md:p-9"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {k.fields.name}
                </span>
                <input name="name" required autoComplete="name" className={field} />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {k.fields.company}
                </span>
                <input name="company" required autoComplete="organization" className={field} />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                {k.fields.email}
              </span>
              <input name="email" type="email" required autoComplete="email" className={field} />
            </label>

            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                {k.fields.message}
              </span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder={k.fields.messageHint}
                className={`${field} resize-none`}
              />
            </label>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[11px] tracking-[0.05em] text-white/45">{k.note}</p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn bg-white text-wine-900 hover:bg-white/90 disabled:opacity-60"
              >
                {status === "sending" ? k.sending : k.button}
                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
              </button>
            </div>

            {status === "sent" && (
              <p
                role="status"
                className="mt-5 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-[0.9375rem] text-white"
              >
                {k.success}
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="mt-5 rounded-xl border border-white/25 bg-wine-950/50 px-4 py-3 text-[0.9375rem] text-white"
              >
                {k.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
