import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = "greg.brenner@broadlab.tv";
const FROM_EMAIL = "onboarding@resend.dev"; // swap for a @broadlab.tv address once domain is verified in Resend

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, company, email, phone, query, enquiryType } = body;

    if (!firstName || !lastName || !email || !query) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New BroadLab enquiry — ${firstName} ${lastName}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #0a3b4b;">
          <div style="background: #0a3b4b; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <p style="color: #3aaece; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin: 0 0 4px;">New enquiry</p>
            <p style="color: white; font-size: 20px; font-weight: 700; margin: 0;">BroadLab Contact Form</p>
          </div>
          <div style="border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 32px;">

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; font-size: 12px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; width: 140px;">Name</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0a3b4b; font-weight: 600;">${firstName} ${lastName}</td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; font-size: 12px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Company</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0a3b4b;">${company || "—"}</td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; font-size: 12px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Email</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0a3b4b;"><a href="mailto:${email}" style="color: #3aaece;">${email}</a></td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; font-size: 12px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Phone</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0a3b4b;">${phone || "—"}</td>
              </tr>
              <tr style="border-top: 1px solid #f3f4f6;">
                <td style="padding: 8px 0; font-size: 12px; color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Enquiry type</td>
                <td style="padding: 8px 0; font-size: 14px; color: #0a3b4b;">${enquiryType || "—"}</td>
              </tr>
            </table>

            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; border-left: 3px solid #3aaece;">
              <p style="font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px;">Their query</p>
              <p style="font-size: 14px; color: #0a3b4b; line-height: 1.6; margin: 0; white-space: pre-wrap;">${query}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <a href="mailto:${email}" style="display: inline-block; background: #0a3b4b; color: white; font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 20px; text-decoration: none;">
                Reply to ${firstName}
              </a>
            </div>

          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
