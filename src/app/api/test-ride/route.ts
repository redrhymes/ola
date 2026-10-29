import { NextRequest, NextResponse } from "next/server";
import { testRideSchema } from "@/lib/validation";
import { deliverLead } from "@/lib/deliverLead";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestsByIp = new Map<string, number[]>();

function sanitizeString(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizePayload(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).map(([key, field]) => [
      key,
      typeof field === "string" ? sanitizeString(field) : field,
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

  // Avoid retaining expired keys indefinitely on long-lived local instances.
  if (requestsByIp.size > 1_000) {
    for (const [key, timestamps] of requestsByIp) {
      if (timestamps.every((timestamp) => now - timestamp >= WINDOW_MS)) {
        requestsByIp.delete(key);
      }
    }
  }
  return false;
}

export async function POST(request: NextRequest) {
  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON request." }, { status: 400 });
  }

  if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
    return NextResponse.json({ message: "Invalid request data." }, { status: 400 });
  }

  const rawBody = parsedBody as Record<string, unknown>;
  // Silently accept the honeypot to avoid informing bots that they were caught.
  if (typeof rawBody.company === "string" && rawBody.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const sanitized = sanitizePayload(rawBody);
  const result = testRideSchema.safeParse(sanitized);
  if (!result.success) {
    return NextResponse.json(
      {
        message: "Please review the highlighted fields.",
        fieldErrors: result.error.fieldErrors,
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
      console.log("Test ride request received", {
        ...result.data,
        mobile: `******${result.data.mobile.slice(-4)}`,
      });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { message: "Unable to submit your request. Please try again." },
      { status: 500 },
    );
  }
}
