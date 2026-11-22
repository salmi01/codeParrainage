import Link from "next/link";
import { PageFrame } from "./PageFrame";
import { ReferralCodeBox } from "./ReferralCodeBox";
import { OfferList } from "./OfferCards";
import { countryName } from "@/lib/countries";
import { statusOf, getOffersByCategory, offerCardData } from "@/lib/offers";
import { statusLabels } from "@/lib/offer-status";
import { sections } from "@/lib/routes";
import type { ReferralOffer } from "@/lib/schemas";

const dateLabel = (value: string) => new Intl.DateTimeFormat("fr", { dateStyle: "long", timeZone: "UTC" }).format(new Date(value));

export function OfferConditions({ offer }: { offer: ReferralOffer }) {
  const names = (codes?: string[]) => codes?.map(countryName).join(", ") || "À confirmer";
  return <section className="prose"><h2>Conditions et éligibilité</h2><dl>
    <dt>Pays de résidence documentés</dt><dd>{names(offer.eligibilityCountries)}</dd>
    {offer.sendingCountries && <><dt>Pays d’envoi</dt><dd>{names(offer.sendingCountries)}</dd></>}
    {offer.receivingCountries && <><dt>Destinations</dt><dd>{names(offer.receivingCountries)}</dd></>}
    {offer.minimumTransfer && <><dt>Minimum requis</dt><dd>{offer.minimumTransfer} {offer.currency}</dd></>}
    {offer.benefitToReferrer && <><dt>Avantage du parrain</dt><dd>{offer.benefitToReferrer}</dd></>}
    {offer.expiresAt && <><dt>Fin de l’offre</dt><dd>{dateLabel(offer.expiresAt)}</dd></>}
  </dl><ul>{offer.conditions.map(c => <li key={c}>{c}</li>)}</ul></section>;
}
export function FAQSection({ items }: { items: NonNullable<ReferralOffer["faq"]> }) {
  return <section className="prose"><h2>Questions fréquentes</h2>{items.map(item =>
    <details className="faq" key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>;
}

export function OfferPage({ offer }: { offer: ReferralOffer }) {
  const section = sections.find(s => s.slug === offer.category);
  const status = statusOf(offer);
  const related = getOffersByCategory(offer.category).filter(o => o.id !== offer.id && statusOf(o) === "active").map(offerCardData);
  return <PageFrame title={offer.title} crumbs={[...(section ? [{ label: section.title, href: "/" + section.slug }] : []), { label: offer.brandName, href: "/" + offer.slug }]}>
    <div className="reading"><section className="answer-box"><small>{statusLabels[status]}</small>
      <h2>{status === "active" ? offer.benefitToInvitee : status === "expired" ? "Cette offre a pris fin" : "Les conditions restent à confirmer"}</h2>
      {status === "active" && <p>{offer.bonusSummary}</p>}
      <p>Résidences documentées · {offer.eligibilityCountries.map(countryName).join(", ") || "À confirmer"}</p>
      {offer.verifiedAt && <p>Dernière vérification · <time dateTime={offer.verifiedAt}>{dateLabel(offer.verifiedAt)}</time></p>}
      {(offer.referralCode || offer.referralUrl) && <ReferralCodeBox code={offer.referralCode} url={offer.referralUrl} brand={offer.brandName} disclosure={offer.disclosure}/>}
    </section>
    <OfferConditions offer={offer}/>
    <section className="prose"><h2>Sources et vérification</h2>
      {!offer.sources.some(source => source.url === offer.officialUrl) && <p><a href={offer.officialUrl}>Conditions officielles de {offer.brandName}</a></p>}
      {offer.sources.map(source => <p key={source.url}><a href={source.url}>{source.label}</a> · Consultée le {dateLabel(source.checkedAt)}</p>)}
      <Link href="/methode">Notre méthode de vérification</Link>
    </section>
    {Boolean(offer.faq?.length) && <FAQSection items={offer.faq!}/>}
    {related.length > 0 && <section><h2>Offres similaires</h2><OfferList entries={related}/></section>}
    <p className="prose"><Link href="/guides/comment-utiliser-code-parrainage">Comment utiliser un code de parrainage ?</Link></p>
    </div>
  </PageFrame>;
}
