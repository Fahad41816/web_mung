"use client";

import Navbar from "@/components/HomePageElements/Navbar";
import {
  GlobalStyles,
  useParallax,
  useSmoothScroll,
} from "./animations";
import { Hero, ServicesBand } from "./banner";
import { WhoWeAre } from "./who-we-are";
import { Approach } from "./our-approach";
import { MissionVision } from "./mission-vision";
import { WhyChoose } from "./choose-us";
import { Partners } from "./partners";
import { Faq } from "./faq";

// ========================================================
// PAGE
// ========================================================
export default function AboutPage() {
  useSmoothScroll();
  useParallax();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FAF9F6] font-sans text-[#1E2433] selection:bg-[#5770D1]/20 selection:text-[#1E2433]">
      <GlobalStyles />

      <Navbar />

      <main>
        <Hero />
        <ServicesBand />
        <WhoWeAre />
        <Approach />
        <MissionVision />
        <WhyChoose />
        <Partners />
        <Faq />
      </main>
    </div>
  );
}
