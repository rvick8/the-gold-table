"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { GoldTableEvent } from "@/content/events";
import { track } from "@/lib/analytics";
import { formatEventDate, generateSlots } from "@/lib/events";
import type { FormResponse } from "@/lib/forms";

type Kind = "event_reservation" | "event_interest" | "mail_in_pack_request" | "host_enquiry";

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  describedBy?: string;
};

const labels: Record<Kind, string> = {
  event_reservation: "Send appointment request",
  event_interest: "Record my area",
  mail_in_pack_request: "Request a valuation pack",
  host_enquiry: "Check my venue",
};

const successContent: Record<Exclude<Kind, "event_reservation">, [string, string]> = {
  event_interest: ["Your area has been recorded.", "Thank you. The team has your postcode and contact details."],
  mail_in_pack_request: ["Your pack request has been received.", "The team has your details and will review the request."],
  host_enquiry: ["Your venue enquiry has been received.", "Thank you. The team has the first details needed to assess your venue."],
};

function Field({ name, label, type = "text", required = false, textarea = false, placeholder, autoComplete, error, describedBy }: FieldProps) {
  const errorId = `${name}-error`;
  const description = [describedBy, error ? errorId : undefined].filter(Boolean).join(" ") || undefined;
  const shared = {
    id: name,
    name,
    required,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": description,
  };

  return <div className="field">
    <label htmlFor={name}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
    {textarea
      ? <textarea {...shared} placeholder={placeholder} autoComplete={autoComplete} />
      : <input {...shared} type={type} placeholder={placeholder} autoComplete={autoComplete} />}
    {error ? <span className="error" id={errorId}>{error}</span> : null}
  </div>;
}

function SelectField({ name, label, options, required = false, error }: { name: string; label: string; options: readonly string[]; required?: boolean; error?: string }) {
  const errorId = `${name}-error`;
  return <div className="field">
    <label htmlFor={name}>{label}{required ? <span aria-hidden="true"> *</span> : null}</label>
    <select id={name} name={name} required={required} defaultValue="" aria-invalid={error ? true : undefined} aria-describedby={error ? errorId : undefined}>
      <option value="">Select an option</option>
      {options.map((option) => <option value={option} key={option}>{option}</option>)}
    </select>
    {error ? <span className="error" id={errorId}>{error}</span> : null}
  </div>;
}

