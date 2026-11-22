import Link from "next/link";
import { PageFrame } from "./PageFrame";
import { OfferList } from "./OfferCards";
import { getOffersByCategory, offerCardData, statusOf } from "@/lib/offers";
import { sections } from "@/lib/routes";
import { pageMeta } from "@/lib/seo";

const copy = {
  "transfert-argent": { title: "Parrainage et transfert d’argent", heading: "Avant votre premier envoi",
    body: "Vérifiez le pays de résidence exigé, le pays d’envoi et la destination. Les conditions peuvent aussi dépendre du mode de réception, de la devise ou du montant du premier transfert.", guide: "/guides/comprendre-eligibilite-pays", link: "Comprendre les critères géographiques" },
  banques: { title: "Parrainage bancaire", heading: "Avant d’ouvrir un compte",
    body: "Repérez le type de compte concerné, le bénéficiaire de la prime et les étapes à accomplir. Relisez les conditions sur le premier versement, l’utilisation de la carte ou la durée de détention lorsqu’elles sont prévues.", guide: "/guides/comment-utiliser-code-parrainage", link: "Comprendre le parcours de parrainage" },
};
type Category = keyof typeof copy;
export function categoryMeta(slug: Category) {
  return pageMeta(copy[slug].title, copy[slug].body, "/" + slug, getOffersByCategory(slug).some(o => statusOf(o) === "active"));
}
export function CategoryPage({ slug }: { slug: Category }) {
  const s = sections.find(s => s.slug === slug)!;
  const c = copy[slug];
  return <PageFrame title={c.title} intro={s.description} crumbs={[{ label: s.title, href: "/" + slug }]}>
    <section><h2>Les offres de la catégorie</h2><OfferList entries={getOffersByCategory(slug).map(offerCardData)}/></section>
    <div className="reading prose"><h2>{c.heading}</h2><p>{c.body}</p><Link href={c.guide}>{c.link}</Link></div>
  </PageFrame>;
}
