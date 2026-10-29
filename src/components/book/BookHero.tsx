import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { bookingPage } from "@/data/site";

export function BookHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-white to-[#F7F8FA]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-8 size-72 rounded-full border border-[#EEF0F3] sm:left-[8%] sm:size-[420px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[360px] rounded-full border border-[#EEF0F3] sm:right-[8%] sm:size-[520px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[17%] top-16 size-3 rounded-full bg-brand-red/20"
      />
      <div className="relative mx-auto flex max-w-container flex-col items-center px-4 pt-12 pb-6 text-center sm:px-6 sm:pt-16 sm:pb-8 lg:px-8 lg:pt-16 lg:pb-8">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex items-center gap-2 text-sm text-[#6B6F76]">
            <li><Link href="/" className="rounded-sm hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-4" /></li>
            <li aria-current="page" className="font-semibold text-brand-black">Book Now</li>
          </ol>
        </nav>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red sm:text-sm">
          {bookingPage.eyebrow}
          <span className="mx-auto mt-3 block h-0.5 w-12 bg-brand-red" aria-hidden="true" />
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(36px,5vw,60px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-brand-black">
          {bookingPage.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#555962] sm:text-lg sm:leading-8">
          {bookingPage.description}
        </p>
      </div>
    </section>
  );
}
