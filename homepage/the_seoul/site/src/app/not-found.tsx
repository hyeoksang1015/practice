import Link from "next/link";
import { btnPrimary, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-center justify-center gap-space-md py-space-xl text-center">
      <Eyebrow>404 · Not Found</Eyebrow>
      <h1 className="font-display text-headline-lg-mobile md:text-headline-lg">찾으시는 페이지가 없습니다.</h1>
      <Link href="/" className={btnPrimary}>
        홈으로 가기
      </Link>
    </section>
  );
}
