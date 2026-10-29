"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck, Home, Landmark, Receipt } from "lucide-react";
import { nav } from "@/data/site";
import { isActive } from "./Header";

const icons = [Home, Landmark, Receipt, CalendarCheck];
const short = ["홈", "공간소개", "대관안내", "대관신청"];

/** 모바일 하단 탭 (시안 모바일 화면). lg 이상에서는 상단 메뉴를 쓴다. */
export default function BottomNav() {
  const path = usePathname();
  return (
    <nav aria-label="하단 메뉴" className="fixed inset-x-0 bottom-0 z-40 border-t border-white/8 bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-4">
        {nav.map((n, i) => {
          const Icon = icons[i];
          return (
            <Link key={n.href} href={n.href} aria-current={isActive(path, n.href) ? "page" : undefined} className="flex min-h-16 flex-col items-center justify-center gap-1 text-label-sm text-on-surface-variant aria-[current=page]:text-secondary">
              <Icon className="size-5" aria-hidden="true" />
              {short[i]}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
