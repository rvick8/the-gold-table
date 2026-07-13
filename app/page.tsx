import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The Gold Table | Free local jewellery valuations",
  description:
    "Bring old, broken or unwanted jewellery to a local Gold Table event. See the test, weight and rate before you decide whether to sell.",
};

const priceHistory = [
  { year: 1996, price: 249 },
  { year: 2001, price: 188 },
  { year: 2006, price: 328 },
  { year: 2011, price: 981 },
  { year: 2016, price: 927 },
  { year: 2026, price: 3067 },
];

const rates = [
  ["9k", "£933/oz"],
  ["18k", "£1,804/oz"],
  ["22k", "£2,208/oz"],
  ["24k", "£2,395/oz"],
];

const items = [
  ["Gold jewellery", "Rings, chains, earrings and bracelets", "/buy-gold.jpg"],
  ["Silver and coins", "Hallmarked silver, sovereigns and bullion", "/buy-silver.jpg"],
  ["Watches", "Gold and silver cases and bracelets", "/buy-watches.jpg"],
  ["Broken pieces", "Broken chains and single earrings", "/buy-broken.jpg"],
];

const steps = [
  ["01", "Bring what you have", "No cleaning or preparation needed.", "/gold-table-appraisal.jpg"],
  ["02", "We test and weigh", "You see the purity, weight and rate.", "/gold-table-offer.jpg"],
  ["03", "You choose", "Sell for same-day payment or take it home.", "/gold-table-choice.jpg"],
];

