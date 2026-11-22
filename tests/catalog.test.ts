import test from "node:test";
import assert from "node:assert/strict";
import { validateOffers, type ReferralOffer } from "@/lib/schemas";
import { statusOf, offerCardData } from "@/lib/offers";
import { findEntries, type SearchEntry } from "@/lib/search";
import sitemap from "@/app/sitemap";

// Jeu d’essai isolé du catalogue public.
const fixture: ReferralOffer = {
  id: "test-a", brandId: "marque-test", slug: "code-parrainage-marque-test", brandName: "Marque de test",
  title: "Une fiche de test", description: "Description de test", category: "transfert-argent", publication: "draft",
  status: "active", referralCode: "TEST", referralUrl: "https://example.org/invitation",
  officialUrl: "https://example.org/conditions", benefitToInvitee: "Avantage de test", bonusSummary: "Résumé de test",
  eligibilityCountries: ["BE"], sendingCountries: ["FR"], receivingCountries: ["MA"], conditions: ["Condition de test"],
  sources: [{ label: "Document de test", url: "https://example.org/conditions", checkedAt: "2024-01-02" }],
  verifiedAt: "2024-01-02", updatedAt: "2024-01-03", ownerConfirmation: "Note de test", publicSharingEvidence: "Preuve de test",
};
test("Une offre active exige une invitation autorisée, une vérification datée et la source officielle", () => {
  assert.equal(validateOffers([fixture]).length, 1);
  const invalid: Partial<ReferralOffer>[] = [
    { verifiedAt: undefined }, { sources: [] }, { publicSharingEvidence: undefined }, { ownerConfirmation: "" },
    { benefitToInvitee: "" }, { conditions: [] }, { referralCode: undefined, referralUrl: undefined },
    { sources: [{ ...fixture.sources[0], checkedAt: "2024-01-01" }] }, { eligibilityCountries: [] },
    { officialUrl: "https://www.bonusfoundry.com/offre", sources: [{ ...fixture.sources[0], url: "https://www.bonusfoundry.com/offre" }] },
  ];
  for (const fields of invalid) assert.throws(() => validateOffers([{ ...fixture, ...fields }]));
});
test("Une invitation publiée exige une preuve de diffusion même après expiration", () => {
  for (const status of ["expired", "unconfirmed"] as const) {
    const published = { ...fixture, status, publication: "published" as const };
    assert.equal(validateOffers([published]).length, 1);
    assert.throws(() => validateOffers([{ ...published, publicSharingEvidence: undefined }]));
  }
});
test("La validation refuse les collisions, URL douteuses, dates et pays invalides", () => {
  for (const fields of [{ id: "unique" }, { slug: "code-parrainage-autre" }]) {
    assert.throws(() => validateOffers([fixture, { ...fixture, ...fields }]));
  }
  const invalid = [{ slug: "annonces" }, { slug: "transfert-argent" }, { category: "banques" as const }, { referralUrl: "javascript:test" },
    { officialUrl: "http://example.org" }, { referralUrl: "https://a:b@example.org/path" }, { verifiedAt: "2024-02-30" },
    { expiresAt: "2023-01-01" }, { updatedAt: "2100-01-01" }, { eligibilityCountries: ["ZZ"] }, { sendingCountries: ["MA", "MA"] }];
  for (const fields of invalid) assert.throws(() => validateOffers([{ ...fixture, ...fields }]));
});
test("L’expiration prime sur le statut actif et le résumé public exclut les éléments privés", () => {
  assert.equal(statusOf({ ...fixture, expiresAt: "2024-05-01" }, "2024-05-01"), "active");
  assert.equal(statusOf({ ...fixture, expiresAt: "2024-05-01" }, "2024-05-02"), "expired");
  const data = offerCardData(fixture);
  assert.equal("ownerConfirmation" in data, false);
  assert.equal("referralCode" in data, false);
});
test("Recherche insensible aux accents, filtrage sur la résidence exclusivement", () => {
  const entries: SearchEntry[] = [
    { href: "/a", title: "Établissement test", description: "Envoi", kind: "Offre", eligibleResidences: ["BE"] },
    { href: "/b", title: "Guide", description: "Comparer les établissements", kind: "Guide" },
  ];
  assert.equal(findEntries(entries, "Etablissement", "BE").length, 2);
  assert.deepEqual(findEntries(entries, "etablissement", "MA").map(e => e.href), ["/b"]);
  assert.equal(findEntries(entries, "introuvable").length, 0);
});
test("Sitemap canonique, unique et sans recherche, chemins réservés ni fixture", () => {
  const urls = sitemap().map(entry => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every(url => url.startsWith("https://codeparrainage.co/") && !/[?#]/.test(url)));
  assert.ok(!urls.some(url => /recherche|annonces|marque-test/.test(url)));
});
