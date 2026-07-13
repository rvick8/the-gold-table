# Design QA — The Gold Table homepage refinement

- Source visual truth: `/Users/ryanvick/.codex/generated_images/019f51b4-f337-7972-a5e9-ac9a8555f67f/exec-753177d7-1076-4817-8281-f2e3b5b4272d.png`
- Desktop implementation screenshots: `/Users/ryanvick/dev/the-gold-table/qa-home-desktop-viewport.png` and `/Users/ryanvick/dev/the-gold-table/qa-home-desktop-lower.png`
- Mobile implementation screenshots: `/Users/ryanvick/dev/the-gold-table/qa-home-mobile.png` and `/Users/ryanvick/dev/the-gold-table/qa-home-mobile-lower.png`
- Combined comparison: `/Users/ryanvick/dev/the-gold-table/qa-comparison-desktop.png`
- Viewports: desktop 1655 × 1326; mobile 390 × 844
- State: homepage initial state and scrolled supporting sections

## Full-view comparison evidence

The side-by-side comparison confirms that the implementation now follows the selected editorial structure: cream header, photographic hero, event rows as the first functional section, parchment chart, deep-navy process band, light valuation section, tan reassurance strip and simple footer route. The postcode field and repeated icon rows are intentionally absent because the user explicitly asked to remove them. The event list is now immediately below the hero, with an in-hero anchor CTA for direct access.

## Focused region comparison evidence

- Hero and header: the expert's complete head is visible at desktop and mobile widths; the wordmark is a compact two-line typographic lockup; white hero copy remains legible against the photograph.
- Buttons and event rows: cream serif button labels replace oversized dark sans-serif labels; date, venue, time, walk-in state and booking action remain aligned and scannable.
- Chart and process band: the chart line stays within its plot and no longer overlaps the caption; the process band uses three aligned numbered steps without decorative icons.
- Supporting sections: valuation categories and reassurance statements use typography and rules instead of repeated pictograms.
- Mobile: 390px screenshots show no horizontal overflow, a complete hero crop, usable navigation and clean single-column process steps.

## Fidelity surfaces

- Fonts and typography: Cormorant Garamond and Inter preserve the source's editorial serif/sans contrast. CTA labels now use a restrained serif weight and size. Headings, labels and event rows retain a consistent hierarchy at both viewports.
- Spacing and layout rhythm: major sections are visually distinct with cream, parchment, navy and tan bands. Event rows appear directly after the hero. Desktop process steps share equal tracks; mobile steps stack with consistent separators.
- Colours and visual tokens: deep navy, warm cream, parchment and muted antique gold remain aligned with the reference. Button foreground contrast is cream on antique gold.
- Image quality and asset fidelity: the supplied full-resolution documentary hero photograph is used directly. Its crop was adjusted with `object-position` and a taller desktop frame so neither subject is clipped.
- Copy and content: homepage copy is reduced and conversion-focused. The placeholder chart is visibly labelled as illustrative and not live market data.

## Comparison history

1. P1 — The desktop hero crop removed the top of the valuer's head. Fixed by increasing the hero frame and moving the image focal position upward; verified at 1655 × 1326 and 390 × 844.
2. P1 — The navy postcode field drifted from the approved direction and delayed direct event access. Removed from the homepage; a single `View upcoming events` CTA now scrolls to the event list and was interaction-tested.
3. P1 — Gold buttons used large dark sans-serif text. Reworked all primary and event actions to smaller cream serif labels with a restrained hover state.
4. P1 — `How it works` used misaligned icons and uneven tracks. Rebuilt as three text-led numbered steps with consistent columns and mobile stacking.
5. P2 — Repeated icons made the lower homepage visually noisy. Removed icons from `What we value`, reassurance and host sections; spacing and rules now create hierarchy.
6. P2 — The previous wordmark was a plain text line. Replaced with a reusable two-line typographic lockup that works on cream and navy.
7. P2 — The restored illustrative chart line extended beyond its view box and overlapped its caption. Normalised the series, contained the SVG and shortened the disclosure.

## Interaction verification

