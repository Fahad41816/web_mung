"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Cpu,
  Gamepad2,
  Smartphone,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const Service = () => {
  const handleWhatsAppRedirect = (serviceName: string) => {
    const message = encodeURIComponent(
      `Hello Web Mung, I would like to learn more about your ${serviceName} service.`,
    );
    window.open(`https://wa.me/8801800000000?text=${message}`, "_blank");
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#2B303A] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#FF652F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF652F]/10 border border-[#FF652F]/20 text-[#FF652F] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Core Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B303A] tracking-tight mb-4"
          >
            Services we offer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-600 font-normal leading-relaxed"
          >
            From robust web architecture to intelligent AI automation, we build
            scalable software solutions that drive growth.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CARD 1 (Tall Left): Web Development */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
          >
            <div>
              <div className="relative w-full h-[240px] sm:h-[280px] rounded-2xl overflow-hidden mb-6 bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
                  alt="Web Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="flex items-center gap-2 mb-2 text-[#FF652F]">
                <Code2 className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Full-Stack Tech
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#2B303A] mb-3 group-hover:text-[#FF652F] transition-colors">
                Web Development
              </h3>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 font-normal">
                High-performance, scalable web applications, SaaS platforms, and
                e-commerce portals built with Next.js, React, Node.js, and
                modern cloud architecture.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => handleWhatsAppRedirect("Web Development")}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#2B303A] hover:text-[#FF652F] transition-colors cursor-pointer group/btn"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              {/* Client rating snippet */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF652F] text-[10px] text-white font-bold flex items-center justify-center border border-white">
                    W
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#4ECDC4] text-[10px] text-white font-bold flex items-center justify-center border border-white">
                    M
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#2B303A] text-[10px] text-white font-bold flex items-center justify-center border border-white">
                    F
                  </span>
                </div>
                <div className="text-xs font-semibold text-gray-700">
                  <span className="text-amber-500">★ 5.0</span> over 50+
                  projects
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN STACK */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* CARD 2 (Top Right): App Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-[200px] sm:h-[180px] rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop"
                  alt="App Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[#4ECDC4]">
                    <Smartphone className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Mobile Solutions
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B303A] mb-2 group-hover:text-[#FF652F] transition-colors">
                    App Development
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Cross-platform and native mobile applications crafted with
                    smooth UI, robust backend integration, and optimal
                    performance for iOS and Android.
                  </p>
                </div>

                <button
                  onClick={() => handleWhatsAppRedirect("App Development")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#2B303A] hover:text-[#FF652F] transition-colors cursor-pointer group/btn self-start"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* CARD 3 (Middle Right): AI Automation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-[200px] sm:h-[180px] rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
                  alt="AI Automation"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-purple-600">
                    <Cpu className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Intelligent Systems
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B303A] mb-2 group-hover:text-[#FF652F] transition-colors">
                    AI Automation
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Custom AI agents, automated LLM workflows, and smart data
                    pipelines designed to streamline business operations and
                    eliminate manual hours.
                  </p>
                </div>

                <button
                  onClick={() => handleWhatsAppRedirect("AI Automation")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#2B303A] hover:text-[#FF652F] transition-colors cursor-pointer group/btn self-start"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* CARD 4 (Bottom Right): Game Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative w-full h-[200px] sm:h-[180px] rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
                  alt="Game Development"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-amber-500">
                    <Gamepad2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Interactive Entertainment
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B303A] mb-2 group-hover:text-[#FF652F] transition-colors">
                    Game Development
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Engaging 2D/3D games and interactive virtual experiences
                    built with high-performance game engines, immersive
                    mechanics, and clean code.
                  </p>
                </div>

                <button
                  onClick={() => handleWhatsAppRedirect("Game Development")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#2B303A] hover:text-[#FF652F] transition-colors cursor-pointer group/btn self-start"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
