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
      <p className="status-page__intro">The team will review your details and follow up using the contact method you chose.</p>
      <div className="status-actions"><Link className="button button--ink" href="/events">View local events</Link><Link className="text-link" href="/">Return home</Link></div>
    </div>
  </section>;
}
