"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { TopBar } from "./top-bar";
import { Drawer } from "./drawer";
import { site } from "@/data/site";
import { modelsData, vehicleMenuModels, VehicleType } from "@/data/vehicles";

interface HeaderProps {
  activePath?: string;
}

export function Header({ activePath = "/" }: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<VehicleType | null>(null);
  const dropdownTriggerRefs = useRef<
    Partial<Record<VehicleType, HTMLButtonElement | null>>
  >({});
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const dropdownTypes: Partial<Record<string, VehicleType>> = {
    Scooters: "scooter",
    Motorcycles: "motorcycle",
  };

  function closeDropdown(type?: VehicleType) {
    setOpenDropdown(null);
    if (type) dropdownTriggerRefs.current[type]?.focus();
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-border transition-all">
      {/* Top Announcement & Quick Contact Bar */}
      <TopBar />

      {/* Main Navbar */}
      <div className="max-w-[1360px] mx-auto px-3 sm:px-4 lg:px-4">
        <div className="flex items-center justify-between h-[72px] sm:h-[80px]">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-6"
            aria-label="Primary navigation"
          >
            {site.navigation.map((item) => {
              const isActive = activePath === item.href || (item.href === "/" && activePath === "");
              const vehicleType = dropdownTypes[item.label];

              if (vehicleType) {
                const isOpen = openDropdown === vehicleType;
                const models = vehicleMenuModels[vehicleType];
                const menuId = `vehicle-menu-${vehicleType}`;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(vehicleType)}
                    onMouseLeave={(event) => {
                      const focusRemainsInside =
                        event.currentTarget.contains(document.activeElement);
                      if (openDropdown === vehicleType && !focusRemainsInside) {
                        setOpenDropdown(null);
                      }
                    }}
                    onFocus={() => setOpenDropdown(vehicleType)}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setOpenDropdown(null);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Escape" && isOpen) {
                        event.preventDefault();
                        closeDropdown(vehicleType);
                      }
                    }}
                  >
                    <button
                      ref={(element) => {
                        dropdownTriggerRefs.current[vehicleType] = element;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      onClick={() => setOpenDropdown(vehicleType)}
                      className={`inline-flex items-center gap-1 text-[14.5px] transition-colors py-1 ${
                        isActive
                          ? "text-brand-black font-semibold"
                          : "text-brand-black/85 hover:text-brand-red font-medium"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      id={menuId}
                      className={`absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 rounded-lg border border-border bg-white p-2 shadow-lg transition ${
                        isOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      <ul aria-label={`${item.label} models`}>
                        {models.map((model) => {
                          const product = modelsData.find(
                            (item) => item.id === model.id,
                          );

                          return (
                            <li key={model.id}>
                              <Link
                                href={
                                  product
                                    ? `/products/${product.slug}`
                                    : `/#${vehicleType === "scooter" ? "scooters" : "motorcycles"}`
                                }
                                onClick={() => setOpenDropdown(null)}
                                className="block rounded-md px-3 py-2.5 text-sm font-medium text-brand-black hover:bg-surface hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
                              >
                                {model.model}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.label} className="relative flex flex-col items-center">
                  <Link
                    href={item.href}
                    className={`text-[14.5px] transition-colors py-1 ${
                      isActive
                        ? "text-brand-black font-semibold"
                        : "text-brand-black/85 hover:text-brand-red font-medium"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Active indicator bar matching design */}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 w-7 h-[2.5px] bg-brand-red rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-4">
            {/* Book a Test Ride CTA button */}
            <a
              href={activePath === "/" ? "#test-ride" : "/#test-ride"}
              aria-label="Book a Test Ride"
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-button bg-brand-red px-3 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-brand-red-hover hover:shadow active:scale-[0.98] sm:px-5 sm:text-sm"
            >
              <span className="hidden sm:inline">Book a Test Ride</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            {/* Mobile navigation toggle */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex size-11 items-center justify-center rounded-md p-2 text-brand-black transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={isDrawerOpen}
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Mobile/Auxiliary Navigation Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        activePath={activePath}
      />
    </header>
  );
}
