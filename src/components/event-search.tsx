"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import type { GoldTableEvent } from "@/content/events";
import { formatEventDate, formatEventTime } from "@/lib/events";

const postcodePattern = /^[A-Z]{1,2}\d/i;

function eventMatches(event: GoldTableEvent, rawQuery: string) {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  const haystack = [
    event.venueName,
    event.town,
    event.borough,
    event.postcode,
    event.addressLine1,
  ].join(" ").toLowerCase();

  if (haystack.includes(query)) return true;

  const compactQuery = query.replace(/\s+/g, "").toUpperCase();
  const postcodeArea = compactQuery.match(/^[A-Z]{1,2}/)?.[0];
  return Boolean(postcodePattern.test(compactQuery) && postcodeArea && event.postcode.startsWith(postcodeArea));
}

const weekdayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "Europe/London" });
const dayFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "Europe/London" });
const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Europe/London" });

export function EventSearch({ events, initialQuery = "" }: { events: GoldTableEvent[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [draft, setDraft] = useState(initialQuery);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filtered = events.filter((event) => eventMatches(event, query));

  function applySearch(submission: FormEvent<HTMLFormElement>) {
    submission.preventDefault();
    const nextQuery = draft.trim();
    setQuery(nextQuery);
    const url = nextQuery ? `/events?location=${encodeURIComponent(nextQuery)}` : "/events";
    window.history.replaceState(null, "", url);
  }

  function clearSearch() {
    setDraft("");
    setQuery("");
    window.history.replaceState(null, "", "/events");
    requestAnimationFrame(() => searchInputRef.current?.focus());
  }

  return <div className="event-search">
    <form className="event-search__form" onSubmit={applySearch} role="search">
      <label htmlFor="event-search">Postcode, town or borough</label>
      <div className="event-search__row">
        <input id="event-search" ref={searchInputRef} type="search" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="e.g. TW9 or Richmond" autoComplete="postal-code" />
        <button className="button button--gold" type="submit">Find events</button>
      </div>
      <p>Enter a postcode or place name.</p>
    </form>

    <div className="event-search__summary" aria-live="polite">
      <p>{query ? <><strong>{filtered.length}</strong> {filtered.length === 1 ? "event" : "events"} matching <strong>“{query}”</strong></> : <><strong>{filtered.length}</strong> upcoming {filtered.length === 1 ? "event" : "events"}</>}</p>
      {query ? <button type="button" onClick={clearSearch}>Clear search</button> : null}
    </div>

    {filtered.length ? <div className="event-results">{filtered.map((event) => {
      const date = new Date(event.startDateTime);
      return <article className="event-result" key={event.id}>
        <time className="event-result__date" dateTime={event.startDateTime} aria-label={formatEventDate(event.startDateTime)}>
          <span>{weekdayFormatter.format(date)}</span>
          <strong>{dayFormatter.format(date)}</strong>
          <span>{monthFormatter.format(date)}</span>
        </time>
        <div className="event-result__main">
          <h2>{event.venueName}</h2>
          <p>{event.addressLine1}, {event.town}, <strong>{event.postcode}</strong></p>
        </div>
        <div className="event-result__visit">
          <p><strong>{formatEventTime(event.startDateTime)}–{formatEventTime(event.endDateTime)}</strong></p>
          <p className="event-status"><span aria-hidden="true" />{event.walkInsWelcome ? "Walk-ins welcome" : "Appointment only"}</p>
        </div>
        <Link className="button button--ink" href={`/events/${event.slug}`}>View event details <span aria-hidden="true">→</span></Link>
      </article>;
    })}</div> : <div className="event-empty">
      <p className="eyebrow">No exact match yet</p>
      <h2>No published event for “{query}” yet.</h2>
      <p>Try a nearby town or postcode area, or leave your postcode below.</p>
      <a className="button button--ink" href="#event-alert">Tell us where to come next</a>
    </div>}
  </div>;
}
