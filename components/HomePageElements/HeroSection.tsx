"use client";

import AnimatedImg from "@/assets/Digital marketing social media and data analysis.svg";
import RobotAni from "@/assets/robot.svg";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Code2,
  Cpu,
  Globe,
  Headphones,
  Heart,
  Layers,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [robotArrived, setRobotArrived] = useState(false);
  const [targetOffset, setTargetOffset] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  const robotSlotRef = useRef<HTMLDivElement | null>(null);

  // Measure exact pixel delta from hero center to the robot's final destination slot
  const calculateTargetOffset = useCallback(() => {
    const heroEl = heroRef.current;
    const slotEl = robotSlotRef.current;
    if (!heroEl || !slotEl) return;

    const heroRect = heroEl.getBoundingClientRect();
    const slotRect = slotEl.getBoundingClientRect();

    // If the slot is hidden on smaller viewports (width === 0), skip to content right away
    if (slotRect.width === 0 || slotRect.height === 0) {
      setRobotArrived(true);
      return;
    }

    const heroCenterX = heroRect.left + heroRect.width / 2;
    const heroCenterY = heroRect.top + heroRect.height / 2;

    const slotCenterX = slotRect.left + slotRect.width / 2;
    const slotCenterY = slotRect.top + slotRect.height / 2;

    setTargetOffset({
      x: slotCenterX - heroCenterX,
      y: slotCenterY - heroCenterY,
    });
  }, []);

  useEffect(() => {
    calculateTargetOffset();
    window.addEventListener("resize", calculateTargetOffset);
    return () => window.removeEventListener("resize", calculateTargetOffset);
  }, [calculateTargetOffset]);

  // Content & other visuals animate in only after the robot reaches its exact spot
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.11,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 105, damping: 16 },
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2B303A] font-sans selection:bg-[#FF652F] selection:text-white relative overflow-hidden flex flex-col justify-between">
      {/* ================= AMBIENT ANIMATED GLOWS ================= */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute  top-[-12%] left-[-8%] w-[520px] h-[520px] bg-gradient-to-br from-[#FF652F]/20 via-[#4ECDC4]/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[18%] right-[-8%] w-[620px] h-[620px] bg-gradient-to-bl from-[#4ECDC4]/20 via-[#FF652F]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Subtle Radial Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2B303A 1.2px, transparent 1.2px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ================= MAIN HERO CONTAINER ================= */}
      <section
        ref={heroRef}
        className="relative pt-14 pb-16 md:pt-26 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-h-[640px] flex items-center justify-center"
      >
        {/* EXACT DESTINATION ANCHOR FOR THE ROBOT (Left Side) */}
        <div
          ref={robotSlotRef}
          aria-hidden="true"
          className="hidden lg:block absolute left-4 xl:left-8 top-[32%] w-56 h-56 xl:w-64 xl:h-64 pointer-events-none"
        />

        {/* ANIMATED ROBOT: Appears 1st in center, then glides along exact (x, y) to its spot */}
        {targetOffset && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              x: 0,
              y: 0,
              rotate: 0,
            }}
            animate={
              robotArrived
                ? {
                    opacity: 0.9,
                    scale: 1,
                    x: targetOffset.x,
                    y: [
                      targetOffset.y - 10,
                      targetOffset.y + 10,
                      targetOffset.y - 10,
                    ],
                    rotate: [-2, 2, -2],
                  }
                : {
                    opacity: [0, 1, 1, 0.9],
                    scale: [0.7, 1.25, 1.25, 1],
                    x: [0, 0, 0, targetOffset.x],
                    y: [0, 0, 0, targetOffset.y],
                    rotate: [0, 0, -4, -1],
                  }
            }
            transition={
              robotArrived
                ? {
                    y: { duration: 6.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: {
                      duration: 6.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    x: { duration: 0.2 },
                  }
                : {
                    duration: 1.55,
                    times: [0, 0.22, 0.45, 1],
                    ease: ["easeOut", "linear", [0.22, 1, 0.36, 1]],
                  }
            }
            onAnimationComplete={() => {
              if (!robotArrived) setRobotArrived(true);
            }}
            className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
          >
            <div className="relative w-56 h-56 xl:w-64 xl:h-64 drop-shadow-[0_22px_38px_rgba(78,205,196,0.28)]">
              <Image
                src={RobotAni}
                alt="Robot AI Automation Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        )}

        {/* FLOATING ELEMENT 1: Animated Tech Stack Pill (Top Left) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            robotArrived
              ? { opacity: 1, y: [-8, 8, -8], rotate: [-1, 1, -1] }
              : { opacity: 0, y: 16 }
          }
          transition={
            robotArrived
              ? {
                  opacity: { duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }
              : { duration: 0.2 }
          }
          className="hidden lg:flex items-center gap-3 absolute top-32 left-6 xl:left-12 bg-white/85 backdrop-blur-md px-4 py-3 rounded-2xl border border-gray-200/80 shadow-[0_12px_30px_-10px_rgba(43,48,58,0.12)] z-10"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2B303A] to-[#434A59] flex items-center justify-center text-white shadow-inner">
            <Code2 className="w-5 h-5 text-[#4ECDC4]" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold text-[#2B303A]">
                Full-Stack & AI
              </span>
              <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-ping" />
            </div>
            <p className="text-[11px] text-gray-500 font-medium">
              Next.js • React • Custom SaaS
            </p>
          </div>
        </motion.div>

        {/* FLOATING ELEMENT 2: Happy Customer & Growth Card (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            robotArrived
              ? { opacity: 1, y: [10, -10, 10], rotate: [1, -1, 1] }
              : { opacity: 0, y: 16 }
          }
          transition={
            robotArrived
              ? {
                  opacity: { duration: 0.5, delay: 0.1 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }
              : { duration: 0.2 }
          }
          className="hidden lg:flex items-center gap-3.5 absolute bottom-12 left-8 xl:left-16 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#FF652F]/20 shadow-[0_15px_35px_-10px_rgba(255,101,47,0.15)] z-10"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-[#FF652F]/15 flex items-center justify-center text-[#FF652F]">
              <Heart className="w-5 h-5 fill-[#FF652F] animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-[#4ECDC4] text-[#2B303A] text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white">
              +140%
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs font-extrabold text-[#2B303A] flex items-center gap-1">
              Happy Founders
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </p>
            <p className="text-[11px] text-gray-500 font-medium">
              99.4% 5-Star Delivery Rate
            </p>
          </div>
        </motion.div>

        {/* FLOATING ELEMENT 3: Animated Tech Orbit Icon (Top Right) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            robotArrived ? { opacity: 1, y: [8, -8, 8] } : { opacity: 0, y: 16 }
          }
          transition={
            robotArrived
              ? {
                  opacity: { duration: 0.5, delay: 0.08 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                }
              : { duration: 0.2 }
          }
          className="hidden lg:flex items-center gap-2.5 absolute top-32 right-8 xl:right-16 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#4ECDC4]/30 shadow-lg z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center text-[#2B303A]"
          >
            <Cpu className="w-4 h-4 text-[#FF652F]" />
          </motion.div>
          <span className="text-xs font-bold text-[#2B303A]">
            99.9% Uptime & Speed
          </span>
        </motion.div>

        {/* Right Side: Digital Marketing & Data Analysis Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 24 }}
          animate={
            robotArrived
              ? {
                  opacity: 0.9,
                  scale: 1,
                  x: 0,
                  y: [12, -12, 12],
                  rotate: [2, -2, 2],
                }
              : { opacity: 0, scale: 0.88, x: 24 }
          }
          transition={
            robotArrived
              ? {
                  opacity: { duration: 0.6 },
                  scale: { duration: 0.6 },
                  x: { type: "spring", stiffness: 110, damping: 18 },
                  y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                }
              : { duration: 0.2 }
          }
          className="hidden lg:block absolute right-4 xl:right-8 top-[30%] z-10 pointer-events-none"
        >
          <div className="relative w-56 h-56 xl:w-64 xl:h-64 drop-shadow-[0_20px_35px_rgba(255,101,47,0.2)]">
            <Image
              src={AnimatedImg}
              alt="Digital Marketing & Data Analysis Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* FLOATING ELEMENT 4: Employee Girl with Headphones Live Guide Widget (Bottom Right) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={
            robotArrived
              ? { opacity: 1, y: [-7, 7, -7] }
              : { opacity: 0, y: 16 }
          }
          transition={
            robotArrived
              ? {
                  opacity: { duration: 0.5, delay: 0.15 },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
                }
              : { duration: 0.2 }
          }
          whileHover={{ scale: 1.04 }}
          className="hidden lg:flex items-center gap-3.5 absolute bottom-10 right-6 xl:right-12 bg-white/95 backdrop-blur-md p-3.5 pr-5 rounded-2xl border border-gray-200/90 shadow-[0_20px_40px_-15px_rgba(43,48,58,0.18)] cursor-pointer z-20 group"
        >
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#FF652F] to-[#4ECDC4] opacity-40 group-hover:opacity-75 animate-ping" />
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#FF652F]/20 to-[#4ECDC4]/30 p-0.5 overflow-hidden border-2 border-white shadow-sm">
              <svg
                viewBox="0 0 64 64"
                className="w-full h-full rounded-full bg-[#FFF5F0]"
                fill="none"
              >
                <path
                  d="M16 32C16 19 23 12 32 12C41 12 48 19 48 32V46H16V32Z"
                  fill="#2B303A"
                />
                <path
                  d="M14 60C14 50 22 45 32 45C42 45 50 50 50 60"
                  fill="#FF652F"
                />
                <circle cx="32" cy="31" r="11" fill="#FCD5B5" />
                <circle cx="28.5" cy="30" r="1.3" fill="#2B303A" />
                <circle cx="35.5" cy="30" r="1.3" fill="#2B303A" />
                <path
                  d="M29 34.5C30.5 36.2 33.5 36.2 35 34.5"
                  stroke="#2B303A"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M21 28C23 21 31 19 42 25C41 18 35 15 30 15C24 15 20 21 21 28Z"
                  fill="#2B303A"
                />
                <path
                  d="M19 31C19 22 24.5 16 32 16C39.5 16 45 22 45 31"
                  stroke="#4ECDC4"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <rect
                  x="16.5"
                  y="27"
                  width="4.5"
                  height="9"
                  rx="2.2"
                  fill="#2B303A"
                />
                <rect
                  x="43"
                  y="27"
                  width="4.5"
                  height="9"
                  rx="2.2"
                  fill="#2B303A"
                />
                <path
                  d="M44 35C44 38 40 39 36 38.5"
                  stroke="#4ECDC4"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#2B303A]">
                Sarah • Project Guide
              </span>
              <div className="flex items-end gap-0.5 h-3">
                {[0.4, 1, 0.6, 0.9].map((h, idx) => (
                  <motion.span
                    key={idx}
                    animate={{ scaleY: [0.3, h, 0.3] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: idx * 0.15,
                    }}
                    className="w-0.5 h-full bg-[#FF652F] rounded-full origin-bottom"
                  />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-gray-600 font-medium mt-0.5">
              “Hi! Need a free project roadmap?”
            </p>
          </div>
        </motion.div>

        {/* ================= CENTER HERO CONTENT ================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={robotArrived ? "visible" : "hidden"}
          className="flex flex-col items-center text-center relative z-20 max-w-3xl mx-auto"
        >
          {/* Top Pill Badge */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-[#FF652F]/25 text-[#FF652F] text-xs sm:text-sm font-semibold mb-7 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#FF652F]" />
            <span>Transforming Ideas into Digital Magic</span>
           
          </motion.div>

          {/* Hero Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2B303A] leading-[1.08] mb-6"
          >
            Building bold brands <br className="hidden sm:inline" />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#FF652F] via-[#FF8552] to-[#4ECDC4] bg-clip-text text-transparent">
                with thoughtful design
              </span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  robotArrived
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
                viewBox="0 0 300 12"
                className="w-full h-3 -mt-1 text-[#4ECDC4]/60"
                fill="none"
              >
                <path
                  d="M2 9C75 3 225 3 298 9"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-base sm:text-lg text-[#2B303A]/75 leading-relaxed mb-10 font-normal"
          >
            At{" "}
            <strong className="text-[#2B303A] font-bold">
              Web <span className="text-[#FF652F]">Mung</span>
            </strong>
            , we empower ambitious startups and enterprises with high-performing
            web applications, AI automation, and custom digital experiences
            engineered for measurable growth.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
          >
            {/* Primary CTA Button: Call Us Now */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#DB6A2F] text-white font-semibold text-base rounded-full shadow-[0_14px_30px_-8px_rgba(43,48,58,0.4)] hover:bg-[#FF652F] hover:shadow-[0_14px_30px_-8px_rgba(255,101,47,0.5)] transition-colors duration-300 cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white group-hover:text-[#FF652F] transition-all">
                <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform" />
              </div>
            </motion.button>

            {/* Secondary CTA Button: Book Free Consultation */}
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white/90 backdrop-blur-sm border border-[#2B303A]/15 hover:border-[#4ECDC4] hover:text-[#FF652F] font-semibold text-base rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-[#4ECDC4]" />
              <span>Book Free Consultation</span>
            </motion.button>

            {/* Animated Video CTA Button */}
            <div className="relative group mt-1 sm:mt-0">
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF652F] to-[#4ECDC4] opacity-60 blur-md group-hover:opacity-100 animate-pulse transition duration-500" />
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsVideoOpen(true)}
                className="relative flex items-center gap-3 px-5 py-3 bg-white text-[#2B303A] rounded-full border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 font-semibold text-sm cursor-pointer"
              >
                <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#FF652F] text-white shadow-inner">
                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-[11px] text-gray-500 font-medium leading-none">
                    Watch Showreel
                  </span>
                  <span className="text-xs font-extrabold text-[#2B303A] mt-0.5">
                    1:45 Min Tour
                  </span>
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Mobile/Tablet Friendly Specialist & Tech Strip */}
          <motion.div
            variants={itemVariants}
            className="flex lg:hidden flex-wrap items-center justify-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 bg-white/90 px-3.5 py-2 rounded-full border border-gray-200 text-xs font-semibold shadow-xs">
              <Headphones className="w-4 h-4 text-[#FF652F]" />
              <span>Free Live Strategy Call Available</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Social Proof & Happy Customer Avatars Pill */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 bg-white/85 backdrop-blur-md px-6 py-3.5 rounded-full border border-gray-200/80 shadow-sm"
          >
            <div className="flex -space-x-2.5">
              {[
                { initials: "AK", bg: "bg-[#FF652F]" },
                { initials: "SR", bg: "bg-[#2B303A]" },
                { initials: "JD", bg: "bg-[#4ECDC4] text-[#2B303A]" },
                { initials: "MR", bg: "bg-amber-500" },
              ].map((user, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full ${user.bg} text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-white shadow-xs`}
                >
                  {user.initials}
                </div>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

            <div className="flex flex-col items-center sm:items-start text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="font-extrabold text-[#2B303A] ml-1">
                  4.9/5
                </span>
              </div>
              <span className="text-gray-500 font-medium">
                Trusted by <strong className="text-[#2B303A]">1,000+</strong>{" "}
                happy global brands
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= INFINITE MARQUEE CLIENT LOGOS ================= */}
      <footer className="w-full border-t border-gray-200/70 py-10 bg-white/60 backdrop-blur-md overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">
            Powering ambitious startups & enterprises worldwide
          </p>
        </div>

        <div className="relative flex overflow-x-hidden group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 md:gap-20 items-center px-6"
          >
            {[...Array(2)].map((_, loopIdx) => (
              <div
                key={loopIdx}
                className="flex items-center gap-12 md:gap-20 shrink-0"
              >
                <div className="flex items-center gap-2.5 font-extrabold text-xl text-gray-600 hover:text-[#FF652F] transition-colors">
                  <Globe className="w-6 h-6 text-[#FF652F]" />
                  <span>NovaScale</span>
                </div>
                <div className="flex items-center gap-2.5 font-extrabold text-xl text-gray-600 hover:text-[#4ECDC4] transition-colors">
                  <ShieldCheck className="w-6 h-6 text-[#4ECDC4]" />
                  <span>VaultPay</span>
                </div>
                <div className="flex items-center gap-2.5 font-extrabold text-xl text-gray-600 hover:text-[#2B303A] transition-colors">
                  <Zap className="w-6 h-6 text-amber-500" />
                  <span>BoltStack</span>
                </div>
                <div className="flex items-center gap-2.5 font-extrabold text-xl text-gray-600 hover:text-[#FF652F] transition-colors">
                  <Layers className="w-6 h-6 text-[#FF652F]" />
                  <span>CraftFlow</span>
                </div>
                <div className="flex items-center gap-2.5 font-extrabold text-xl text-gray-600 hover:text-[#4ECDC4] transition-colors">
                  <Users className="w-6 h-6 text-[#4ECDC4]" />
                  <span>NexaHealth</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </footer>

      {/* ================= ANIMATED VIDEO MODAL ================= */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#2B303A] rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/15"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF652F] animate-ping" />
                  <span className="font-bold text-lg">
                    Web Mung Agency Showreel
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="Web Mung Showreel Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
