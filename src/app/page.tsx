import Image from "next/image";
import Link from "next/link";
import { BookOpen, ShieldCheck, ListChecks, Globe2 } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { CategoryCards, ArticleLinks } from "@/components/Discovery";
import { OfferList } from "@/components/OfferCards";
import { JsonLd } from "@/components/JsonLd";
import { pageMeta, siteName, siteUrl } from "@/lib/seo";
import { getOffers, offerCardData, statusOf } from "@/lib/offers";
import { getArticles } from "@/lib/content";
import heroImage from "../../public/images/carnet-parrainage.webp";

export const metadata = pageMeta("Codes de parrainage et offres de bienvenue", "Le guide francophone du parrainage. Explorez les catégories et découvrez comment vérifier les avantages, les conditions et l’éligibilité par pays.", "/");
export const revalidate = 3600;
const pillars = [
  { icon: ShieldCheck, title: "Sources officielles", text: "À l’origine de chaque vérification" },
  { icon: ListChecks, title: "Conditions décryptées", text: "Les critères à connaître avant d’agir" },
  { icon: Globe2, title: "Éligibilité par pays", text: "Des repères selon votre résidence" },
];
export default function Home() {
  const offers = getOffers().filter(o => statusOf(o) === "active").map(offerCardData);
  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Organization", "@id": siteUrl + "/#organisation", name: siteName, url: siteUrl, logo: siteUrl + "/icon.svg" },
      { "@type": "WebSite", "@id": siteUrl + "/#site", name: siteName, url: siteUrl, inLanguage: "fr", publisher: { "@id": siteUrl + "/#organisation" } },
    ] }}/>
    <div className="shell">
      <section className="hero"><div className="hero-copy">
        <h1>Le parrainage,<br/><em>en toute clarté.</em></h1>
        <p>Codes de parrainage, offres de bienvenue et conditions expliquées pour choisir selon votre pays.</p>
        <SearchBox/>
        <div className="quick-links"><span>Accès rapide</span><Link href="/transfert-argent">Transfert d’argent</Link><Link href="/banques">Banques</Link></div>
      </div>
      <div className="hero-art"><Image src={heroImage} alt="" sizes="(max-width: 760px) 94vw, (max-width: 1320px) 44vw, 550px" preload /></div>
      </section>
      <div className="trust-strip">{pillars.map(p => <div className="pillar" key={p.title}><p.icon size={26} strokeWidth={1.6} aria-hidden/><div><strong>{p.title}</strong><span>{p.text}</span></div></div>)}</div>
      <section className="home-section"><div className="section-head"><div><p className="eyebrow section-label">L’annuaire</p><h2>Explorer par catégorie</h2></div></div>
        <CategoryCards/>
      </section>
      {offers.length > 0 && <section className="home-section"><h2>Offres à découvrir</h2><OfferList entries={offers}/></section>}
      <section className="home-section guides-section"><div className="section-head"><div><p className="eyebrow section-label">Les guides pratiques</p><h2>Comprendre le parrainage</h2></div><Link className="text-link" href="/guides"><BookOpen size={16}/> Tous les guides</Link></div>
        <ArticleLinks entries={getArticles("guides")}/></section>
      {getArticles("comparatifs").length > 0 && <section className="home-section"><h2>Comparatifs</h2><ArticleLinks entries={getArticles("comparatifs")}/></section>}
    </div>
  </>;
}
