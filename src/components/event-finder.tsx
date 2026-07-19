export function EventFinder({ compact = false, defaultValue = "" }: { compact?: boolean; defaultValue?: string }) {
  return <form className={`event-finder${compact ? " event-finder--compact" : ""}`} action="/events" method="get">
    <label htmlFor={compact ? "event-location-compact" : "event-location"}>Enter your postcode or area</label>
    <div className="event-finder__row">
      <input
        id={compact ? "event-location-compact" : "event-location"}
        name="location"
        type="search"
        placeholder="e.g. TW9 or Richmond"
        defaultValue={defaultValue}
        autoComplete="postal-code"
      />
      <button className="button button--gold" type="submit">Find local events <span aria-hidden="true">→</span></button>
    </div>
    <p>Search by postcode, town or London borough.</p>
  </form>;
}
