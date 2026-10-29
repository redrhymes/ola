import { ArrowRight, ShieldCheck, Clock, BadgePercent } from "lucide-react";
import Image from "next/image";

const trustStats = [
  { value: "0%", label: "Down Payment Options" },
  { value: "Easy EMI", label: "Flexible Plans" },
  { value: "Same Day", label: "Approval*" },
];

export function FinanceHero() {
  return (
    <section
      aria-label="Finance Hero"
      className="relative w-full overflow-hidden bg-[#0B0B0F]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/finance.png"
          alt="Ola Electric scooter finance background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F] via-[#0B0B0F]/80 to-[#0B0B0F]/30"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[420px] flex-col justify-center py-16 sm:py-20 lg:min-h-[480px] lg:py-24">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red sm:text-[13px]">
              Finance &amp; Offers
            </span>
            <span className="h-px w-10 bg-brand-red" aria-hidden="true" />
          </div>

          <h1 className="mb-5 after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-[''] max-w-[18ch] text-[clamp(36px,5vw,68px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white [text-wrap:balance]">
            Own Your Ola,{" "}
            <span className="bg-gradient-to-r from-brand-red to-[#FF6B6B] bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>

          <p className="mb-8 max-w-[520px] text-base leading-[1.65] text-white/75 [text-wrap:pretty] md:text-lg">
            Flexible finance plans, zero-hassle exchange assistance, and
            exclusive dealership offers — making your Ola Electric scooter more
            accessible than ever.
          </p>

          <div className="flex flex-col gap-3 min-[400px]:flex-row min-[400px]:items-center">
            <a
              href="/#test-ride?topic=finance"
              id="finance-hero-primary-cta"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-button bg-brand-red px-7 py-4 text-base font-semibold leading-none text-white shadow-lg transition-all duration-200 hover:bg-brand-red-hover hover:shadow-[0_0_24px_rgba(225,19,19,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Enquire About Finance
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </a>
            <a
              href="#finance"
              id="finance-hero-secondary-cta"
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-button border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold leading-none text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              View Offers
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <ShieldCheck className="h-4 w-4 text-white/50" aria-hidden="true" />
              <span className="text-sm font-medium">Trusted Financing</span>
            </div>
            <div className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2 text-white/60">
              <Clock className="h-4 w-4 text-white/50" aria-hidden="true" />
              <span className="text-sm font-medium">Quick Processing</span>
            </div>
            <div className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2 text-white/60">
              <BadgePercent className="h-4 w-4 text-white/50" aria-hidden="true" />
              <span className="text-sm font-medium">Competitive Rates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats ribbon */}
      <div className="relative z-10 border-t border-white/10 bg-white/[0.04] backdrop-blur-sm">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-3 divide-x divide-white/10">
            {trustStats.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col items-center justify-center px-4 py-5 text-center sm:py-6"
              >
                <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium text-white/50 sm:text-sm">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
