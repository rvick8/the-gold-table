export type VenueType = "Pub" | "Golf club" | "Hotel" | "Community venue";
export type EventStatus = "upcoming" | "past" | "cancelled";

export type GoldTableEvent = {
  id: string;
  slug: string;
  venueName: string;
  venueType: VenueType;
  shortDescription: string;
  longDescription: string;
  addressLine1: string;
  addressLine2?: string;
  town: string;
  borough: string;
  county?: string;
  postcode: string;
  country: "United Kingdom";
  startDateTime: string;
  endDateTime: string;
  timezone: "Europe/London";
  appointmentMinutes: number;
  walkInsWelcome: boolean;
  accessibilityNotes?: string;
  parkingNotes?: string;
  transportNotes?: string;
  image: string;
  imageAlt: string;
  statusOverride?: "cancelled";
  featured: boolean;
  noIndexWhenPast?: boolean;
};

// FICTIONAL PLACEHOLDER DATA. Replace every event and venue before launch.
export const events: GoldTableEvent[] = [
  {
    id: "evt-hawthorn-2026-08", slug: "hawthorn-arms-richmond-august-2026", venueName: "The Hawthorn Arms", venueType: "Pub",
    shortDescription: "A relaxed afternoon of private valuations in a quiet room beside the main bar.",
    longDescription: "Join The Gold Table at this welcoming Richmond venue for a calm, private look at jewellery, coins, watches and other precious-metal items. An experienced valuer will test, weigh and explain each item before you decide what to do next.",
    addressLine1: "18 Lower Richmond Lane", town: "Richmond", borough: "Richmond upon Thames", postcode: "TW9 2QJ", country: "United Kingdom",
    startDateTime: "2026-08-20T10:00:00+01:00", endDateTime: "2026-08-20T16:00:00+01:00", timezone: "Europe/London", appointmentMinutes: 15,
    walkInsWelcome: true, accessibilityNotes: "Step-free access and an accessible WC are expected; confirmation required before launch.", parkingNotes: "Limited venue parking; public car parks are available nearby.", transportNotes: "Approximately ten minutes on foot from Richmond station.",
    image: "/images/gold-table-pub-event-v2.png", imageAlt: "A Gold Table valuation conversation at a calm local pub event", featured: true,
  },
  {
    id: "evt-northwood-2026-08", slug: "northwood-park-golf-club-august-2026", venueName: "Northwood Park Golf Club", venueType: "Golf club",
    shortDescription: "Private appointments in a bright, comfortable clubhouse setting.", longDescription: "Bring pieces you no longer wear, inherited collections or items you simply want to understand. We will examine them carefully, explain the valuation and, if appropriate, make an offer with no obligation to sell.",
    addressLine1: "44 Northwood Way", town: "Northwood", borough: "Hillingdon", postcode: "HA6 2TY", country: "United Kingdom",
    startDateTime: "2026-08-27T10:00:00+01:00", endDateTime: "2026-08-27T16:00:00+01:00", timezone: "Europe/London", appointmentMinutes: 15, walkInsWelcome: true,
    accessibilityNotes: "Level entrance; please contact us if you have particular access needs.", parkingNotes: "Complimentary on-site parking is expected; confirmation required.", transportNotes: "Local bus connections serve Northwood town centre.", image: "/images/gold-table-golf-event-v2.png", imageAlt: "A Gold Table valuer speaking with a couple at a golf-club event", featured: true,
  },
  {
    id: "evt-wren-2026-09", slug: "wren-house-greenwich-september-2026", venueName: "The Wren House", venueType: "Hotel",
    shortDescription: "A discreet valuation day in a private room near central Greenwich.", longDescription: "Reserve a private 15-minute appointment or visit during the advertised walk-in hours. Our valuer will take the time to test and explain your items clearly.",
    addressLine1: "2 Plaisterer Lane", town: "Greenwich", borough: "Royal Borough of Greenwich", postcode: "SE10 8QF", country: "United Kingdom",
    startDateTime: "2026-09-10T10:00:00+01:00", endDateTime: "2026-09-10T16:00:00+01:00", timezone: "Europe/London", appointmentMinutes: 15, walkInsWelcome: true,
    accessibilityNotes: "Lift access to the event room; confirmation required before launch.", parkingNotes: "Public parking is available in Greenwich town centre.", transportNotes: "Close to Greenwich rail and DLR stations.", image: "/images/gold-table-hotel-event-v2.png", imageAlt: "A Gold Table valuer explaining jewellery at a private hotel event", featured: true,
  },
  {
    id: "evt-linden-2026-09", slug: "linden-hall-enfield-september-2026", venueName: "Linden Hall", venueType: "Community venue",
    shortDescription: "A friendly neighbourhood valuation event with bookable times and limited walk-ins.", longDescription: "A convenient local opportunity to find out what unused or inherited precious items may be worth, with a clear explanation and no pressure to sell.",
    addressLine1: "7 Linden Close", town: "Enfield", borough: "Enfield", postcode: "EN2 6AR", country: "United Kingdom",
    startDateTime: "2026-09-24T11:00:00+01:00", endDateTime: "2026-09-24T17:00:00+01:00", timezone: "Europe/London", appointmentMinutes: 15, walkInsWelcome: false,
    accessibilityNotes: "Step-free access throughout.", parkingNotes: "Small on-site car park and nearby street parking.", transportNotes: "Several local bus routes stop nearby.", image: "/images/gold-table-community-event-v2.png", imageAlt: "A Gold Table valuation conversation at a local community event", featured: false,
  },
  {
    id: "evt-elm-2026-06", slug: "elm-and-crown-bromley-june-2026", venueName: "The Elm & Crown", venueType: "Pub",
    shortDescription: "A completed local valuation day in Bromley.", longDescription: "This event has now ended. Browse upcoming Gold Table events to find another valuation day near you.",
    addressLine1: "81 Elm Grove", town: "Bromley", borough: "Bromley", postcode: "BR1 4DS", country: "United Kingdom",
    startDateTime: "2026-06-11T10:00:00+01:00", endDateTime: "2026-06-11T16:00:00+01:00", timezone: "Europe/London", appointmentMinutes: 15, walkInsWelcome: true,
    image: "/images/gold-table-pub-event-v2.png", imageAlt: "A Gold Table valuation conversation at a calm local pub event", featured: false,
  },
  {
    id: "evt-mill-2026-05", slug: "mill-lodge-harrow-may-2026", venueName: "Mill Lodge Hotel", venueType: "Hotel",
    shortDescription: "A completed private valuation day in Harrow.", longDescription: "This event has now ended. New dates are added regularly; see the events page for current options.",
    addressLine1: "10 Mill Lane", town: "Harrow", borough: "Harrow", postcode: "HA1 3RJ", country: "United Kingdom",
    startDateTime: "2026-05-21T10:00:00+01:00", endDateTime: "2026-05-21T16:00:00+01:00", timezone: "Europe/London", appointmentMinutes: 15, walkInsWelcome: false,
    image: "/images/gold-table-hotel-event-v2.png", imageAlt: "A Gold Table valuer explaining jewellery at a private hotel event", featured: false, noIndexWhenPast: true,
  },
];
