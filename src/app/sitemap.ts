import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { articles } from "@/content/editorial";
import { articleUrl } from "@/lib/content";
import { getOffers, statusOf } from "@/lib/offers";
import { info } from "@/lib/info";
export const revalidate = 3600;
export default function sitemap(): MetadataRoute.Sitemap {
  const active = getOffers().filter(o => statusOf(o) === "active");
  const paths = ["/", "/guides", ...Object.entries(info).filter(([,p]) => p.index).map(([slug]) => "/" + slug)];
  for (const category of ["transfert-argent", "banques"]) {
    if (active.some(o => o.category === category)) paths.push("/" + category);
  }
  if (active.length || articles.some(a => a.kind === "pays")) paths.push("/pays");
  return [...paths.map(path => ({ url: siteUrl + path })),
    ...articles.map(a => ({ url: siteUrl + articleUrl(a), lastModified: a.updatedAt })),
    ...active.map(o => ({ url: siteUrl + "/" + o.slug, lastModified: o.updatedAt }))];
}
