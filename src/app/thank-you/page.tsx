import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Thank you",
  description: "Thank you for contacting The Gold Table.",
  canonical: "/thank-you",
  robots: { index: false, follow: false },
});

export default function ThankYou() {
  return <section className="section status-page">
    <div className="container status-page__content">
      <p className="eyebrow">Enquiry received</p>
      <h1>Thank you.</h1>
      <p className="status-page__intro">The team will review the details you supplied and follow up using your chosen contact method.</p>
      <ol className="status-page__steps" aria-label="What happens next">
        <li><span>01</span><div><strong>Your enquiry is received</strong><p>Your submitted details are ready for the team to review.</p></div></li>
        <li><span>02</span><div><strong>A person reviews the details</strong><p>We use the contact method you chose for the follow-up.</p></div></li>
        <li><span>03</span><div><strong>You remain in control</strong><p>An enquiry or valuation request does not commit you to a sale.</p></div></li>
      </ol>
      <div className="status-actions"><Link className="button button--ink" href="/events">View local events</Link><Link className="text-link" href="/">Return home</Link></div>
    </div>
  </section>;
}
