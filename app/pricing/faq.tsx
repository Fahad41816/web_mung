"use client";

// --- FAQ ---

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { MovingBorderButton, handleContact } from "./animations";

// --- FAQ DATA (Web Mung Specific) ---
const FAQS = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, for our Standard plan we offer a 30-day free trial. We will provide you with a fully functional staging environment so you can review the design and development before final payment.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely. As your business grows, you can easily upgrade from Starter to Standard or Enterprise. We will simply adjust the scope of work and provide a new proposal for the difference in cost.",
  },
  {
    // TODO: make sure this matches the terms of your 30-day money-back guarantee badge.
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your project at any time. If you cancel during the design phase, you only pay for the work completed up to that milestone. The initial 50% deposit is non-refundable once development begins.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the plan and the scope. We share a clear timeline in your proposal before the project starts, and you can follow progress on a staging site while we build.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "Yes. We can include your company name, VAT/TIN number, and specific billing addresses on all official invoices. Just let us know your requirements before we send the final bill.",
  },
  {
    question: "How does billing and milestones work?",
    answer:
      "We require a 50% upfront deposit to kick off the project. The remaining 50% is due upon final review and approval of the completed website, right before we deploy it to your live domain.",
  },
  {
    question: "What happens after my website goes live?",
    answer:
      "Every plan includes post-launch support: 1 month on Starter, 2 months of maintenance on Standard, and extended priority support on Enterprise.",
  },
  {
    question: "Are there any hidden costs, domain, or hosting fees?",
    answer:
      "No hidden fees whatsoever. All our packages include complete domain and hosting configuration. Third-party hosting and domain renewals are billed directly to your own account so you retain 100% ownership.",
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="mt-28 sm:mt-36 pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading, Illustration & Contact Info */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0f172a] leading-[1.15]">
            FAQ&apos; <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">s</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed mt-3 mb-6 max-w-sm font-normal">
            Find quick answers about our pricing packages, development workflow, billing milestones, and ongoing technical support.
          </p>

          {/* FAQ-pricing Image */}
          <div className="relative w-full max-w-sm h-[200px] xs:h-[220px] sm:h-[260px] mb-8">
            <Image
              src="/images/about/FAQ-pricing.png"
              alt="Web Mung FAQ illustration"
              fill
              className="object-contain object-left"
            />
          </div>

          <div className="pt-2">
            <h3 className="text-lg sm:text-2xl font-bold text-[#0f172a] mb-2">
              Still Have A Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
              Can&apos;t find what you&apos;re looking for? Reach out to our engineering team directly.
            </p>
            <div className="flex items-center gap-3">
              <MovingBorderButton
                borderRadius="1.75rem"
                containerClassName="h-12 w-auto"
                className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-none px-5 text-sm font-semibold transition-colors duration-200"
                onClick={() => handleContact("FAQ WhatsApp")}
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </span>
              </MovingBorderButton>
            </div>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200 w-full">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-2">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-lg text-[#0f172a] hover:text-[#ff9b06] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <span className="shrink-0 text-slate-800">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-slate-700" />
                    ) : (
                      <Plus className="w-5 h-5 text-slate-700" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs sm:text-base text-slate-500 leading-relaxed pr-4 sm:pr-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
