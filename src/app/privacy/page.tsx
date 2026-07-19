import { legalPlaceholders } from "@/content/legal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy policy — draft",
  description: "Draft privacy information for The Gold Table website.",
  canonical: "/privacy",
  robots: { index: false, follow: true },
});

export default function Privacy() {
  return <>
    <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
    <section className="section legal-page">
      <div className="container prose legal-page__content">
        <p className="eyebrow">Website policy</p>
        <h1>Privacy policy</h1>
        <p className="placeholder-note"><strong>Draft placeholder — legal review required.</strong> This page must not be treated as the final privacy notice.</p>
        <p>The Gold Table will use personal information submitted through this website to respond to enquiries, manage appointment requests and arrange requested services. A complete privacy notice must be approved before launch.</p>
        <h2>Required before launch</h2>
        <ul className="legal-checklist">{legalPlaceholders.privacy.map((item) => <li key={item}>{item}</li>)}</ul>
        <h2>Current form flow</h2>
        <p>Validated form submissions are sent securely from the website server to the configured enquiry service. The receiving address is not exposed in the browser.</p>
      </div>
    </section>
  </>;
}
