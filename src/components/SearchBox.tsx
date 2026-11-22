import { Search } from "lucide-react";
export function SearchBox({ query = "" }: { query?: string }) {
  return <form role="search" action="/recherche" method="get" className="search-box">
    <Search className="search-icon" size={20} aria-hidden />
    <input type="search" name="q" aria-label="Rechercher une application, une banque ou un guide" placeholder="Une application, une banque…" defaultValue={query} maxLength={160}/>
    <button type="submit">Rechercher</button>
  </form>;
}
