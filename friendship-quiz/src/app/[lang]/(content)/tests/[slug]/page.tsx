import CategoryPage, { categoryMeta, categoryParams } from "@/components/pages/CategoryPage";
import { langOf } from "@/i18n/params";

export const dynamicParams = false;
export const generateStaticParams = categoryParams;

type Params = Promise<{ lang: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  return categoryMeta(await langOf(params), (await params).slug);
}

export default async function Page({ params }: { params: Params }) {
  return <CategoryPage lang={await langOf(params)} slug={(await params).slug} />;
}
