import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { events } from "@/content/events";
import { getEventStatus } from "@/lib/events";

export const revalidate = 300;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/events",
    "/how-it-works",
    "/host",
    "/faqs",
    ...(site.mailIn.enabled ? ["/mail-in"] : []),
  ];

  const pageEntries: MetadataRoute.Sitemap = pages.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: route === "/events" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/events" ? 0.9 : 0.7,
  }));

  const eventEntries: MetadataRoute.Sitemap = events
    .filter((event) => {
      const status = getEventStatus(event);
      return status !== "cancelled" && !(status === "past" && event.noIndexWhenPast);
    })
    .map((event) => ({
      url: `${site.url}/events/${event.slug}`,
      changeFrequency: "monthly",
      priority: getEventStatus(event) === "upcoming" ? 0.8 : 0.4,
    }));

  return [...pageEntries, ...eventEntries];
}
