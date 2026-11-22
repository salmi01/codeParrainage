import { ArticlePage, articleMetadata, articleParams } from "@/components/ArticlePage";
export const dynamicParams = false;
export const revalidate = 3600;
export const generateStaticParams = () => articleParams("guides");
type Props = { params: Promise<{ sujet: string }> };
export async function generateMetadata({ params }: Props) { return articleMetadata("guides", (await params).sujet); }
export default async function Page({ params }: Props) {
  return <ArticlePage kind="guides" slug={(await params).sujet}/>;
}
