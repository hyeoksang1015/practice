"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";

export const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export default function Header() {
  const path = usePathname();
  return (
    <header className="fixed top-0 left-0 z-40 w-full bg-surface/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="wrap flex h-20 items-center justify-between gap-space-md">
        <Link href="/" className="font-display text-headline-sm tracking-wider text-on-surface transition-colors hover:text-secondary md:text-headline-md">
          {site.name}
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 rounded-full bg-surface-container-lowest/60 p-space-xs lg:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(path, n.href) ? "page" : undefined}
              className="rounded-full px-space-md py-space-xs text-label-md uppercase text-on-surface-variant transition-colors hover:text-on-surface aria-[current=page]:bg-secondary-container aria-[current=page]:text-on-secondary-container"
            >
              {n.label} <span className="hidden 2xl:inline">({n.en})</span>
            </Link>
          ))}
        </nav>
        <Link href="/booking/" className="inline-flex min-h-10 shrink-0 items-center rounded-full bg-secondary px-space-md text-label-md uppercase tracking-wider text-on-secondary transition-colors hover:bg-secondary-fixed">
          1:1 Booking
        </Link>
      </div>
    </header>
  );
}
