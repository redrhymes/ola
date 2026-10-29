"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { site } from "@/data/site";

const cooldownStorageKey = "ola-booking-cooldown-until";

export default function BookingSuccessPage() {
  const [reference, setReference] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);

  useEffect(() => {
    document.title = `Booking request received | ${site.name}`;
    const params = new URLSearchParams(window.location.search);
    const value = params.get("ref")?.trim() ?? "";
    if (/^[A-Za-z0-9_-]{1,80}$/.test(value)) setReference(value);

    try {
      const savedUntil = Number(sessionStorage.getItem(cooldownStorageKey) ?? 0);
      if (savedUntil > Date.now()) {
        setCooldownUntil(savedUntil);
        setNow(Date.now());
      } else {
        sessionStorage.removeItem(cooldownStorageKey);
      }
    } catch {
      // The confirmation is available even when browser storage is blocked.
    }
  }, []);

  useEffect(() => {
    if (!cooldownUntil) return;
    const timer = window.setInterval(() => {
      const timestamp = Date.now();
      setNow(timestamp);
      if (timestamp >= cooldownUntil) {
        setCooldownUntil(0);
        try {
          sessionStorage.removeItem(cooldownStorageKey);
        } catch {
          // Ignore blocked storage.
        }
      }
    }, 500);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  const remainingSeconds = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));

  async function copyReference() {
    if (!reference) return;
    try {
      await navigator.clipboard.writeText(reference);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main id="main-content" className="flex flex-1 items-center bg-[#F7F8FA] px-4 py-12 sm:py-16">
        <section
          aria-labelledby="booking-success-title"
          className="mx-auto w-full max-w-2xl rounded-3xl border border-[#E6E8EC] bg-white px-6 py-10 text-center shadow-[0_4px_24px_rgba(0,0,0,0.05)] sm:px-12 sm:py-14"
        >
          <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-[#E8F7EE] text-[#16803C]">
            <Check aria-hidden="true" className="size-8 stroke-[2.5]" />
          </span>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-brand-red">
            Booking request received
          </p>
          <h1 id="booking-success-title" className="mt-3 text-3xl font-extrabold tracking-tight text-brand-black sm:text-4xl">
            Booking request received
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#626670]">
            Thank you. Our team will call you shortly to confirm your booking.
          </p>
          {reference && (
            <div className="mx-auto mt-7 max-w-sm rounded-xl border border-[#E6E8EC] bg-[#FAFAFB] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#777B84]">Reference: {reference}</p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={copyReference}
                  aria-label="Copy booking reference"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#DADCE2] text-brand-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  <Copy aria-hidden="true" className="size-4" />
                  <span className="sr-only">Copy {reference}</span>
                </button>
              </div>
              <p className="mt-2 min-h-5 text-xs text-[#626670]" aria-live="polite">
                {copyState === "copied" ? "Reference copied." : copyState === "error" ? "Unable to copy. You can select the reference above." : "Keep this reference for your records."}
              </p>
            </div>
          )}
          {remainingSeconds > 0 && (
            <p className="mt-5 text-sm text-[#626670]" role="status" aria-live="polite">
              You can send another booking request in {remainingSeconds} seconds.
            </p>
          )}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-button bg-brand-red px-6 text-sm font-bold text-white transition-colors hover:bg-brand-red-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Back to Home
            </Link>
            <Link
              href="/#scooters"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-button border border-[#DADCE2] bg-white px-6 text-sm font-bold text-brand-black transition-colors hover:bg-[#F7F8FA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Explore Scooters
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
