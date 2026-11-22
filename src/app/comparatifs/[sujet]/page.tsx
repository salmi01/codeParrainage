import { ArticlePage, articleMetadata, articleParams } from "@/components/ArticlePage";
export const dynamicParams = false;
export const revalidate = 3600;
export const generateStaticParams = () => articleParams("comparatifs");
type Props = { params: Promise<{ sujet: string }> };
export async function generateMetadata({ params }: Props) { return articleMetadata("comparatifs", (await params).sujet); }
export default async function Page({ params }: Props) {
  return <ArticlePage kind="comparatifs" slug={(await params).sujet}/>;
}
