"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const locations = [
  {
    country: "Bangladesh (HQ)",
    city: "Agrabad, Chittagong",
    address: "Agrabad, Chittagong, Bangladesh",
    timezone: "GMT+6 (BST)",
    role: "Core Development & Engineering Operations",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EXEcESzIjsPBJxoKJTp1kPKc0NfGip7cVHiXehlUjA5Cy5V8hD-wMQE&s=10",
    coords: { top: "52%", left: "72%" },
    highlight: "Primary Port & Tech Engineering Center",
    latLong: "22.3569° N, 91.7832° E",
  },
  {
    country: "United States",
    city: "Miami, Florida",
    address: "Miami, Florida, United States",
    timezone: "EST / EDT",
    role: "Client Strategy & US Relations",
    image: "https://cdn.britannica.com/83/94183-050-53135403/Miami-skyline.jpg",
    coords: { top: "45%", left: "28%" },
    highlight: "Strategic Operations & Client Success",
    latLong: "25.7617° N, 80.1918° W",
  },
];

export default function OurLocation() {
  const [activeLocation, setActiveLocation] = useState(0);

  return (
    <section className=" bg-zinc-950    text-white p-5 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header (Cleanly Placed Outside Map Box) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Globe className="w-3.5 h-3.5 animate-spin-slow" />
            Global Presence & Hubs
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight   mb-4">
            Where we <span className="text-orange-500">operate</span>
          </h2>
          <p className="text-zinc-200 text-base md:text-lg">
            Bridging top-tier engineering talent in Agrabad's commercial port
            center with strategic client operations in Florida.
          </p>
        </div>

        {/* Interactive World Map Container */}
        <div className="relative w-full bg-zinc-950 rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl border border-zinc-800 mb-12 text-white">
          {/* Subtle Grid Pattern & Glow Accents */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Map Header Status Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4   border-b border-zinc-800/80 pb-6 relative z-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                Active Global Network Nodes
              </span>
            </div>
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-mono text-orange-400">
              <Sparkles className="w-3.5 h-3.5" />
              Selected: {locations[activeLocation].city}
            </div>
          </div>

          <div className="relative w-full h-[360px] md:h-[460px] flex items-center justify-center">
            {/* Animated Connection Arc SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
              viewBox="0 0 1000 500"
              fill="none"
            >
              <motion.path
                d="M 280 225 Q 500 80 720 260"
                stroke="url(#grad)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="60%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Interactive Map Pins with Image Tooltips */}
            {locations.map((loc, idx) => {
              const isActive = activeLocation === idx;

              return (
                <div
                  key={idx}
                  className="absolute cursor-pointer group z-20"
                  style={{ top: loc.coords.top, left: loc.coords.left }}
                  onClick={() => setActiveLocation(idx)}
                >
                  {/* Outer Pulsing Ring */}
                  <span className="absolute -inset-4 rounded-full bg-orange-500/30 animate-ping pointer-events-none" />

                  {/* Pin Button */}
                  <div
                    className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isActive
                        ? "bg-gradient-to-tr from-orange-500 to-amber-400 text-white scale-125 shadow-orange-500/50 ring-4 ring-orange-500/25"
                        : "bg-zinc-900 text-zinc-400 border border-zinc-700 hover:border-orange-500/50 hover:text-white"
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>

                  {/* Floating Mini Preview Card on Map */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute  left-1/2 -translate-x-1/2 w-60 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl p-3 shadow-2xl pointer-events-none overflow-hidden"
                  >
                    <div className="relative h-32 w-full rounded-xl overflow-hidden mb-2">
                      <Image
                        fill
                        unoptimized
                        src={loc.image}
                        alt={loc.city}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                        {loc.country}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mb-0.5">
                      {loc.city}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      {loc.latLong}
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* Bottom Watermark */}
            <div className="absolute bottom-4 left-6 text-xs text-zinc-500 font-mono tracking-widest uppercase z-10 hidden sm:block">
              {/* // Web Mung Global Node Network */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
