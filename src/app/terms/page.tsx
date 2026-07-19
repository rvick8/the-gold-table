import { legalPlaceholders } from "@/content/legal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms — draft",
  description: "Draft terms for The Gold Table valuations, offers and services.",
  canonical: "/terms",
  robots: { index: false, follow: true },
});

export default function Terms() {
  return <>
    <Breadcrumbs items={[{ label: "Terms" }]} />
    <section className="section legal-page">
      <div className="container prose legal-page__content">
        <p className="eyebrow">Website terms</p>
        <h1>Terms</h1>
        <p className="placeholder-note"><strong>Draft placeholder — legal review required.</strong> Final consumer, valuation, sale and mail-in terms must be supplied and approved before launch.</p>
        <p>A valuation is an informed assessment based on the items presented and the information available at the time. No visitor is obliged to accept an offer.</p>
        <h2>Required before launch</h2>
        <ul className="legal-checklist">{legalPlaceholders.terms.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>
  </>;
}
