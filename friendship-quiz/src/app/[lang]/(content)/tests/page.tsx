import TestsPage, { testsMeta } from "@/components/pages/TestsPage";
import { langOf } from "@/i18n/params";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return testsMeta(await langOf(params));
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  return <TestsPage lang={await langOf(params)} />;
}
