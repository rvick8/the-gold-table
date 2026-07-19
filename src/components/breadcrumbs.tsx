import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="breadcrumbs">
    <div className="container"><ol>
      <li><Link href="/">Home</Link></li>
      {items.map((item) => <li key={item.label}>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}
    </ol></div>
  </nav>;
}
