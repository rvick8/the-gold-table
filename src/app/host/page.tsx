import Image from "next/image";
import { GoldTableForm } from "@/components/forms";
import { createPageMetadata } from "@/lib/metadata";
import { VisualMarker } from "@/components/visual-marker";

export const metadata = createPageMetadata({
  title: "Host a local Gold Table event",
  description: "Bring a professionally managed gold valuation event to your pub, hotel, golf club or community venue. See the benefits and make a quick venue enquiry.",
  canonical: "/host",
  image: {
    url: "/images/gold-table-host-event-v2.png",
    alt: "A venue manager and Gold Table coordinator planning an event-day setup",
  },
});

const venueBenefits = [
  ["Bring people in", "Give local people a useful reason to visit."],
  ["We run the day", "We manage promotion, appointments and the valuation table."],
  ["Keep it simple", "Your team provides the space and one planning contact."],
] as const;

const responsibilities = [
  ["We handle", ["Local event promotion", "Appointment requests", "Valuation team and equipment", "Event setup and management"]],
  ["You provide", ["A suitable private or semi-private space", "Basic furniture and venue access", "A venue contact for planning", "An agreed date and operating window"]],
] as const;

const venueFaqs = [
  ["What kind of venues are suitable?", "Pubs, hotels, golf and sports clubs, community spaces and other established local venues may all be a fit. Privacy, access and a welcoming environment matter more than the label."],
  ["How much space is needed?", "The exact setup depends on the venue. A comfortable private or semi-private area with room for the valuation table, customer seating and safe circulation is a useful starting point."],
  ["Will this disrupt normal service?", "The event plan is agreed with you in advance so customer flow, setup and venue operations can be considered together."],
  ["Who handles promotion and bookings?", "The Gold Table plans the local event promotion and manages appointment requests. Your team may be asked to share approved event information through your own channels."],
  ["What happens after I enquire?", "The first enquiry is a fit check. The team will review your postcode, venue type and space, then discuss practical details before either side commits to a date."],
] as const;

export default function HostPage() {
  return <>
    <section className="host-hero" aria-labelledby="host-heading">
      <div className="container host-hero__grid">
        <div className="host-hero__copy">
          <p className="eyebrow eyebrow--light">For local venues</p>
          <VisualMarker name="venue" label="Local venue" />
          <h1 id="host-heading">Host an event. <em>We run the day.</em></h1>
          <p className="host-hero__intro">We bring the team, promotion and appointments. You provide a welcoming private space.</p>
          <div className="host-snapshot">
            <div><span>We handle</span><strong>Promotion, appointments and the valuation table</strong></div>
            <div><span>You provide</span><strong>A suitable space and one planning contact</strong></div>
          </div>
        </div>
        <div id="venue-enquiry" className="host-hero__form">
          <p className="eyebrow">Quick venue check</p>
          <h2>Could your venue host?</h2>
          <p>Share four essentials. We can discuss the rest later.</p>
          <GoldTableForm kind="host_enquiry" />
        </div>
      </div>
    </section>

    <section className="section venue-benefits" aria-labelledby="venue-benefits-heading">
      <div className="container venue-benefits__grid">
        <div className="venue-benefits__media">
          <Image src="/images/gold-table-host-event-v2.png" alt="A venue manager and Gold Table coordinator planning an event-day setup" fill preload sizes="(max-width: 900px) 100vw, 47vw" />
          <div className="image-label">Professionally planned. Locally promoted.</div>
        </div>
        <div>
          <p className="eyebrow">Why host</p>
          <h2 id="venue-benefits-heading">A local event without the heavy lift.</h2>
          <div className="venue-benefit-list">{venueBenefits.map(([heading, copy], index) => <article key={heading}><span>0{index + 1}</span><div><h3>{heading}</h3><p>{copy}</p></div></article>)}</div>
        </div>
      </div>
    </section>

    <section className="section responsibility-section" aria-labelledby="responsibility-heading">
      <div className="container">
        <div className="section-heading"><p className="eyebrow eyebrow--light">A clear division of responsibility</p><h2 id="responsibility-heading">You know exactly who is doing what.</h2></div>
        <div className="responsibility-grid">{responsibilities.map(([heading, items]) => <article key={heading}><h3>{heading}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </div>
    </section>

    <section id="venue-fit" className="section venue-fit" aria-labelledby="venue-fit-heading">
      <div className="container venue-fit__grid">
        <div>
          <p className="eyebrow">Is your venue a fit?</p>
          <VisualMarker name="venue" label="Venue checklist" />
          <h2 id="venue-fit-heading">Could your space work?</h2>
          <p>Check the basics first. We can work through layout and timing after that.</p>
          <a className="button button--ink" href="#venue-enquiry">Check my venue <span aria-hidden="true">↑</span></a>
        </div>
        <ul className="fit-checklist">
          <li><span>01</span><div><strong>A suitable space</strong><p>Comfortable, private or semi-private and easy to manage.</p></div></li>
          <li><span>02</span><div><strong>Good local access</strong><p>A location people can find and visit with confidence.</p></div></li>
          <li><span>03</span><div><strong>A practical event window</strong><p>Enough time for setup, customer appointments and close-down.</p></div></li>
          <li><span>04</span><div><strong>A planning contact</strong><p>One person who can coordinate details with our event team.</p></div></li>
        </ul>
      </div>
    </section>

    <section className="section host-process" aria-labelledby="host-process-heading">
      <div className="container">
        <div className="section-heading section-heading--split"><div><p className="eyebrow">From enquiry to event day</p><h2 id="host-process-heading">Three steps.</h2></div><p>Start with the basics. Plan the rest with a person.</p></div>
        <ol className="host-process__steps"><li><span>01</span><h3>Share the basics</h3><p>Send the venue name, postcode and best contact detail.</p></li><li><span>02</span><h3>Plan the setup</h3><p>Discuss the space, access and timing.</p></li><li><span>03</span><h3>Agree the day</h3><p>Once it works for both sides, we can prepare and publish it.</p></li></ol>
      </div>
    </section>

    <section className="section host-faq" aria-labelledby="host-faq-heading">
      <div className="container home-faq__grid">
        <div><p className="eyebrow">Venue questions</p><h2 id="host-faq-heading">Need to know.</h2><p>A first enquiry is a fit check, not a commitment.</p></div>
        <div className="faq-accordion">{venueFaqs.slice(0, 4).map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <div className="mobile-host-action"><a href="#venue-enquiry">Check my venue</a></div>
  </>;
}
