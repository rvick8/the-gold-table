"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { GoldTableEvent } from "@/content/events";
import { track } from "@/lib/analytics";
import { formatEventDate, generateSlots } from "@/lib/events";
import { validateForm, type FormResponse } from "@/lib/forms";

type Kind = "event_reservation" | "mail_in_pack_request" | "host_enquiry" | "general_contact";

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
  event_reservation: "Reserve Your Free Valuation",
  mail_in_pack_request: "Request a Valuation Pack",
  host_enquiry: "Send Host Enquiry",
  general_contact: "Send Enquiry",
};

function Field({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
  placeholder,
  autoComplete,
  error,
  describedBy,
}: FieldProps) {
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
    <label htmlFor={name}>{label}{required && " *"}</label>
    {textarea
      ? <textarea {...shared} autoComplete={autoComplete} />
      : <input {...shared} type={type} placeholder={placeholder} autoComplete={autoComplete} />}
    {error && <span className="error" id={errorId}>{error}</span>}
  </div>;
}

function normaliseFieldErrors(errors: Record<string, string[] | undefined>) {
  return Object.fromEntries(
    Object.entries(errors)
      .filter((entry): entry is [string, string[]] => Boolean(entry[1]?.length))
      .map(([name, messages]) => [name, messages]),
  );
}

