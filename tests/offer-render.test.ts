import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { OfferPage } from "@/components/OfferPage";
import type { ReferralOffer } from "@/lib/schemas";

const sample: ReferralOffer = {
  id: "demo", brandId: "demo", brandName: "Exemple", category: "transfert-argent", slug: "code-parrainage-demo",
  title: "Offre de test", description: "Notice", bonusSummary: "Résumé", benefitToInvitee: "Avantage du filleul",
  benefitToReferrer: "Avantage du parrain", referralCode: "COPIE-TEST", referralUrl: "https://example.org/invite",
  officialUrl: "https://example.org/terms", eligibilityCountries: ["BE"], sendingCountries: ["FR"], receivingCountries: ["MA"],
  conditions: ["Première inscription"], sources: [{ label: "Règles", url: "https://example.org/terms", checkedAt: "2024-01-02" }],
  updatedAt: "2024-01-02", verifiedAt: "2024-01-02", status: "active", publication: "draft",
};
const html = (offer: ReferralOffer) => renderToStaticMarkup(createElement(OfferPage, { offer }));
test("La fiche présente les bénéficiaires, trois portées géographiques et la source officielle", () => {
  const page = html(sample);
  for (const value of ["Avantage du filleul", "Avantage du parrain", "COPIE-TEST", "Belgique", "France", "Maroc",
    "Première inscription", "https://example.org/terms", "sponsored nofollow noopener", "Copier"]) assert.ok(page.includes(value), value);
  assert.doesNotMatch(page, /href="https:\/\/example.org\/terms"[^>]+sponsored/);
});
test("Une fiche expirée ou non confirmée conserve ses invitations et indique son statut", () => {
  for (const status of ["unconfirmed", "expired"] as const) {
    const page = html({ ...sample, status });
    assert.ok(page.includes("COPIE-TEST") && page.includes("Copier"));
    assert.ok(page.includes('href="https://example.org/invite"'));
    assert.ok(page.includes(status === "expired" ? "Cette offre a pris fin" : "Les conditions restent à confirmer"));
  }
});
