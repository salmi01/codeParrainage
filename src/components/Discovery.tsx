import Link from "next/link";
import { Send, Landmark, Globe2, BookOpen, MapPinned, ChevronRight } from "lucide-react";
import { sections } from "@/lib/routes";
import { articleUrl } from "@/lib/content";
import type { Article } from "@/content/editorial";

const categoryIcons = { transfer: Send, bank: Landmark, globe: Globe2 };
export function CategoryCards() {
  return <div className="category-grid">{sections.map(section => {
    const Icon = categoryIcons[section.icon];
    return <Link className={`category-card ${section.icon}`} key={section.slug} href={"/" + section.slug}>
      <span className="card-icon"><Icon size={25} strokeWidth={1.7} aria-hidden/></span>
      <h3>{section.title}</h3><p>{section.description}</p>
      <ChevronRight className="card-chevron" size={19} strokeWidth={1.7} aria-hidden/>
    </Link>;
  })}</div>;
}
export function ArticleLinks({ entries }: { entries: Article[] }) {
  return <div className="article-list">{entries.map(a => {
    const Icon = a.slug === "comprendre-eligibilite-pays" ? MapPinned : BookOpen;
    return <Link href={articleUrl(a)} key={articleUrl(a)} className="article-link">
      <span className="article-icon"><Icon size={22} strokeWidth={1.6} aria-hidden/></span>
      <span><strong>{a.title}</strong><span>{a.description}</span></span>
      <ChevronRight size={19} aria-hidden/>
    </Link>;
  })}</div>;
}
