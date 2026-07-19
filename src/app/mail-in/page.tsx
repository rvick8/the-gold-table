import Image from "next/image";
import { GoldTableForm } from "@/components/forms";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/content/site";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Mail-in gold valuation",
  description: "Request a Gold Table mail-in valuation pack if you cannot attend a local event.",
  canonical: "/mail-in",
  robots: site.mailIn.enabled ? undefined : { index: false, follow: true },
  image: {
    url: "/images/gold-table-mail-pack-branded.png",
    alt: "A secure Gold Table valuation pack on a kitchen table",
  },
});

export default function MailIn() {
  const steps = ["Request a valuation pack", "Pack your items securely", "Send them for assessment", "Receive a clear valuation", "Choose to sell or have them returned"];
  if (!site.mailIn.enabled) {
    return <>
      <Breadcrumbs items={[{ label: "Mail-In Valuation" }]} />
      <section className="section service-unavailable">
        <div className="container">
          <div className="service-unavailable__panel">
            <p className="eyebrow">Mail-in valuation</p>
            <h1>This service is not currently available.</h1>
            <p>We are confirming the postage, insurance and return arrangements before accepting items by mail.</p>
            <p>You can still receive a free, private valuation at a local Gold Table event.</p>
            <Link className="button button--ink" href="/events">Find a local event <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </>;
  }

  return <>
    <Breadcrumbs items={[{ label: "Mail-In Valuation" }]} />
    <section className="section content-hero">
      <div className="container split-grid">
        <div>
          <p className="eyebrow">A convenient alternative</p>
          <h1>Cannot make it to an event?</h1>
          <p className="content-hero__intro">Request a secure valuation pack and receive clear instructions for sending your items.</p>
          <p>Insurance and return arrangements must be confirmed before this service launches.</p>
        </div>
        <Image src="/images/gold-table-mail-pack-branded.png" alt="A secure Gold Table valuation pack on a kitchen table" width={800} height={650} preload className="content-hero__image" />
      </div>
    </section>
    <section className="section section--paper">
      <div className="container">
        <h2>How it works</h2>
        <div className="accepted-grid mail-steps">{steps.map((step, index) => <div className="card" key={step}><span className="mail-step-number">{index + 1}</span><strong>{step}</strong></div>)}</div>
        <div className="placeholder-note placeholder-note--spaced"><strong>Terms requiring confirmation</strong><br />Insurance: {site.mailIn.insuredPostage}<br />Returns: {site.mailIn.returnShipping}</div>
      </div>
    </section>
    <section className="section"><div className="container form-shell"><h2>Request a valuation pack</h2><GoldTableForm kind="mail_in_pack_request" /></div></section>
  </>;
}
