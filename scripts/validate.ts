import { articles } from "@/content/editorial";
import { offers } from "@/content/offers";
import { countryCodes } from "@/lib/countries";
import { readArticle, articleUrl } from "@/lib/content";
import { validateOffers } from "@/lib/schemas";
import { z } from "zod";

const verified = validateOffers(offers);
const urls = new Set<string>();
const today = new Date().toISOString().slice(0, 10);
for (const article of articles) {
  const url = articleUrl(article);
  if (urls.has(url) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug))
    throw new Error("URL éditoriale invalide ou en double · " + url);
  urls.add(url);
  z.iso.date().parse(article.updatedAt);
  if (article.updatedAt > today || !article.title.trim() || !article.description.trim())
    throw new Error("Métadonnées éditoriales incomplètes · " + url);
  if (article.kind === "pays" && !countryCodes.has(article.country ?? ""))
    throw new Error("Résidence inconnue · " + url);
  if (!readArticle(article).trim()) throw new Error("Article vide · " + url);
  for (const id of article.relatedOfferIds) {
    if (!verified.some(o => o.id === id && o.publication === "published"))
      throw new Error("Offre liée inconnue ou en brouillon · " + id);
  }
}
console.log(`Catalogue valide · ${verified.length} offre(s), ${articles.length} article(s).`);
