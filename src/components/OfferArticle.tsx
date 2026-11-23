import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, Send } from "lucide-react";
import type { ReferralOffer } from "@/lib/schemas";
import { siteName, siteUrl } from "@/lib/seo";
import { countryName } from "@/lib/countries";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { ReferralCodeBox } from "./ReferralCodeBox";
import { OfferResidenceNote } from "./OfferResidenceNote";
import { JsonLd } from "./JsonLd";
import styles from "./OfferArticle.module.css";

const formatDate = (value: string) => new Intl.DateTimeFormat("fr", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));

export function OfferArticle({ offer, edition, category, children }: {
  offer: ReferralOffer; edition: NonNullable<ReferralOffer["editorial"]>; category: Crumb; children: React.ReactNode;
}) {
  const href = "/" + offer.slug;
  const body = fs.readFileSync(path.join(process.cwd(), "src/content/offers", offer.id + ".md"), "utf8");
  const minimum = offer.minimumTransfer && offer.currency && Number.isFinite(Number(offer.minimumTransfer))
    ? new Intl.NumberFormat("fr", { style: "currency", currency: offer.currency, maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(Number(offer.minimumTransfer))
    : offer.minimumTransfer;
  const facts: [string, React.ReactNode][] = [
    ["Service", offer.brandName],
    ["Avantage du filleul", offer.benefitToInvitee],
    ["Code personnel", offer.referralCode],
    ["Résidence du filleul", offer.eligibilityCountries.map(countryName).join(", ")],
    ["Pays concernés", offer.geographicScopeNote],
    ["Pays d’envoi documenté", offer.sendingCountries?.map(countryName).join(", ")],
    ["Minimum de l’offre", minimum ? `${minimum} en un seul envoi. ${edition.minimumNote}` : edition.minimumNote],
    ...(edition.extraFacts ?? []).map((fact): [string, React.ReactNode] =>
      [fact.label, fact.url ? <a href={fact.url} className={styles.official}>{fact.value}</a> : fact.value]),
    ["Validation", edition.validationNote ?? "La remise doit figurer dans le récapitulatif avant le paiement."],
    ["Avantage du parrain", offer.benefitToReferrer],
  ];
  return <article className={`shell page-frame ${styles.article}`}>
    <Breadcrumbs items={[category, { label: edition.shortTitle, href }]}/>
    <header className={styles.hero}>
      <div className={styles.heading}>
        <Link href={category.href} className="eyebrow"><Send size={15} aria-hidden/> {category.label}</Link>
        <h1>{offer.title}</h1>
        <p>{edition.answer}</p>
        {edition.showVerificationDate && offer.verifiedAt && <small>Conditions vérifiées le <time dateTime={offer.verifiedAt}>{formatDate(offer.verifiedAt)}</time></small>}
      </div>
      <section className={styles.card} aria-label="Code et avantage du filleul">
        <div className={styles.market}>{edition.market}</div>
        <h2>{edition.discount} <span>{edition.rewardLabel ?? "de réduction pour le filleul"}</span></h2>
        <ReferralCodeBox code={offer.referralCode} url={offer.referralUrl} brand={offer.brandName} disclosure={offer.disclosure}/>
        {minimum && <p className={styles.threshold}>Minimum de {minimum} en un seul transfert. <small>{edition.minimumNote}</small></p>}
        <a href={edition.officialSite} className={styles.official}>Site officiel de {offer.brandName} <ExternalLink size={15} aria-hidden/></a>
      </section>
    </header>
    <OfferResidenceNote eligible={offer.eligibilityCountries} scopeNote={offer.geographicScopeNote}/>
    <nav className={styles.toc} aria-label="Sur cette fiche">
      <a href="#reperes">L’offre en bref</a><a href="#utilisation">Mode d’emploi</a><a href="#conditions">Conditions</a>
      {Boolean(offer.faq?.length) && <a href="#questions">Questions fréquentes</a>}<a href="#sources">Sources</a>
    </nav>
    <div className={styles.body}>
      <section id="reperes"><h2>L’offre en bref</h2>
        <table className={styles.facts} aria-label={"Informations essentielles · " + edition.market}><tbody>{facts.filter(([, value]) => Boolean(value)).map(([label,value]) =>
          <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table>
      </section>
      <div id="utilisation" className="prose"><Markdown>{body}</Markdown></div>
      <section id="conditions" className="prose"><h2>Conditions et limites</h2>
        <ul>{offer.conditions.map(condition => <li key={condition}>{condition}</li>)}</ul>
        <a href={offer.officialUrl}>Lire les règles du programme {offer.brandName}</a>
      </section>
      {children && <div id="questions">{children}</div>}
      <section id="sources" className="prose"><h2>Sources et vérification</h2>
        <p className="byline">Rédaction {siteName} · Mis à jour le <time dateTime={offer.updatedAt}>{formatDate(offer.updatedAt)}</time></p>
        <p>{edition.observation}</p>
        <ul>{offer.sources.map(s => <li key={s.url}><a href={s.url}>{s.label}</a> <small>· consulté le {formatDate(s.checkedAt)}</small></li>)}</ul>
        <p>{siteName}.co est un site éditorial indépendant de {offer.brandName}.</p>
        <div className={styles.links}><Link href="/methode">Notre méthode de vérification</Link><Link href="/transparence-commerciale">Transparence commerciale</Link></div>
      </section>
      <nav className={styles.links} aria-label="À lire aussi"><Link href={category.href}>Tous les parrainages · {category.label}</Link>
        <Link href="/guides/comment-utiliser-code-parrainage">Guide d’utilisation des codes</Link></nav>
    </div>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", mainEntityOfPage: siteUrl + href,
      headline: offer.title, description: offer.description, dateModified: offer.updatedAt, inLanguage: "fr",
      about: { "@type": "Service", name: offer.brandName }, citation: offer.sources.map(s => s.url),
      author: { "@type": "Organization", name: siteName, url: siteUrl },
      publisher: { "@type": "Organization", name: siteName, "@id": siteUrl + "/#organisation" } }}/>
  </article>;
}