export function GoldTableForm({ kind, event }: { kind: Kind; event?: GoldTableEvent }) {
  const [state, setState] = useState<FormResponse | null>(null);
  const [reservedTime, setReservedTime] = useState("");
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const statusPanelRef = useRef<HTMLDivElement>(null);
  const slots = event ? generateSlots(event) : [];
  const errors = state && !state.success ? state.fieldErrors ?? {} : {};
  const errorFor = (name: string) => errors[name]?.[0];
  const contactHintId = `${kind}-contact-hint`;
  const usesEitherContact = kind !== "mail_in_pack_request";

  useEffect(() => {
    if (state) statusPanelRef.current?.focus();
  }, [state]);

  const start = () => {
    if (started) return;
    setStarted(true);
    track(kind === "event_reservation" ? "reservation_started" : kind === "mail_in_pack_request" ? "mail_in_form_started" : "host_enquiry_started");
  };

  async function submit(eventSubmission: FormEvent<HTMLFormElement>) {
    eventSubmission.preventDefault();
    if (busy) return;

    setState(null);
    const form = eventSubmission.currentTarget;
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

    if (event) {
      Object.assign(payload, {
        eventId: event.id,
        eventSlug: event.slug,
        eventName: event.venueName,
        eventDate: event.startDateTime,
        eventAddress: [event.addressLine1, event.town, event.postcode].join(", "),
      });
    }

    const validated = validateForm(payload);
    if (!validated.success) {
      setState({
        success: false,
        message: "Please check the highlighted fields.",
        fieldErrors: normaliseFieldErrors(validated.error.flatten().fieldErrors),
      });
      return;
    }

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
        setReservedTime(String(payload.preferredTime || ""));
        track(kind === "event_reservation" ? "reservation_completed" : kind === "mail_in_pack_request" ? "mail_in_form_completed" : "host_enquiry_completed");
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
      <h3>Your valuation is reserved.</h3>
      <p><strong>{event.venueName}</strong><br />{formatEventDate(event.startDateTime)}{reservedTime && <> at {new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date(reservedTime))}</>}</p>
      <p>{event.addressLine1}, {event.town}, {event.postcode}</p>
      <p>Bring any jewellery, coins, watches, silver or other items you would like us to examine. We will test and explain each item privately. There is no obligation to sell.</p>
      <p>Please arrive approximately five minutes early.</p>
      <div className="form-success-actions"><a className="button" href={`/api/calendar/${event.slug}`}>Add to calendar</a><Link className="button secondary" href={`/events/${event.slug}`}>Event details</Link></div>
      {state.development && <p><small>Development mode: validated locally; no webhook was sent.</small></p>}
    </div>;
  }

  return <form onSubmit={submit} onFocus={start} noValidate className="form-layout">
    {state && !state.success && <div className="error-panel form-error-summary form-status-panel" role="alert" tabIndex={-1} ref={statusPanelRef}>
      <strong>There was a problem</strong>
      <p>{state.message}</p>
    </div>}

    <div className="form-grid-two">
      <Field name="firstName" label={kind === "host_enquiry" ? "Contact first name" : "First name"} required autoComplete="given-name" error={errorFor("firstName")} />
      <Field name="lastName" label={kind === "host_enquiry" ? "Contact last name" : "Last name"} required autoComplete="family-name" error={errorFor("lastName")} />
    </div>

    {kind === "host_enquiry" && <Field name="businessName" label="Business or venue name" required autoComplete="organization" error={errorFor("businessName")} />}

    {usesEitherContact && <p className="form-hint" id={contactHintId}>Provide an email address or phone number so we can confirm your request.</p>}
    <div className="form-grid-two">
      <Field name="email" label="Email address" type="email" required={kind === "mail_in_pack_request"} autoComplete="email" describedBy={usesEitherContact ? contactHintId : undefined} error={errorFor("email")} />
      <Field name="phone" label="Phone number" type="tel" placeholder="e.g. 020 7946 0123" autoComplete="tel" describedBy={usesEitherContact ? contactHintId : undefined} error={errorFor("phone")} />
    </div>

    {kind === "event_reservation" && <div className="field">
      <label htmlFor="preferredTime">Preferred appointment time *</label>
      <select id="preferredTime" name="preferredTime" required defaultValue="" aria-invalid={errorFor("preferredTime") ? true : undefined} aria-describedby={errorFor("preferredTime") ? "preferredTime-error" : undefined}>
        <option value="" disabled>Select a time</option>
        {slots.map((slot) => <option value={slot.value} key={slot.value}>{slot.label}</option>)}
      </select>
      {errorFor("preferredTime") && <span className="error" id="preferredTime-error">{errorFor("preferredTime")}</span>}
    </div>}

    {(kind === "mail_in_pack_request" || kind === "host_enquiry") && <>
      <Field name="addressLine1" label="Address line 1" required autoComplete="address-line1" error={errorFor("addressLine1")} />
      <Field name="addressLine2" label="Address line 2" autoComplete="address-line2" error={errorFor("addressLine2")} />
      <div className="form-grid-three">
        <Field name="town" label="Town or city" required autoComplete="address-level2" error={errorFor("town")} />
        <Field name="county" label="County" autoComplete="address-level1" error={errorFor("county")} />
        <Field name="postcode" label="Postcode" required autoComplete="postal-code" error={errorFor("postcode")} />
      </div>
    </>}

    {kind === "host_enquiry" && <>
      <Field name="websiteUrl" label="Website" type="url" autoComplete="url" error={errorFor("websiteUrl")} />
      <div className="form-grid-two">
        <Field name="venueType" label="Venue type" required error={errorFor("venueType")} />
        <Field name="estimatedCapacity" label="Estimated capacity" error={errorFor("estimatedCapacity")} />
      </div>
      <Field name="preferredDates" label="Preferred dates or timing" textarea error={errorFor("preferredDates")} />
    </>}

    {kind === "mail_in_pack_request" && <Field name="itemDescription" label="What would you like valued? (optional)" textarea error={errorFor("itemDescription")} />}
    {(kind === "event_reservation" || kind === "host_enquiry" || kind === "general_contact") && <Field name="message" label="Message (optional)" textarea required={kind === "general_contact"} error={errorFor("message")} />}

    <div className="form-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="field">
      <label className="form-consent" htmlFor="consent"><input id="consent" type="checkbox" name="consent" required aria-invalid={errorFor("consent") ? true : undefined} aria-describedby={errorFor("consent") ? "consent-error" : undefined} /><span>I agree to the <Link href="/privacy">privacy policy</Link> and consent to my details being used to respond to this request. *</span></label>
      {errorFor("consent") && <span className="error" id="consent-error">{errorFor("consent")}</span>}
    </div>

    <button className="button navy" disabled={busy} type="submit">{busy ? "Submitting…" : labels[kind]}</button>
    {state?.success && <div className="success-panel form-status-panel" role="status" tabIndex={-1} ref={statusPanelRef}>{state.message}{state.development && <><br /><small>Development mode: validated locally; no webhook was sent.</small></>}</div>}
  </form>;
}
