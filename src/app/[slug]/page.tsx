import { notFound } from "next/navigation";
import Link from "next/link";
import { PageFrame } from "@/components/PageFrame";
import { FAQSection, OfferPage } from "@/components/OfferPage";
import { OfferArticle } from "@/components/OfferArticle";
import { sections } from "@/lib/routes";
import { pageMeta } from "@/lib/seo";
import { info, isInfo } from "@/lib/info";
import { getOffers, getOfferBySlug, statusOf } from "@/lib/offers";
import { publisher } from "@/content/publisher";

export const dynamicParams = false;
export const revalidate = 3600;
export const generateStaticParams = () => [...Object.keys(info), ...getOffers().map(o => o.slug)].map(slug => ({ slug }));
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (isInfo(slug)) { const p = info[slug]; return pageMeta(p.title, p.description, "/" + slug, p.index); }
  const o = getOfferBySlug(slug);
  if (!o) notFound();
  return pageMeta(o.editorial?.seoTitle ?? o.title, o.description, "/" + slug, statusOf(o) === "active", Boolean(o.editorial));
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (isInfo(slug)) {
    const p = info[slug];
    return <PageFrame title={p.title} intro={p.description} crumbs={[{ label: p.title, href: "/" + slug }]}>
      <div className="reading prose">{p.sections.map(s => <section key={s.heading}><h2>{s.heading}</h2><p>{s.body}</p></section>)}
        {(slug === "contact" || slug === "mentions-legales") && publisher.email && <p><a href={"mailto:" + publisher.email}>{publisher.email}</a></p>}
        {slug === "methode" ? <Link href="/transparence-commerciale">Lire notre politique de transparence commerciale</Link> :
          <Link href="/methode">Découvrir notre méthode de vérification</Link>}
      </div>
    </PageFrame>;
  }
  const offer = getOfferBySlug(slug);
  if (!offer) notFound();
  const category = sections.find(s => s.slug === offer.category);
  if (offer.editorial && category && statusOf(offer) === "active") {
    return <OfferArticle offer={offer} edition={offer.editorial} category={{ label: category.title, href: "/" + category.slug }}>
      {offer.faq?.length ? <FAQSection items={offer.faq}/> : null}
    </OfferArticle>;
  }
  return <OfferPage offer={offer}/>;
}
