import { CategoryPage, categoryMeta } from "@/components/CategoryPage";
export const revalidate = 3600;
export const generateMetadata = () => categoryMeta("transfert-argent");
export default function Page() { return <CategoryPage slug="transfert-argent"/>; }
