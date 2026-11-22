import type { Metadata } from "next";

export const siteUrl = "https://codeparrainage.co";
export const siteName = "CodeParrainage";
export function pageMeta(title: string, description: string, path: string, index = true, article = false): Metadata {
  const url = new URL(path, siteUrl).href;
  const fullTitle = title + " · " + siteName;
  const image = { url: siteUrl + "/images/carnet-parrainage.webp", width: 1024, height: 768, alt: "Le guide CodeParrainage" };
  return {
    title: fullTitle, description, alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: { type: article ? "article" : "website", locale: "fr", siteName, title: fullTitle, description, url, images: [image] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
