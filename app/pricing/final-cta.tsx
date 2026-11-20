"use client";

// --- FINAL CTA ("Talk to Our Team" / Build Your Next Digital Experience) ---
// Avatars for the chat card are shared from ./banner (no duplicated data).

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Folder,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { users } from "./banner";
import { MovingBorderButton, handleContact } from "./animations";

export default function FinalCtaSection() {
  return (
    <section className="mt-28 sm:mt-36 pt-4 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg:col-span-5 flex flex-col items-start"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#111827] tracking-tight leading-[1.14]">
            Build Your Next Digital Experience with
            WEB <span className=" text-[#ff9b06]">MUNG</span>
          </h2>
          <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
           Turn your ideas into powerful digital solutions. Explore our services and find the right plan to bring your business vision to life.
          </p>

          <div className="mt-8">
            <MovingBorderButton
              borderRadius="1.75rem"
              containerClassName="h-14 w-auto"
              className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 px-8 text-base font-semibold hover:bg-slate-50 transition-colors"
              onClick={() =>
                handleContact("Final CTA")
              }
            >
              <span className="flex items-center gap-2">
                Talk to Our Team
                <ArrowRight className="w-4 h-4" />
              </span>
            </MovingBorderButton>
          </div>
        </motion.div>

        {/* Right UI Preview Grid (2-column masonry matching image) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="lg:col-span-7 relative"
        >
          <div className="relative max-h-[560px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5 items-start">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                {/* Card 1: Miniature Pricing Table */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                      Simple Pricing
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Per project
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-3 text-center border-b border-slate-100">
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-medium">Starter</p>
                      <p className="text-xs font-bold text-[#111827]">৳10k+</p>
                    </div>
                    <div className="p-1.5 rounded-lg bg-emerald-100  border border-indigo-100">
                      <p className="text-[9px] text-indigo-500 font-semibold">Standard</p>
                      <p className="text-xs font-bold text-[#111827]">৳30k+</p>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100">
                      <p className="text-[9px] text-slate-400 font-medium">Custom</p>
                      <p className="text-xs font-bold text-[#111827]">Value-based</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-2.5 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-slate-800 stroke-[2.5]" />
                      <span>Custom UI/UX & Responsive</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-slate-800 stroke-[2.5]" />
                      <span>Next.js 15 & Motion</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-slate-800 stroke-[2.5]" />
                      <span>Analytics & SEO Ready</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Split Gradient + Details Form */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 xs:grid-cols-2 gap-3">
                  {/* Left: Aesthetic Gradient Box */}
                  <div className="rounded-xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-200 p-3 flex flex-col justify-between text-white min-h-[175px] relative overflow-hidden shadow-inner">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center" />
                    <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-white/90">
                          Free consultation
                        </span>
                      </div>
                      <p className="text-[10px] font-medium leading-tight text-white">
                        Tell us your idea
                      </p>
                    </div>
                  </div>

                  {/* Right: Clean Details Form */}
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <p className="text-[11px] font-bold text-[#111827] uppercase tracking-wider mb-2">
                        Details
                      </p>
                      <div className="space-y-1.5">
                        <div className="h-6 rounded-md bg-slate-50 border border-slate-200/80 px-2 flex items-center text-[10px] text-slate-400">
                          Name...
                        </div>
                        <div className="h-6 rounded-md bg-slate-50 border border-slate-200/80 px-2 flex items-center text-[10px] text-slate-400">
                          Email address...
                        </div>
                        <div className="h-6 rounded-md bg-slate-50 border border-slate-200/80 px-2 flex items-center text-[10px] text-slate-400">
                          Project scope...
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-2 py-1.5 rounded-lg bg-[#111827] text-white text-[10px] font-semibold tracking-wide hover:bg-slate-800 transition-colors">
                      Submit
                    </button>
                  </div>
                </div>

                {/* Card 3: Code & Architecture Integration Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                      <span className="text-xs font-semibold text-slate-800">
                        components/cta-block.tsx
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      Production Ready
                    </span>
                  </div>
                  <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-[10px] text-slate-300 overflow-x-hidden">
                    <span className="text-purple-400">export default</span>{" "}
                    <span className="text-blue-400">function</span>{" "}
                    <span className="text-yellow-300">CTABlock</span>() &#123;
                    <br />
                    <span className="text-slate-500">
                      &nbsp;&nbsp;// Web <span>Mung</span> scalable design
                    </span>
                    <br />
                    &nbsp;&nbsp;<span className="text-pink-400">return</span> &lt;
                    <span className="text-indigo-400">HighConversionHero</span>{" "}
                    /&gt;;
                    <br />
                    &#125;
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">
                {/* Card 4: 3 Feature Pillars with Round Icons */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow grid grid-cols-3 gap-2 text-center">
                  <div className="p-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-1.5 text-slate-700">
                      <Shield className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Secure</p>
                    <p className="text-[9px] text-slate-400">Enterprise grade</p>
                  </div>
                  <div className="p-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-1.5 text-orange-300">
                      <Zap className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Fast</p>
                    <p className="text-[9px] text-slate-400">Sub-second load</p>
                  </div>
                  <div className="p-2">
                    <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-1.5 text-emerald-300">
                      <Users className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Scalable</p>
                    <p className="text-[9px] text-slate-400">Built to grow</p>
                  </div>
                </div>

                {/* Card 5: Interactive Chat Conversation Card */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2.5">
                  {/* Message 1 */}
                  <div className="flex items-end gap-2">
                    <img
                      src={users[0].image}
                      alt="Avatar"
                      loading="lazy"
                      decoding="async"
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-slate-100 text-slate-700 text-xs px-3.5 py-2 rounded-2xl rounded-bl-sm max-w-[170px] xs:max-w-[210px] leading-relaxed">
                      Hey! Are you free for a quick call?
                    </div>
                  </div>

                  {/* Message 2 */}
                  <div className="flex items-end justify-end gap-2">
                    <div className="bg-[#EEF2FF] text-[#3730A3] text-xs px-3.5 py-2 rounded-2xl rounded-br-sm max-w-[170px] xs:max-w-[210px] leading-relaxed">
                      Sure, give me 5 minutes!
                    </div>
                    <img
                      src={users[1].image}
                      alt="Avatar"
                      loading="lazy"
                      decoding="async"
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                  </div>

                  {/* Message 3 */}
                  <div className="flex items-end gap-2">
                    <img
                      src={users[2].image}
                      alt="Avatar"
                      loading="lazy"
                      decoding="async"
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="bg-slate-100 text-slate-700 text-xs px-3.5 py-2 rounded-2xl rounded-bl-sm max-w-[170px] xs:max-w-[210px] leading-relaxed">
                      Sounds great!
                    </div>
                  </div>

                  {/* Message 4 */}
                  <div className="flex items-end justify-end gap-2">
                    <div className="bg-[#EEF2FF] text-[#3730A3] text-xs px-3.5 py-2 rounded-2xl rounded-br-sm max-w-[170px] xs:max-w-[210px] leading-relaxed">
                      Let&apos;s launch your site this week.
                    </div>
                    <img
                      src={users[3].image}
                      alt="Avatar"
                      loading="lazy"
                      decoding="async"
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                  </div>
                </div>

                {/* Card 6: "All over the world" Card with Globe Arc */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative">
                  <h4 className="text-sm font-bold text-[#111827]">All over the world</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-[220px]">
                    Empowering founders and modern businesses across 15+ countries.
                  </p>

                  {/* Stylized Globe Wireframe Graphic */}
                  <div className="w-full h-20 relative mt-3 flex items-center justify-center overflow-hidden">
                    <div className="w-48 h-48 rounded-full border border-slate-200/90 bg-gradient-to-b from-slate-100/70 to-slate-50/20 absolute -bottom-24 flex items-center justify-center shadow-inner">
                      <div className="w-36 h-36 rounded-full border border-dashed border-slate-300/70" />
                      <div className="w-24 h-24 rounded-full border border-slate-200" />
                      <div className="w-12 h-12 rounded-full border border-slate-200/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
