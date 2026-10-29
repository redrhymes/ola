import { site } from "@/data/site";
import Link from "next/link";

export function ContactHero() {
  return (
    <section className="bg-surface py-14 text-center sm:py-16 lg:py-20">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center justify-center gap-2 text-sm text-muted">
            <li>
              <Link
                href="/"
                className="underline-offset-4 hover:text-brand-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
              >
                {site.contactPage.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-brand-black">
              {site.contactPage.breadcrumbCurrent}
            </li>
          </ol>
        </nav>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          {site.contactPage.eyebrow}
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-[clamp(40px,6vw,68px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-brand-black [text-wrap:balance]">
          {site.contactPage.title}
        </h1>
        <span aria-hidden="true" className="mx-auto mt-5 block h-0.5 w-14 bg-brand-red" />
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5A5D66] md:text-lg">
          {site.contactPage.description}
        </p>
      </div>
    </section>
  );
}
