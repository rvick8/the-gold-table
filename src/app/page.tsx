import Image from "next/image";
import Link from "next/link";
import { EventFinder } from "@/components/event-finder";
import { FaqAccordion } from "@/components/faq-accordion";
import { StructuredData } from "@/components/structured-data";
import { faqs } from "@/content/faqs";
import { site } from "@/content/site";
import { guestPlaceholderQuotes } from "@/content/social-proof";
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
  ["01", "Bring what you have", "One item or a whole collection—there is no need to sort it first."],
  ["02", "We test and explain", "Your valuer examines each piece and talks you through what they find."],
  ["03", "Hear a clear offer", "Where we can buy an item, we explain the offer before you decide."],
  ["04", "You stay in control", "Sell, ask more questions or take everything home. The choice is yours."],
] as const;

const homeTrustFacts = [
  ["See it assessed", "Your valuer examines each item in front of you and explains what they find."],
  ["Understand the offer", "You can ask questions and hear what is shaping the offer before deciding."],
  ["Keep control", "The valuation is free, and you are under no obligation to sell anything."],
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
          <p className="eyebrow eyebrow--light">Free local gold valuations</p>
          <h1 id="home-hero-heading">See what your gold is worth. <em>Sell only if it feels right.</em></h1>
          <p className="home-hero__intro">Bring jewellery, coins, watches or silver to a Gold Table event near you. We test each item, explain what we can offer and let you decide—without pressure.</p>
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
            preload
            sizes="(max-width: 700px) 1px, (max-width: 900px) 100vw, 50vw"
            className="home-hero__image"
          />
          <div className="home-hero__caption"><strong>A clear valuation, face to face.</strong><span>Most appointments take 15 minutes.</span></div>
        </div>
      </div>
    </section>

    <section className="home-trust-rail" aria-labelledby="home-trust-heading">
      <div className="container home-trust-rail__grid">
        <div className="home-trust-rail__intro">
          <p className="eyebrow eyebrow--light">The Gold Table promise</p>
          <h2 id="home-trust-heading">A clear process from the first hello.</h2>
        </div>
        <ol className="home-trust-rail__facts">
          {homeTrustFacts.map(([heading, copy], index) => <li key={heading}>
            <span aria-hidden="true">0{index + 1}</span>
            <div><strong>{heading}</strong><p>{copy}</p></div>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="section upcoming-section" aria-labelledby="upcoming-heading">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Upcoming gold-buying events</p>
            <h2 id="upcoming-heading">Find a table near you.</h2>
            <p>Everything you need to plan your visit, at a glance.</p>
          </div>
          <Link className="text-link" href="/events">View every event <span aria-hidden="true">→</span></Link>
        </div>
        <div className="home-event-grid">
          {upcoming.map((event) => {
            const date = new Date(event.startDateTime);
            return <article className="home-event-card" key={event.id}>
              <div className="home-event-card__date" aria-label={formatEventDate(event.startDateTime)}>
                <span>{weekdayFormatter.format(date)}</span>
                <strong>{dayFormatter.format(date)}</strong>
                <span>{monthFormatter.format(date)}</span>
              </div>
              <div className="home-event-card__body">
                <div className="event-status"><span aria-hidden="true" />{event.walkInsWelcome ? "Walk-ins welcome" : "Appointment only"}</div>
                <h3>{event.venueName}</h3>
                <p>{event.town}, {event.borough}<br /><strong>{formatEventTime(event.startDateTime)}–{formatEventTime(event.endDateTime)}</strong></p>
                <Link href={`/events/${event.slug}`}>View details &amp; request a time <span aria-hidden="true">→</span></Link>
              </div>
            </article>;
          })}
        </div>
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
          <p className="eyebrow">What happens at the table</p>
          <h2 id="process-heading">A straightforward way to understand—and sell—your gold.</h2>
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

    <section className="section confidence-section" aria-labelledby="confidence-heading">
      <div className="container confidence-section__grid">
        <div>
          <p className="eyebrow eyebrow--light">Why The Gold Table</p>
          <h2 id="confidence-heading">Your items. Your questions. Your decision.</h2>
          <p className="confidence-section__intro">Selling something personal should never feel rushed. We create a calm, local setting where you can understand the valuation before choosing what happens next.</p>
        </div>
        <div className="confidence-points">
          <article><span>01</span><div><h3>Clear explanations</h3><p>We talk you through how an item is assessed and what shapes the offer.</p></div></article>
          <article><span>02</span><div><h3>Local and face to face</h3><p>Attend a published event at a familiar pub, hotel, club or community venue.</p></div></article>
          <article><span>03</span><div><h3>No-pressure decisions</h3><p>There is no fee for the valuation and no obligation to accept an offer.</p></div></article>
        </div>
      </div>
    </section>

    <section className="section guest-proof" aria-labelledby="guest-proof-heading">
      <div className="container">
        <div className="guest-proof__heading">
          <div>
            <p className="eyebrow">A little more reassurance</p>
            <h2 id="guest-proof-heading">The kind of experience people want before they arrive.</h2>
          </div>
          <p>Clear information, a private conversation and time to decide are built into the visit—not extras to ask for.</p>
        </div>
        <aside className="proof-placeholder-note" aria-label="Placeholder review notice">
          <strong>Preview social proof</strong>
          <span>These illustrative quotes are temporary filler and will be replaced with consented customer reviews before launch.</span>
        </aside>
        <div className="guest-proof__grid">
          {guestPlaceholderQuotes.map(({ quote, context }, index) => <figure className="guest-proof__card" key={context}>
            <span className="guest-proof__number" aria-hidden="true">0{index + 1}</span>
            <blockquote>“{quote}”</blockquote>
            <figcaption>{context}</figcaption>
          </figure>)}
        </div>
      </div>
    </section>

    <section className="section venue-promo" aria-labelledby="venue-promo-heading">
      <div className="container venue-promo__grid">
        <div className="venue-promo__media">
          <Image
            src="/images/gold-table-host-event-v2.png"
            alt="A venue manager and Gold Table coordinator planning an event-day setup"
            fill
            sizes="(max-width: 900px) 100vw, 44vw"
          />
        </div>
        <div className="venue-promo__copy">
          <p className="eyebrow">For pubs, hotels, clubs and local venues</p>
          <h2 id="venue-promo-heading">Bring a professionally run local event through your doors.</h2>
          <p>We promote, staff and manage the valuation day. You provide a suitable welcoming space. It is a practical way to create local footfall with minimal work for your team.</p>
          <ul className="check-list"><li>Local event promotion</li><li>Managed setup and delivery</li><li>A useful service for your community</li></ul>
          <Link className="button button--ink" href="/host">See if your venue is a fit <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>

    <section className="section home-faq" aria-labelledby="home-faq-heading">
      <div className="container home-faq__grid">
        <div>
          <p className="eyebrow">Good to know</p>
          <h2 id="home-faq-heading">Questions before you visit?</h2>
          <p>Get a quick answer here, or read the full guide to valuations, offers and attending an event.</p>
          <Link className="text-link" href="/faqs">View all FAQs <span aria-hidden="true">→</span></Link>
        </div>
        <FaqAccordion items={faqs.slice(0, 5)} />
      </div>
    </section>

    <section className="section final-finder" aria-labelledby="final-finder-heading">
      <div className="container final-finder__grid">
        <div><p className="eyebrow eyebrow--light">Find a local Gold Table</p><h2 id="final-finder-heading">Ready to see what your gold is worth?</h2></div>
        <EventFinder compact />
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
