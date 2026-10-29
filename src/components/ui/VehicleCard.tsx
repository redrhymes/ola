"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { ProductVariant, VehicleModelData } from "@/data/vehicles";
import { images } from "@/data/images";

interface VehicleCardProps {
  vehicle: VehicleModelData;
  priority?: boolean;
}

const comingSoon = "Coming Soon";

function valueOrSoon(value?: string) {
  return value || comingSoon;
}

export function VehicleCard({ vehicle, priority = false }: VehicleCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const variant: ProductVariant = vehicle.variants[selectedIndex] ?? vehicle.variants[0];
  const imageSrc = images.vehicles[vehicle.imageKey];
  const fullName = `${vehicle.brand} ${vehicle.model} ${vehicle.generation || ""}`.trim();
  const price = variant.priceReference
    ? `Reference introductory price (unverified): ${variant.priceReference}`
    : vehicle.priceReference
      ? `Reference starting price (unverified): ₹${vehicle.priceReference}`
    : vehicle.price.full
      ? `${vehicle.price.startingLabel}: ₹${vehicle.price.full}`
      : vehicle.price.startingLabel;

  return (
    <article
      aria-labelledby={`vehicle-heading-${vehicle.id}`}
      className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-shadow duration-200 hover:shadow-[0_6px_28px_rgba(0,0,0,0.07)]"
    >
      <Link
        href={`/products/${vehicle.slug}`}
        aria-label={`View ${fullName} details`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-[#E6E8EE]"
      >
        <ImageSlot
          src={imageSrc}
          alt={fullName}
          aspect="aspect-[4/3]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          placeholderLabel={vehicle.model}
          placeholderTone={vehicle.imageTone}
          objectPosition="center 70%"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white via-white/70 to-transparent" aria-hidden="true" />
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-0">
        <h3 id={`vehicle-heading-${vehicle.id}`} className="mt-1.5">
          <Link href={`/products/${vehicle.slug}`} className="flex flex-wrap items-baseline gap-x-2 text-[22px] leading-tight sm:text-2xl lg:text-[26px]">
            <span className="font-extrabold tracking-tight text-black">{vehicle.brand}</span>
            <span className="font-light text-black">{vehicle.model}</span>
            {vehicle.generation && <span className="font-light italic text-[#1FAE5B]">{vehicle.generation}</span>}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-normal text-[#3A3D45]">{vehicle.tagline}</p>

        {vehicle.variants.length > 1 && (
          <label className="mt-4 flex flex-col gap-1 text-xs font-semibold text-[#4A4D55]">
            Battery variant
            <select
              value={selectedIndex}
              onChange={(event) => setSelectedIndex(Number(event.target.value))}
              className="min-h-10 rounded border border-[#D1D4DC] bg-white px-3 text-sm font-medium text-brand-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
            >
              {vehicle.variants.map((item, index) => (
                <option key={`${item.label}-${index}`} value={index}>{item.label}</option>
              ))}
            </select>
          </label>
        )}

        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 rounded-lg bg-white/70 p-3 text-sm">
          {[
            ["Battery", valueOrSoon(variant.battery)],
            ["Claimed / IDC range", variant.claimedRange ? `${variant.claimedRange} (claimed/IDC)` : comingSoon],
            ["Top speed", variant.topSpeed],
            ["Peak power", variant.peakPower],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-0.5 font-semibold text-brand-black">{valueOrSoon(value)}</dd>
            </div>
          ))}
        </dl>
        {variant.performanceNote && <p className="mt-2 text-xs font-medium text-amber-800">{variant.performanceNote}</p>}
        <p className="mt-2 text-[11px] leading-relaxed text-muted">Claimed/IDC range is not a real-world range guarantee.</p>

        <div className="mt-4 min-h-[48px] text-sm font-semibold text-brand-black">
          <p>{price}</p>
          {variant.reservationReference && (
            <p className="mt-1 text-xs font-normal text-[#6B6F76]">
              Reservation amount in supplied reference: {variant.reservationReference} (unverified)
            </p>
          )}
          {variant.expectedDelivery && <p className="mt-1 text-xs font-medium text-[#6B6F76]">Expected delivery (unverified): {variant.expectedDelivery}</p>}
          {vehicle.priceNote && <p className="mt-1 text-xs font-normal text-[#6B6F76]">{vehicle.priceNote}</p>}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-4 sm:grid-cols-2">
          {[vehicle.primaryCta, vehicle.secondaryCta].map((cta, index) => (
            <a
              key={cta.label}
              href={cta.href}
              aria-label={`${cta.label} ${fullName}`}
              className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-button border px-3 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red focus-visible:outline-offset-2 ${
                index === 0
                  ? "border-brand-red bg-brand-red text-white hover:bg-brand-red-hover"
                  : "border-brand-black bg-white text-brand-black hover:bg-surface"
              }`}
            >
              <span>{cta.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
