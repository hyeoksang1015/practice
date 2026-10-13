import Link from "next/link";
import { site } from "@/config/site";

export default function Header() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 px-5 py-2">
        <Link href="/" className="flex min-h-12 items-center gap-2 text-xl font-display">
          <span aria-hidden="true">{site.logoMark}</span>
          {site.name}
        </Link>
        <nav aria-label="주요 메뉴" className="flex gap-1 text-sm font-semibold">
          <Link href="/tests" className="flex min-h-12 items-center rounded-full px-3 hover:bg-peach">
            테스트 고르기
          </Link>
          <Link href="/about" className="flex min-h-12 items-center rounded-full px-3 hover:bg-peach">
            소개
          </Link>
        </nav>
      </div>
    </header>
  );
}
