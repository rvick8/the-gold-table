"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavigationLink = readonly [label: string, href: string];

export function MobileNavigation({ links }: { links: readonly NavigationLink[] }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <div className="mobile-nav-shell">
    <button
      aria-expanded={open}
      aria-controls="mobile-navigation"
      aria-label={open ? "Close navigation" : "Open navigation"}
      className="mobile-menu-button"
      onClick={() => setOpen((current) => !current)}
      ref={buttonRef}
      type="button"
    >
      <span>{open ? "Close" : "Menu"}</span>
      <span className={`menu-lines${open ? " menu-lines--open" : ""}`} aria-hidden="true"><i /><i /></span>
    </button>
    {open ? <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-navigation">
      {links.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="button button--gold" href="/events" onClick={() => setOpen(false)}>Find an event</Link>
    </nav> : null}
  </div>;
}
