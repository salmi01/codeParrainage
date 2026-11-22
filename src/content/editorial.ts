export interface Article {
  kind: "guides" | "comparatifs" | "pays";
  slug: string;
  title: string;
  description: string;
  updatedAt: string;
  country?: string;
  relatedOfferIds: string[];
}

// Un fichier Markdown de même slug accompagne chaque entrée publiée.
export const articles: Article[] = [
  {
    kind: "guides", slug: "comment-utiliser-code-parrainage",
    title: "Comment utiliser un code de parrainage ?",
    description: "Du choix de l’offre à la saisie du code, les étapes à suivre avant de valider une inscription.",
    updatedAt: "2026-11-22", relatedOfferIds: [],
  },
  {
    kind: "guides", slug: "comprendre-eligibilite-pays",
    title: "Quel pays compte pour mon offre ?",
    description: "Distinguer le pays de résidence, le pays d’envoi et la destination d’un transfert.",
    updatedAt: "2026-11-22", relatedOfferIds: [],
  },
];
