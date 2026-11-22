import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";
import { CountrySelector } from "@/components/Country";
import { OfferList } from "@/components/OfferCards";
import { ArticleLinks } from "@/components/Discovery";
import { getOffers, offerCardData, statusOf } from "@/lib/offers";
import { getArticles } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const title = "Explorer par pays de résidence";
const description = "Sélectionnez votre résidence pour retrouver les offres dont les conditions documentent votre éligibilité.";
export const revalidate = 3600;
export const generateMetadata = () => pageMeta(title, description, "/pays", getArticles("pays").length > 0 || getOffers().some(o => statusOf(o) === "active"));
export default function Page() {
  const hubs = getArticles("pays");
  return <PageFrame title={title} intro={description} crumbs={[{ label: "Par pays", href: "/pays" }]}>
    <CountrySelector full/>
    <section className="page-section"><h2>Offres par résidence</h2><OfferList entries={getOffers().filter(o => statusOf(o) === "active").map(offerCardData)}/></section>
    {hubs.length > 0 && <section><h2>Dossiers pays</h2><ArticleLinks entries={hubs}/></section>}
    <div className="reading prose"><h2>Résidence, envoi et destination</h2><p>Le pays où vit la personne qui s’inscrit peut être différent du pays d’envoi ou de celui du destinataire. Chaque fiche précise les critères qui s’appliquent.</p>
    <Link href="/guides/comprendre-eligibilite-pays">Quel pays compte pour mon offre ?</Link></div>
  </PageFrame>;
}
