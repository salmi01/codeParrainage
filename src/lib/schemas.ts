import { z } from "zod";
import { countryCodes } from "./countries";
import { reservedSlugs } from "./routes";

const text = z.string().trim().min(1);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const secureUrl = z.url({ protocol: /^https$/, hostname: z.regexes.domain })
  .refine(value => {
    const url = URL.parse(value);
    return url !== null && !url.username && !url.password;
  }, "URL publique HTTPS sans identifiants requise");
const officialUrl = secureUrl.refine(value => {
  const host = URL.parse(value)?.hostname ?? "";
  return !/(^|\.)(bonusfoundry\.com|codeparrainage\.co)\.?$/i.test(host);
}, "La source officielle doit provenir du fournisseur");
const country = z.string().refine(code => countryCodes.has(code), "Code pays ISO inconnu");
const date = z.iso.date();
const source = z.object({ label: text, url: secureUrl, checkedAt: date });
const countries = z.array(country).refine(codes => new Set(codes).size === codes.length, "Pays en double");

export const offerSchema = z.object({
  id: slug, brandId: slug, brandName: text, slug, title: text, description: text,
  category: z.enum(["transfert-argent", "banques", "autre"]),
  publication: z.enum(["draft", "published"]),
  status: z.enum(["active", "unconfirmed", "expired"]),
  bonusSummary: text, benefitToInvitee: text.optional(), benefitToReferrer: text.optional(),
  referralCode: text.optional(), referralUrl: secureUrl.optional(), officialUrl,
  eligibilityCountries: countries, sendingCountries: countries.optional(), receivingCountries: countries.optional(),
  currency: z.string().regex(/^[A-Z]{3}$/).optional(), minimumTransfer: text.optional(),
  conditions: z.array(text), sources: z.array(source),
  verifiedAt: date.optional(), expiresAt: date.optional(), updatedAt: date,
  // Références internes de confirmation, conservées uniquement côté serveur.
  ownerConfirmation: text.optional(), publicSharingEvidence: text.optional(),
  disclosure: text.optional(), faq: z.array(z.object({ question: text, answer: text })).optional(),
  editorial: z.object({
    seoTitle: text, shortTitle: text, market: text, discount: text, answer: text,
    minimumNote: text, observation: text, officialSite: secureUrl,
    rewardLabel: text.optional(), validationNote: text.optional(),
    extraFacts: z.array(z.object({ label: text, value: text })).optional(),
  }).optional(),
}).strict().superRefine((offer, ctx) => {
  const issue = (message: string) => ctx.addIssue({ code: "custom", message });
  const today = new Date().toISOString().slice(0, 10);
  const prefix = offer.category === "banques" ? "parrainage-" : "code-parrainage-";
  if (reservedSlugs.has(offer.slug) || !offer.slug.startsWith(prefix)) issue("URL de fiche invalide ou réservée");
  if (offer.updatedAt > today || (offer.verifiedAt && offer.verifiedAt > offer.updatedAt))
    issue("Date de mise à jour ou de vérification incohérente");
  if (offer.sources.some(s => s.checkedAt > offer.updatedAt)) issue("Source consultée après la mise à jour");
  const publishesInvitation = offer.publication === "published" && (offer.referralCode || offer.referralUrl);
  if ((offer.status === "active" || publishesInvitation) && (!offer.ownerConfirmation || !offer.publicSharingEvidence))
    issue("Attribution et diffusion publique à confirmer");
  if (offer.status === "active") {
    const evidenceDate = offer.verifiedAt;
    if (!evidenceDate || !offer.sources.some(s => s.url === offer.officialUrl && s.checkedAt >= evidenceDate))
      issue("Une offre active exige des règles officielles contrôlées à la date de la preuve ou ultérieurement");
    if (!offer.eligibilityCountries.length || !offer.conditions.length || !offer.benefitToInvitee)
      issue("Éligibilité, avantage du filleul et conditions requis");
    if (!offer.referralCode && !offer.referralUrl) issue("Code ou lien personnel requis");
    if (offer.expiresAt && offer.verifiedAt && offer.expiresAt < offer.verifiedAt) issue("Expiration antérieure à la vérification");
  }
});

export type ReferralOffer = z.input<typeof offerSchema>;

export function validateOffers(entries: readonly ReferralOffer[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  return entries.map(entry => {
    const offer = offerSchema.parse(entry);
    if (ids.has(offer.id) || slugs.has(offer.slug)) throw new Error("Identifiant ou slug d’offre en double");
    ids.add(offer.id);
    slugs.add(offer.slug);
    return offer;
  });
}
