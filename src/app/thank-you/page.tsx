import type { Metadata } from "next";
import Link from "next/link";
export const metadata:Metadata={title:"Thank you",robots:{index:false,follow:false}};
export default function ThankYou(){return <section className="section"><div className="container" style={{maxWidth:720,textAlign:"center"}}><h1>Thank you.</h1><p style={{fontSize:"1.2rem"}}>Your request has been received. We will use the details you supplied to respond.</p><p>This page does not claim that an email or SMS has been sent.</p><Link className="button navy" href="/">Return home</Link></div></section>}
