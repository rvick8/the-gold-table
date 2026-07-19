import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/content/events";
import { getEventBySlug, getEventStatus, formatEventDate, formatEventTime, getRelatedEvents } from "@/lib/events";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventCard } from "@/components/event-card";
import { GoldTableForm } from "@/components/forms";
import { StructuredData } from "@/components/structured-data";
import { FaqAccordion } from "@/components/faq-accordion";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const event = getEventBySlug((await params).slug);
  if (!event) return {};
  const status = getEventStatus(event);
  const past = status === "past";
  const cancelled = status === "cancelled";
  const title = cancelled
      ? `${event.venueName} gold valuation event — cancelled`
      : past
        ? `${event.venueName} gold valuation event — ended`
        : `Free gold valuation at ${event.venueName}, ${event.town}`;
  const description = cancelled
      ? `The Gold Table event at ${event.venueName} has been cancelled. Find another upcoming free valuation event near ${event.town}.`
      : past
        ? `This Gold Table event at ${event.venueName} has ended. Find upcoming free valuation events near ${event.town}.`
        : `Visit ${event.venueName} in ${event.town} for a free private gold valuation. See the date, time, address and walk-in details.`;

  return createPageMetadata({
    title,
    description,
    canonical: `/events/${event.slug}`,
    robots: cancelled || (past && event.noIndexWhenPast) ? { index: false, follow: true } : undefined,
    image: { url: event.image, alt: event.imageAlt },
  });
}

