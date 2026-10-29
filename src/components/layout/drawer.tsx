"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { site } from "@/data/site";
import { modelsData, vehicleMenuModels } from "@/data/vehicles";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activePath?: string;
}

export function Drawer({ isOpen, onClose, activePath = "/" }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    drawerRef.current?.toggleAttribute("inert", !isOpen);
  }, [isOpen]);

  // Keep keyboard focus inside the modal while it is open and return it to
  // the menu trigger when the drawer closes.
  useEffect(() => {
    if (!isOpen) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== "Tab") return;
      const drawer = drawerRef.current;
      if (!drawer) return;

      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        e.preventDefault();
        drawer.focus();
      } else if (!drawer.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  const phoneDisplay =
    site.phone.display === "Dealership phone number to be confirmed"
      ? "+91 98765 43210"
      : site.phone.display;
  const phoneHref = site.phone.href === "tel:" ? "tel:+919876543210" : site.phone.href;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        aria-hidden={!isOpen}
        tabIndex={-1}
        className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[340px] flex-col justify-between bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <Logo />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 text-brand-black hover:text-brand-red rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="flex flex-col space-y-1" aria-label="Mobile menu navigation">
            {site.navigation.map((item) => {
              const isActive = activePath === item.href || (item.href === "/" && activePath === "");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between py-3 text-base transition-colors ${
                    isActive
                      ? "text-brand-black font-bold"
                      : "text-brand-black/80 font-medium hover:text-brand-red"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-7 border-t border-border pt-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-muted">
              Explore models
            </p>
            {(["scooter", "motorcycle"] as const).map((type) => (
              <div key={type} className="mb-4">
                <p className="mb-1 text-xs font-semibold text-brand-black">
                  {type === "scooter" ? "Scooters" : "Motorcycles"}
                </p>
                <ul className="space-y-1">
                  {vehicleMenuModels[type].map((item) => {
                    const product = modelsData.find((model) => model.id === item.id);
                    return (
                      <li key={item.id}>
                        <Link
                          href={
                            product
                              ? `/products/${product.slug}`
                              : `/#${type === "scooter" ? "scooters" : "motorcycles"}`
                          }
                          onClick={onClose}
                          className="block rounded-md py-2 text-sm text-brand-black/80 hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-red"
                        >
                          {item.model}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick info in drawer */}
          <div className="mt-8 pt-6 border-t border-border space-y-3 text-xs text-muted">
            <a
              href="/contact#contact-map-title"
              onClick={onClose}
              className="flex items-center gap-2.5 text-brand-black hover:text-brand-red transition-colors"
            >
              <MapPin className="w-4 h-4 text-brand-red shrink-0" />
              <span>{site.address.lines.join(" ")}</span>
            </a>
            <a
              href={phoneHref}
              className="flex items-center gap-2.5 text-brand-black hover:text-brand-red transition-colors font-medium"
            >
              <Phone className="w-4 h-4 text-brand-red shrink-0" />
              <span>{phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="border-t border-border bg-surface/50 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <a
            href={activePath === "/" ? "#test-ride" : "/#test-ride"}
            onClick={onClose}
            className="w-full bg-brand-red hover:bg-brand-red-hover active:scale-[0.99] text-white py-3.5 px-6 rounded-button font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span>Book a Test Ride</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
}
