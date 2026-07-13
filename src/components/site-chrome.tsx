"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { Logo } from "./logo";

const links = [
  ["Find an Event", "/events"],
  ["How It Works", "/how-it-works"],
  ...(site.mailIn.enabled ? [["Mail-In Valuation", "/mail-in"]] : []),
  ["Host The Gold Table", "/host"],
  ["FAQs", "/faqs"],
] as const;

const isConfigured = (value: string) => Boolean(value && !value.startsWith("["));
const contactConfigured = isConfigured(site.legal.email) || isConfigured(site.legal.phone);
const companyConfigured = [site.legal.companyName, site.legal.companyNumber, site.legal.registeredOffice].every(isConfigured);
const showDevelopmentWarnings = process.env.NODE_ENV !== "production";

export function Header() {
  const [open, setOpen] = useState(false);

  return <>
    <div className="announcement" hidden={!site.announcement.enabled}>{site.announcement.text}</div>
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo inverse />
        <nav className="desktop-nav site-header__nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link className="nav-link" href={href} key={href}>{label}</Link>)}
          <Link className="button" href="/events">Find an Event</Link>
        </nav>
        <button aria-expanded={open} aria-controls="mobile-navigation" aria-label="Toggle navigation" onClick={() => setOpen(!open)} className="mobile-menu-button">{open ? "Close" : "Menu"}</button>
      </div>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="container mobile-navigation">
        {links.map(([label, href]) => <Link className="nav-link" href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className="button" href="/events" onClick={() => setOpen(false)}>Find an Event</Link>
      </nav>}
    </header>
  </>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="site-footer__grid">
      <div><Logo inverse /><p>Friendly experts. Honest valuations. Trusted local venues.</p></div>
      <div><strong>Explore</strong><div className="site-footer__links">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div></div>
      <div><strong>Legal</strong><div className="site-footer__links"><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms</Link></div></div>
      {contactConfigured && <div><strong>Contact</strong><p>{isConfigured(site.legal.email) && <>{site.legal.email}<br /></>}{isConfigured(site.legal.phone) && site.legal.phone}</p></div>}
      {!contactConfigured && showDevelopmentWarnings && <div className="footer-config-warning"><strong>Development only</strong><p>Add the contact email and phone before launch.</p></div>}
    </div>
    {(companyConfigured || showDevelopmentWarnings) && <><div className="rule site-footer__rule" />
      {companyConfigured
        ? <p className="site-footer__legal">{site.legal.companyName} · {site.legal.companyNumber} · {site.legal.registeredOffice}</p>
        : <p className="site-footer__legal footer-config-warning">Development only: company legal details are hidden in production until configured.</p>}
    </>}
  </div></footer>;
}
