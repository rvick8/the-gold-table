export const site = {
  name: "The Gold Table",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  description: "Free private gold valuations at trusted local venues. See what your jewellery, coins, watches and precious items may be worth, with no pressure to sell.",
  announcement: { enabled: false, text: "Free private gold valuations at trusted local venues across London." },
  legal: { companyName: "[COMPANY LEGAL NAME — REVIEW REQUIRED]", companyNumber: "[COMPANY NUMBER]", registeredOffice: "[REGISTERED OFFICE]", email: "[CONTACT EMAIL]", phone: "[CONTACT PHONE]" },
  mailIn: { enabled: false, insuredPostage: "[CONFIRM INSURANCE PROVIDER, COVER LEVEL AND EXCLUSIONS]", returnShipping: "[CONFIRM RETURN-SHIPPING COSTS AND TERMS]" },
  // PLACEHOLDER: replace the illustrative chart data with a verified source before launch.
  goldPriceChart: { enabled: true },
};

export const brandCopy = {
  mainBanner: ["THE GOLD TABLE", "See what your gold is worth.", "Free private valuations. No pressure to sell."],
  supportingSign: "Bring your jewellery, coins, watches, or silver. We will test it, explain the value, and let you decide what happens next.",
};
