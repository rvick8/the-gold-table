import Link from "next/link";
import type { GoldTableEvent } from "@/content/events";
import { formatEventDate, formatEventTime, getEventStatus } from "@/lib/events";

export function EventCard({ event }: { event: GoldTableEvent }) {
  const status = getEventStatus(event);

  return <article className="event-card">
    <p className={`event-card__status event-card__status--${status}`}>{status === "upcoming" ? (event.walkInsWelcome ? "Walk-ins welcome" : "Appointment only") : "Event ended"}</p>
    <h3>{event.venueName}</h3>
    <p className="event-card__location">{event.town}, {event.postcode}</p>
    <p><strong>{formatEventDate(event.startDateTime)}</strong><br />{formatEventTime(event.startDateTime)}–{formatEventTime(event.endDateTime)}</p>
    <p>{event.shortDescription}</p>
    <Link className="text-link" href={`/events/${event.slug}`}>{status === "upcoming" ? "Event details & times" : "View event"} <span aria-hidden="true">→</span></Link>
  </article>;
}
