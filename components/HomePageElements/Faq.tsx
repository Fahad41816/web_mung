"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Plus, X } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    question: "What does your agency specialize in?",
    answer:
      "We specialize in engineering custom full-stack web applications, scalable SaaS platforms, and modern digital experiences using Next.js, React, Node.js, and custom cloud architectures—with zero bloated page builders.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes! We partner with ambitious founders and startups to turn raw ideas into high-performing, launch-ready MVPs through rapid, milestone-driven sprints.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Depending on the complexity, standard custom web applications or MVPs typically range from 3 to 6 weeks from our initial discovery workshop to final production handoff.",
  },
  {
    question: "Can you integrate AI or Web3 into my existing product?",
    answer:
      "Absolutely. We build custom AI agent workflows, automated pipelines, smart contracts, and secure backend integrations seamlessly into existing systems.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Just your vision, business goals, and any reference materials or wireframes you have. We guide you through a deep-dive discovery workshop to handle the complete technical blueprint.",
  },
  {
    question: "How do you ensure code quality and performance?",
    answer:
      "We write clean, scalable custom code optimized for lightning-fast Core Web Vitals, rigorous testing, secure server configurations, and 100% code ownership for your team.",
  },
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0); // First item open by default

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f4f1ea] to-[#fcfbf9] text-zinc-900 relative overflow-hidden">
      {/* Background Glow Accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            FAQs
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
        </div>

        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Support & Call Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white/90 backdrop-blur-md border border-zinc-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Avatar / Badge */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-0.5 mb-6 shadow-md shadow-orange-500/20">
                  <div className="w-full h-full bg-zinc-900 rounded-[14px] flex items-center justify-center text-white font-bold text-lg">
                    WM
                  </div>
                </div>

                <h3 className="text-2xl font-bold tracking-tight text-zinc-900 mb-2">
                  Book a 15 min call
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mb-8">
                  If you have any specific questions or want to discuss your
                  architecture, just book a quick call with our lead engineers.
                </p>
              </div>

              {/* Action Button */}
              <motion.a
                href="#contact" // Replace with your Calendly or booking URL
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Free Call</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-8 space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border rounded-3xl transition-all overflow-hidden ${
                    isOpen
                      ? "bg-white border-orange-500/40 shadow-md ring-1 ring-orange-500/20"
                      : "bg-white/70 border-zinc-200/80 hover:border-zinc-300 shadow-sm"
                  }`}
                >
                  {/* Question Header Button */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`font-semibold text-base md:text-lg transition-colors ${isOpen ? "text-orange-600" : "text-zinc-900"}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform shrink-0 ${
                        isOpen
                          ? "bg-orange-500 text-white rotate-90"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {isOpen ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Answer Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-zinc-600 text-sm md:text-base leading-relaxed border-t border-zinc-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
