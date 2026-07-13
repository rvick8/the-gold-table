import { events, type GoldTableEvent, type EventStatus } from "@/content/events";

export function getEventStatus(event: GoldTableEvent, now = new Date()): EventStatus {
  if (event.statusOverride === "cancelled") return "cancelled";
  return new Date(event.endDateTime) < now ? "past" : "upcoming";
}
export const getUpcomingEvents = (now = new Date()) => events.filter((event) => getEventStatus(event, now) === "upcoming").sort((a,b) => +new Date(a.startDateTime) - +new Date(b.startDateTime));
export const getPastEvents = (now = new Date()) => events.filter((event) => getEventStatus(event, now) === "past").sort((a,b) => +new Date(b.startDateTime) - +new Date(a.startDateTime));
export const getFeaturedEvents = (now = new Date()) => getUpcomingEvents(now).filter((event) => event.featured);
export const getEventBySlug = (slug: string) => events.find((event) => event.slug === slug);
export const getRelatedEvents = (event: GoldTableEvent, limit = 3) => getUpcomingEvents().filter((candidate) => candidate.id !== event.id).sort((a,b) => Number(b.borough === event.borough) - Number(a.borough === event.borough)).slice(0, limit);

const dateFormatter = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long", day: "numeric", month: "long", year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", hour12: false });
export const formatEventDate = (value: string) => dateFormatter.format(new Date(value));
export const formatEventTime = (value: string) => timeFormatter.format(new Date(value));

export type AppointmentSlot = { value: string; label: string };
export function generateSlots(event: GoldTableEvent): AppointmentSlot[] {
  if (getEventStatus(event) !== "upcoming") return [];
  const slots: AppointmentSlot[] = [];
  const end = new Date(event.endDateTime).getTime();
  for (let time = new Date(event.startDateTime).getTime(); time + event.appointmentMinutes * 60_000 <= end; time += event.appointmentMinutes * 60_000) {
    const value = new Date(time).toISOString();
    slots.push({ value, label: formatEventTime(value) });
  }
  return slots;
}
