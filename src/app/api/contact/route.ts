import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { deliverLead } from "@/lib/deliverLead";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 12_000;
const requestsByIp = new Map<string, number[]>();

function sanitizePayload(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).map(([key, field]) => [
      key,
      typeof field === "string"
        ? key === "message"
          ? field.replace(/[\u0000-\u0008\u000B-\u001F\u007F-\u009F]/g, "").trim()
          : field.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ").replace(/\s+/g, " ").trim()
        : field,
    ]),
  );
}

function isRateLimited(ip: string, now: number) {
  const recent = (requestsByIp.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  if (recent.length >= MAX_REQUESTS) {
    requestsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  requestsByIp.set(ip, recent);

  if (requestsByIp.size > 1_000) {
    for (const [key, timestamps] of requestsByIp) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
        requestsByIp.delete(key);
      }
    }
  }
  return false;
}

function maskEmail(email: string) {
  const [local = "", domain = ""] = email.split("@");
  return `${local.slice(0, 1)}***@${domain}`;
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Request is too large." }, { status: 413 });
  }

  let requestText: string;
  try {
    requestText = await request.text();
  } catch {
    return NextResponse.json({ message: "Unable to read request." }, { status: 400 });
  }
  if (new TextEncoder().encode(requestText).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Request is too large." }, { status: 413 });
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(requestText);
  } catch {
    return NextResponse.json({ message: "Invalid JSON request." }, { status: 400 });
  }

  if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
    return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
  }

  const rawBody = parsedBody as Record<string, unknown>;
  // Silently accept the honeypot so automated submitters receive no signal.
  if (typeof rawBody.company === "string" && rawBody.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = contactSchema.safeParse(sanitizePayload(rawBody));
  if (!result.success) {
    const flattened = result.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        message: "Please review the highlighted fields.",
        fieldErrors: flattened,
      },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip, Date.now())) {
    return NextResponse.json(
      { message: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  try {
    await deliverLead(result.data);
    if (process.env.NODE_ENV !== "production") {
      console.info("Contact enquiry received", {
        fullName: `${result.data.fullName.slice(0, 1)}***`,
        email: maskEmail(result.data.email),
        mobile: `******${result.data.mobile.slice(-4)}`,
        // Subject/message are intentionally excluded from logs.
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
