"use client";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
const WhyUsSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Discovery", desc: "Aligning on goals & scope" },
    { title: "Architecture", desc: "Designing custom stack" },
    { title: "Development", desc: "Clean code & sprints" },
    { title: "Launch", desc: "Deployment & scaling" },
  ];

  return (
    <section className="py-24 bg-black text-white rounded-4xl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why Companies Choose Web <span className="text-[#F87D33]">Mung</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Engineering digital platforms built for performance, scale, and
            long-term business growth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Personalized Support */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Personalized Support
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Work directly with dedicated architects and engineers who
                understand your exact business logic.
              </p>
            </div>
            {/* Micro-interaction visual preview */}
            <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-zinc-900 flex items-center justify-center text-xs font-bold">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-zinc-900 flex items-center justify-center text-xs font-bold">
                  FM
                </div>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                Direct Slack & Meeting Access
              </span>
            </div>
          </motion.div>

          {/* Card 2: Step-by-Step Workflow (Interactive State) */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-2 bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Transparent Process
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Stay updated with crystal-clear timelines, regular sprint
                reviews, and open communication channels.
              </p>
            </div>

            {/* Interactive Timeline Widget */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    activeStep === idx
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                      : "bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="text-xs font-mono mb-1">0{idx + 1}</div>
                  <div className="font-medium text-sm text-white">
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Measurable Impact / ROI Chart */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="md:col-span-3 bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Measurable Impact</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We track performance metrics, conversion rates, and ROI
                milestones at every stage to ensure lasting business success.
              </p>
            </div>

            {/* Animated Bar Bars */}
            <div className="flex items-end gap-2 h-24 p-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/60 w-full md:w-auto">
              {[40, 65, 50, 85, 60, 95, 100].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 20 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-4 bg-gradient-to-t from-orange-600 to-indigo-400 rounded-t-md"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
