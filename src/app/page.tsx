import Image from "next/image";
import Link from "next/link";
import { EventFinder } from "@/components/event-finder";
import { FaqAccordion } from "@/components/faq-accordion";
import { StructuredData } from "@/components/structured-data";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import {
  formatEventDate,
  formatEventTime,
  getFeaturedEvents,
  getUpcomingEvents,
} from "@/lib/events";

const valuedItems = [
  ["Gold jewellery", "Rings, chains, bracelets, earrings and pendants"],
  ["Broken gold", "Damaged chains, single earrings and unwanted pieces"],
  ["Coins & bullion", "Sovereigns, Krugerrands, bars and collections"],
  ["Watches", "Gold, luxury and vintage watches"],
  ["Silver", "Jewellery, silverware, medals and collectables"],
  ["Inherited items", "Single pieces or collections you want to understand"],
] as const;

const processSteps = [
  ["01", "Bring it", "One item or a whole collection—there is no need to sort it first."],
  ["02", "We assess it", "Your valuer tests each piece and explains what they find."],
  ["03", "You decide", "Hear any offer, ask questions or take everything home."],
] as const;

const homeTrustFacts = [
  ["Free valuation", "There is no charge to attend."],
  ["At the table", "We explain each item as we assess it."],
  ["No obligation", "You decide whether to sell."],
] as const;

const weekdayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "Europe/London" });
const dayFormatter = new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "Europe/London" });
const monthFormatter = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Europe/London" });

export const revalidate = 300;

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  const upcoming = (featuredEvents.length ? featuredEvents : getUpcomingEvents()).slice(0, 3);

  return <>
    <section className="home-hero" aria-labelledby="home-hero-heading">
      <div className="container home-hero__grid">
        <div className="home-hero__copy">
          <p className="eyebrow eyebrow--light">Local gold-buying events</p>
          <h1 id="home-hero-heading" className="home-hero__heading"><span>Find an event.</span><em>Bring your gold.</em></h1>
          <p className="home-hero__intro">Bring jewellery, coins, watches or silver. We assess each item at the table, explain any offer and you decide.</p>
          <EventFinder />
          <ul className="reassurance-list" aria-label="Valuation reassurance">
            <li>Free valuation</li>
            <li>No obligation to sell</li>
            <li>Private and discreet</li>
          </ul>
        </div>
        <div className="home-hero__media">
          <Image
            src="/images/gold-table-valuation-event-v2.png"
            alt="A Gold Table valuer carefully explaining a ring to a customer at a local event"
            fill
            sizes="(max-width: 700px) 1px, (max-width: 900px) 100vw, 50vw"
            className="home-hero__image"
          />
          <div className="home-hero__caption"><strong>Free. Private. Face to face.</strong><span>Most appointments take 15 minutes.</span></div>
        </div>
      </div>
    </section>

    <section className="section upcoming-section" aria-labelledby="upcoming-heading">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Upcoming events</p>
            <h2 id="upcoming-heading">Choose an event.</h2>
            <p>Date, time, postcode and walk-in details—up front.</p>
          </div>
          <Link className="text-link" href="/events">View every event <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-event-grid">
          {upcoming.map((event) => {
            const date = new Date(event.startDateTime);
            return <article className="home-event-card" key={event.id}>
              <time className="home-event-card__date" dateTime={event.startDateTime} aria-label={formatEventDate(event.startDateTime)}>
                <span>{weekdayFormatter.format(date)}</span>
                <strong>{dayFormatter.format(date)}</strong>
                <span>{monthFormatter.format(date)}</span>
              </time>
              <div className="home-event-card__body">
                <div className="event-status"><span aria-hidden="true" />{event.walkInsWelcome ? "Walk-ins welcome" : "Appointment only"}</div>
                <h3>{event.venueName}</h3>
                <p>{event.town}, {event.borough}<br /><strong>{event.postcode} · {formatEventTime(event.startDateTime)}–{formatEventTime(event.endDateTime)}</strong></p>
                <Link href={`/events/${event.slug}`}>View event details <span aria-hidden="true">→</span></Link>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className="home-trust-rail" aria-labelledby="home-trust-heading">
      <div className="container home-trust-rail__grid">
        <div className="home-trust-rail__intro">
          <p className="eyebrow eyebrow--light">The essentials</p>
          <h2 id="home-trust-heading">Clear. Local. Your choice.</h2>
        </div>
        <ol className="home-trust-rail__facts">
          {homeTrustFacts.map(([heading, copy], index) => <li key={heading}>
            <span aria-hidden="true">0{index + 1}</span>
            <div><strong>{heading}</strong><p>{copy}</p></div>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="section process-section" aria-labelledby="process-heading">
      <div className="container process-section__grid">
        <div className="process-section__media">
          <Image
            src="/images/gold-table-valuation-close-up-v2.png"
            alt="A Gold Table valuer inspecting a ring with a loupe while a customer watches"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <div className="image-label">Tested carefully. Explained clearly.</div>
        </div>
        <div className="process-section__copy">
          <p className="eyebrow">At the event</p>
          <h2 id="process-heading">Three simple steps.</h2>
          <ol className="numbered-steps">
            {processSteps.map(([number, heading, copy]) => <li key={number}>
              <span>{number}</span>
              <div><h3>{heading}</h3><p>{copy}</p></div>
            </li>)}
          </ol>
          <Link className="text-link" href="/how-it-works">See exactly how it works <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>

    <section id="what-we-buy" className="section accepted-section" aria-labelledby="accepted-heading">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">What we value and buy</p>
            <h2 id="accepted-heading">Bring the pieces you no longer wear or need.</h2>
          </div>
          <p>You do not need to know the carat, weight or value before you visit. Broken, tangled and incomplete pieces are welcome too.</p>
        </div>
        <ul className="accepted-list">
          {valuedItems.map(([heading, copy], index) => <li key={heading}>
            <span>0{index + 1}</span><div><strong>{heading}</strong><p>{copy}</p></div>
          </li>)}
        </ul>
      </div>
    </section>

    <section className="section home-faq" aria-labelledby="home-faq-heading">
      <div className="container home-faq__grid">
        <div>
          <p className="eyebrow">Before you go</p>
          <h2 id="home-faq-heading">Questions?</h2>
          <p>Quick answers before you choose an event.</p>
          <Link className="text-link" href="/faqs">View all FAQs <span aria-hidden="true">→</span></Link>
        </div>
        <FaqAccordion items={faqs.slice(0, 3)} />
      </div>
    </section>

    <StructuredData data={{
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.url,
      description: site.description,
    }} />
  </>;
}
