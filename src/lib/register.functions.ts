import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const ADMIN_EMAIL = "youths.powerhouse@gmail.com";
const FROM = "Gospel Jamz <noreply@tphcreatives.com>";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const inputSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).nullable().optional(),
  group_name: z.string().trim().max(120).nullable().optional(),
  heard_from: z.string().trim().max(120).nullable().optional(),
  notes: z.string().trim().max(1000).nullable().optional(),
  days_attending: z.array(z.string().trim().max(40)).min(1).max(10),
});

type RegistrationInput = z.infer<typeof inputSchema>;

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function sendEmail(to: string, subject: string, html: string) {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const resendKey = process.env["RESEND_API_KEY"];
  if (!lovableKey || !resendKey) {
    console.error("[register] Missing email credentials");
    return;
  }
  const response = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": resendKey,
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  });
  if (!response.ok) {
    const body = await response.text();
    console.error(`[register] Email send failed [${response.status}]: ${body}`);
  }
}

const shell = (inner: string) => `
<div style="margin:0;padding:32px 16px;background:#000000;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#0b0b0b;border:1px solid #262626;padding:32px;">
    <p style="margin:0 0 24px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8b5cf6;">
      Gospel Jamz 2026 &middot; To Live Is Christ
    </p>
    ${inner}
    <p style="margin:32px 0 0;padding-top:20px;border-top:1px solid #262626;font-size:12px;color:#777777;">
      The Power House Int&rsquo;l &middot; 16&ndash;18 October 2026 &middot; tphcreatives.com
    </p>
  </div>
</div>`;

function registrantHtml(d: RegistrationInput) {
  return shell(`
    <h1 style="margin:0 0 16px;font-size:26px;color:#ffffff;">You&rsquo;re registered, ${esc(d.full_name)}.</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#cccccc;">
      Your place at Gospel Jamz 2026 is confirmed. Three nights of worship, word and creative arts &mdash;
      entry is free.
    </p>
    <p style="margin:0 0 8px;font-size:14px;color:#ffffff;"><strong>Days you&rsquo;re coming:</strong></p>
    <p style="margin:0 0 20px;font-size:14px;color:#cccccc;">${esc(d.days_attending.join(" &middot; "))}</p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#cccccc;">
      We&rsquo;ll email the full running order closer to the date. See you in October.
    </p>
  `);
}

function adminHtml(d: RegistrationInput) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px 6px 0;font-size:13px;color:#888888;">${label}</td>
     <td style="padding:6px 0;font-size:13px;color:#ffffff;">${esc(value)}</td></tr>`;
  return shell(`
    <h1 style="margin:0 0 16px;font-size:24px;color:#ffffff;">New registration</h1>
    <table style="width:100%;border-collapse:collapse;">
      ${row("Name", d.full_name)}
      ${row("Email", d.email)}
      ${row("Phone", d.phone || "—")}
      ${row("Days", d.days_attending.join(", "))}
      ${row("Church / group", d.group_name || "—")}
      ${row("Heard from", d.heard_from || "—")}
      ${row("Notes", d.notes || "—")}
    </table>
    <p style="margin:24px 0 0;font-size:13px;color:#cccccc;">
      View everyone and download the Excel file on the organiser desk.
    </p>
  `);
}

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(url, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabase.from("registrations").insert({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone || null,
      group_name: data.group_name || null,
      heard_from: data.heard_from || null,
      notes: data.notes || null,
      days_attending: data.days_attending,
    });
    if (error) throw new Error(error.message);

    await Promise.all([
      sendEmail(data.email, "You're registered — Gospel Jamz 2026", registrantHtml(data)),
      sendEmail(
        ADMIN_EMAIL,
        `New Gospel Jamz 2026 registration — ${data.full_name}`,
        adminHtml(data),
      ),
    ]);

    return { ok: true };
  });
