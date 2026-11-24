import { getOffers, statusOf } from "@/lib/offers";
import { siteUrl } from "@/lib/seo";
import { info } from "@/lib/info";

export const dynamic = "force-static";
export const revalidate = 3600;

function link(title: string, path: string, description: string) {
  return `- [${title}](${siteUrl}${path}): ${description}`;
}

export function GET() {
  const offers = getOffers().filter(offer => statusOf(offer) === "active");
  const lines = [
    "# CodeParrainage.co",
    "",
    "> Annuaire éditorial francophone de codes et de liens de parrainage. Chaque fiche précise l’avantage du filleul et les conditions documentées. L’éligibilité dépend notamment du pays et de la période. Consultez les règles du fournisseur avant de vous inscrire.",
    "",
    "## Découvrir le site",
    "",
    link("Accueil", "/", "Accès aux catégories et aux guides de parrainage."),
  ];
  if (offers.some(offer => offer.category === "transfert-argent")) {
    lines.push(link("Transfert d’argent", "/transfert-argent", "Parrainages des services de transfert international et critères à vérifier avant un premier envoi."));
  }
  if (offers.length) {
    lines.push("", "## Offres de parrainage publiées", "",
      ...offers.map(offer => link(offer.brandName, "/" + offer.slug, offer.bonusSummary)));
  }
  lines.push("", "## Guides et méthode", "",
    link("Guides du parrainage", "/guides", "Utilisation des invitations et distinction entre résidence, pays d’envoi et destination."));
  if (info.methode.index) {
    lines.push(link(info.methode.title, "/methode", "Sources, rôle de l’éditeur et vérification des conditions auprès des fournisseurs."));
  }
  return new Response(lines.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
