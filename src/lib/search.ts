export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  kind: "Guide" | "Comparatif" | "Pays" | "Catégorie" | "Offre" | "Méthode";
  keywords?: string;
  eligibleResidences?: string[];
}
export const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .toLocaleLowerCase("fr").replace(/[’']/g, " ").trim();
export function findEntries(entries: SearchEntry[], query: string, country = "") {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  return entries.filter(entry => {
    if (country && entry.kind === "Offre" && !entry.eligibleResidences?.includes(country)) return false;
    const haystack = normalize([entry.title, entry.description, entry.keywords, entry.kind].join(" "));
    return words.every(word => haystack.includes(word));
  }).sort((a, b) => Number(normalize(b.title).includes(normalize(query))) - Number(normalize(a.title).includes(normalize(query))));
}
