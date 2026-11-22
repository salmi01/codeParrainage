"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, SearchX } from "lucide-react";
import { SearchBox } from "./SearchBox";
import { useCountry } from "./Country";
import { countryName } from "@/lib/countries";
import { findEntries, type SearchEntry } from "@/lib/search";

export function SearchResults({ entries }: { entries: SearchEntry[] }) {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").slice(0, 160).trim();
  const { code, clear } = useCountry();
  const results = findEntries(entries, query, code);
  return <div className="reading"><SearchBox key={query} query={query}/>
    {code && <div className="filter-summary">Résidence · {countryName(code)} <button onClick={clear}>Voir tous les pays</button></div>}
    <h2 className="results-heading" role="status">{query ? `${results.length} résultat${results.length > 1 ? "s" : ""} pour « ${query} »` : "Parcourir le site"}</h2>
    {results.length ? <div className="article-list">{results.map(r => <Link className="result-link" key={r.href} href={r.href}>
      <span><small>{r.kind}</small><strong>{r.title}</strong><span>{r.description}</span></span><ChevronRight size={18} aria-hidden/>
    </Link>)}</div> : <div className="empty-state"><SearchX aria-hidden/><div><h3>Aucune page correspondante</h3>
      <p>Essayez une catégorie comme « banque » ou un sujet comme « pays ».</p><Link href="/recherche">Afficher toutes les rubriques</Link></div></div>}
  </div>;
}
