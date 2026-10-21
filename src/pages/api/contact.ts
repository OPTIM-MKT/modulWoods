import type { APIRoute } from "astro";
import { z } from "zod";
import { Resend } from "resend";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

import { CONTACT } from "@/constants/site";
import { EmailTemplate } from "@/components/contact/email-template";
import type { ContactEmailData } from "@/components/contact/email-template";

export const prerender = false;

const payload = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(12).max(4000),
  lang: z.string().max(5).optional(),
  /** Honeypot — anything here means a bot filled the form. */
  website: z.string().max(0).optional().or(z.literal("")),
});

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  /* ── 1. Parse body ─────────────────────────────────────────────────── */
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const parsed = payload.safeParse(body);
  if (!parsed.success) return json({ error: "invalid_payload" }, 400);

  const { name, email, phone, company, message, lang, website } = parsed.data;

  /* ── 2. Honeypot check — silently accept so bots don't learn ───────── */
  if (website) return json({ ok: true }, 200);

  /* ── 3. Config ─────────────────────────────────────────────────────── */
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from =
    import.meta.env.CONTACT_FROM_EMAIL ?? "Modul Woods <onboarding@resend.dev>";
  const to = import.meta.env.CONTACT_TO_EMAIL ?? CONTACT.email;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — email not sent.");
    return json({ error: "not_configured" }, 500);
  }

  /* ── 4. Build email ────────────────────────────────────────────────── */
  const data: ContactEmailData = {
    name,
    email,
    phone: phone || undefined,
    company: company || undefined,
    message,
    lang,
  };

  const html = renderToStaticMarkup(
    React.createElement(EmailTemplate, { data }),
  );

  const subject = company
    ? `Website enquiry — ${name} (${company})`
    : `Website enquiry — ${name}`;

  /* ── 5. Send ───────────────────────────────────────────────────────── */
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
    });

    if (error) throw error;
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] send failed", error);
    return json({ error: "send_failed" }, 502);
  }
};
