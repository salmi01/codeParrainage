import Link from "next/link";
import { Compass } from "lucide-react";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Page introuvable · CodeParrainage", robots: { index: false } };
export default function NotFound() {
  return <div className="shell page-frame not-found"><span className="icon-tile"><Compass/></span><p className="eyebrow">Erreur 404</p><h1>Page introuvable</h1>
    <p>Cette adresse ne correspond à aucune page publiée.</p><Link className="button" href="/">Revenir à l’accueil</Link></div>;
}
