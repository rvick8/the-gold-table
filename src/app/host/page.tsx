import type { Metadata } from "next";
import Image from "next/image";
import { GoldTableForm } from "@/components/forms";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = { title: "Host The Gold Table", description: "Bring a calm, professionally managed gold valuation event to your pub, golf club, hotel or local venue.", alternates: { canonical: "/host" } };

export default function Host() {
  const benefits = ["Additional local foot traffic", "A useful community service", "Professionally managed setup", "Local marketing support", "Minimal burden on venue staff", "Flexible scheduling"];
  return <>
    <Breadcrumbs items={[{ label: "Host The Gold Table" }]} />
    <section className="section content-hero"><div className="container split-grid"><div><p className="section-kicker">For trusted local venues</p><h1>Bring The Gold Table to your venue.</h1><p className="content-hero__intro">Run a calm, professional valuation event for your surrounding community.</p></div><Image src="/images/gold-table-host-venue-branded.png" alt="A venue manager planning an event with a Gold Table representative" width={800} height={650} loading="eager" className="content-hero__image" /></div></section>
    <section className="section process-band"><div className="container"><h2>A well-managed local event</h2><div className="accepted-grid" style={{ marginTop: 35 }}>{benefits.map((benefit) => <div key={benefit} style={{ borderLeft: "1px solid var(--gold)", padding: "1rem" }}>{benefit}</div>)}</div></div></section>
    <section className="section"><div className="container" style={{ maxWidth: 850 }}><h2>Tell us about your venue</h2><GoldTableForm kind="host_enquiry" /></div></section>
  </>;
}
