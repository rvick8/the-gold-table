import Link from "next/link";
import Image from "next/image";
import { EventFinder } from "@/components/event-finder";
import { FaqAccordion } from "@/components/faq-accordion";
import { AssuranceRibbon } from "@/components/assurance-ribbon";
import { faqs } from "@/content/faqs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "How our gold valuations and offers work",
  description: "Learn what to bring to a Gold Table event, how items are tested, how offers are explained and what happens if you choose to sell.",
  canonical: "/how-it-works",
});

const steps = [
  ["Bring what you have", "Gold jewellery, broken pieces, coins, bullion, watches, silver and inherited collections are welcome. You do not need to sort or identify items first."],
  ["We examine each item", "Your valuer looks for hallmarks, weighs the item and uses appropriate testing methods where needed."],
  ["We explain the valuation", "You hear what we found, what affects the value and which items we may be able to buy."],
  ["You decide", "If an offer is made, you can accept it, ask questions or take the item home. There is no valuation fee and no obligation to sell."],
] as const;

const items = ["Gold rings and jewellery", "Broken or tangled gold", "Sovereigns and gold coins", "Bullion and bars", "Gold and vintage watches", "Silver jewellery and silverware", "Medals and collectables", "Inherited collections"];

export default function HowItWorksPage() {
  return <>
    <section className="inner-hero inner-hero--split" aria-labelledby="how-heading">
      <div className="container inner-hero__grid">
        <div>
          <p className="eyebrow eyebrow--light">How The Gold Table works</p>
          <h1 id="how-heading">Tested carefully. Explained clearly. <em>Always your decision.</em></h1>
          <p>Our events give you a straightforward, face-to-face way to understand what you own and hear an offer if we can buy it.</p>
          <Link className="button button--gold" href="/events">Find an event <span aria-hidden="true">→</span></Link>
        </div>
        <div className="inner-hero__media"><Image src="/images/gold-table-valuation-event-v2.png" alt="A Gold Table valuer explaining a ring to a customer at a local event" fill preload sizes="(max-width: 900px) 100vw, 48vw" /></div>
      </div>
    </section>

    <AssuranceRibbon audience="seller" />

    <section className="section full-process" aria-labelledby="full-process-heading">
      <div className="container">
        <div className="section-heading section-heading--split"><div><p className="eyebrow">At the table</p><h2 id="full-process-heading">Four simple steps.</h2></div><p>A typical appointment is 15 minutes. Larger collections may need more time.</p></div>
        <ol className="full-process__list">{steps.map(([heading, copy], index) => <li key={heading}><span>0{index + 1}</span><div><h3>{heading}</h3><p>{copy}</p></div></li>)}</ol>
      </div>
    </section>

    <section id="what-we-buy" className="section what-we-buy" aria-labelledby="what-we-buy-heading">
      <div className="container what-we-buy__grid">
        <div>
          <p className="eyebrow eyebrow--light">What we value and buy</p>
          <h2 id="what-we-buy-heading">If you are unsure, bring it.</h2>
          <p>You do not need to know whether something is real gold before attending. We can take a careful look and explain what we find.</p>
        </div>
        <ul>{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ul>
      </div>
    </section>

    <section className="section offer-section" aria-labelledby="offer-heading">
      <div className="container offer-section__grid">
        <div className="offer-section__media"><Image src="/images/gold-table-preparing-for-event-v2.png" alt="Hands preparing inherited jewellery to bring to a Gold Table event" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
        <div>
          <p className="eyebrow">Understanding an offer</p>
          <h2 id="offer-heading">Value depends on more than one number.</h2>
          <p>An offer may consider the precious-metal content and weight, the item’s condition, possible resale value and the relevant market at the time.</p>
          <p>We explain the basis of any offer we make before you decide. An event valuation is a buying assessment, not an insurance or formal probate valuation.</p>
          <div className="offer-note"><strong>If you choose not to sell</strong><p>You simply take your items home. There is no charge for the event valuation.</p></div>
        </div>
      </div>
    </section>

    <section className="section practical-section" aria-labelledby="practical-heading">
      <div className="container practical-section__grid">
        <div><p className="eyebrow">Before attending</p><h2 id="practical-heading">Check the individual event page.</h2><p>Each event page gives the date, opening hours, full address, walk-in status, parking, public-transport and accessibility information available for that venue.</p></div>
        <div className="practical-cards"><article><h3>Identification</h3><p>If you may decide to sell, your event confirmation will explain any identification or payment information you need to bring.</p></article><article><h3>Larger collections</h3><p>Use the optional note when requesting a time so the team can plan for items that may take longer than a standard appointment.</p></article></div>
      </div>
    </section>

    <section className="section home-faq" aria-labelledby="how-faq-heading"><div className="container home-faq__grid"><div><p className="eyebrow">Questions answered</p><h2 id="how-faq-heading">Know before you go.</h2><p>Clear answers about testing, offers, appointments and choosing not to sell.</p><Link className="text-link" href="/faqs">Read every FAQ <span aria-hidden="true">→</span></Link></div><FaqAccordion items={faqs.slice(0, 8)} /></div></section>

    <section className="section final-finder" aria-labelledby="how-finder-heading"><div className="container final-finder__grid"><div><p className="eyebrow eyebrow--light">Find your Gold Table</p><h2 id="how-finder-heading">See what is happening near you.</h2></div><EventFinder compact /></div></section>
  </>;
}
