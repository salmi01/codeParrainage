"use client";

import Link from "next/link";
import { useCountry } from "./Country";
import { countryName } from "@/lib/countries";
import type { OfferCardData } from "@/lib/offers";
import { statusLabels } from "@/lib/offer-status";
import { Ticket } from "lucide-react";

export function OfferCard({ offer }: { offer: OfferCardData }) {
  return <Link href={"/" + offer.slug} className="offer-card"><small>{statusLabels[offer.status]}</small>
    <h3>{offer.title}</h3><p>{offer.description}</p></Link>;
}

export function OfferList({ entries, empty = "Les premières fiches seront ajoutées après vérification des conditions officielles.", filter = true }: {
  entries: OfferCardData[]; empty?: string; filter?: boolean;
}) {
  const { code, clear } = useCountry();
  const visible = filter && code ? entries.filter(o => o.status === "active" && o.eligibilityCountries.includes(code)) : entries;
  return <>
    {filter && code && <div className="filter-summary">Résidence · {countryName(code)} <button onClick={clear}>Voir tous les pays</button></div>}
    {visible.length ? <div className="category-grid">{visible.map(o => <OfferCard key={o.slug} offer={o}/>)}</div> :
      <div className="empty-state"><Ticket size={25} aria-hidden/><div><h3>{code && filter ? "Éligibilité à confirmer" : "Aucune offre publiée pour le moment"}</h3>
        <p>{code && filter ? `Aucune offre vérifiée pour cette résidence. Vous pouvez aussi explorer les guides.` : empty}</p>
        <Link href="/guides">Consulter les guides</Link></div></div>}
  </>;
}
