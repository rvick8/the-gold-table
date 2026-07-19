import { NextRequest, NextResponse } from "next/server";
import { validateForm, type FormResponse } from "@/lib/forms";
import { forwardToHookdeck } from "@/lib/hookdeck";
import { getEventBySlug, generateSlots, getEventStatus } from "@/lib/events";

const attempts = new Map<string, number[]>();
const WINDOW = 60_000;
const MAX_ATTEMPTS = 8;
const MAX_BODY_BYTES = 32_000;
let lastCleanup = 0;

function rateLimited(ip: string) {
  const now = Date.now();
  if (now - lastCleanup > WINDOW) {
    for (const [key, times] of attempts) {
      const active = times.filter((time) => now - time < WINDOW);
      if (active.length) attempts.set(key, active);
      else attempts.delete(key);
    }
    lastCleanup = now;
  }
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW);
  recent.push(now); attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  const mediaType = contentType.split(";", 1)[0].trim().toLowerCase();
  if (mediaType !== "application/json") {
    return NextResponse.json<FormResponse>({ success: false, message: "This form requires a JSON request." }, { status: 415 });
  }
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json<FormResponse>({ success: false, message: "That submission is too large." }, { status: 413 });
  }
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.nextUrl.host) {
        return NextResponse.json<FormResponse>({ success: false, message: "Cross-site form submissions are not accepted." }, { status: 403 });
      }
    } catch {
      return NextResponse.json<FormResponse>({ success: false, message: "Invalid request origin." }, { status: 403 });
    }
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return NextResponse.json<FormResponse>({ success: false, message: "Too many attempts. Please wait a minute and try again." }, { status: 429 });
  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json<FormResponse>({ success: false, message: "That submission is too large." }, { status: 413 });
    }
    raw = JSON.parse(body);
  } catch {
    return NextResponse.json<FormResponse>({ success: false, message: "We could not read that submission." }, { status: 400 });
  }
  if ((raw as { website?: string })?.website) return NextResponse.json<FormResponse>({ success: true, message: "Thank you." });
  const parsed = validateForm(raw);
  if (!parsed.success) return NextResponse.json<FormResponse>({ success: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  let authoritativeEvent: Record<string, string> = {};
  if (parsed.data.form_type === "event_reservation") {
    const event = getEventBySlug(parsed.data.eventSlug);
    const validSlots = event ? generateSlots(event).map((slot) => slot.value) : [];
    if (!event || getEventStatus(event) !== "upcoming" || !validSlots.includes(new Date(parsed.data.preferredTime).toISOString())) {
      return NextResponse.json<FormResponse>({ success: false, message: "That appointment time is no longer available. Please choose another." }, { status: 400 });
    }
    authoritativeEvent = {
      eventId: event.id,
      eventSlug: event.slug,
      eventName: event.venueName,
      eventDate: event.startDateTime,
      eventAddress: [event.addressLine1, event.town, event.postcode].join(", "),
    };
  }
  const payload = { ...parsed.data, ...authoritativeEvent, submissionTimestamp: new Date().toISOString(), submissionId: crypto.randomUUID(), userAgent: request.headers.get("user-agent") || undefined };
  try {
    const result = await forwardToHookdeck(payload);
    return NextResponse.json<FormResponse>({ success: true, message: result.development ? "Development submission accepted. No webhook was sent." : "Your details have been received.", submissionId: payload.submissionId, development: result.development });
  } catch (error) {
    console.error("Form delivery failed", error);
    return NextResponse.json<FormResponse>({ success: false, message: "We could not submit the form just now. Please try again shortly." }, { status: 502 });
  }
}
