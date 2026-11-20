"use client";

// --- MISSION & VISION ---

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CountUp, EASE, Eyebrow, H2, SECTION_Y } from "./animations";

const STATS = [
  { to: 12, suffix: "+", label: "Happy clients", dot: "bg-orange-300" },
  { to: 30, suffix: "-day", label: "Money-back guarantee", dot: "bg-[#a5b4fc]" },
  { to: 4, suffix: "", label: "Step clear process", dot: "bg-teal-300" },
];

// ========================================================
// 4. MISSION & VISION
// ========================================================
export function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const missionOpacity = useTransform(scrollYProgress, [0.4, 0.58], [1, 0]);
  const visionOpacity = useTransform(scrollYProgress, [0.4, 0.58], [0, 1]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-14, 0, 14]);

  return (
    <section className={`relative ${SECTION_Y}`}>
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-12">
          <div
            className="sticky top-28 hidden self-start lg:col-span-6 lg:block"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{ rotateY, transformStyle: "preserve-3d" }}
              className="relative mx-auto h-[460px] w-full max-w-[470px]"
            >
              <motion.div
                style={{ opacity: missionOpacity }}
                className="hero-clip-right absolute inset-0 overflow-hidden bg-slate-100 shadow-xl"
              >
                <Image
                  src="/images/about/mission.jpg.jfif"
                  alt="Our Mission"
                  fill
                  sizes="470px"
                  className="object-cover object-center"
                />
              </motion.div>
              <motion.div
                style={{ opacity: visionOpacity }}
                className="hero-clip-right absolute inset-0 overflow-hidden bg-slate-100 shadow-xl"
              >
                <Image
                  src="/images/about/vission.jpg.jfif"
                  alt="Our Vision"
                  fill
                  sizes="470px"
                  className="object-cover object-center"
                />
              </motion.div>

              <motion.span
                style={{ opacity: missionOpacity, transform: "translateZ(60px)" }}
                className="absolute -left-3 bottom-8 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-[#111827] shadow-xl"
              >
                Mission
              </motion.span>
              <motion.span
                style={{ opacity: visionOpacity, transform: "translateZ(60px)" }}
                className="absolute -left-3 bottom-8 rounded-full bg-[#111827] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white shadow-xl"
              >
                Vision
              </motion.span>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col justify-center py-10 lg:min-h-[85vh]">
              <div className="hero-clip-right relative mb-8 h-[240px] w-full max-w-[400px] overflow-hidden bg-slate-100 shadow-lg sm:h-[320px] lg:hidden">
                <Image
                  src="/images/about/mission.jpg.jfif"
                  alt="Our Mission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
              <Eyebrow>Our Mission &amp; Vision</Eyebrow>
              <h2 className={`mb-6 ${H2}`}>Our Mission</h2>
              <p className="mb-10 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Our mission is to help businesses turn their ideas into impactful digital solutions that drive growth, improve efficiency, and create lasting value. At Web <span className="font-extrabold text-[#ff9b06]">Mung</span>, we combine strategic thinking, modern technology, and user-focused design to develop reliable, scalable solutions aligned with our clients’ business objectives. We aim to build meaningful partnerships by delivering quality, transparency, and measurable value at every stage of the digital journey
              </p>

              <div className="flex flex-wrap items-start gap-8 sm:gap-12">
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col items-start">
                    <div className="relative inline-flex items-center">
                      <motion.span
                        aria-hidden
                        initial={{ scale: 0.4, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 0.9 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className={`absolute -left-2.5 -top-1 h-9 w-9 rounded-full sm:h-11 sm:w-11 ${s.dot}`}
                      />
                      <span className="relative z-10 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                        <CountUp to={s.to} suffix={s.suffix} />
                      </span>
                    </div>
                    <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center py-10 lg:min-h-[85vh]">
              <div className="hero-clip-right relative mb-8 h-[240px] w-full max-w-[400px] overflow-hidden bg-slate-100 shadow-lg sm:h-[320px] lg:hidden">
                <Image
                  src="/images/about/vission.jpg.jfif"
                  alt="Our Vision"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
              <h2 className={`mb-6 ${H2}`}>Our Vision</h2>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Our vision is to become a trusted digital technology partner for businesses seeking sustainable growth and long-term success. We aspire to bridge the gap between business challenges and technological opportunities by creating innovative digital experiences that help organizations adapt, compete, and thrive in an evolving digital world. Through continuous learning, creative problem-solving, and a commitment to excellence, we aim to make technology a powerful driver of business progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
