# The Gold Table website

A fast, accessible and SEO-friendly event-marketing and booking MVP for The Gold Table, built with Next.js App Router, TypeScript, Tailwind CSS and Zod. It is designed for Vercel and uses typed local content rather than a database.

## Run locally

Requires a current Node.js LTS release.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Without `HOOKDECK_WEBHOOK_URL`, validated forms log their payload on the server and return a labelled development success response.

## Environment variables

- `HOOKDECK_WEBHOOK_URL`: secret server-side Hookdeck inbound URL. Required in production.
- `NEXT_PUBLIC_SITE_URL`: canonical site origin, without a trailing slash.
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: optional and currently unused; reserved for progressive address/map enhancement.

## Content and events

Editable brand/legal configuration lives in `src/content/site.ts`; FAQs, legal review lists and AI image prompts are in the same content directory. Fictional events are in `src/content/events.ts` and must all be replaced before launch.

The mail-in service and gold-price chart are deliberately disabled in `src/content/site.ts` until their launch dependencies are complete. Enable mail-in only after postage, insurance, return terms and legal copy are confirmed. Enable the chart only after replacing the illustrative series with verified, sourced market data.

To add an event, copy an existing typed object, give it a unique `id` and `slug`, use ISO datetimes with the correct London offset, and add the matching image under `public/images`. Status is derived from the end time. To cancel an event, set `statusOverride: "cancelled"`. Set `noIndexWhenPast: true` if an expired page should not remain indexed.

Appointment slots are generated at `appointmentMinutes` intervals and never extend beyond the event end time. The server rechecks the selected time and refuses past-event bookings.

## Forms and Hookdeck

All forms post JSON to `/api/forms`. The route validates and sanitises data, checks a honeypot and a lightweight per-instance rate limit, appends server metadata, then forwards to Hookdeck with `X-Source: the-gold-table-website`. `form_type` values are:

- `event_reservation`
- `mail_in_pack_request`
- `host_enquiry`
- `general_contact`

Configure Hookdeck routing and the downstream CRM separately. The in-memory rate limit is suitable as basic MVP protection, not as a globally consistent production security boundary across serverless instances.

## Images

The SVGs in `public/images` are obvious local placeholders. Replace them with optimised AVIF/WebP photography while preserving filenames or update event/content references. Detailed generation prompts for hero, drawer, close-up, event, mail pack and host scenes are in `src/content/image-prompts.ts`.

## Deployment

Push the repository to a Git provider, import it into Vercel, set the three environment variables for the relevant environments, and deploy. Run `npm run lint`, `npm run typecheck` and `npm run build` before promotion.

## Pre-launch checklist

- [ ] Replace all six fictional events and verify addresses, access, parking and transport
- [ ] Replace placeholder photography; generate, review and optimise every image
- [ ] Connect `HOOKDECK_WEBHOOK_URL` and test CRM routing and failure alerts
- [ ] Add real legal name, company number, registered office, email and phone
- [ ] Obtain legal review of privacy policy, terms, complaints, valuation disclaimer and data retention
- [ ] Confirm AML and identification requirements
- [ ] Confirm payment timing and wording
- [ ] Confirm mail-in insurance, postage and return-shipping terms before enabling the service
- [ ] Replace testimonial placeholders with genuine consented testimonials
- [ ] Connect verified gold-price data or remove the chart
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
