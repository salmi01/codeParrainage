import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteUrl } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export interface Crumb { label: string; href: string }
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Accueil", href: "/" }, ...items];
  return <>
    <nav aria-label="Fil d’Ariane" className="breadcrumbs"><ol>{trail.map((item, i) => <li key={item.href}>
      {i > 0 && <ChevronRight size={13} aria-hidden />}
      {i === trail.length - 1 ? <span aria-current="page">{item.label}</span> : <Link href={item.href}>{item.label}</Link>}
    </li>)}</ol></nav>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: trail.map((item, i) =>
      ({ "@type": "ListItem", position: i + 1, name: item.label, item: siteUrl + item.href })) }} />
  </>;
}
