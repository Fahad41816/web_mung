"use client";

// --- FAQ ---

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CONTACT_HREF, GRAD, H2, SECTION_Y, Magnetic } from "./animations";

const FAQS = [
  {
    question: "What services does Web Mung provide?",
    answer:
      "We specialize in full-stack web application development, custom website design, cloud infrastructure integration, SaaS architecture, and ongoing technical maintenance.",
  },
  {
    question: "What technologies and frameworks do you build with?",
    answer:
      "Our primary stack includes Next.js, React, TypeScript, Node.js, and modern CSS/Tailwind. We write clean, strictly-typed code with scalable architectures and zero bloat.",
  },
  {
    question: "How does your project development process work?",
    answer:
      "We work in collaborative, weekly sprints. From discovery and technical roadmap planning to milestone reviews and final deployment, you receive clear progress updates and direct access to our engineers.",
  },
  {
    question: "How long does a typical web application take to build?",
    answer:
      "It depends on the plan and the scope. We share a clear timeline in your proposal before the project starts, and you can follow progress on a staging site while we build.",
  },
  {
    question: "Do you offer ongoing maintenance and support after launch?",
    answer:
      "Yes, we provide flexible ongoing support plans covering speed optimization, security updates, server monitoring, bug fixes, and continuous feature expansion.",
  },
  {
    question: "How do we get started with a new project?",
    answer:
      "You can click the Contact Us button or reach out through our contact page. We'll schedule a discovery call to understand your goals, timeline, and budget, and provide a transparent project proposal.",
  },
];

// ========================================================
// 7. FAQ
// ========================================================
export function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className={`relative ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start text-left lg:sticky lg:top-28 lg:col-span-5">
            <h2 className={H2}>
              FAQ&apos;<span className={GRAD}>s</span>
            </h2>
            <p className="mb-4 mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base">
              Find quick answers about our services, tech stack, development workflow, and ongoing technical support.
            </p>

            <div className="relative mb-8 h-[180px] w-full max-w-sm sm:h-[240px]">
              <Image
                src="/images/about/FAQ.png"
                alt="Web Mung FAQ illustration"
                fill
                className="object-contain object-left"
              />
            </div>

            <h3 className="mb-2 text-lg font-bold text-[#111827] sm:text-2xl">
              Still Have A Question?
            </h3>
            <p className="mb-6 max-w-xs text-xs text-slate-500 sm:text-sm">
              Can&apos;t find what you&apos;re looking for? Reach out to our engineering team directly.
            </p>
            <Magnetic>
              <Link
                href={CONTACT_HREF}
                className="inline-flex items-center justify-center rounded-full bg-[#111827] px-6 py-3 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#5770D1] sm:px-8 sm:py-3.5 sm:text-sm"
              >
                Contact Us
              </Link>
            </Magnetic>
          </div>

          <div className="w-full divide-y divide-slate-200 border-y border-slate-200 lg:col-span-7">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-[#111827] transition-colors hover:text-[#ff9b06] sm:py-5 sm:text-lg"
                  >
                    <span className="flex items-start gap-4">
                      <span className="mt-1 text-xs font-bold text-slate-300 transition-colors group-hover:text-orange-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{faq.question}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-slate-700"
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-8 pr-4 text-xs leading-relaxed text-slate-500 sm:pl-9 sm:pr-6 sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
