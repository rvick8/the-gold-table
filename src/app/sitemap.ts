import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { events } from "@/content/events";
import { getEventStatus } from "@/lib/events";
export default function sitemap():MetadataRoute.Sitemap{const pages=["","/events","/how-it-works","/mail-in","/host","/faqs","/privacy","/terms"];return [...pages.map(route=>({url:`${site.url}${route}`,lastModified:new Date(),changeFrequency:route==="/events"?"weekly" as const:"monthly" as const,priority:route===""?1:route==="/events"?.9:.7})),...events.filter(e=>!(getEventStatus(e)==="past"&&e.noIndexWhenPast)).map(e=>({url:`${site.url}/events/${e.slug}`,lastModified:new Date(e.startDateTime),changeFrequency:"monthly" as const,priority:getEventStatus(e)==="upcoming"?.8:.4}))]}
