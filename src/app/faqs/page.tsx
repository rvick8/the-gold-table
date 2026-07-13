import type { Metadata } from "next";
import { faqs } from "@/content/faqs";
import { FaqAccordion } from "@/components/faq-accordion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Cta } from "@/components/cta";
import { StructuredData } from "@/components/structured-data";
export const metadata:Metadata={title:"Frequently asked questions",description:"Answers about free Gold Table valuations, appointments, items, testing, offers and mail-in valuation.",alternates:{canonical:"/faqs"}};
export default function FaqPage(){return <><Breadcrumbs items={[{label:"Frequently Asked Questions"}]}/><section className="section"><div className="container" style={{maxWidth:900}}><h1>Frequently asked questions</h1><p style={{fontSize:"1.2rem"}}>Clear answers about appointments, valuations and what happens at the table.</p><FaqAccordion items={faqs}/></div></section><Cta/><StructuredData data={{"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}}))}}/></>}
