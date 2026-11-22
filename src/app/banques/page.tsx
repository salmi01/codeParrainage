import { CategoryPage, categoryMeta } from "@/components/CategoryPage";
export const revalidate = 3600;
export const generateMetadata = () => categoryMeta("banques");
export default function Page() { return <CategoryPage slug="banques"/>; }
