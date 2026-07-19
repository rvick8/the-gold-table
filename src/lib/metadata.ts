import type { Metadata } from "next";
import { site } from "@/content/site";

const defaultSocialImage = {
  url: "/images/gold-table-valuation-event-v2.png",
  alt: "A Gold Table valuer explaining a ring to a customer at a local event",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  canonical: string;
  robots?: Metadata["robots"];
  image?: { url: string; alt: string };
};

export function createPageMetadata({ title, description, canonical, robots, image = defaultSocialImage }: PageMetadataOptions): Metadata {
  const socialTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots,
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      title: socialTitle,
      description,
      url: canonical,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}
