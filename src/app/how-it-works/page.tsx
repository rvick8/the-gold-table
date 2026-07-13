import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Cta } from "@/components/cta";

export const metadata: Metadata = { title: "How gold valuation works", description: "Learn what to bring, how items are tested and valued, and what happens if you choose to sell.", alternates: { canonical: "/how-it-works" } };

export default function HowItWorks() {
  const steps = [
    ["Bring your items", "Jewellery, coins, watches, silver and inherited collections are welcome."],
    ["We examine them", "The valuer checks, weighs and tests each item carefully."],
    ["We explain the value", "You receive a clear explanation and can ask questions."],
    ["You decide", "If an offer is made, accepting it is entirely your choice."],
  ];
  return <>
    <Breadcrumbs items={[{ label: "How It Works" }]} />
    <section className="section content-hero"><div className="container split-grid"><div><p className="section-kicker">Simple and private</p><h1>Tested, weighed, explained.</h1><p className="content-hero__intro">We examine what you bring, explain the valuation clearly and let you decide what happens next.</p><Link className="button navy" href="/events">Find an Event</Link></div><Image src="/images/gold-table-valuation-hero-branded.png" alt="A Gold Table valuer examining a ring with a customer" width={850} height={650} loading="eager" className="content-hero__image" /></div></section>
    <section className="section" style={{ background: "white" }}><div className="container" style={{ maxWidth: 920 }}>{steps.map(([heading, copy], index) => <article key={heading} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 32, padding: "2.2rem 0", borderTop: "1px solid var(--border)" }}><span className="serif" style={{ fontSize: 42, color: "var(--gold)" }}>0{index + 1}</span><div><h3 style={{ margin: 0 }}>{heading}</h3><p>{copy}</p></div></article>)}</div></section>
    <section className="section"><div className="container split-grid"><div><h2>Private and discreet</h2><p>Items are handled carefully and conversations are kept as private as the venue allows.</p></div><div><h2>Identification and compliance</h2><p className="placeholder-note">Exact UK seller-identification, AML, record-keeping and payment requirements need legal review before launch.</p></div></div></section>
    <Cta />
  </>;
}
