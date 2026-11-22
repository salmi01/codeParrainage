"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Brand } from "./Brand";
import { CountrySelector } from "./Country";
import { sections } from "@/lib/routes";

export function Header() {
  const path = usePathname();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    function close(target?: EventTarget | null) {
      ref.current?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach(d => {
        if (!(target instanceof Node) || !d.contains(target)) d.open = false;
      });
    }
    const outside = (ev: PointerEvent) => close(ev.target);
    const escape = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      ref.current?.querySelector<HTMLDetailsElement>("details[open]")?.querySelector("summary")?.focus(); close();
    };
    close();
    document.addEventListener("pointerdown", outside); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [path]);
  const navLink = (href: string, label: string) => <Link href={href} aria-current={path === href ? "page" : undefined}>{label}</Link>;
  return <header className="site-header" ref={ref}><div className="shell header-inner">
    <Brand/>
    <nav aria-label="Navigation principale" className="desktop-nav">
      {navLink("/", "Accueil")}
      <details className="dropdown"><summary>Catégories <ChevronDown size={14}/></summary>
        <div className="drop-panel">{sections.map(s => <Link key={s.slug} href={"/" + s.slug}>{s.title}</Link>)}</div>
      </details>
      {navLink("/guides", "Guides")}{navLink("/methode", "Notre méthode")}
    </nav>
    <div className="header-end"><Link href="/recherche" className="icon-button header-search" aria-label="Recherche sur le site"><Search size={19} aria-hidden/></Link><CountrySelector/>
      <details className="mobile-menu dropdown"><summary className="icon-button" aria-label="Menu principal"><Menu size={22}/></summary>
        <nav className="drop-panel" aria-label="Navigation mobile">
          {navLink("/", "Accueil")}{sections.map(s => <Link key={s.slug} href={"/" + s.slug}>{s.title}</Link>)}
          {navLink("/guides", "Guides")}{navLink("/methode", "Notre méthode")}{navLink("/recherche", "Rechercher")}
        </nav>
      </details>
    </div>
  </div></header>;
}
