import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./logo";
import { MobileNavigation } from "./mobile-navigation";

const links = [
  ["How it works", "/how-it-works"],
  ["Host an event", "/host"],
] as const;

const isConfigured = (value: string) => Boolean(value && !value.startsWith("["));
const contactConfigured = isConfigured(site.legal.email) || isConfigured(site.legal.phone);
const companyConfigured = [site.legal.companyName, site.legal.companyNumber, site.legal.registeredOffice].every(isConfigured);
const showDevelopmentWarnings = process.env.NODE_ENV !== "production";

export function Header() {
  return <>
    <div className="trust-bar">
      <div className="container trust-bar__inner">
        <span>Local gold-buying events across London</span>
        <span className="trust-bar__facts" aria-label="Service benefits">
          <span>Free valuation</span><span>No obligation</span><span>Private and discreet</span>
        </span>
      </div>
    </div>
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo inverse />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          <Link className="button button--gold header-cta" href="/events">Find an event</Link>
        </nav>
        <div className="mobile-actions">
          <Link className="mobile-event-cta" href="/events" aria-label="Find an event">Events</Link>
          <MobileNavigation links={links} />
        </div>
      </div>
    </header>
  </>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="container">
      <div className="site-footer__lead">
        <Logo inverse />
        <p>The local, no-pressure way to understand and sell gold.</p>
      </div>
      <div className="site-footer__grid">
        <div>
          <strong>For sellers</strong>
          <div className="site-footer__links">
            <Link href="/events">Find an event</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/how-it-works#what-we-buy">What we buy</Link>
            <Link href="/faqs">FAQs</Link>
          </div>
        </div>
        <div>
          <strong>For venues</strong>
          <div className="site-footer__links">
            <Link href="/host">Host The Gold Table</Link>
            <Link href="/host#venue-fit">Is your venue a fit?</Link>
            <Link href="/host#venue-enquiry">Make an enquiry</Link>
          </div>
        </div>
        <div>
          <strong>Legal</strong>
          <div className="site-footer__links">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
        {contactConfigured ? <div>
          <strong>Contact</strong>
          <p>{isConfigured(site.legal.email) ? <><a href={`mailto:${site.legal.email}`}>{site.legal.email}</a><br /></> : null}{isConfigured(site.legal.phone) ? <a href={`tel:${site.legal.phone}`}>{site.legal.phone}</a> : null}</p>
        </div> : showDevelopmentWarnings ? <div className="footer-config-warning"><strong>Development only</strong><p>Add the contact email and phone before launch.</p></div> : null}
      </div>
      <div className="site-footer__bottom">
        {companyConfigured
          ? <p>{site.legal.companyName} · {site.legal.companyNumber} · {site.legal.registeredOffice}</p>
          : showDevelopmentWarnings ? <p className="footer-config-warning">Development only: company legal details are hidden in production until configured.</p> : <span />}
        <p>© {new Date().getFullYear()} The Gold Table</p>
      </div>
    </div>
  </footer>;
}
