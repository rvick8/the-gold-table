import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/site-chrome";
import { site } from "@/content/site";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Gold Table | Local gold-buying events",
    template: "%s | The Gold Table",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: "The Gold Table | Local gold-buying events",
    description: site.description,
    images: [{
      url: "/images/gold-table-valuation-hero-branded.png",
      width: 1672,
      height: 941,
      alt: "A Gold Table valuer examining jewellery with a customer",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gold Table | Local gold-buying events",
    description: site.description,
    images: ["/images/gold-table-valuation-hero-branded.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-GB" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
    <body>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </body>
  </html>;
}
