"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

const workSteps = [
  {
    number: "01",
    title: "DISCOVERY",
    description:
      "We listen first. We research your goals, target audience, and requirements to find the best custom technical solution.",
    tags: [
      "Deep-Dive Workshop",
      "Audience Profiling",
      "Competitor Audit",
      "Goal Definition",
    ],
  },
  {
    number: "02",
    title: "STRATEGY",
    description:
      "We plan ahead. We build a clear architecture roadmap, design system, and technical blueprint to guide the whole build.",
    tags: [
      "Creative Direction",
      "Concept Development",
      "Strategic Roadmap",
      "Core Messaging",
    ],
  },
  {
    number: "03",
    title: "EXECUTION",
    description:
      "We build fast. We design and develop your custom web application in short, transparent sprints with clean code.",
    tags: [
      "Design Sprints",
      "Asset Production",
      "Review Rounds",
      "Quality Control",
    ],
  },
  {
    number: "04",
    title: "HANDOFF",
    description:
      "You take control. We transfer ownership, configure your production server/domain, and provide complete team training.",
    tags: [
      "Final Delivery",
      "Team Training",
      "Implementation Guides",
      "Post-Launch Support",
    ],
  },
];

export default function OurWorkFlowWithYou() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fcfbf9] to-[#f4f1ea] text-zinc-900 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Our Process
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              How we work <span className="text-orange-500">with you</span>
            </h2>
          </div>
          <p className="text-zinc-600 max-w-md text-sm md:text-base">
            A transparent, milestone-driven development process designed to take
            you seamlessly from concept to launch-ready digital product.
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {workSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Card Header: Number & Title */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-700 border border-zinc-200">
                    [ {step.number} ]
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider text-orange-600">
                    [ {step.title} ]
                  </span>
                </div>

                {/* Description */}
                <p className="text-zinc-600 text-base leading-relaxed mb-8">
                  {step.description}
                </p>
              </div>

              {/* Sub-tags Footer */}
              <div className="pt-6 border-t border-zinc-100">
                <div className="grid grid-cols-2 gap-2">
                  {step.tags.map((tag, tagIdx) => (
                    <div
                      key={tagIdx}
                      className="flex items-center gap-2 text-xs text-zinc-500 font-medium"
                    >
                      <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Call-to-Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative bg-zinc-900 text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl"
        >
          {/* Animated Gradient Glow Accent */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-400 text-xs font-semibold mb-4 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-3.5 h-3.5" /> Ready to build your
                project?
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Let's turn your vision into a high-performing web application.
              </h3>
              <p className="text-zinc-400 text-sm md:text-base">
                Book a direct strategy call with our lead engineers to map out
                your architecture and timeline.
              </p>
            </div>

            {/* Interactive Animated Button */}
            <motion.a
              href="#contact" // Replace with your Calendly or booking route/link
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer group whitespace-nowrap"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Book a free discovery call</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
