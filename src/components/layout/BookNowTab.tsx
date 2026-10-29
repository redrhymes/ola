"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BookNowTab() {
  const pathname = usePathname();

  if (pathname === "/book" || pathname.startsWith("/book/")) return null;

  const productMatch = pathname.match(/^\/products\/([^/]+)/);
  const href = productMatch
    ? `/book?vehicle=${encodeURIComponent(productMatch[1])}`
    : "/book";

  return (
    <div className="book-now-tab fixed right-0 top-1/2 z-50 -translate-y-1/2">
      <Link
        href={href}
        aria-label="Book your Ola scooter"
        className="group inline-flex min-h-[128px] w-10 flex-col items-center justify-center gap-2 rounded-l-xl bg-brand-red px-1.5 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-white shadow-[-4px_8px_24px_rgba(225,19,19,0.25)] transition-transform duration-200 hover:-translate-x-1 hover:bg-brand-red-hover focus-visible:z-10 focus-visible:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-white focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none"
      >
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
        <span className="[writing-mode:vertical-rl] rotate-180">Book Now</span>
      </Link>
    </div>
  );
}
