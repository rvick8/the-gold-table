export type AnalyticsEvent = "reservation_started" | "reservation_completed" | "event_interest_started" | "event_interest_completed" | "mail_in_form_started" | "mail_in_form_completed" | "host_enquiry_started" | "host_enquiry_completed";
export function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("goldtable:analytics", { detail: { event, ...properties } }));
  // Future analytics providers should subscribe here. Do not add tracking scripts without reviewing consent requirements.
}
