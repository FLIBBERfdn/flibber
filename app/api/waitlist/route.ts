import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type WaitlistPayload = {
  name?: string;
  email?: string;
  evmAddress?: string;
  xUsername?: string;
  telegram?: string;
  discord?: string;
  xPostLink?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EVM_RE = /^0x[a-fA-F0-9]{40}$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: WaitlistPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const evmAddress = (body.evmAddress ?? "").trim();
  const xUsername = (body.xUsername ?? "").trim();
  const telegram = (body.telegram ?? "").trim();
  const discord = (body.discord ?? "").trim();
  const xPostLink = (body.xPostLink ?? "").trim();

  if (!name || !email || !evmAddress || !xUsername || !telegram || !discord || !xPostLink) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (!EVM_RE.test(evmAddress)) {
    return NextResponse.json({ error: "Invalid EVM address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL || "flibberfdn@gmail.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    // Never leak configuration state to the client — log server-side only.
    console.error(
      "Waitlist submission failed: missing RESEND_API_KEY or RESEND_FROM_EMAIL in this environment."
    );
    return NextResponse.json(
      { error: "We couldn't process your submission right now. Please try again shortly." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);

    const rows: [string, string][] = [
      ["Name", name],
      ["Email", email],
      ["EVM address", evmAddress],
      ["X username", xUsername],
      ["Telegram", telegram],
      ["Discord", discord],
      ["X post link", xPostLink],
    ];

    const html = `
      <div style="font-family: -apple-system, sans-serif; background:#0A0A0A; color:#ECEEF1; padding:24px;">
        <h2 style="margin:0 0 16px; font-weight:500;">New Flibber waitlist submission</h2>
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px 0; color:#686D75; border-bottom:1px solid #222;">${escapeHtml(k)}</td>
              <td style="padding:8px 0; color:#ECEEF1; border-bottom:1px solid #222;">${escapeHtml(v)}</td>
            </tr>`
            )
            .join("")}
        </table>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Flibber waitlist: ${name}`,
      html,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "We couldn't process your submission right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected waitlist error:", err);
    return NextResponse.json(
      { error: "We couldn't process your submission right now. Please try again shortly." },
      { status: 500 }
    );
  }
}
