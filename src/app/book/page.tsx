import type { Metadata } from "next";
import { Bike, Phone, ShieldCheck } from "lucide-react";
import { BookHero } from "@/components/book/BookHero";
import { BookingWizard } from "@/components/book/BookingWizard";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { bookingPage, site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `Book Your Ola Scooter | ${site.name}` },
  description: bookingPage.description,
  alternates: { canonical: "/book" },
  openGraph: {
    title: `Book Your Ola Scooter | ${site.name}`,
    description: bookingPage.description,
    url: "/book",
    type: "website",
  },
};

const reassuranceIcons = {
  shield: ShieldCheck,
  phone: Phone,
  bike: Bike,
} as const;

export default function BookPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="main-content">
        <BookHero />
        <BookingWizard />
        <section aria-label="Booking benefits" className="border-y border-[#E6E8EC] bg-white">
          <ul className="mx-auto grid max-w-container gap-4 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
            {bookingPage.reassurance
              .filter((item) => bookingPage.offersFreeTestRides || item.icon !== "bike")
              .map((item) => {
                const Icon = reassuranceIcons[item.icon];
                return (
                  <li key={item.label} className="flex items-center justify-center gap-3 text-center text-sm font-semibold text-[#3A3D45]">
                    <Icon aria-hidden="true" className="size-5 shrink-0 text-brand-red" />
                    {item.label}
                  </li>
                );
              })}
          </ul>
        </section>
        <p id="booking-footnote" className="mx-auto max-w-container px-4 pb-10 text-xs leading-5 text-[#777B84] sm:px-6 lg:px-8">
          {bookingPage.footnote}
        </p>
      </main>
      <Footer />
    </div>
  );
}
