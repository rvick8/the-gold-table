import { NextRequest, NextResponse } from "next/server";
import { validateForm, type FormResponse } from "@/lib/forms";
import { forwardToHookdeck } from "@/lib/hookdeck";
import { getEventBySlug, generateSlots, getEventStatus } from "@/lib/events";

const attempts = new Map<string, number[]>();
const WINDOW = 60_000;
const MAX_ATTEMPTS = 8;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter((time) => now - time < WINDOW);
  recent.push(now); attempts.set(ip, recent);
  return recent.length > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  if (rateLimited(ip)) return NextResponse.json<FormResponse>({ success: false, message: "Too many attempts. Please wait a minute and try again." }, { status: 429 });
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json<FormResponse>({ success: false, message: "We could not read that submission." }, { status: 400 }); }
  if ((raw as { website?: string })?.website) return NextResponse.json<FormResponse>({ success: true, message: "Thank you." });
  const parsed = validateForm(raw);
  if (!parsed.success) return NextResponse.json<FormResponse>({ success: false, message: "Please check the highlighted fields.", fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.form_type === "event_reservation") {
    const event = getEventBySlug(parsed.data.eventSlug);
    const validSlots = event ? generateSlots(event).map((slot) => slot.value) : [];
    if (!event || getEventStatus(event) !== "upcoming" || !validSlots.includes(new Date(parsed.data.preferredTime).toISOString())) {
      return NextResponse.json<FormResponse>({ success: false, message: "That appointment time is no longer available. Please choose another." }, { status: 400 });
    }
  }
  const payload = { ...parsed.data, submissionTimestamp: new Date().toISOString(), submissionId: crypto.randomUUID(), userAgent: request.headers.get("user-agent") || undefined };
  try {
    const result = await forwardToHookdeck(payload);
    return NextResponse.json<FormResponse>({ success: true, message: result.development ? "Development submission accepted. No webhook was sent." : "Your details have been received.", submissionId: payload.submissionId, development: result.development });
  } catch (error) {
    console.error("Form delivery failed", error);
    return NextResponse.json<FormResponse>({ success: false, message: "We could not submit the form just now. Please try again shortly." }, { status: 502 });
  }
}