export function GoldTableForm({ kind, event }: { kind: Kind; event?: GoldTableEvent }) {
  const [state, setState] = useState<FormResponse | null>(null);
  const [requestedTime, setRequestedTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const statusPanelRef = useRef<HTMLDivElement>(null);
  const slots = event ? generateSlots(event) : [];
  const errors = state && !state.success ? state.fieldErrors ?? {} : {};
  const errorFor = (name: string) => errors[name]?.[0];
  const contactHintId = `${kind}-contact-hint`;

  useEffect(() => {
    if (state) statusPanelRef.current?.focus();
  }, [state]);

  function start() {
    if (started) return;
    setStarted(true);
    const eventName = kind === "event_reservation" ? "reservation_started" : kind === "event_interest" ? "event_interest_started" : kind === "mail_in_pack_request" ? "mail_in_form_started" : "host_enquiry_started";
    track(eventName);
  }

  async function submit(submission: FormEvent<HTMLFormElement>) {
    submission.preventDefault();
    if (busy) return;

    setState(null);
    const form = submission.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const params = new URLSearchParams(location.search);
    const payload: Record<string, unknown> = {
      ...data,
      consent: data.consent === "on",
      form_type: kind,
      pageUrl: location.href,
      referrer: document.referrer || undefined,
      utm: Object.fromEntries([...params].filter(([key]) => key.startsWith("utm_"))),
    };

    if (event) payload.eventSlug = event.slug;

    setBusy(true);
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: FormResponse = await response.json();
      setState(result);

      if (result.success) {
        setRequestedTime(String(payload.preferredTime || ""));
        const eventName = kind === "event_reservation" ? "reservation_completed" : kind === "event_interest" ? "event_interest_completed" : kind === "mail_in_pack_request" ? "mail_in_form_completed" : "host_enquiry_completed";
        track(eventName);
        form.reset();
      }
    } catch {
      setState({ success: false, message: "We could not connect. Please check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  if (state?.success && event) {
    return <div className="success-panel form-status-panel" role="status" tabIndex={-1} ref={statusPanelRef}>
      <p className="eyebrow">Request received</p>
      <h3>Your preferred appointment time has been sent.</h3>
      <p><strong>{event.venueName}</strong><br />{formatEventDate(event.startDateTime)}{requestedTime ? <> at {new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date(requestedTime))}</> : null}</p>
      <p>The event team still needs to confirm the time. Please do not rely on it as a completed booking until you receive that confirmation.</p>
      {event.walkInsWelcome ? <p>You may also attend as a walk-in during the published event hours.</p> : null}
      <div className="form-success-actions"><Link className="button button--ink" href={`/events/${event.slug}`}>Review event details</Link></div>
      {state.development ? <p><small>Development mode: validated locally; no webhook was sent.</small></p> : null}
    </div>;
  }

  if (state?.success) {
    const [heading, copy] = kind === "event_reservation"
      ? ["Your appointment request has been received.", "The team has your preferred time and contact details."]
      : successContent[kind];
    return <div className="success-panel form-status-panel" role="status" tabIndex={-1} ref={statusPanelRef}>
      <p className="eyebrow">Thank you</p><h3>{heading}</h3><p>{copy}</p>
      {state.development ? <p><small>Development mode: validated locally; no webhook was sent.</small></p> : null}
    </div>;
  }

  const compactContact = kind === "host_enquiry" || kind === "event_interest";

  return <form onSubmit={submit} onFocus={start} className={`form-layout form-layout--${kind}`}>
    {state && !state.success ? <div className="error-panel form-error-summary form-status-panel" role="alert" tabIndex={-1} ref={statusPanelRef}>
      <strong>There was a problem</strong><p>{state.message}</p>
    </div> : null}

    {kind === "event_reservation" ? <div className="field field--featured">
      <label htmlFor="preferredTime">Preferred appointment time <span aria-hidden="true">*</span></label>
      <select id="preferredTime" name="preferredTime" required defaultValue="" aria-invalid={errorFor("preferredTime") ? true : undefined} aria-describedby={errorFor("preferredTime") ? "preferredTime-error" : undefined}>
        <option value="" disabled>Choose a time</option>
        {slots.map((slot) => <option value={slot.value} key={slot.value}>{slot.label}</option>)}
      </select>
      {errorFor("preferredTime") ? <span className="error" id="preferredTime-error">{errorFor("preferredTime")}</span> : null}
    </div> : null}

    {kind === "host_enquiry" ? <>
      <div className="form-grid-two"><Field name="firstName" label="Contact name" required autoComplete="name" error={errorFor("firstName")} /><Field name="businessName" label="Venue name" required autoComplete="organization" error={errorFor("businessName")} /></div>
      <Field name="postcode" label="Venue postcode" required autoComplete="postal-code" placeholder="e.g. TW9 2QJ" error={errorFor("postcode")} />
    </> : null}

    {kind === "event_interest" ? <div className="form-grid-two"><Field name="firstName" label="First name" required autoComplete="given-name" error={errorFor("firstName")} /><Field name="postcode" label="Your postcode" required autoComplete="postal-code" placeholder="e.g. TW9 2QJ" error={errorFor("postcode")} /></div> : null}

    {kind === "event_reservation" || kind === "mail_in_pack_request" ? <div className="form-grid-two">
      <Field name="firstName" label="First name" required autoComplete="given-name" error={errorFor("firstName")} />
      {kind === "event_reservation" ? <Field name="lastName" label="Surname (optional)" autoComplete="family-name" error={errorFor("lastName")} /> : <Field name="lastName" label="Surname" required autoComplete="family-name" error={errorFor("lastName")} />}
    </div> : null}

    <p className="form-hint" id={contactHintId}>Add an email address or phone number so the team can respond.</p>
    <div className="form-grid-two">
      <Field name="email" label="Email address" type="email" required={kind === "mail_in_pack_request"} autoComplete="email" describedBy={contactHintId} error={errorFor("email")} />
      <Field name="phone" label="Phone number" type="tel" placeholder="e.g. 020 7946 0123" autoComplete="tel" describedBy={contactHintId} error={errorFor("phone")} />
    </div>

    {kind === "host_enquiry" ? <>
      <SelectField name="venueType" label="Venue type (optional)" options={["Pub or bar", "Hotel", "Golf or sports club", "Community venue", "Other"]} error={errorFor("venueType")} />
      <Field name="message" label="Anything useful to know? (optional)" textarea placeholder="Tell us about the space or the best time to contact you." error={errorFor("message")} />
    </> : null}

    {kind === "event_reservation" ? <details className="form-more"><summary>Add a note (optional)</summary><Field name="message" label="Message" textarea placeholder="Accessibility needs, a larger collection or anything else the team should know." error={errorFor("message")} /></details> : null}
    {kind === "event_interest" ? <Field name="message" label="Nearby town or area (optional)" placeholder="e.g. Richmond" error={errorFor("message")} /> : null}
    {kind === "mail_in_pack_request" ? <>
      <Field name="addressLine1" label="Address line 1" required autoComplete="address-line1" error={errorFor("addressLine1")} />
      <Field name="addressLine2" label="Address line 2" autoComplete="address-line2" error={errorFor("addressLine2")} />
      <div className="form-grid-three"><Field name="town" label="Town or city" required autoComplete="address-level2" error={errorFor("town")} /><Field name="county" label="County" autoComplete="address-level1" error={errorFor("county")} /><Field name="postcode" label="Postcode" required autoComplete="postal-code" error={errorFor("postcode")} /></div>
      <Field name="itemDescription" label="What would you like valued? (optional)" textarea error={errorFor("itemDescription")} />
    </> : null}

    <div className="form-honeypot" hidden aria-hidden="true"><label htmlFor={`${kind}-website`}>Website</label><input id={`${kind}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="field">
      <label className="form-consent" htmlFor={`${kind}-consent`}><input id={`${kind}-consent`} type="checkbox" name="consent" required aria-invalid={errorFor("consent") ? true : undefined} aria-describedby={errorFor("consent") ? `${kind}-consent-error` : undefined} /><span>I have read the <Link href="/privacy" target="_blank" rel="noreferrer" aria-label="privacy policy (opens in a new tab)">privacy policy</Link> and agree to my details being used to handle this request. <span aria-hidden="true">*</span></span></label>
      {errorFor("consent") ? <span className="error" id={`${kind}-consent-error`}>{errorFor("consent")}</span> : null}
    </div>

    <button className="button button--ink form-submit" disabled={busy} type="submit">{busy ? "Sending…" : labels[kind]} <span aria-hidden="true">→</span></button>
    {compactContact ? <p className="form-footnote">Only the details needed for a first conversation.</p> : null}
  </form>;
}
