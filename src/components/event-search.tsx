"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { GoldTableEvent, VenueType } from "@/content/events";
import { formatEventDate, formatEventTime } from "@/lib/events";

export function EventSearch({ events, initialQuery = "" }: { events: GoldTableEvent[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState("");
  const filtered = useMemo(() => events.filter((event) => {
    const haystack = [event.venueName, event.town, event.borough, event.postcode, event.addressLine1].join(" ").toLowerCase();
    return haystack.includes(query.trim().toLowerCase()) && (!type || event.venueType === type);
  }), [events, query, type]);

  return <div>
    <div className="event-search-controls">
      <div className="field"><label htmlFor="event-search">Postcode or location</label><input id="event-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. Richmond or TW9" /></div>
      <div className="field"><label htmlFor="venue-type">Venue type</label><select id="venue-type" value={type} onChange={(event) => setType(event.target.value)}><option value="">All venue types</option>{(["Pub", "Golf club", "Hotel", "Community venue"] satisfies VenueType[]).map((value) => <option key={value}>{value}</option>)}</select></div>
    </div>
    <p aria-live="polite"><strong>{filtered.length}</strong> {filtered.length === 1 ? "event" : "events"} found</p>
    {filtered.length ? <div className="event-search-results">{filtered.map((event) => {
      const date = new Date(event.startDateTime);
      return <Link className="event-result-row" href={`/events/${event.slug}`} key={event.id}>
        <span className="event-result-row__date" aria-label={formatEventDate(event.startDateTime)}>
          <small>{new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "Europe/London" }).format(date)}</small>
          <strong>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "Europe/London" }).format(date)}</strong>
          <small>{new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Europe/London" }).format(date)}</small>
        </span>
        <span className="event-result-row__venue"><small>{event.venueType}</small><strong>{event.venueName}</strong><span>{event.town}, {event.borough}</span></span>
        <span className="event-result-row__time"><strong>{formatEventTime(event.startDateTime)}–{formatEventTime(event.endDateTime)}</strong><span>{event.walkInsWelcome ? "Walk-ins welcome" : "Appointment only"}</span></span>
        <span className="event-result-row__action">View &amp; reserve <span aria-hidden="true">→</span></span>
      </Link>;
    })}</div> : <div className="event-empty"><h3>No matching events</h3><p>Try a nearby borough, postcode or a different venue type.</p></div>}
  </div>;
}
