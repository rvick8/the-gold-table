import { EventSearch } from "@/components/event-search";
import { GoldTableForm } from "@/components/forms";
import { AssuranceRibbon } from "@/components/assurance-ribbon";
import { getUpcomingEvents } from "@/lib/events";
import { createPageMetadata } from "@/lib/metadata";

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
          <h1>Find a Gold Table event near you.</h1>
        </div>
        <p>Search upcoming dates by postcode, town or borough. Every listing shows when to come, where to go and whether walk-ins are welcome.</p>
      </div>
    </section>
    <AssuranceRibbon audience="seller" />
    <section className="section events-index" aria-label="Upcoming events">
      <div className="container">
        <EventSearch events={upcoming} initialQuery={location} />
      </div>
    </section>
    <section id="event-alert" className="section event-alert" aria-labelledby="event-alert-heading">
      <div className="container event-alert__grid">
        <div>
          <p className="eyebrow">Nothing close enough?</p>
          <h2 id="event-alert-heading">Tell us where you would like to see The Gold Table.</h2>
          <p>Leave your postcode and a contact detail. We will record the demand for your area and can let you know when a suitable date is published.</p>
        </div>
        <GoldTableForm kind="event_interest" />
      </div>
    </section>
  </>;
}
