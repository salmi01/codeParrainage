import { ArticlePage, articleMetadata, articleParams } from "@/components/ArticlePage";
export const dynamicParams = false;
export const revalidate = 3600;
export const generateStaticParams = () => articleParams("pays").map(({ sujet }) => ({ pays: sujet }));
type Props = { params: Promise<{ pays: string }> };
export async function generateMetadata({ params }: Props) { return articleMetadata("pays", (await params).pays); }
export default async function Page({ params }: Props) {
  return <ArticlePage kind="pays" slug={(await params).pays}/>;
}
