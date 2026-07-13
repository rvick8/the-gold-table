import type { Metadata } from "next";
import { legalPlaceholders } from "@/content/legal";
import { Breadcrumbs } from "@/components/breadcrumbs";
export const metadata:Metadata={title:"Terms — draft",robots:{index:false,follow:true}};
export default function Terms(){return <><Breadcrumbs items={[{label:"Terms"}]}/><section className="section"><div className="container prose"><h1>Terms</h1><p className="placeholder-note"><strong>Draft placeholder — legal review required.</strong> Final consumer, valuation, sale and mail-in terms must be supplied and approved before launch.</p><p>A valuation is an informed assessment based on the items presented and the information available at the time. No visitor is obliged to accept an offer.</p><h2>Required before launch</h2><ul>{legalPlaceholders.terms.map(x=><li key={x}>{x}</li>)}</ul></div></section></>}
