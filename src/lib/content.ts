import fs from "node:fs";
import path from "node:path";
import { articles, type Article } from "@/content/editorial";

export const articleUrl = (article: Article) => `/${article.kind}/${article.slug}`;
export const getArticles = (kind: Article["kind"]) => articles.filter(article => article.kind === kind);
export const getArticle = (kind: Article["kind"], slug: string) => articles.find(article => article.kind === kind && article.slug === slug);
export function readArticle(article: Article) {
  return fs.readFileSync(path.join(process.cwd(), "src/content", article.kind, article.slug + ".md"), "utf8");
}
