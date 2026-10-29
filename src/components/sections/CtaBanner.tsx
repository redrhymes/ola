import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { images } from "@/data/images";
import { site } from "@/data/site";

export function CtaBanner() {
  const imageAvailable = Boolean(images.ctaBanner.main.trim());

  return (
    <section
      id="cta"
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-b border-white/20 bg-[#0B0B0F]"
    >
      <div className="absolute inset-0 z-0">
        {imageAvailable ? (
          <Image
            src={images.ctaBanner.main}
            alt="Ola Electric scooter in the showroom"
            fill
            sizes="100vw"
            quality={80}
            priority={false}
            className="object-cover"
            style={{ objectPosition: images.ctaBanner.objectPosition }}
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden bg-[#0B0B0F]">
            <span aria-hidden="true" className="absolute -right-[8%] top-[-20%] h-[140%] w-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_68%)]" />
            <span aria-hidden="true" className="absolute right-[28%] top-0 h-full w-[2px] bg-white/60 shadow-[0_0_16px_4px_rgba(255,255,255,0.25)]" />
            <span aria-hidden="true" className="absolute right-[18%] top-0 h-full w-[3px] bg-white/60 shadow-[0_0_18px_5px_rgba(255,255,255,0.25)]" />
            <span className="absolute bottom-4 right-5 text-xs text-white/50">
              CTA banner image
            </span>
          </div>
        )}
      </div>

      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-[#0B0B0F] via-[rgba(11,11,15,0.92)] to-transparent md:via-[rgba(11,11,15,0.92)] md:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 bg-[rgba(11,11,15,0.35)] md:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(11,11,15,0.45)] via-transparent to-[rgba(11,11,15,0.3)] md:hidden"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex min-h-[460px] max-w-container items-center px-4 py-14 sm:px-6 md:py-16 lg:min-h-[517px] lg:px-8 lg:py-20">
        <div className="w-full max-w-[720px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-white">
            {site.ctaBanner.eyebrow}
            <span
              className="mt-3 mb-7 block h-0.5 w-12 bg-brand-red"
              aria-hidden="true"
            />
          </p>
          <h2
            id="cta-title"
            className="mb-6 after:mt-4 after:block after:h-0.5 after:w-14 after:bg-brand-red after:content-[''] text-[clamp(40px,5.4vw,76px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-white [text-wrap:balance]"
          >
            {site.ctaBanner.titleLines[0]}
            <br className="hidden md:block" /> {site.ctaBanner.titleLines[1]}
          </h2>
          <p className="mb-8 max-w-[640px] text-[17px] leading-[1.6] text-white/85 [text-wrap:pretty] md:mb-9 md:text-xl">
            {site.ctaBanner.descriptionLines[0]}
            <br className="hidden lg:block" />{" "}
            {site.ctaBanner.descriptionLines[1]}
          </p>
          <a
            href={site.ctaBanner.cta.href}
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-button bg-brand-red px-6 text-base font-semibold leading-none text-white shadow-[0_8px_24px_rgba(225,19,19,0.25)] transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:min-h-16 min-[480px]:w-fit min-[480px]:gap-[14px] min-[480px]:px-9 min-[480px]:text-lg"
          >
            {site.ctaBanner.cta.label}
            <ArrowRight
              aria-hidden="true"
              className="size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 min-[480px]:size-[22px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
