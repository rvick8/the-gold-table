import { EventSearch } from "@/components/event-search";
import { GoldTableForm } from "@/components/forms";
import { getUpcomingEvents } from "@/lib/events";
import { createPageMetadata } from "@/lib/metadata";
import { VisualMarker } from "@/components/visual-marker";

export const metadata = createPageMetadata({
  title: "Find a local gold valuation event",
  description: "Search upcoming Gold Table events across Greater London. See dates, times, addresses and walk-in details, then request a free private valuation.",
  canonical: "/events",
});

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ location?: string | string[] }> }) {
  const upcoming = getUpcomingEvents();
  const rawLocation = (await searchParams).location;
  const location = Array.isArray(rawLocation) ? rawLocation[0] ?? "" : rawLocation ?? "";

  return <>
    <section className="events-hero">
      <div className="container events-hero__grid">
        <div>
          <p className="eyebrow eyebrow--light">Free private valuations</p>
          <VisualMarker name="calendar" label="Event calendar" />
          <h1>Find an event.</h1>
        </div>
        <p>Search by postcode, town or borough. Every result shows the date, time, postcode and walk-in status.</p>
      </div>
    </section>
    <section className="section events-index" aria-label="Upcoming events">
      <div className="container">
        <EventSearch events={upcoming} initialQuery={location} />
      </div>
    </section>
    <section id="event-alert" className="section event-alert" aria-labelledby="event-alert-heading">
      <div className="container event-alert__grid">
        <div>
          <p className="eyebrow">No event nearby?</p>
          <VisualMarker name="calendar" label="Future event notification" />
          <h2 id="event-alert-heading">Tell us your area.</h2>
          <p>Leave your postcode and a contact detail. We will let you know when a date is published nearby.</p>
        </div>
        <GoldTableForm kind="event_interest" />
      </div>
    </section>
  </>;
}
