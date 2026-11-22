import { Suspense } from "react";
import { PageFrame } from "@/components/PageFrame";
import { SearchResults } from "@/components/SearchResults";
import { SearchBox } from "@/components/SearchBox";
import { pageMeta } from "@/lib/seo";
import { articles } from "@/content/editorial";
import { articleUrl } from "@/lib/content";
import { getOffers, statusOf } from "@/lib/offers";
import { sections } from "@/lib/routes";
import type { SearchEntry } from "@/lib/search";

export const metadata = pageMeta("Rechercher sur CodeParrainage", "Retrouvez une application, une banque ou un guide dans le catalogue publié.", "/recherche", false);
export const revalidate = 3600;
export default function Page() {
  const entries: SearchEntry[] = [
    ...getOffers().map(o => ({ title: o.brandName, description: o.description, href: "/" + o.slug, keywords: [o.title, o.editorial?.seoTitle].join(" "),
      kind: "Offre" as const, eligibleResidences: statusOf(o) === "active" ? o.eligibilityCountries : [] })),
    ...sections.map(s => ({ title: s.title, description: s.description, href: "/" + s.slug, kind: "Catégorie" as const })),
    ...articles.map(a => ({ title: a.title, description: a.description, href: articleUrl(a),
      kind: ({ guides: "Guide", comparatifs: "Comparatif", pays: "Pays" } as const)[a.kind] })),
    { title: "Notre méthode de vérification", description: "Sources, conditions et attribution des codes.", href: "/methode", kind: "Méthode" },
  ];
  return <PageFrame title="Rechercher" intro="Parcourez les offres, les catégories et les guides du site." crumbs={[{ label: "Recherche", href: "/recherche" }]}>
    <Suspense fallback={<><SearchBox/><p>Chargement de la recherche…</p></>}><SearchResults entries={entries}/></Suspense>
    <noscript>La recherche locale nécessite JavaScript. Les rubriques et les guides sont accessibles depuis le menu.</noscript>
  </PageFrame>;
}
