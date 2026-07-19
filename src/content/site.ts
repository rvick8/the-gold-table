const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000").replace(/\/+$/, "");

export const site = {
  name: "The Gold Table",
  url: siteUrl,
  description: "Free private gold valuations and clear offers at local events across London. Bring jewellery, coins, watches or silver and sell only if it feels right.",
  legal: { companyName: "[COMPANY LEGAL NAME — REVIEW REQUIRED]", companyNumber: "[COMPANY NUMBER]", registeredOffice: "[REGISTERED OFFICE]", email: "[CONTACT EMAIL]", phone: "[CONTACT PHONE]" },
  mailIn: { enabled: false, insuredPostage: "[CONFIRM INSURANCE PROVIDER, COVER LEVEL AND EXCLUSIONS]", returnShipping: "[CONFIRM RETURN-SHIPPING COSTS AND TERMS]" },
};
