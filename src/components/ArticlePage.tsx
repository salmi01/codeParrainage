import Markdown from "react-markdown";
import { notFound } from "next/navigation";
import { articles, type Article } from "@/content/editorial";
import { PageFrame } from "./PageFrame";
import { JsonLd } from "./JsonLd";
import { OfferList } from "./OfferCards";
import { articleUrl, getArticle, readArticle } from "@/lib/content";
import { pageMeta, siteUrl, siteName } from "@/lib/seo";
import { getOffers, getOffersByCountry, offerCardData, statusOf } from "@/lib/offers";

export const articleParams = (kind: Article["kind"]) => articles.filter(a => a.kind === kind).map(a => ({ sujet: a.slug }));
export function articleMetadata(kind: Article["kind"], slug: string) {
  const a = getArticle(kind, slug);
  if (!a) notFound();
  return pageMeta(a.title, a.description, articleUrl(a), true, true);
}
export function ArticlePage({ kind, slug }: { kind: Article["kind"]; slug: string }) {
  const a = getArticle(kind, slug);
  if (!a) notFound();
  const crumbs = kind === "guides" ? [{ label: "Guides", href: "/guides" }] : kind === "pays" ? [{ label: "Par pays", href: "/pays" }] : [];
  const related = kind === "pays" && a.country ? getOffersByCountry(a.country) :
    getOffers().filter(o => a.relatedOfferIds.includes(o.id) && statusOf(o) === "active");
  return <PageFrame title={a.title} intro={a.description} crumbs={[...crumbs, { label: a.title, href: articleUrl(a) }]}>
    <div className="reading"><p className="byline">Rédaction {siteName} · Mis à jour le <time dateTime={a.updatedAt}>{new Intl.DateTimeFormat("fr", { dateStyle: "long", timeZone: "UTC" }).format(new Date(a.updatedAt))}</time></p>
    <div className="prose"><Markdown>{readArticle(a)}</Markdown></div>
    {related.length > 0 && <section><h2>Offres à consulter</h2><OfferList entries={related.map(offerCardData)} filter={kind !== "pays"}/></section>}
    </div><JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: a.title,
      description: a.description, dateModified: a.updatedAt, inLanguage: "fr", mainEntityOfPage: siteUrl + articleUrl(a),
      author: { "@type": "Organization", name: siteName, url: siteUrl }, publisher: { "@id": siteUrl + "/#organisation", "@type": "Organization", name: siteName } }}/>
  </PageFrame>;
}
