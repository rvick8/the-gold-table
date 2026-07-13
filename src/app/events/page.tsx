import type { Metadata } from "next";
import { EventSearch } from "@/components/event-search";
import { EventCard } from "@/components/event-card";
import { getUpcomingEvents, getPastEvents } from "@/lib/events";

export const metadata: Metadata = { title: "Find a free gold valuation event", description: "Search upcoming Gold Table events across Greater London and reserve a free private valuation.", alternates: { canonical: "/events" } };

export default async function EventsPage({ searchParams }: { searchParams: Promise<{ location?: string }> }) {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const { location = "" } = await searchParams;
  return <>
    <section className="events-page-hero"><div className="container"><p className="section-kicker">Free private valuations</p><h1>Find an event near you.</h1><p>Search by postcode, borough, venue or town.</p></div></section>
    <section className="section events-index"><div className="container"><h2>Upcoming events</h2><EventSearch events={upcoming} initialQuery={location} /></div></section>
    <section className="section past-events"><div className="container"><h2>Past events</h2><p>These pages remain available for local information and direct you to current dates.</p><div className="past-events__grid">{past.map((event) => <EventCard event={event} key={event.id} />)}</div></div></section>
  </>;
}
