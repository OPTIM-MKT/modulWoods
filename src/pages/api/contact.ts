import type { APIRoute } from "astro";
import { z } from "zod";
import { Resend } from "resend";

import { CONTACT } from "@/constants/site";

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

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const parsed = payload.safeParse(body);
  if (!parsed.success) return json({ error: "invalid_payload" }, 400);

  const { name, email, phone, company, message, lang, website } = parsed.data;

  // Silently accept the honeypot so the bot doesn't learn it was caught.
  if (website) return json({ ok: true }, 200);

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.CONTACT_FROM ?? "Modul Woods <onboarding@resend.dev>";
  const to = import.meta.env.CONTACT_TO ?? CONTACT.email;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — email not sent.");
    return json({ error: "not_configured" }, 500);
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["E-mail", email],
    ["Phone", phone || "—"],
    ["Company", company || "—"],
    ["Language", lang ?? "—"],
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Website enquiry — ${name}`,
      html: `
        <table style="font-family:system-ui,sans-serif;font-size:14px">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:4px 12px 4px 0;color:#7b6a5d">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
            )
            .join("")}
        </table>
        <hr style="border:none;border-top:1px solid #e5ded3;margin:20px 0" />
        <p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) throw error;
    return json({ ok: true }, 200);
  } catch (error) {
    console.error("[contact] send failed", error);
    return json({ error: "send_failed" }, 502);
  }
};
