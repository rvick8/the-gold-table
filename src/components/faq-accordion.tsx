export function FaqAccordion({ items }: { items: readonly (readonly [string, string])[] }) {
  return <div className="faq-accordion">
    {items.map(([question, answer]) => <details key={question}>
      <summary>{question}<span aria-hidden="true">+</span></summary>
      <p>{answer}</p>
    </details>)}
  </div>;
}
