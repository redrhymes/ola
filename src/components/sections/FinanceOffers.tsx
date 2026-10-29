import {
  ArrowLeftRight,
  ArrowRight,
  BadgePercent,
  ReceiptIndianRupee,
} from "lucide-react";

import { ImageSlot } from "@/components/ui/ImageSlot";
import { images } from "@/data/images";
import { site } from "@/data/site";

const financeIcons = {
  receipt: ReceiptIndianRupee,
  exchange: ArrowLeftRight,
  offers: BadgePercent,
} as const;

// Gradient combos per item: from → to (Tailwind inline-style gradient)
const itemGradients: Record<string, { from: string; to: string; glow: string }> = {
  "Finance Enquiries": {
    from: "#EF4444",
    to: "#F97316",
    glow: "rgba(239,68,68,0.15)",
  },
  "Exchange Assistance": {
    from: "#3B82F6",
    to: "#8B5CF6",
    glow: "rgba(59,130,246,0.15)",
  },
  "Current Offers": {
    from: "#10B981",
    to: "#06B6D4",
    glow: "rgba(16,185,129,0.15)",
  },
};

export function FinanceOffers() {
  return (
    <section
      id="finance"
      aria-labelledby="finance-title"
      className="bg-[#F4F5F7] py-12 md:py-16 lg:py-[72px]"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div className="relative grid items-stretch overflow-hidden rounded-[28px] border border-border bg-white shadow-[0_8px_40px_rgba(0,0,0,0.08)] lg:grid-cols-[1.12fr_1fr]">
          {/* Left: Text content */}
          <div className="order-last px-8 py-10 md:px-12 md:py-12 lg:order-first lg:flex lg:flex-col lg:justify-center xl:px-14 xl:py-14">
            {/* Eyebrow */}
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#2A2C33] sm:text-[13px]">
              {site.financeOffers.eyebrow}
              <span
                className="mt-4 block h-0.5 w-14 bg-brand-red"
                aria-hidden="true"
              />
            </p>

            {/* Title */}
            <h2
              id="finance-title"
              className="mb-4 mt-5 after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-[''] text-[clamp(36px,4.4vw,58px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-brand-black [text-wrap:balance]"
            >
              <span className="md:block">{site.financeOffers.titleLines[0]}</span>{" "}
              <span className="md:block">{site.financeOffers.titleLines[1]}</span>
            </h2>

            {/* Description */}
            <p className="mb-8 max-w-[480px] text-base leading-[1.55] text-[#4A4D55] [text-wrap:pretty] md:text-lg">
              {site.financeOffers.description}
            </p>

            {/* Feature items */}
            <ul className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#E3E5EA]">
              {site.financeOffers.items.map((item, index) => {
                const Icon = financeIcons[item.icon];
                const grad = itemGradients[item.title] ?? {
                  from: "#E11313",
                  to: "#E11313",
                  glow: "rgba(225,19,19,0.12)",
                };

                return (
                  <li
                    key={item.title}
                    className={[
                      "group flex min-w-0 items-start gap-4 rounded-xl border border-transparent bg-[#F8F9FB] p-4 transition-all duration-300",
                      "hover:border-[#E3E5EA] hover:bg-white hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5",
                      "md:flex md:flex-col md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none md:hover:bg-transparent md:hover:shadow-none md:hover:-translate-y-0 md:hover:border-transparent",
                      index === 0
                        ? "md:pr-5 md:pl-0 lg:pr-6"
                        : index === 1
                        ? "md:px-5 lg:px-6"
                        : "md:pl-5 md:pr-0 lg:pl-6",
                    ].join(" ")}
                  >
                    {/* Icon with gradient background */}
                    <span
                      className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110 md:size-14"
                      style={{
                        background: `linear-gradient(135deg, ${grad.from}, ${grad.to})`,
                        boxShadow: `0 4px 16px ${grad.glow}`,
                      }}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-5 stroke-[1.75] md:size-6"
                      />
                    </span>

                    {/* Text */}
                    <div className="min-w-0 md:mt-5">
                      <h3 className="text-base font-bold leading-[1.3] text-brand-black xl:text-[17px]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-[1.6] text-[#4A4D55] xl:text-[15px]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* CTA */}
            <a
              href={site.financeOffers.cta.href}
              id="finance-offers-cta"
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-button bg-brand-red px-8 py-[18px] text-base font-semibold leading-none tracking-normal text-white shadow-md transition-all duration-200 hover:bg-brand-red-hover hover:shadow-[0_0_20px_rgba(225,19,19,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red min-[480px]:w-fit min-[480px]:text-[17px]"
            >
              {site.financeOffers.cta.label}
              <ArrowRight
                aria-hidden="true"
                className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </a>

            {/* Footnote */}
            <p className="mt-4 max-w-[640px] text-sm leading-[1.55] text-[#5A5D66]">
              {site.financeOffers.footnote}
            </p>
          </div>

          {/* Right: Image */}
          <ImageSlot
            src={images.finance.main}
            alt="Ola Electric scooter in a studio setting"
            aspect="min-h-[320px] aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-full"
            sizes="(min-width:1024px) 50vw, 100vw"
            objectPosition={images.finance.objectPosition}
            placeholderLabel="Finance image"
            className="order-first h-full bg-gradient-to-br from-[#E4E5E8] to-[#F1F2F4] lg:order-last lg:min-h-[320px]"
          />
        </div>
      </div>
    </section>
  );
}
