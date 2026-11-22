import { PageFrame } from "@/components/PageFrame";
import { ArticleLinks } from "@/components/Discovery";
import { getArticles } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

const title = "Les guides du parrainage";
const description = "Des repères pour lire une offre, vérifier son éligibilité et utiliser une invitation.";
export const metadata = pageMeta(title, description, "/guides");
export default function Page() {
  return <PageFrame title={title} intro={description} crumbs={[{ label: "Guides", href: "/guides" }]}><ArticleLinks entries={getArticles("guides")}/></PageFrame>;
}
