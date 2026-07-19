import { NextResponse } from "next/server";
import { getEventBySlug, getEventStatus } from "@/lib/events";

const stamp = (value: string) => new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const escapeIcs = (value: string) => value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const event = getEventBySlug((await params).slug);
  if (!event || getEventStatus(event) !== "upcoming") return new NextResponse("Event not found", { status: 404 });
  const address = [event.addressLine1, event.addressLine2, event.town, event.postcode].filter(Boolean).join(", ");
  const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Gold Table//Events//EN", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `UID:${event.id}@thegoldtable.co.uk`, `DTSTAMP:${stamp(new Date().toISOString())}`, `DTSTART:${stamp(event.startDateTime)}`, `DTEND:${stamp(event.endDateTime)}`, `SUMMARY:${escapeIcs(`The Gold Table at ${event.venueName}`)}`, `LOCATION:${escapeIcs(address)}`, `DESCRIPTION:${escapeIcs("Free private valuation with no obligation to sell. Check the event page for appointment and walk-in details.")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  return new NextResponse(body, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="the-gold-table-${event.slug}.ics"` } });
}
