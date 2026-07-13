import Image from "next/image";
import Link from "next/link";
import { GoldPriceChart } from "@/components/gold-chart";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/content/site";
import {
  formatEventDate,
  formatEventTime,
  getFeaturedEvents,
} from "@/lib/events";

const valuedItems = [
  ["Gold jewellery", "Rings, chains, bracelets and earrings"],
  ["Coins & bullion", "Sovereigns, Krugerrands and bars"],
  ["Watches", "Gold and vintage watches"],
  ["Silver & items", "Silverware, medals and collectables"],
  ["Broken or old", "Damaged and incomplete pieces"],
];

const processSteps = [
  ["01", "Bring your items", "Jewellery, coins, watches and more are welcome."],
  ["02", "Expert valuation", "We test, weigh and explain each item carefully."],
  ["03", "You decide", "There is no pressure. You remain in control."],
];

export default function Home() {
  const featured = getFeaturedEvents().slice(0, 3);

  return <>
    <section className="home-hero" aria-labelledby="home-hero-heading">
      <div className="home-hero__copy">
        <p className="section-kicker section-kicker--light">Free private valuations</p>
        <h1 id="home-hero-heading">Your old gold could be worth more than you think.</h1>
        <p>Friendly experts at trusted local venues across London. No pressure to sell.</p>
        <div className="home-hero__actions">
          <Link className="button" href="#upcoming-events">Find an event near you</Link>
          <Link className="text-link text-link--light" href="/how-it-works">How it works <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <div className="home-hero__media">
        <Image
          src="/images/gold-table-valuation-hero-branded.png"
          alt="A Gold Table valuer carefully examining a ring with an older customer"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 62vw"
          className="home-hero__image"
        />
      </div>
    </section>

    <section id="upcoming-events" className="home-events" aria-labelledby="upcoming-heading">
      <div className="container event-rail">
        <div className="event-rail__intro">
          <p className="section-kicker">Upcoming local events</p>
          <h2 id="upcoming-heading">We&apos;re in your neighbourhood.</h2>
          <p>Reserve your free valuation.</p>
          <Link className="text-link" href="/events">View all events <span aria-hidden="true">→</span></Link>
        </div>
        {featured.map((event) => {
          const date = new Date(event.startDateTime);
          return <Link className="event-rail__event" href={`/events/${event.slug}`} key={event.id}>
            <span className="event-rail__date" aria-label={formatEventDate(event.startDateTime)}>
              <small>{new Intl.DateTimeFormat("en-GB", { weekday: "short", timeZone: "Europe/London" }).format(date)}</small>
              <strong>{new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "Europe/London" }).format(date)}</strong>
              <small>{new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Europe/London" }).format(date)} 2026</small>
            </span>
            <span className="event-rail__details">
              <strong>{event.venueName}</strong>
              <small>{event.town}, {event.borough}</small>
              <small>{formatEventTime(event.startDateTime)}–{formatEventTime(event.endDateTime)}</small>
              <span>Reserve your slot <span aria-hidden="true">→</span></span>
            </span>
          </Link>;
        })}
      </div>
    </section>

    <section className="editorial-split discovery-story" aria-labelledby="drawer-heading">
      <div className="editorial-split__media">
        <Image
          src="/images/jewellery-drawer.jpg"
          alt="An older woman discovering jewellery in a wooden dresser drawer"
          fill
          sizes="(max-width: 760px) 100vw, 58vw"
        />
      </div>
      <div className="editorial-split__copy">
        <p className="section-kicker">A service built on trust</p>
        <h2 id="drawer-heading">Gold sitting in a drawer?</h2>
        <p>Jewellery, coins, silver and inherited pieces may be worth more than expected. Bring what you have and we will take a careful look.</p>
        <Link className="text-link" href="/how-it-works">Learn how valuations work <span aria-hidden="true">→</span></Link>
      </div>
    </section>

    {site.goldPriceChart.enabled && <section className="market-context section-band" aria-labelledby="price-heading">
      <div className="container market-context__grid">
        <div className="market-context__copy">
          <p className="section-kicker">Market insight</p>
          <h2 id="price-heading">How value changes over time</h2>
          <p>Gold has shown long-term strength, but every item is different. A valuation reveals what yours may be worth today.</p>
        </div>
        <GoldPriceChart />
      </div>
    </section>}

    <section className="process-editorial" aria-labelledby="process-heading">
      <div className="process-editorial__copy">
        <p className="section-kicker">How it works</p>
        <h2 id="process-heading">Simple, private, no obligation.</h2>
        <ol className="process-editorial__steps">
          {processSteps.map(([number, heading, copy]) => <li key={number}>
            <span>{number}</span>
            <div><h3>{heading}</h3><p>{copy}</p></div>
          </li>)}
        </ol>
        <Link className="text-link" href="/how-it-works">More about our process <span aria-hidden="true">→</span></Link>
      </div>
      <div className="process-editorial__media">
        <Image
          src="/images/valuation-close-up.jpg"
          alt="A valuation expert inspecting a gold ring through a loupe"
          fill
          sizes="(max-width: 760px) 100vw, 63vw"
        />
      </div>
    </section>

    <section className="value-editorial section-band" aria-labelledby="valued-heading">
      <div className="container">
        <div className="value-editorial__heading">
          <div><p className="section-kicker">What we value</p><h2 id="valued-heading">Bring what you&apos;re curious about.</h2></div>
          <Link className="text-link" href="/faqs">Questions about an item? <span aria-hidden="true">→</span></Link>
        </div>
        <ul className="value-editorial__list">
          {valuedItems.map(([heading, copy]) => <li key={heading}><strong>{heading}</strong><span>{copy}</span></li>)}
        </ul>
      </div>
    </section>

    <section className="editorial-split community-story" aria-labelledby="community-heading">
      <div className="editorial-split__media">
        <Image
          src="/images/local-pub-event.jpg"
          alt="A friendly Gold Table valuation event inside a British pub"
          fill
          sizes="(max-width: 760px) 100vw, 58vw"
        />
      </div>
      <div className="editorial-split__copy">
        <p className="section-kicker">Rooted in local community</p>
        <h2 id="community-heading">Local venues. Real conversations.</h2>
        <p>We host calm, professionally managed valuation days in pubs, clubs and community venues across Greater London.</p>
        <div className="community-story__actions">
          <Link className="button" href="/events">Find an event near you</Link>
          <Link className="text-link" href="/host">Host The Gold Table <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>

    <section className="trust-editorial" aria-label="Why visitors choose The Gold Table">
      <div className="container trust-editorial__grid">
        <div><strong>Free valuations</strong><span>No fee and no obligation.</span></div>
        <div><strong>Private and discreet</strong><span>Your items and information are handled carefully.</span></div>
        <div><strong>Trusted experts</strong><span>Clear explanations in plain English.</span></div>
      </div>
    </section>

    <section className="final-event-cta" aria-labelledby="final-event-heading">
      <div className="container final-event-cta__inner">
        <div><p className="section-kicker section-kicker--light">The Gold Table is coming to your area</p><h2 id="final-event-heading">Ready to find out what your gold is worth?</h2></div>
        <Link className="button" href="/events">View upcoming events</Link>
      </div>
    </section>

    <StructuredData data={{ "@context": "https://schema.org", "@type": "Organization", name: site.name, url: site.url, description: site.description }} />
  </>;
}
