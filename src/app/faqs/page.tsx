import Link from "next/link";
import { faqs } from "@/content/faqs";
import { FaqAccordion } from "@/components/faq-accordion";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gold valuation and event FAQs",
  description: "Clear answers about free Gold Table valuations, what to bring, testing, offers, appointments, payment and choosing whether to sell.",
  canonical: "/faqs",
});

export default function FaqPage() {
  return <>
    <section className="faq-hero" aria-labelledby="faq-heading"><div className="container faq-hero__grid"><div><p className="eyebrow eyebrow--light">Before you attend</p><h1 id="faq-heading">Questions before you go?</h1></div><div><p>Short answers about the valuation, what to bring and your options.</p><Link className="text-link text-link--light" href="/events">Find an event <span aria-hidden="true">→</span></Link></div></div></section>
    <section className="section faq-page"><div className="container faq-page__grid"><aside><p className="eyebrow">The essentials</p><h2>Free. Private. Your choice.</h2><p>We assess your items face to face, explain any offer and you decide whether to sell.</p><ul className="check-list"><li>Bring one item or a collection</li><li>Broken pieces welcome</li><li>No obligation to sell</li></ul></aside><FaqAccordion items={faqs} /></div></section>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) }} />
  </>;
}
