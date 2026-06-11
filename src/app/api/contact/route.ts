import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from "next/server";

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "no-reply@Broadlab.tech";
const TO_EMAIL   = process.env.CONTACT_TO_EMAIL   ?? "info@Broadlab.tv";

// In-memory rate limiter: max 3 submissions per IP per 10 minutes
const rateMap = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_LIMIT) return true;
  rateMap.set(ip, [...hits, now]);
  return false;
}

function htmlEmail(name: string, email: string, company: string, reason: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="background:#0d2535;border-radius:12px 12px 0 0;padding:32px 40px">
          <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#3a6682">Broadlab</p>
          <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3">New website enquiry</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px 40px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding-bottom:24px;border-bottom:1px solid #e5e7eb">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af">From</p>
              <p style="margin:0;font-size:16px;font-weight:600;color:#0d2535">${name}</p>
              <p style="margin:2px 0 0;font-size:14px;color:#6b7280">${email}</p>
            </td></tr>
            <tr><td style="padding:24px 0;border-bottom:1px solid #e5e7eb">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af">Company</p>
              <p style="margin:0;font-size:15px;color:#374151">${company || "-"}</p>
            </td></tr>
            <tr><td style="padding:24px 0">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af">Message</p>
              <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;white-space:pre-wrap">${reason}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 12px 12px;padding:20px 40px;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#9ca3af">Sent from Broadlab.tv contact form · Reply directly to <a href="mailto:${email}" style="color:#3a6682">${email}</a></p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const ses = new SESClient({
    region: process.env.SES_REGION ?? "eu-west-2",
    credentials: {
      accessKeyId:     process.env.SES_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.SES_SECRET_ACCESS_KEY ?? "",
    },
  });

  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, reason, website } = body;

  // Honeypot - bots fill this in, humans don't
  if (website) {
    return NextResponse.json({ ok: true }); // silently accept to not tip off bots
  }

  // Server-side validation
  if (!name?.trim() || !email?.trim() || !reason?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (name.length > 200 || email.length > 200 || company.length > 200 || reason.length > 5000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  try {
    await ses.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: [email],
      Message: {
        Subject: { Data: `New enquiry from ${name}${company ? ` at ${company}` : ""}`, Charset: "UTF-8" },
        Body: {
          Html: { Data: htmlEmail(name, email, company, reason), Charset: "UTF-8" },
          Text: { Data: `From: ${name} (${email})\nCompany: ${company || "-"}\n\n${reason}`, Charset: "UTF-8" },
        },
      },
    }));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SES error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