function PriceChart() {
  const width = 720;
  const height = 310;
  const pad = { top: 22, right: 28, bottom: 42, left: 56 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const max = 3200;
  const points = priceHistory.map((point, index) => ({
    ...point,
    x: pad.left + (index / (priceHistory.length - 1)) * chartWidth,
    y: pad.top + chartHeight - (point.price / max) * chartHeight,
  }));
  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
    .join(" ");
  const area = `${line} L${points.at(-1)?.x},${pad.top + chartHeight} L${points[0].x},${pad.top + chartHeight} Z`;

  return (
    <figure className="chart-card" aria-labelledby="chart-title chart-note">
      <div className="chart-head">
        <div>
          <h3 id="chart-title">Gold price in GBP</h3>
          <p>£ per troy ounce. Selected dates.</p>
        </div>
        <div className="chart-stat">
          <strong>12.3×</strong>
          <span>1996 to July 2026</span>
        </div>
      </div>
      <div className="chart-scroll" aria-hidden="true">
        <svg viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b59245" stopOpacity=".28" />
              <stop offset="100%" stopColor="#b59245" stopOpacity=".02" />
            </linearGradient>
          </defs>
          {[0, 1000, 2000, 3000].map((tick) => {
            const y = pad.top + chartHeight - (tick / max) * chartHeight;
            return (
              <g key={tick}>
                <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} className="grid-line" />
                <text x={pad.left - 12} y={y + 4} textAnchor="end" className="axis-label">
                  {tick === 0 ? "£0" : `£${tick / 1000}k`}
                </text>
              </g>
            );
          })}
          <path d={area} fill="url(#area)" />
          <path d={line} className="price-line" />
          {points.map((point) => (
            <g key={point.year}>
              <circle cx={point.x} cy={point.y} r="5" className="price-dot" />
              <text x={point.x} y={height - 13} textAnchor="middle" className="axis-label">
                {point.year}
              </text>
            </g>
          ))}
          <text x={points[0].x + 5} y={points[0].y - 14} className="value-label">£249</text>
          <text x={(points.at(-1)?.x ?? 0) - 8} y={(points.at(-1)?.y ?? 0) + 30} textAnchor="end" className="value-label">£3,067</text>
        </svg>
      </div>
      <figcaption id="chart-note">
        Bank of England annual averages, 1996–2016. July 2026 spot snapshot. Nominal prices.
        Jewellery value depends on purity, payable weight and the offer made.
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a href="#" className="wordmark">The Gold Table</a>
        <nav aria-label="Main navigation">
          <a href="#why">Why now</a>
          <a href="#process">How it works</a>
          <a href="#rates">Rates</a>
        </nav>
        <a className="button button-small" href="#events">Find an event</a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Free local valuations</p>
            <h1>Your old jewellery could be worth more than you think.</h1>
            <p className="lede">We test and weigh it with you. You get a clear offer. You choose whether to sell.</p>
            <div className="hero-actions">
              <a className="button" href="#events">Find an event <span>→</span></a>
              <a className="text-link" href="#why">See why</a>
            </div>
            <ul className="assurances" aria-label="Service assurances">
              <li><span>01</span> Tested with you</li>
              <li><span>02</span> No pressure</li>
              <li><span>03</span> Paid the same day</li>
            </ul>
          </div>

          <aside className="event-card" id="events">
            <div className="event-card-title">Next event</div>
            <div className="event-card-body">
              <p className="event-date">Saturday 18 July</p>
              <h2>The Assembly Hall</h2>
              <p>Tunbridge Wells · TN1</p>
              <p>10:00–15:00</p>
              <a className="button button-full" href="mailto:hello@thegoldtable.co.uk?subject=Event%20appointment">Book a free valuation</a>
            </div>
          </aside>

          <div className="hero-image">
            <Image src="/gold-table-hero.jpg" alt="A customer watching her gold chain being weighed at a valuation table" width={1536} height={1024} priority />
          </div>
        </section>

        <section className="price-story" id="why">
          <div className="story-copy">
            <p className="eyebrow">Thirty years of change</p>
            <h2>Gold is worth 12× more than in 1996.</h2>
            <p>Old or broken jewellery may still hold value.</p>
            <p className="story-note">Bring it in. We check the purity and weight with you.</p>
          </div>
          <PriceChart />
        </section>

        <section className="items section">
          <div className="section-heading">
            <p className="eyebrow">What we value</p>
            <h2>Bring what you have.</h2>
            <p>Old, broken or unwanted. We can check it.</p>
          </div>
          <div className="item-grid">
            {items.map(([title, detail, image]) => (
              <article className="item-card" key={title}>
                <Image src={image} alt="" width={600} height={400} />
                <div><h3>{title}</h3><p>{detail}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="process" id="process">
          <div className="section-heading light">
            <p className="eyebrow">How it works</p>
            <h2>Three simple steps.</h2>
          </div>
          <ol className="step-grid">
            {steps.map(([number, title, detail, image]) => (
              <li key={number}>
                <span className="step-number">{number}</span>
                <Image src={image} alt="" width={600} height={400} />
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
          <dl className="trust-grid">
            <div><dt>You see the test</dt><dd>We test and weigh each item with you.</dd></div>
            <div><dt>We explain the offer</dt><dd>You see the purity, weight and rate.</dd></div>
            <div><dt>You can say no</dt><dd>Take everything home. There is no fee.</dd></div>
            <div><dt>ID protects the sale</dt><dd>Bring photo ID and proof of address if you sell.</dd></div>
          </dl>
        </section>

        <section className="rates section" id="rates">
          <div className="rate-panel">
            <div className="rate-intro">
              <p className="eyebrow">Indicative rates</p>
              <h2>See our rates.</h2>
              <p>Rates are shown per troy ounce. Your offer depends on purity and weight.</p>
              <div className="formula"><span>How we calculate it</span><strong>Purity × weight × rate</strong><small>We show each number.</small></div>
            </div>
            <div className="rate-table">
              <dl>
                {rates.map(([karat, rate]) => <div key={karat}><dt><strong>{karat}</strong> gold</dt><dd>{rate}</dd></div>)}
              </dl>
              <p>Indicative rates updated 10 July 2026. Stones and non-gold parts are excluded from payable gold weight.</p>
              <a className="button" href="#events">Find an event <span>→</span></a>
            </div>
          </div>
        </section>

        <section className="faq section">
          <div className="section-heading"><p className="eyebrow">Before you come</p><h2>Common questions.</h2></div>
          <dl className="faq-list">
            <div><dt>What can I bring?</dt><dd>Gold jewellery, hallmarked silver, coins, watches and broken pieces.</dd></div>
            <div><dt>Do I need to book?</dt><dd>Booking is best. Walk-ins are welcome when space is available.</dd></div>
            <div><dt>How do you value it?</dt><dd>We test the purity and weight with you, then show the rate and offer.</dd></div>
            <div><dt>What if I say no?</dt><dd>You take every item home. There is no fee.</dd></div>
          </dl>
        </section>

        <section className="closing">
          <h2>Find out what yours is worth.</h2>
          <p>Your valuation is free. You do not have to sell.</p>
          <a className="button" href="#events">Find an event <span>→</span></a>
        </section>
      </main>

      <footer>
        <div><a href="#" className="wordmark">The Gold Table</a><p>We test, weigh and explain each offer with you.</p></div>
        <div><a href="mailto:hello@thegoldtable.co.uk">hello@thegoldtable.co.uk</a><p>© 2026 The Gold Table</p></div>
      </footer>
    </>
  );
}
