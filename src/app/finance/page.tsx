import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/header";
import { FinanceHero } from "@/components/sections/FinanceHero";
import { FinanceOffers } from "@/components/sections/FinanceOffers";

export const metadata: Metadata = {
  title: "Finance & Offers | Ola Electric",
  description:
    "Explore flexible finance options, exchange assistance, and current offers for Ola Electric vehicles at your authorized dealership.",
};

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header activePath="/finance" />
      <main id="main-content">
        <FinanceHero />
        <FinanceOffers />
      </main>
      <Footer />
    </div>
  );
}
