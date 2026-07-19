import Image from "next/image";
import { GoldTableForm } from "@/components/forms";
import { venuePlaceholderQuote } from "@/content/social-proof";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Host a local Gold Table event",
  description: "Bring a professionally managed gold valuation event to your pub, hotel, golf club or community venue. See the benefits and make a quick venue enquiry.",
  canonical: "/host",
  image: {
    url: "/images/gold-table-host-venue-branded.png",
    alt: "A venue manager planning a Gold Table event with a representative",
  },
});

const venueBenefits = [
  ["Create a reason to visit", "Give local people a useful, time-specific reason to come through your doors."],
  ["Reach beyond your regulars", "Local promotion can introduce your venue to people who may not know it yet."],
  ["Keep staff workload light", "The Gold Table team manages the valuation activity and customer appointments."],
  ["Build community visibility", "Host a practical local service in a familiar and welcoming setting."],
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
          <p className="eyebrow eyebrow--light">For pubs, hotels, clubs and community venues</p>
          <h1 id="host-heading">Bring new local customers through your doors. <em>We handle the event.</em></h1>
          <p className="host-hero__intro">The Gold Table runs professional one-day gold valuation events. We promote the day, manage customer appointments and bring the valuation team; you provide a suitable welcoming space.</p>
          <div className="host-snapshot">
            <div><span>You gain</span><strong>A useful reason for local people to visit</strong></div>
            <div><span>We handle</span><strong>Promotion, appointments and event delivery</strong></div>
            <div><span>You provide</span><strong>A suitable space and a venue contact</strong></div>
          </div>
        </div>
        <div id="venue-enquiry" className="host-hero__form">
          <p className="eyebrow">Quick venue check</p>
          <h2>Could your venue host a Gold Table day?</h2>
          <p>Share four essentials to start the conversation. Full logistics can come later.</p>
          <GoldTableForm kind="host_enquiry" />
        </div>
      </div>
    </section>

    <section className="section venue-benefits" aria-labelledby="venue-benefits-heading">
      <div className="container venue-benefits__grid">
        <div className="venue-benefits__media">
          <Image src="/images/gold-table-host-venue-branded.png" alt="A venue manager planning a Gold Table event with a representative" fill preload sizes="(max-width: 900px) 100vw, 47vw" />
          <div className="image-label">Professionally planned. Locally promoted.</div>
        </div>
        <div>
          <p className="eyebrow">Why host a Gold Table</p>
          <h2 id="venue-benefits-heading">A well-run local event, with a light lift for your team.</h2>
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

    <section className="section venue-proof" aria-labelledby="venue-proof-heading">
      <div className="container venue-proof__grid">
        <div>
          <p className="eyebrow">What venue teams need to know</p>
          <h2 id="venue-proof-heading">Useful for your community. Straightforward for your team.</h2>
          <p>The first conversation is designed to make the practical side clear: space, timing, access and one point of contact. You can assess the fit before committing to anything.</p>
          <ul className="venue-proof__facts">
            <li><strong>Clear planning</strong><span>Agree the event shape before a date is set.</span></li>
            <li><strong>Managed delivery</strong><span>The Gold Table team runs the valuation activity.</span></li>
            <li><strong>Local relevance</strong><span>Offer your regulars and neighbours a practical service.</span></li>
          </ul>
        </div>
        <figure className="venue-proof__quote">
          <p className="venue-proof__label">Preview venue feedback</p>
          <blockquote>“{venuePlaceholderQuote.quote}”</blockquote>
          <figcaption>{venuePlaceholderQuote.context}</figcaption>
          <p className="venue-proof__disclaimer">Illustrative placeholder only. Replace with a consented venue review before launch.</p>
        </figure>
      </div>
    </section>

    <section id="venue-fit" className="section venue-fit" aria-labelledby="venue-fit-heading">
      <div className="container venue-fit__grid">
        <div>
          <p className="eyebrow">Is your venue a fit?</p>
          <h2 id="venue-fit-heading">The best venues feel established, accessible and discreet.</h2>
          <p>The initial check is deliberately simple. We can work through room layout, timing and practical details together after we know the basics.</p>
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
        <div className="section-heading section-heading--split"><div><p className="eyebrow">From enquiry to event day</p><h2 id="host-process-heading">Three clear steps.</h2></div><p>No long application. Start with a quick fit check and work through the details with a person.</p></div>
        <ol className="host-process__steps"><li><span>01</span><h3>Share the basics</h3><p>Send the venue name, postcode and your best contact detail.</p></li><li><span>02</span><h3>Plan the right setup</h3><p>Discuss the room, access, timing and how the local event will run.</p></li><li><span>03</span><h3>Agree and promote the day</h3><p>Once the practical plan works for both sides, the date can be prepared and published.</p></li></ol>
      </div>
    </section>

    <section className="section host-faq" aria-labelledby="host-faq-heading">
      <div className="container home-faq__grid">
        <div><p className="eyebrow">Venue questions</p><h2 id="host-faq-heading">The practical details.</h2><p>A first enquiry is only a fit check. It does not commit your venue to hosting a date.</p></div>
        <div className="faq-accordion">{venueFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <div className="mobile-host-action"><a href="#venue-enquiry">Check my venue</a></div>
  </>;
}
