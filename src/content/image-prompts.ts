// Controlled concept prompts for the image system. Treat generated images as creative direction,
// then replace them with consented photography from real event days before launch.
const base = "Editorial event-day reportage photograph, full-frame DSLR appearance, natural depth of field, realistic skin texture, warm natural British venue light, navy, cream, antique gold and warm timber palette, candid and calm, no legible text, no visible logo, no watermark, no visible cash, no exaggerated expressions, no luxury jewellery-store styling and no AI artefacts.";
export const imagePrompts = {
  homepageHero: `${base} A personable female valuer speaking clearly with an older customer at a navy-covered table in a warm British pub private room, ring, loupe and simple tray visible, natural explanation rather than a posed portrait, subjects right of frame with quiet copy space left; landscape 16:9.`,
  preparingForEvent: `${base} An older person's hands placing inherited rings and a small watch into a navy pouch on a wooden kitchen table, open jewellery box, coat and bag nearby, familiar practical preparation rather than a luxury flat lay; landscape 4:3.`,
  valuationCloseUp: `${base} A valuer carefully examining a gold ring with a loupe as the customer follows along, hands, face and simple testing tools visible, navy tablecloth, clear calm consultation; portrait 2:3.`,
  pubEvent: `${base} A small, well-run valuation event inside a warm local British pub, a valuer and customer in a private consultation foreground, two visitors seated with tea in the background, no queue; landscape 3:2.`,
  golfClubEvent: `${base} A friendly Black female valuer talking through jewellery with an older couple at a traditional British golf clubhouse, navy consultation table and a glimpse of green outside; landscape 3:2.`,
  hotelEvent: `${base} A male valuer explaining a small jewellery collection to a middle-aged customer in a quiet hotel private room, practical table setup, human eye contact; landscape 3:2.`,
  communityEvent: `${base} An Asian female valuer with an older couple at a bright community-hall table, a couple of visitors in the distance with tea, welcoming but not busy; landscape 3:2.`,
  mailInPack: `${base} An unbranded navy valuation pack, protective pouch, jewellery case and packing materials arranged practically on a real British kitchen table; no claims or instructions printed on the pack; landscape 4:3.`,
  venueHost: `${base} A female venue manager and a Gold Table event coordinator beside a prepared navy valuation table in a British pub, agreeing the practical event-day setup, relaxed professional body language; landscape 4:3.`,
};
