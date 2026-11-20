"use client";

// --- WHO WE ARE ---

import { motion } from "framer-motion";
import Image from "next/image";
import { EASE, GRAD, H2, SECTION_Y, Eyebrow, ScrollWords, Tilt } from "./animations";

// ========================================================
// 2. WHO WE ARE
// ========================================================
export function WhoWeAre() {
  return (
    <section className={`relative ${SECTION_Y}`}>
      <div
        data-speed="0.3"
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl"
      />
      <div
        data-speed="0.2"
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="order-2 lg:order-1 lg:col-span-5"
          >
            <Tilt max={12} radius="rounded-[28px]" className="mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] w-full">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[28px] border-2 border-orange-400/80"
                  style={{ transform: "translate3d(16px, 16px, -40px)" }}
                />
                <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-slate-100 shadow-2xl">
                  <Image
                    src="/images/about/whoweare.jfif"
                    alt="Web Mung team collaboration and thoughtful planning"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </Tilt>
          </motion.div>

          <div className="order-1 flex flex-col items-start text-left lg:order-2 lg:col-span-7">
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className={`mb-6 ${H2}`}>
              Your Vision.{" "}
              <span className="relative isolate inline-block">
                Our Expertise.
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 -z-10 h-[6px] w-full rounded-full bg-orange-400"
                />
              </span>{" "}
              Built for <span className={GRAD}>Business Growth.</span>
            </h2>

            <ScrollWords
              className="mb-5 text-base leading-relaxed text-slate-700 sm:text-lg"
              text="At Web Mung, we help businesses turn ideas into powerful digital experiences that create real value. We partner with founders, startups, and growing companies to build custom web applications, high-performing websites, and technology solutions designed around their business goals. We believe great technology should do more than look good — it should solve problems, simplify operations, and create opportunities for growth. That's why we combine strategic thinking, modern development, and user-focused design to deliver solutions that are practical, scalable, and built for the future."
            />
            <p className="mb-8 text-sm leading-relaxed text-slate-500 sm:text-base">
              Beyond delivering projects, we believe in building lasting partnerships. From understanding your vision to bringing it to life, we work closely with you through transparent communication, thoughtful execution, and a commitment to quality. Your business deserves more than a service provider. It deserves a technology partner invested in your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
