export const sections = [
  { slug: "transfert-argent", title: "Transfert d’argent", description: "Comprendre les offres des applications de transfert international.", icon: "transfer" },
  { slug: "banques", title: "Banques", description: "Découvrir les conditions des primes de bienvenue bancaires.", icon: "bank" },
  { slug: "pays", title: "Par pays", description: "Explorer le parrainage selon votre pays de résidence.", icon: "globe" },
] as const;

export const institutionalSlugs = ["methode", "transparence-commerciale", "confidentialite", "mentions-legales", "contact"] as const;
export const reservedSlugs = new Set<string>([...sections.map(s => s.slug), ...institutionalSlugs,
  "guides", "comparatifs", "recherche", "annonces", "api", "sitemap", "robots"]);
