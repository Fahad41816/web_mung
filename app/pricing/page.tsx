"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/HomePageElements/Navbar";
import { PricingHero } from "./banner";
import { DesktopPricingCards, MobilePricingSection } from "./pricing-cards";

// Below-fold sections load in their own chunks, so the first paint only
// ships the banner + pricing cards. That is the real page-speed win here —
// splitting files alone does not shrink the bundle, dynamic() does.
const ProcessSection = dynamic(() =>
  import("./reviews-how-we-work").then((m) => m.ProcessSection)
);
const ReviewsSection = dynamic(() =>
  import("./reviews-how-we-work").then((m) => m.ReviewsSection)
);
const FaqSection = dynamic(() => import("./faq"));
const FinalCtaSection = dynamic(() => import("./final-cta"));

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E2433] selection:bg-[#5770D1]/20 selection:text-[#1E2433] relative overflow-hidden font-sans">
      {/* Background Architectural Blueprint Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient background soft light gradients */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#E6ECFC]/60 via-[#F0F4FD]/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[650px] -left-48 w-96 h-96 bg-orange-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[850px] -right-48 w-96 h-96 bg-teal-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Bar */}
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-24 sm:pb-32">
        <PricingHero />

        <div id="plans" className="scroll-mt-24">
          <DesktopPricingCards />
          <MobilePricingSection />
        </div>

        <ProcessSection />
        <ReviewsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
    </div>
  );
}
