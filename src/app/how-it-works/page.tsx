import Link from "next/link";
import Image from "next/image";
import { createPageMetadata } from "@/lib/metadata";
import { VisualMarker } from "@/components/visual-marker";

export const metadata = createPageMetadata({
  title: "How our gold valuations and offers work",
  description: "Learn what to bring to a Gold Table event, how items are tested, how offers are explained and what happens if you choose to sell.",
  canonical: "/how-it-works",
});

const steps = [
  ["Bring it", "Gold jewellery, coins, watches, silver and inherited collections are welcome. No need to sort first."],
  ["We assess it", "Your valuer checks each item and explains what they find."],
  ["You decide", "Hear any offer, ask questions or take everything home."],
] as const;

const items = ["Gold rings and jewellery", "Broken or tangled gold", "Sovereigns and gold coins", "Bullion and bars", "Gold and vintage watches", "Silver jewellery and silverware", "Medals and collectables", "Inherited collections"];

export default function HowItWorksPage() {
  return <>
    <section className="inner-hero inner-hero--split" aria-labelledby="how-heading">
      <div className="container inner-hero__grid">
        <div>
          <p className="eyebrow eyebrow--light">How it works</p>
          <VisualMarker name="assessment" label="Gold assessment" />
          <h1 id="how-heading">Bring it in. <em>We explain it.</em></h1>
          <p>A free, face-to-face way to understand your gold and hear an offer where we can buy it.</p>
          <Link className="button button--gold" href="/events">Find an event <span aria-hidden="true">→</span></Link>
        </div>
        <div className="inner-hero__media"><Image src="/images/gold-table-valuation-event-v2.png" alt="A Gold Table valuer explaining a ring to a customer at a local event" fill preload sizes="(max-width: 900px) 100vw, 48vw" /></div>
      </div>
    </section>

    <section className="section full-process" aria-labelledby="full-process-heading">
      <div className="container">
        <div className="section-heading section-heading--split"><div><p className="eyebrow">At the table</p><VisualMarker name="conversation" label="A clear conversation" /><h2 id="full-process-heading">Three simple steps.</h2></div><p>Most appointments take 15 minutes. Larger collections can take longer.</p></div>
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
          <h2 id="offer-heading">How an offer works.</h2>
          <p>An offer may consider the precious-metal content and weight, the item’s condition, possible resale value and the relevant market at the time.</p>
          <p>We explain the basis of any offer we make before you decide. An event valuation is a buying assessment, not an insurance or formal probate valuation.</p>
          <div className="offer-note"><strong>If you choose not to sell</strong><p>You simply take your items home. There is no charge for the event valuation.</p></div>
        </div>
      </div>
    </section>

    <section className="section practical-section" aria-labelledby="practical-heading">
      <div className="container practical-section__grid">
        <div><p className="eyebrow">Before attending</p><h2 id="practical-heading">Check the event page.</h2><p>It has the date, hours, address, walk-in status and travel details.</p><Link className="button button--ink" href="/events">Find an event <span aria-hidden="true">→</span></Link></div>
        <div className="practical-cards"><article><h3>Identification</h3><p>Your event confirmation explains anything you need to bring if you choose to sell.</p></article><article><h3>Larger collections</h3><p>Add a note when requesting a time so the team can plan ahead.</p></article></div>
      </div>
    </section>
  </>;
}
