import CategoryPage, { categoryMeta, categoryParams } from "@/components/pages/CategoryPage";

export const dynamicParams = false;
export const generateStaticParams = categoryParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return categoryMeta("ko", (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryPage lang="ko" slug={(await params).slug} />;
}
