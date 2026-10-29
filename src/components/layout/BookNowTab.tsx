"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function BookNowTab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    if (pathname === "/book" || pathname.startsWith("/book/")) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(true), reducedMotion ? 0 : 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [pathname]);

  if (pathname === "/book" || pathname.startsWith("/book/")) return null;

  const productMatch = pathname.match(/^\/products\/([^/]+)/);
  const href = productMatch
    ? `/book?vehicle=${encodeURIComponent(productMatch[1])}`
    : "/book";

  return (
    <div
      className={`fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 transition-transform duration-300 md:block motion-reduce:transition-none ${
        visible
          ? "translate-x-0"
          : "pointer-events-none translate-x-full"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href={href}
        aria-label="Book your Ola scooter"
        tabIndex={visible ? 0 : -1}
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
