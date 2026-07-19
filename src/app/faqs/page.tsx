import Link from "next/link";
import { faqs } from "@/content/faqs";
import { FaqAccordion } from "@/components/faq-accordion";
import { EventFinder } from "@/components/event-finder";
import { StructuredData } from "@/components/structured-data";
import { AssuranceRibbon } from "@/components/assurance-ribbon";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gold valuation and event FAQs",
  description: "Clear answers about free Gold Table valuations, what to bring, testing, offers, appointments, payment and choosing whether to sell.",
  canonical: "/faqs",
});

export default function FaqPage() {
  return <>
    <section className="faq-hero" aria-labelledby="faq-heading"><div className="container faq-hero__grid"><div><p className="eyebrow eyebrow--light">Straight answers, before you visit</p><h1 id="faq-heading">Questions about selling gold at an event?</h1></div><div><p>Understand the valuation, what to bring and what happens if you hear an offer. If your question is event-specific, check that event’s practical details first.</p><Link className="text-link text-link--light" href="/events">View upcoming events <span aria-hidden="true">→</span></Link></div></div></section>
    <AssuranceRibbon audience="seller" />
    <section className="section faq-page"><div className="container faq-page__grid"><aside><p className="eyebrow">Quick guide</p><h2>Free. Private. Your decision.</h2><p>A Gold Table event is a face-to-face buying valuation. We explain what we find and any offer we can make; you decide whether anything is sold.</p><ul className="check-list"><li>Bring one item or a collection</li><li>Broken and unwanted pieces welcome</li><li>No obligation to accept an offer</li></ul></aside><FaqAccordion items={faqs} /></div></section>
    <section className="section final-finder" aria-labelledby="faq-finder-heading"><div className="container final-finder__grid"><div><p className="eyebrow eyebrow--light">Ready to visit?</p><h2 id="faq-finder-heading">Find a published date near you.</h2></div><EventFinder compact /></div></section>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }} />
  </>;
}
