import { NextResponse } from "next/server";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = asString(payload.name);
  const email = asString(payload.email);
  const message = asString(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Email format is invalid." }, { status: 400 });
  }

  if (name.length > 80 || email.length > 120 || message.length > 1600) {
    return NextResponse.json(
      { error: "Submitted values are too long." },
      { status: 400 },
    );
  }

  const normalizedPayload = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedPayload),
        cache: "no-store",
      });

      if (!webhookResponse.ok) {
        return NextResponse.json(
          { error: "Message could not be delivered." },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Webhook delivery failed." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    message: webhookUrl
      ? "Thanks, your message has been sent."
      : "Message received. Set CONTACT_WEBHOOK_URL to forward submissions.",
  });
}

export function GET() {
  return NextResponse.json({ message: "Use POST to submit the contact form." });
}
