import { NextResponse } from "next/server";
import { InquirySource, Locale } from "@prisma/client";
import { db } from "@/lib/server/db";

/**
 * Proposal requests from the site's three forms (contact page, lead band,
 * homepage). Every valid submission is stored as an Inquiry and appears in
 * the portal; email delivery is optional on top of that.
 */

type Payload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  reason?: unknown;
  message?: unknown;
  locale?: unknown;
  source?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = str(body.name, 120);
  const company = str(body.company, 160);
  const email = str(body.email, 180).toLowerCase();
  const phone = str(body.phone, 60);
  const reason = str(body.reason, 120);
  const message = str(body.message, 4000);
  const locale = body.locale === "ar" ? Locale.ar : Locale.en;
  const source =
    body.source === "LEAD_BAND" ? InquirySource.LEAD_BAND
    : body.source === "HOME" ? InquirySource.HOME
    : InquirySource.CONTACT;

  if (!name || !company || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
    return NextResponse.json({ error: "validation_failed" }, { status: 422 });
  }

  const inquiry = await db.inquiry.create({
    data: {
      name, company, email, message, locale, source,
      phone: phone || null,
      reason: reason || null,
      userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
    },
  });

  // --- Optional email delivery (Resend) ---------------------------------
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (key && to) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "TAM Website <website@tamoilgas.com>",
        to: [to],
        reply_to: email,
        subject: `Inquiry — ${company} (${reason || source})`,
        text: `${name} · ${company}\n${email} ${phone}\nReason: ${reason}\nSource: ${source} · ${locale}\n\n${message}\n\nPortal: /admin/inquiries/${inquiry.id}`,
      }),
    }).catch(() => undefined); // the row is already saved; delivery must not fail the request
  }

  return NextResponse.json({ ok: true, id: inquiry.id });
}
