export type AnalyticsEvent = "event_card_viewed" | "event_detail_viewed" | "find_event_clicked" | "reservation_started" | "reservation_completed" | "mail_in_form_started" | "mail_in_form_completed" | "host_enquiry_started" | "host_enquiry_completed" | "phone_clicked" | "email_clicked";
export function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("goldtable:analytics", { detail: { event, ...properties } }));
  // Future analytics providers should subscribe here. Do not add tracking scripts without reviewing consent requirements.
}
