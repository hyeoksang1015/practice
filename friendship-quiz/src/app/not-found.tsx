import type { Metadata } from "next";
import Link from "next/link";
import ClarityTag from "@/components/ClarityTag";

export const metadata: Metadata = { title: "페이지를 찾을 수 없어요" };

export default function NotFound() {
  return (
    <div className="card text-center">
      <ClarityTag />
      <p className="text-sm font-bold text-brand">404</p>
      <h1 className="mt-2 text-2xl font-bold">페이지를 찾을 수 없어요</h1>
      <p className="mt-3 leading-7 text-muted">
        주소가 잘못 입력되었거나 페이지가 옮겨졌을 수 있어요. 아래 링크에서 다시 시작해 보세요.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          메인으로 가기
        </Link>
        <Link href="/tests" className="btn btn-ghost">
          테스트 고르기
        </Link>
      </div>
    </div>
  );
}
