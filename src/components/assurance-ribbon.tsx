type Audience = "seller" | "venue";

const signals = {
  seller: {
    label: "The Gold Table assurance",
    title: "Clear from the first conversation.",
    items: [
      ["01", "Free valuation", "Bring an item or a collection. There is no charge for the event valuation."],
      ["02", "Face to face", "See your items assessed and ask questions as the valuation is explained."],
      ["03", "Always your choice", "Hear any offer, take your time and decide whether you want to sell."],
    ],
  },
  venue: {
    label: "The venue partnership",
    title: "A tidy plan before a date is set.",
    items: [
      ["01", "Start with the basics", "A first enquiry is simply a fit check for your space, access and local area."],
      ["02", "Know the plan", "Event shape, timing and responsibilities are agreed before anything is published."],
      ["03", "Keep the lift light", "The Gold Table team manages the valuation activity and appointment requests."],
    ],
  },
} as const;

export function AssuranceRibbon({ audience }: { audience: Audience }) {
  const content = signals[audience];

  return <aside className={`assurance-ribbon assurance-ribbon--${audience}`} aria-label={content.label}>
    <div className="container assurance-ribbon__grid">
      <div className="assurance-ribbon__intro">
        <p className="eyebrow eyebrow--light">{content.label}</p>
        <p>{content.title}</p>
      </div>
      <ol className="assurance-ribbon__list">
        {content.items.map(([number, title, copy]) => <li key={number}>
          <span aria-hidden="true">{number}</span>
          <div><strong>{title}</strong><p>{copy}</p></div>
        </li>)}
      </ol>
    </div>
  </aside>;
}
