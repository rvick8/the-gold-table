# The Gold Table website

A fast, accessible and conversion-focused website for The Gold Table, built with Next.js App Router, TypeScript, custom CSS and server-side Zod validation. It gives sellers a short path to local event details and gives venues a short path to a fit-check enquiry.

## Run locally

Requires a current Node.js LTS release.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Without `HOOKDECK_WEBHOOK_URL`, validated forms return a clearly labelled development response and log only the form type and generated submission ID.

## Environment variables

- `HOOKDECK_WEBHOOK_URL`: secret server-side Hookdeck inbound URL. Required in production.
- `NEXT_PUBLIC_SITE_URL`: canonical site origin, without a trailing slash.

## Content and events

Editable brand/legal configuration lives in `src/content/site.ts`; FAQs, legal review lists and image prompts are in the same content directory. Fictional events are in `src/content/events.ts` and must all be replaced before launch.

The mail-in service is deliberately disabled in `src/content/site.ts` until postage, insurance, return terms and legal copy are confirmed. While disabled, the page is no-index and excluded from the sitemap.

To add an event, copy an existing typed object, give it a unique `id` and `slug`, use ISO datetimes with the correct London offset, and add the matching image under `public/images`. Status is derived from the end time. To cancel an event, set `statusOverride: "cancelled"`. Set `noIndexWhenPast: true` if an expired page should not remain indexed.

Appointment times are generated at `appointmentMinutes` intervals and never extend beyond the event end time. The server rechecks the selected time and refuses requests for past or invalid events. These are appointment requests, not confirmed reservations: production still needs a durable capacity store and a confirmation workflow before it can promise a booked slot.

The event search matches venue, town, borough and postcode text, with a broad postcode-area fallback. Add real coordinates and a geocoder before describing results as distance-ranked or the nearest event.

## Forms and Hookdeck

All forms post JSON to `/api/forms`. The route validates and sanitises data, checks a honeypot and a lightweight per-instance rate limit, appends server metadata, then forwards to Hookdeck with `X-Source: the-gold-table-website`. `form_type` values are:

- `event_reservation`
- `event_interest`
- `mail_in_pack_request`
- `host_enquiry`

Configure Hookdeck routing and the downstream CRM separately. The in-memory rate limit is suitable as basic MVP protection, not as a globally consistent production security boundary across serverless instances.

## Images

The v2 image set is a controlled ChatGPT Image concept set, created to give the preview a coherent, event-day visual language. It is not operational proof. Before launch, replace it with consented photography from real valuers, customers and venues, ideally delivered as optimised AVIF/WebP files. The production brief is in [`docs/image-direction.md`](docs/image-direction.md); controlled concept prompts remain in `src/content/image-prompts.ts`.

## Deployment

Push the repository to a Git provider, import it into Vercel, set the required environment variables for the relevant environments, and deploy. Run `npm run lint`, `npm run typecheck` and `npm run build` before promotion.

## Pre-launch checklist

- [ ] Replace all six fictional events and verify addresses, access, parking and transport
- [ ] Replace preview photography with consistent, consented real-world imagery
- [ ] Connect `HOOKDECK_WEBHOOK_URL` and test CRM routing and failure alerts
- [ ] Add real legal name, company number, registered office, email and phone
- [ ] Obtain legal review of privacy policy, terms, complaints, valuation disclaimer and data retention
- [ ] Confirm AML and identification requirements
- [ ] Confirm payment timing and wording
- [ ] Confirm mail-in insurance, postage and return-shipping terms before enabling the service
- [ ] Add genuine, consented reviews and venue proof before making public trust claims
- [ ] Add capacity-aware appointment storage, confirmation, cancellation and rescheduling
- [ ] Add coordinate-based distance search or geocoding for true nearest-event results
- [ ] Test every form, error state and duplicate-submit state
- [ ] Test mobile layouts, keyboard navigation and screen-reader announcements
- [ ] Test `.ics` files in Apple, Google and Outlook calendars
- [ ] Test upcoming, past, cancelled and noindex event behaviour
- [ ] Configure the production domain and `NEXT_PUBLIC_SITE_URL`
- [ ] Add analytics only after consent requirements are reviewed
- [ ] Run Lighthouse and automated/manual accessibility checks
- [ ] Validate Organization, Event and FAQ structured data
- [ ] Test current Safari and Chrome on desktop and mobile
- [ ] Deploy to Vercel and complete a production smoke test
