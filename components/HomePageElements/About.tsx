"use client";

import { motion } from "framer-motion";
import { Award, Rocket, Users } from "lucide-react";
import Image from "next/image";

const About = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#2B303A] overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#FF652F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4ECDC4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF652F]/10 border border-[#FF652F]/20 text-[#FF652F] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Rocket className="w-3.5 h-3.5" />
            About Web Mung
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B303A] tracking-tight mb-4"
          >
            About Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal"
          >
            A forward-thinking tech company in Bangladesh delivering modern,
            scalable, and high-impact software solutions that drive digital
            transformation.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* COLUMN 1: Large Team Image + Dark Stat Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Top Team Card */}
            <div className="relative group overflow-hidden rounded-3xl shadow-lg shadow-black/5 bg-white border border-gray-100 h-[280px] sm:h-[320px] transition-all duration-300 hover:shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                alt="Web Mung Team Collaborating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom Dark Stat Banner */}
            <div className="bg-[#2B303A] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex items-center justify-around border border-gray-800">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#4ECDC4] mb-1">
                  50+
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium">
                  Projects Delivered
                </div>
              </div>

              <div className="w-[1px] h-12 bg-gray-700/60" />

              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#FF652F] mb-1">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 2: Light Purple Accent Card + Code/Laptop Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 h-full"
          >
            {/* Top Card: Empowering Businesses */}
            <div className="bg-gradient-to-br from-[#E2E0FF] via-[#ECE9FF] to-[#F5F3FF] p-8 rounded-3xl border border-purple-100 flex-1 flex flex-col justify-center text-center shadow-sm">
              <div className="w-10 h-10 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-700">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2B303A] mb-3">
                Empowering Businesses
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xs mx-auto">
                We build innovative technology solutions that create long-term
                value and give companies a sustainable competitive advantage.
              </p>
              <div className="relative group overflow-hidden rounded-3xl shadow-lg shadow-black/5 bg-white border border-gray-100 h-[220px] sm:h-[240px] transition-all duration-300 hover:shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop"
                  alt="Developer working on laptop"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Bottom Laptop Image */}
          </motion.div>

          {/* COLUMN 3: Blue Gradient Panel with Top Image & Bottom Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-[#D2F1FE] via-[#E2F5FF] to-[#EFF8FF] p-6 rounded-3xl border border-sky-100 flex flex-col justify-between shadow-sm h-full"
          >
            {/* Top Image */}
            <div className="relative group overflow-hidden rounded-2xl h-[220px] sm:h-[240px] mb-6 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                alt="Team members joining hands"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Bottom Description */}
            <div className="text-center px-2 pb-2">
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-700">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#2B303A] mb-3">
                Proven, Reliable & Responsive Team
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                A skilled team with a strong track record, agile development
                workflow, 24/7 support, and dependable maintenance—ensuring
                smooth, successful project delivery.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