- Hero `View upcoming events` CTA updates the URL fragment to `#upcoming-heading` and positions the heading below the sticky header.
- The first event row navigates to `/events/hawthorn-arms-richmond-august-2026` with the correct local event metadata.
- Browser console checked with no errors or warnings.
- Desktop and mobile pages have no horizontal overflow.

## Follow-up polish

- P3: Replace the illustrative chart with verified sourced data before launch, or disable the section.
- P3: Replace fictional events and remaining placeholder company/legal content before launch.

final result: passed

---

# Design QA — Option 1 logo integration

- Source visual truth: `/Users/ryanvick/.codex/generated_images/019f595b-223f-7a81-8155-014d93e32dbf/exec-ac3400eb-1674-430f-8c70-fb3f0490e682.png`
- Desktop implementation screenshot: `/Users/ryanvick/dev/the-gold-table/qa-logo-desktop.png`
- Mobile implementation screenshot: `/Users/ryanvick/dev/the-gold-table/qa-logo-mobile.png`
- Host image implementation screenshot: `/Users/ryanvick/dev/the-gold-table/qa-logo-host.png`
- Mail-in guarded-state screenshot: `/Users/ryanvick/dev/the-gold-table/qa-logo-mail-in.png`
- Combined source/implementation comparison: `/Users/ryanvick/dev/the-gold-table/qa-logo-comparison.png`
- Viewports: desktop 1440 × 1000; mobile 390 × 844
- State: homepage initial state, mobile menu open/closed, host page initial state, mail-in unavailable state

## Full-view comparison evidence

The side-by-side comparison confirms that the selected Option 1 identity carries into the existing deep-navy site chrome without changing the established page hierarchy. The same blocky table/ingot silhouette appears in the header lockup, favicon asset and branded photography, while the existing editorial serif wordmark and small uppercase descriptor retain the approved visual character.

## Focused region comparison evidence

- Header and footer lockups: the three-block mark remains distinct at 40–46px and aligns cleanly with the two-line wordmark on desktop and mobile.
- Homepage hero: the valuation case now uses the new mark and wordmark as restrained gold foil, with the people, jewellery, crop and lighting preserved.
- Host imagery: the foreground case and tabletop sign use the new mark in correct perspective and remain legible at the rendered image size.
- Mail-in pack: the owned materials consistently use the new mark in gold on navy and navy on light materials. The route remains intentionally guarded while the service is disabled.
- Favicon: the App Router serves the new square mark through `/icon.png`; the production build recognises the metadata route.

## Fidelity surfaces

- Fonts and typography: the Cormorant Garamond wordmark, uppercase spacing and compact sans-serif descriptor preserve the selected board's editorial serif/sans relationship. No text wraps or clips at 390px.
- Spacing and layout rhythm: the mark has enough clear space to read without enlarging the header. Lockup proportions remain balanced beside desktop navigation and the mobile menu control.
- Colours and visual tokens: deep navy and muted antique gold match the site's existing `--deep` and `--gold` palette and the selected board's reverse lockup.
- Image quality and asset fidelity: the visible logo is a real generated raster asset, not CSS or inline SVG art. The three rebranded photographs preserve their original dimensions and documentary art direction.
- Copy and content: the exact business name and `Private valuations` descriptor are preserved. Practical mail-pack copy and page content remain unchanged.

## Comparison history

1. P2 — Replacing photography under the old filenames allowed an image cache to continue serving the previous emblem. Fixed by publishing the rebranded photographs at new `-branded` paths and updating every consuming route and event record. The revised homepage and host screenshots show the new table mark in the rendered page.

## Interaction verification

- Mobile menu toggled successfully and `aria-expanded` changed from `false` to `true`.
- The homepage, host page and guarded mail-in route rendered with no browser console errors or warnings.
- Desktop and 390px mobile headers have no clipping or horizontal overflow.
- `npm run lint` completed with one pre-existing unused-import warning in `src/app/layout.tsx`; `npm run typecheck` passed.
- `npm run build` passed and generated the `/icon.png` metadata route.

## Follow-up polish

- P3: commission or trace a true vector master of the selected mark before producing large-format signage, embroidery or print collateral; the current asset is production-ready for the website and photographic mockups.

final result: passed
