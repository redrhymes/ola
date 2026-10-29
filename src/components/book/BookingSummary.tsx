"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { images } from "@/data/images";
import type { ProductVariant, VehicleModelData } from "@/data/vehicles";
import { bookingPage } from "@/data/site";

type Props = {
  vehicle?: VehicleModelData;
  variantId?: string;
  color?: string;
  payment?: string;
  mobile?: boolean;
};

function normalizedVariantId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function priceAmount(value?: string) {
  if (!value) return undefined;
  const amount = Number(value.replace(/[^\d]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

function displayPrice(value?: string) {
  if (!value) return "Verify current official price";
  return value.startsWith("₹") || value.startsWith("Verify")
    ? value
    : `₹${value}`;
}

export function BookingSummary({
  vehicle,
  variantId,
  color,
  payment,
  mobile = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const selectedVariant = vehicle?.variants.find(
    (item) => normalizedVariantId(item.label) === variantId,
  );
  const variantsByPrice = vehicle
    ? vehicle.variants
    .map((item) => ({
      item,
      price: item.priceReference ?? vehicle.priceReference,
      amount: priceAmount(item.priceReference ?? vehicle.priceReference),
    }))
    .filter((entry): entry is { item: ProductVariant; price: string; amount: number } =>
      entry.amount !== undefined,
    )
    .sort((left, right) => left.amount - right.amount)
    : [];
  const price = selectedVariant?.priceReference ??
    variantsByPrice?.[0]?.price ??
    vehicle?.priceReference ??
    (vehicle?.price.full ? `₹${vehicle.price.full}` : undefined) ??
    vehicle?.price.startingLabel;
  const image = vehicle ? images.vehicles[vehicle.imageKey] : undefined;
  const colorLabel = bookingPage.colorOptions.find((option) => option.value === color)?.label;
  const paymentLabel = bookingPage.paymentOptions.find(
    (option) => option.value === payment,
  )?.label;

  const summaryDetails = (
    <>
      {image ? (
        <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-xl bg-[#F1F2F4]">
          <Image
            src={image}
            alt={vehicle ? `${vehicle.brand} ${vehicle.model}` : ""}
            fill
            sizes="(max-width: 1023px) 100vw, 320px"
            className="object-contain p-3"
          />
        </div>
      ) : (
        <div className="mt-5 flex aspect-[4/3] items-center justify-center rounded-xl bg-[#F1F2F4] text-sm font-semibold text-[#777B84]">
          Select a scooter to see its details
        </div>
      )}
      <dl className="mt-5 space-y-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[#777B84]">Model</dt>
          <dd className="mt-1 font-bold text-brand-black">
            {vehicle ? `${vehicle.brand} ${vehicle.model}` : "Not selected"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-[#777B84]">Variant</dt>
          <dd className="mt-1 font-semibold text-brand-black">
            {selectedVariant?.label ?? "Not selected"}
          </dd>
        </div>
        {selectedVariant?.battery && (
          <div className="flex justify-between gap-3 text-sm">
            <dt className="text-[#626670]">Battery</dt>
            <dd className="text-right font-medium text-brand-black">{selectedVariant.battery}</dd>
          </div>
        )}
        {selectedVariant?.claimedRange && (
          <div className="flex justify-between gap-3 text-sm">
            <dt className="text-[#626670]">Claimed range</dt>
            <dd className="text-right font-medium text-brand-black">{selectedVariant.claimedRange}</dd>
          </div>
        )}
        {selectedVariant?.topSpeed && (
          <div className="flex justify-between gap-3 text-sm">
            <dt className="text-[#626670]">Top speed</dt>
            <dd className="text-right font-medium text-brand-black">{selectedVariant.topSpeed}</dd>
          </div>
        )}
        {colorLabel && (
          <div className="flex justify-between gap-3 text-sm">
            <dt className="text-[#626670]">Colour</dt>
            <dd className="text-right font-medium text-brand-black">{colorLabel}</dd>
          </div>
        )}
        {paymentLabel && (
          <div className="flex justify-between gap-3 text-sm">
            <dt className="text-[#626670]">Payment preference</dt>
            <dd className="text-right font-medium text-brand-black">{paymentLabel}</dd>
          </div>
        )}
      </dl>
      <div className="mt-5 border-t border-[#E6E8EC] pt-4">
        <p className="text-sm text-[#6B6F76]">Introductory price*</p>
        <p className="mt-1 text-[32px] font-extrabold leading-tight text-brand-black">{displayPrice(price)}</p>
        {selectedVariant?.reservationReference && (
          <p className="mt-2 text-sm text-[#626670]">
            Reservation: <span className="font-semibold text-brand-black">{selectedVariant.reservationReference}</span>
          </p>
        )}
        {selectedVariant?.expectedDelivery && (
          <p className="mt-1 text-sm text-[#626670]">
            Expected delivery: <span className="font-semibold text-brand-black">{selectedVariant.expectedDelivery}</span>
          </p>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-[#777B84]">
        <a href="#booking-footnote" className="font-semibold text-brand-red underline underline-offset-2">
          *Price and booking details
        </a>
      </p>
    </>
  );

  if (mobile) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#E6E8EC] bg-white lg:hidden">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="booking-mobile-summary"
          onClick={() => setExpanded((value) => !value)}
          className="flex min-h-[78px] w-full items-center justify-between gap-3 p-4 text-left"
        >
          <span className="min-w-0">
            <span className="block text-xs font-medium text-[#777B84]">Your selection</span>
            <span className="mt-1 block truncate text-sm font-bold text-brand-black">
              {vehicle ? `${vehicle.model}${selectedVariant ? ` · ${selectedVariant.label}` : ""}` : "Choose a scooter"}
            </span>
            <span className="mt-1 block text-sm font-bold text-brand-red">{displayPrice(price)}</span>
          </span>
          {expanded ? (
            <ChevronUp aria-hidden="true" className="size-5 shrink-0 text-[#626670]" />
          ) : (
            <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-[#626670]" />
          )}
        </button>
        {expanded && <div id="booking-mobile-summary" className="border-t border-[#E6E8EC] p-4">{summaryDetails}</div>}
      </div>
    );
  }

  return (
    <aside className="sticky top-28 hidden rounded-2xl border border-[#E6E8EC] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] lg:block">
      <h2 className="text-lg font-bold text-brand-black">Your selection</h2>
      {summaryDetails}
    </aside>
  );
}
