import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Geist } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/site-chrome";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const serif = Cormorant_Garamond({ subsets:["latin"], variable:"--font-serif", weight:["500","600"] });
const geist = Geist({subsets:['latin'],variable:'--font-sans'});
export const metadata: Metadata = { metadataBase:new URL(site.url), title:{ default:"The Gold Table | Free private gold valuations", template:"%s | The Gold Table" }, description:site.description, alternates:{ canonical:"/" }, openGraph:{ type:"website", locale:"en_GB", siteName:site.name, title:"The Gold Table", description:site.description }, twitter:{ card:"summary_large_image", title:"The Gold Table", description:site.description } };
export default function RootLayout({ children }:{ children:React.ReactNode }) { return <html lang="en-GB" data-scroll-behavior="smooth" className={cn("font-sans", geist.variable)}><body className={`${serif.variable} ${geist.variable}`}><a href="#main" className="sr-only focus:not-sr-only">Skip to main content</a><Header/><main id="main">{children}</main><Footer/></body></html>; }
