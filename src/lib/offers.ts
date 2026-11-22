import { offers } from "@/content/offers";
import { validateOffers, type ReferralOffer } from "./schemas";

const catalog = validateOffers(offers).filter(offer => offer.publication === "published");

export function statusOf(offer: ReferralOffer, day = new Date().toISOString().slice(0, 10)) {
  return offer.expiresAt && offer.expiresAt < day ? "expired" : offer.status;
}

export const getOffers = () => catalog;
export const getOfferBySlug = (slug: string) => catalog.find(offer => offer.slug === slug);
export const getOffersByCountry = (code: string) =>
  catalog.filter(offer => statusOf(offer) === "active" && offer.eligibilityCountries.includes(code));
export const getOffersByCategory = (category: string) => catalog.filter(offer => offer.category === category);

export function offerCardData(offer: ReferralOffer) {
  const status = statusOf(offer);
  return { slug: offer.slug, title: offer.brandName, description: status === "active" ? offer.bonusSummary : offer.description,
    status, eligibilityCountries: offer.eligibilityCountries };
}
export type OfferCardData = ReturnType<typeof offerCardData>;
