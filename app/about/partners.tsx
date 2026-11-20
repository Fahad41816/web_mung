"use client";

// --- PARTNERS ---

import Image from "next/image";
import { Eyebrow, GRAD, H2, SECTION_Y } from "./animations";

const PARTNER_LOGOS = [
  { src: "/images/brand_logos/pngwing.com.png", alt: "Partner Logo 1" },
  { src: "/images/brand_logos/pngwing.com (1).png", alt: "Partner Logo 2" },
  { src: "/images/brand_logos/pngwing.com (2).png", alt: "Partner Logo 3" },
  { src: "/images/brand_logos/pngwing.com (3).png", alt: "Partner Logo 4" },
  { src: "/images/brand_logos/pngwing.com (4).png", alt: "Partner Logo 5" },
  { src: "/images/brand_logos/pngwing.com (5).png", alt: "Partner Logo 6" },
  { src: "/images/brand_logos/pngwing.com (6).png", alt: "Partner Logo 7" },
  { src: "/images/brand_logos/pngwing.com (7).png", alt: "Partner Logo 8" },
  { src: "/images/brand_logos/pngwing.com (8).png", alt: "Partner Logo 9" },
  { src: "/images/brand_logos/pngwing.com (9).png", alt: "Partner Logo 10" },
  { src: "/images/brand_logos/pngwing.com (10).png", alt: "Partner Logo 11" },
  { src: "/images/brand_logos/pngwing.com (11).png", alt: "Partner Logo 12" },
];

// ========================================================
// 6. PARTNERS
// ========================================================
function LogoRow({ reverse = false }: { reverse?: boolean }) {
  const logos = reverse ? [...PARTNER_LOGOS].reverse() : PARTNER_LOGOS;
  return (
    <div className="marquee-pause overflow-hidden py-2">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: reverse ? "50s" : "42s" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {logos.map((logo) => (
              <div
                key={`${copy}-${logo.src}`}
                className="mr-8 flex h-16 w-28 shrink-0 items-center justify-center sm:mr-12 sm:h-20 sm:w-36"
              >
                <Image
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ""}
                  width={130}
                  height={55}
                  className="max-h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 sm:max-h-12"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section className={`relative ${SECTION_Y}`}>
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:mb-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <Eyebrow>Our Partners</Eyebrow>
          <h2 className={`mb-6 ${H2}`}>
            Our Valuable <span className={GRAD}>Partners</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            We are proud to work alongside trusted partners who support our journey and help us deliver meaningful digital solutions.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden" style={{ perspective: 1200 }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FAF9F6] to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FAF9F6] to-transparent sm:w-28"
        />
        <div style={{ transform: "rotateX(12deg)" }} className="space-y-3">
          <LogoRow />
          <LogoRow reverse />
        </div>
      </div>
    </section>
  );
}
