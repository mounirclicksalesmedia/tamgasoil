"use client";

import { useState } from "react";
import type { PagesContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { ArrowRight } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error" | "unavailable";

/** Compact enquiry form with an accessible topic selector. */
export default function ContactForm({
  k,
  locale,
}: {
  k: PagesContent["contact"];
  locale: Locale;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [reason, setReason] = useState(k.reasons[0]);
  const generalEnquiry = k.reasons.indexOf(reason) >= 8;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (res.status === 503) {
        const result = await res.json();
        if (result.error === "delivery_not_configured") {
          setStatus("unavailable");
          return;
        }
      }
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
      setReason(k.reasons[0]);
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-lg border border-line bg-surface px-4 py-3.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-ink-3/70 focus:border-green-700 focus:ring-2 focus:ring-green-100";
  const label =
    "mb-2 block text-[13px] font-medium text-ink-2";

  return (
    <form onSubmit={onSubmit} aria-busy={status === "sending"}>
      <label className="mb-5 block">
        <span className={label}>{k.reasonLabel}</span>
        <select name="reason" value={reason} onChange={event => setReason(event.target.value)} className={`${field} pe-8`}>
          {k.reasons.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{k.fields.name}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>{k.fields.company}</span>
          <input name="company" required autoComplete="organization" className={field} />
        </label>
        <label className="block">
          <span className={label}>{k.fields.email}</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className={label}>{k.fields.phone} <span className="font-normal text-ink-3">({k.optionalLabel})</span></span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className={label}>{generalEnquiry ? k.generalMessage : k.fields.message}</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={generalEnquiry ? k.generalMessageHint : k.fields.messageHint}
          className={`${field} resize-y min-h-28`}
        />
      </label>

      <button type="submit" disabled={status === "sending"} className="btn btn-wine mt-6 w-full disabled:cursor-wait disabled:opacity-60">
        {status === "sending" ? k.sending : k.button}
        <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
      </button>

      {status === "sent" && (
        <p role="status" className="mt-6 rounded-xl border border-green-700/25 bg-green-50 px-4 py-3 text-[0.9375rem] text-green-800">
          {k.success}
        </p>
      )}
      {(status === "error" || status === "unavailable") && (
        <p role="alert" className="mt-6 rounded-xl border border-wine-700/25 bg-wine-100 px-4 py-3 text-[0.9375rem] text-wine-800">
          {status === "unavailable" ? k.deliveryUnavailable : k.error}
        </p>
      )}
    </form>
  );
}
