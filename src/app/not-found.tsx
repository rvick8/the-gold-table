import Link from "next/link";

export default function NotFound() {
  return <section className="section status-page">
    <div className="container status-page__content">
      <p className="status-code" aria-hidden="true">404</p>
      <h1>That page is not on the table.</h1>
      <p className="status-page__intro">It may have moved, or the address may be incorrect.</p>
      <div className="status-actions"><Link className="button button--ink" href="/events">Find a local event</Link><Link className="button secondary" href="/">Return home</Link></div>
    </div>
  </section>;
}
