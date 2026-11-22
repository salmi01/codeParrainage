"use client";

import { useContext, createContext, useSyncExternalStore, useState, useRef, useId } from "react";
import { Globe2, ChevronDown, X, Search, Check } from "lucide-react";
import { countries, countryName, countryCodes } from "@/lib/countries";
import { normalize } from "@/lib/search";

const key = "cp.residence";
let current = "";
const subscribers = new Set<() => void>();
function subscribe(fn: () => void) {
  subscribers.add(fn);
  return () => { subscribers.delete(fn); };
}
function read() {
  try { const code = window.sessionStorage.getItem(key) ?? current; return countryCodes.has(code) ? code : ""; }
  catch { return current; }
}
function save(code: string) {
  current = code;
  try { window.sessionStorage.setItem(key, code); } catch { /* Le filtre reste actif en mémoire. */ }
  subscribers.forEach(fn => fn());
}

const CountryContext = createContext({ code: "", choose: () => {}, clear: () => {} });
export const useCountry = () => useContext(CountryContext);

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const code = useSyncExternalStore(subscribe, read, () => "");
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const title = useId();
  const matches = open ? countries.filter(c => normalize(c.name).includes(normalize(query))) : [];
  function choose() { setQuery(""); setOpen(true); dialog.current?.showModal(); }
  function select(value: string) { save(value); dialog.current?.close(); }
  return <CountryContext.Provider value={{ code, choose, clear: () => save("") }}>
    {children}
    <dialog ref={dialog} className="country-dialog" aria-labelledby={title} onClose={() => setOpen(false)} onClick={e => {
      if (e.target === e.currentTarget) {
        const box = e.currentTarget.getBoundingClientRect();
        if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.current?.close();
      }
    }}>
      <div className="dialog-head"><span className="icon-tile"><Globe2 aria-hidden /></span><button className="icon-button" aria-label="Fermer" onClick={() => dialog.current?.close()}><X size={20}/></button></div>
      <h2 id={title}>Votre pays de résidence</h2>
      <p>Afficher les offres dont l’éligibilité est documentée pour ce pays.</p>
      <label className="country-search"><Search size={18} aria-hidden/><input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un pays" aria-label="Rechercher un pays" /></label>
      <div className="country-options">
        {!query && <button aria-pressed={!code} onClick={() => select("")}>Tous les pays {!code && <Check size={17}/>}</button>}
        {matches.map(c =>
          <button key={c.code} aria-pressed={code === c.code} onClick={() => select(c.code)}>{c.name}{code === c.code && <Check size={17}/>}</button>)}
        {open && !matches.length && <p role="status">Aucun pays trouvé.</p>}
      </div>
    </dialog>
  </CountryContext.Provider>;
}

export function CountrySelector({ full = false }: { full?: boolean }) {
  const { code, choose } = useCountry();
  const label = code ? countryName(code) : full ? "Choisir mon pays de résidence" : "Tous les pays";
  return <button type="button" className={"country-trigger" + (full ? " large" : "")} aria-label={`Pays de résidence · ${label}`} aria-haspopup="dialog" onClick={choose}>
    <Globe2 size={17} aria-hidden/><span className="country-label">{label}</span>
    {!full && <span className="country-compact" aria-hidden>{code || "Pays"}</span>}<ChevronDown size={14} aria-hidden/>
  </button>;
}
