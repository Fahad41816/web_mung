"use client";

// --- WHY CHOOSE US (with the "Let's Talk" ring) ---

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  CONTACT_HREF,
  EASE,
  GRAD,
  H2,
  SECTION_Y,
  Eyebrow,
  Magnetic,
  Tilt,
} from "./animations";

const WHY = [
  {
    title: "Built to Grow With Your Business",
    text: "Your business shouldn't outgrow its technology. We build flexible, scalable websites and applications designed around your needs, making it easier to adapt as your business evolves",
  },
  {
    title: "Quality You Can Rely On",
    text: "We focus on clean, maintainable code, responsive design, and thorough testing to deliver digital products that work reliably, perform smoothly, and are easier to maintain.",
  },
  {
    title: "A Team That Understands Your Goals",
    text: "We work closely with you to understand your challenges, business priorities, and vision. Our team turns those requirements into practical digital solutions, keeping your objectives at the center of every decision",
  },
  {
    title: "Clear Communication, No Guesswork",
    text: "You deserve to know what's happening with your project. We prioritize open communication, clear expectations, and regular progress updates so you can stay informed from the first discussion to the final delivery.",
  },
];

// ========================================================
// 5. WHY CHOOSE US
// ========================================================
function DrawCheck() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 shrink-0" aria-hidden>
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
    </svg>
  );
}

export function WhyChoose() {
  return (
    <section className={`relative ${SECTION_Y}`}>
      <div
        data-speed="0.3"
        aria-hidden
        className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-orange-100/50 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-8 sm:mb-14 lg:mb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl text-left">
            <Eyebrow>Why Choose Us</Eyebrow>
            <h2 className={`mb-6 ${H2}`}>
              Turn Your Business
              <br />
              Ideas Into <span className={GRAD}>Digital Success</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
              We help businesses transform ideas into reliable, user-friendly digital solutions. From professional websites to custom web applications, <span className="font-extrabold text-[#ff9b06]">Web Mung</span> combines thoughtful design, modern technology, and practical problem-solving to build digital products that support your goals and grow with your business
            </p>
          </div>

          <div className="flex lg:shrink-0">
            <LetsTalkRing />
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {WHY.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12, ease: EASE }}
              >
                <Tilt max={8} radius="rounded-3xl" className="h-full">
                  <div
                    className="group h-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-orange-300 hover:shadow-xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="mb-4 text-slate-800 transition-colors duration-300 group-hover:text-orange-500"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <DrawCheck />
                    </div>
                    <div style={{ transform: "translateZ(24px)" }}>
                      <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900">
                        {w.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {w.text}
                      </p>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center lg:col-span-5">
            <div data-speed="0.12" className="w-full max-w-[320px] sm:max-w-md lg:max-w-none">
              <div className="float-y">
                <Image
                  src="/images/about/why-choosen-us-1.png"
                  alt="Why Choose Us illustration"
                  width={600}
                  height={450}
                  className="h-auto max-h-[300px] w-full object-contain sm:max-h-[380px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 8. "LET'S TALK" RING
// ========================================================
const CTA_RING = "LET'S TALK • LET'S TALK • LET'S TALK • ";

function LetsTalkRing() {
  const reduce = useReducedMotion();

  return (
    <Magnetic strength={0.25}>
      <Link
        href={CONTACT_HREF}
        aria-label="Contact us"
        className="group relative flex h-36 w-36 items-center justify-center rounded-full bg-[#ff9b06] text-[#111827] shadow-[0_20px_60px_-15px_rgba(255,155,6,0.6)] transition-transform duration-300 hover:scale-105 sm:h-44 sm:w-44 lg:h-52 lg:w-52"
      >
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          aria-hidden
        >
          <defs>
            <path
              id="wm-cta-ring"
              d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            />
          </defs>
          <text fontSize="13" fontWeight="800" fill="#111827" letterSpacing="2">
            <textPath href="#wm-cta-ring" textLength="495" lengthAdjust="spacing">
              {CTA_RING}
            </textPath>
          </text>
        </motion.svg>
        <ArrowUpRight className="relative h-10 w-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-12 sm:w-12" />
      </Link>
    </Magnetic>
  );
}