function eventNote(value: string | undefined, fallback: string) {
  if (!value || /confirmation required|expected;/i.test(value)) return fallback;
  return value;
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const event = getEventBySlug((await params).slug);
  if (!event) notFound();

  const status = getEventStatus(event);
  const upcoming = status === "upcoming";
  const cancelled = status === "cancelled";
  const address = [event.addressLine1, event.addressLine2, event.town, event.postcode].filter(Boolean).join(", ");
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const related = getRelatedEvents(event);

  return <>
    <Breadcrumbs items={[{ label: "Events", href: "/events" }, { label: event.venueName }]} />
    <section className="event-detail-hero">
      <div className="container event-detail-hero__grid">
        <div className="event-detail-hero__copy">
          <p className="eyebrow">{upcoming ? "Free local gold valuation" : cancelled ? "This event has been cancelled" : "This event has ended"}</p>
          <h1>{cancelled ? "Cancelled: gold valuation event" : upcoming ? "Free gold valuation" : "Gold valuation event"} at {event.venueName}, {event.town}</h1>
          <p className="event-detail-hero__intro">{event.shortDescription}</p>

          <dl className="event-essentials">
            <div><dt>Date</dt><dd>{formatEventDate(event.startDateTime)}{upcoming ? <><br /><a href={`/api/calendar/${event.slug}`}>Add event hours to calendar <span aria-hidden="true">↓</span></a></> : null}</dd></div>
            <div><dt>Time</dt><dd>{formatEventTime(event.startDateTime)}–{formatEventTime(event.endDateTime)}</dd></div>
            <div><dt>Address</dt><dd>{event.addressLine1},<br />{event.town}, {event.postcode}.<br /><a href={directionsUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></a></dd></div>
            <div><dt>Visiting</dt><dd>{event.walkInsWelcome ? "Walk-ins welcome; confirmed times are prioritised." : "Appointment requests only."}<br />{event.appointmentMinutes}-minute appointments.</dd></div>
          </dl>

          {upcoming ? <div className="event-detail-hero__actions">
            <a className="button button--gold" href="#request-time">Request a free time <span aria-hidden="true">→</span></a>
            <a className="text-link" href={directionsUrl} target="_blank" rel="noreferrer">Directions <span aria-hidden="true">↗</span></a>
          </div> : <div className="notice-panel"><strong>{cancelled ? "This event will not be taking place." : "Appointment requests have closed for this date."}</strong><p>See current events to find another Gold Table near you.</p><Link className="text-link" href="/events">View upcoming events <span aria-hidden="true">→</span></Link></div>}

          <ul className="reassurance-list reassurance-list--ink" aria-label="Event reassurance"><li>Free valuation</li><li>Private</li><li>No obligation to sell</li></ul>
        </div>
        <div className="event-detail-hero__media">
          <Image src={event.image} alt={event.imageAlt} fill preload sizes="(max-width: 900px) 100vw, 46vw" />
          <div className="image-label">Gold · jewellery · coins · watches · silver</div>
        </div>
      </div>
    </section>

    <section className="section visit-section" aria-labelledby="visit-heading">
      <div className="container">
        <div className="section-heading"><p className="eyebrow">Plan your visit</p><h2 id="visit-heading">Everything you need before you travel.</h2></div>
        <div className="visit-grid">
          <article><span>01</span><h3>Parking</h3><p>{eventNote(event.parkingNotes, "Parking details will be confirmed before this event.")}</p></article>
          <article><span>02</span><h3>Public transport</h3><p>{eventNote(event.transportNotes, "Public-transport details will be confirmed before this event.")}</p></article>
          <article><span>03</span><h3>Accessibility</h3><p>{eventNote(event.accessibilityNotes, "Accessibility details will be confirmed before this event.")}</p></article>
        </div>
      </div>
    </section>

    <section className="section event-expect" aria-labelledby="expect-heading">
      <div className="container event-expect__grid">
        <div>
          <p className="eyebrow">What to bring</p>
          <h2 id="expect-heading">Bring what you are curious about.</h2>
          <p>Gold jewellery, broken pieces, coins, bullion, watches, silver and inherited collections are all welcome. You do not need to know the weight or carat first.</p>
          <p className="small-note">If you might choose to sell, check your event confirmation for any identification or payment information you need to bring.</p>
        </div>
        <div>
          <p className="eyebrow">What happens</p>
          <ol className="compact-steps">
            <li><span>1</span><p>We look at, weigh and test each item as appropriate.</p></li>
            <li><span>2</span><p>We explain what we have found and answer your questions.</p></li>
            <li><span>3</span><p>Where we can buy an item, we make and explain an offer.</p></li>
            <li><span>4</span><p>You decide whether to sell or take everything home.</p></li>
          </ol>
        </div>
      </div>
    </section>

    {upcoming ? <section id="request-time" className="section reserve-section" aria-labelledby="request-time-heading">
      <div className="container reserve-grid">
        <div className="reserve-copy">
          <p className="eyebrow">Request an appointment</p>
          <h2 id="request-time-heading">Choose a free 15-minute time.</h2>
          <p>Send your preferred time so the team knows to expect you. We will pass the request to the event team for confirmation.</p>
          {event.walkInsWelcome ? <div className="walk-in-note"><strong>Prefer to keep it flexible?</strong><p>Walk-ins are welcome during the advertised hours, although guests with confirmed times are prioritised.</p></div> : null}
          <ul className="check-list"><li>Free to request</li><li>No obligation to sell</li><li>Takes about a minute</li></ul>
        </div>
        <GoldTableForm kind="event_reservation" event={event} />
      </div>
    </section> : null}

    <section className="section event-faq" aria-labelledby="event-faq-heading">
      <div className="container home-faq__grid">
        <div><p className="eyebrow">Before you attend</p><h2 id="event-faq-heading">Common questions.</h2><p>These answers cover the valuation, offers and what happens if you decide not to sell.</p></div>
        <FaqAccordion items={faqs.slice(0, 7)} />
      </div>
    </section>

    {related.length ? <section className="section related-events" aria-labelledby="related-heading"><div className="container"><div className="section-heading section-heading--split"><h2 id="related-heading">Other upcoming events</h2><Link className="text-link" href="/events">View all events <span aria-hidden="true">→</span></Link></div><div className="related-events__grid">{related.map((relatedEvent) => <EventCard event={relatedEvent} key={relatedEvent.id} />)}</div></div></section> : null}

    {upcoming ? <div className="mobile-event-actions"><a href={directionsUrl} target="_blank" rel="noreferrer">Directions</a><a href="#request-time">Request a free time</a></div> : null}

    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "Event",
      name: `Free Gold Valuation at ${event.venueName}`,
      description: event.shortDescription,
      url: `${site.url}/events/${event.slug}`,
      image: `${site.url}${event.image}`,
      startDate: event.startDateTime,
      endDate: event.endDateTime,
      eventStatus: upcoming ? "https://schema.org/EventScheduled" : cancelled ? "https://schema.org/EventCancelled" : "https://schema.org/EventCompleted",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: event.venueName,
        address: {
          "@type": "PostalAddress",
          streetAddress: [event.addressLine1, event.addressLine2].filter(Boolean).join(", "),
          addressLocality: event.town,
          postalCode: event.postcode,
          addressCountry: "GB",
        },
      },
      organizer: { "@type": "Organization", name: site.name, url: site.url },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "GBP",
        availability: upcoming ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
        url: `${site.url}/events/${event.slug}`,
      },
    }} />
  </>;
}
