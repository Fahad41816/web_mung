"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Play,
  Plus,
  Minus,
  Brain,
  Palette,
  Code2,
  Coffee,
} from "lucide-react";

const PARTNER_LOGOS = [
  { src: "/images/brand_logos/pngwing.com.png", alt: "Partner Logo 1" },
  { src: "/images/brand_logos/pngwing.com (1).png", alt: "Partner Logo 2" },
  { src: "/images/brand_logos/pngwing.com (2).png", alt: "Partner Logo 3" },
  { src: "/images/brand_logos/pngwing.com (3).png", alt: "Partner Logo 4" },
  { src: "/images/brand_logos/pngwing.com (4).png", alt: "Partner Logo 5" },
  { src: "/images/brand_logos/pngwing.com (5).png", alt: "Partner Logo 6" },
  { src: "/images/brand_logos/pngwing.com (6).png", alt: "Partner Logo 7" },
  { src: "/images/brand_logos/pngwing.com (7).png", alt: "Partner Logo 8" },
  { src: "/images/brand_logos/pngwing.com (8).png", alt: "Partner Logo 9" },
  { src: "/images/brand_logos/pngwing.com (9).png", alt: "Partner Logo 10" },
  { src: "/images/brand_logos/pngwing.com (10).png", alt: "Partner Logo 11" },
  { src: "/images/brand_logos/pngwing.com (11).png", alt: "Partner Logo 12" },
];

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
      "Timelines depend on scope and features. Landing pages and standard corporate websites take 2 to 3 weeks, while full-stack web applications and SaaS platforms typically range from 4 to 8 weeks.",
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

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const handleVideoMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const [hasAnimated, setHasAnimated] = useState(false);
  const [count94, setCount94] = useState(0);
  const [count70, setCount70] = useState(0);
  const [count10, setCount10] = useState(0);

  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const duration = 1800;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount94(Math.round(ease * 94));
            setCount70(Math.round(ease * 70));
            setCount10(Math.round(ease * 10));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div className="min-h-screen bg-white text-[#202923] font-sans selection:bg-[#244b3a] selection:text-white overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 34s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .why-checkmark {
          color: #334155;
          transform-origin: center;
          transition: color 280ms ease, transform 280ms ease;
        }
        .why-checkmark circle,
        .why-checkmark path {
          transition: stroke 280ms ease;
        }
        .why-checkmark:hover {
          color: #f59e0b;
          transform: scale(1.12);
        }
        .why-checkmark:hover circle { stroke: #f59e0b; }
        .why-checkmark:hover path { stroke: #244b3a; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-checkmark,
          .why-checkmark circle,
          .why-checkmark path { transition: none; }
          .marquee-track {
            animation: none;
            flex-wrap: wrap;
            justify-content: center;
          }
        }
        .hero-clip-left {
          clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%);
          -webkit-clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%);
        }
        .hero-clip-center {
          clip-path: polygon(0% 0%, 75% 0%, 100% 32%, 100% 100%, 32% 100%, 0% 68%);
          -webkit-clip-path: polygon(0% 0%, 75% 0%, 100% 32%, 100% 100%, 32% 100%, 0% 68%);
        }
        .hero-clip-right {
          clip-path: polygon(25% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%, 0% 25%);
          -webkit-clip-path: polygon(25% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%, 0% 25%);
        }
      `}</style>

      {/* ======================================================== */}
      {/* 1. HERO SECTION */}
      {/* ======================================================== */}
     <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden">
  {/* Soft humanistic background washes */}
  <div
    className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-orange-200/30 blur-3xl pointer-events-none -z-10"
    aria-hidden="true"
  />
  <div
    className="absolute -top-20 -right-28 w-[28rem] h-[28rem] rounded-full bg-emerald-200/25 blur-3xl pointer-events-none -z-10"
    aria-hidden="true"
  />
  <div
    className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-[#e2f900]/10 blur-3xl pointer-events-none -z-10"
    aria-hidden="true"
  />

  {/* Subtle dot-grid texture for texture & warmth */}
  <div
    className="absolute inset-0 pointer-events-none -z-10 opacity-[0.35]"
    aria-hidden="true"
    style={{
      backgroundImage:
        "radial-gradient(circle, #cbd5c4 1px, transparent 1px)",
      backgroundSize: "22px 22px",
      maskImage:
        "radial-gradient(ellipse at center, black 40%, transparent 75%)",
      WebkitMaskImage:
        "radial-gradient(ellipse at center, black 40%, transparent 75%)",
    }}
  />

  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    {/* Breadcrumb pill — hand-labeled feel */}
    <div className="flex justify-center mb-7 sm:mb-9">
      <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#647168] px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#dce6dd] shadow-sm">
        <Home size={14} className="text-[#647168] stroke-[1.5]" />
        <Link href="/" className="hover:text-[#244b3a] transition-colors">
          Home
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-[#17382b] font-extrabold">About</span>
      </div>
    </div>

    {/* Headline with warmth */}
    <div className="text-center max-w-3xl mx-auto mb-3">
      <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.15]">
        <span className="text-[#404b47]">
          <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">
            WEB MUNG
          </span>{" "}
          Building Digital,
        </span>{" "}
        <span className="relative inline-block">
          Shaping Futures
          <span
            className="absolute left-0 -bottom-1 w-full h-[6px] rounded-full bg-[#e2f900]/70 -z-10"
            aria-hidden="true"
          />
        </span>
      </h1>
    </div>

    {/* Humanistic micro-tagline with live dot */}
    <div className="flex justify-center mb-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3f7f4] border border-[#dce6dd]">
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#6f9479]">
          Crafting digital experiences since day one
        </span>
      </div>
    </div>

    {/* 3-Column Image Showcase with Custom Angles & Video */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center max-w-5xl mx-auto relative">
      {/* Floating accent dots around the whole showcase (humanistic touch) */}
      <span
        className="hidden md:block absolute -top-3 left-2 w-3 h-3 rounded-full bg-orange-400 shadow-sm animate-[heroFloat_4s_ease-in-out_infinite] z-20"
        aria-hidden="true"
      />
      <span
        className="hidden md:block absolute top-1/3 -left-2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm animate-[heroFloat_5s_ease-in-out_infinite_0.6s] z-20"
        aria-hidden="true"
      />
      <span
        className="hidden md:block absolute -top-2 right-4 w-2 h-2 rounded-full bg-[#ec4899] shadow-sm animate-[heroFloat_6s_ease-in-out_infinite_1s] z-20"
        aria-hidden="true"
      />

      {/* Left Image */}
      <div className="md:col-span-3 flex justify-center">
        <div className="relative w-full max-w-[240px] xs:max-w-[260px] sm:max-w-[300px] h-[220px] xs:h-[240px] sm:h-[280px] lg:h-[300px] hero-clip-left overflow-hidden shadow-lg bg-slate-100 group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
          <Image
            src="/images/about/image-1.jpg"
            alt="Web Mung team collaboration"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Warm inner corner accent */}
          <span
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/40 backdrop-blur-sm border border-white/60"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Center Video */}
      <div className="md:col-span-6 flex justify-center relative">
        {/* Subtle 3D fold accent */}
        <div
          className="absolute -right-2 sm:-right-3 top-8 bottom-8 w-8 sm:w-10 bg-gradient-to-l from-slate-300 via-slate-200 to-transparent -z-10 rounded-r-2xl transform skew-y-3 opacity-60 pointer-events-none"
          aria-hidden="true"
        />
        <div
          onMouseEnter={handleVideoMouseEnter}
          onMouseLeave={handleVideoMouseLeave}
          onClick={handleVideoToggle}
          className="relative w-full max-w-[420px] xs:max-w-[460px] sm:max-w-[520px] h-[260px] xs:h-[300px] sm:h-[360px] lg:h-[400px] hero-clip-center overflow-hidden shadow-2xl bg-slate-900 group cursor-pointer transition-all duration-500 hover:-translate-y-1"
        >
          <video
            ref={videoRef}
            src="/images/about/image-2.mp4"
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
              isVideoPlaying ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <Play size={24} className="fill-white text-white ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="md:col-span-3 flex justify-center">
        <div className="relative w-full max-w-[240px] xs:max-w-[260px] sm:max-w-[300px] h-[220px] xs:h-[240px] sm:h-[280px] lg:h-[300px] hero-clip-right overflow-hidden shadow-lg bg-slate-100 group rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
          <Image
            src="/images/about/image-3.jpg"
            alt="Web Mung digital engineering"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <span
            className="absolute bottom-3 left-3 w-7 h-7 rounded-full bg-white/40 backdrop-blur-sm border border-white/60"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Local keyframes for floating hero dots */}
  <style>{`
    @keyframes heroFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-\\[heroFloat_4s_ease-in-out_infinite\\],
      .animate-\\[heroFloat_5s_ease-in-out_infinite_0\\.6s\\],
      .animate-\\[heroFloat_6s_ease-in-out_infinite_1s\\],
      .animate-ping {
        animation: none !important;
      }
    }
  `}</style>
</section>

      {/* ======================================================== */}
      {/* 2. WHO WE ARE */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#e2f900]/15 blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-28 -right-16 w-96 h-96 rounded-full bg-[#244b3a]/8 blur-3xl pointer-events-none -z-10"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center">
              <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-md lg:max-w-none flex items-center justify-center group">
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="relative w-[88%] h-[88%] translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4">
                    <div className="absolute inset-0 hero-clip-right border-[2px] border-orange-500 opacity-80 transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:translate-y-1" />
                  </div>
                </div>

                <span
                  className="absolute -top-2 left-6 w-3 h-3 rounded-full bg-emerald-500 shadow-sm animate-[float_4s_ease-in-out_infinite] z-20"
                  aria-hidden="true"
                />
                <span
                  className="absolute bottom-4 right-0 w-2.5 h-2.5 rounded-full bg-orange-300 shadow-sm animate-[float_5s_ease-in-out_infinite_0.6s] z-20"
                  aria-hidden="true"
                />
                <span
                  className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#ec4899] shadow-sm animate-[float_6s_ease-in-out_infinite_1s] z-20"
                  aria-hidden="true"
                />

                <div className="relative z-10 w-[92%] h-[280px] xs:h-[320px] sm:h-[380px] lg:h-[420px] hero-clip-right overflow-hidden shadow-xl transition-all duration-700 ease-out group-hover:shadow-2xl">
                  <Image
                    src="/images/about/whoweare.jfif"
                    alt="Web Mung team collaboration and thoughtful planning"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/40 backdrop-blur-sm border border-white/60"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[1.5px] w-8 bg-[#6f9479] rounded-full" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f9479]">
                  Who We Are
                </span>
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 leading-[1.15]">
                Your Vision.{" "}
                <span className="relative inline-block">
                  Our Expertise.
                  <span
                    className="absolute left-0 -bottom-1 w-full h-[6px] rounded-full bg-orange-500 -z-10"
                    aria-hidden="true"
                  />
                </span>{" "}
                Built for{" "}
                <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">
                  Business Growth.
                </span>
              </h2>

              <div className="relative pl-4 mb-5 group/para">
                <p className="text-sm sm:text-base text-[#647168] leading-relaxed transition-colors duration-300 group-hover/para:text-[#4b5a50]">
                  At <span className="font-extrabold text-[#ff9b06]">Web Mung</span>, we help businesses turn ideas into powerful digital experiences that create real value. We partner with founders, startups, and growing companies to build custom web applications, high-performing websites, and technology solutions designed around their business goals.
                  We believe great technology should do more than look good — it should solve problems, simplify operations, and create opportunities for growth. That's why we combine strategic thinking, modern development, and user-focused design to deliver solutions that are practical, scalable, and built for the future.
                </p>
              </div>

              <div className="relative pl-4 mb-8 group/para">
                <p className="text-sm sm:text-base text-[#647168] leading-relaxed transition-colors duration-300 group-hover/para:text-[#4b5a50]">
                  Beyond delivering projects, we believe in building lasting partnerships. From understanding your vision to bringing it to life, we work closely with you through transparent communication, thoughtful execution, and a commitment to quality.
                  Your business deserves more than a service provider. It deserves a technology partner invested in your success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. OUR APPROACH */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-2xl mb-10 sm:mb-14 text-left relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[1.5px] w-8 bg-[#6f9479] rounded-full" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f9479]">
                Our Approach
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 leading-[1.15]">
              How We Work <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">With You</span>
            </h2>
            <p className="text-sm sm:text-base text-[#647168] leading-relaxed">
              We believe great digital products come from deliberate planning,
              thoughtful design, and disciplined engineering.
            </p>
          </div>

          <div className="relative pt-4 pb-6">
            <div className="absolute -top-10 right-0 sm:right-4 pointer-events-none z-0 hidden sm:block select-none" aria-hidden="true">
              <div className="relative w-48 h-24">
                <div className="absolute top-2 right-12 w-14 h-12 bg-orange-400" />
                <div className="absolute -top-1 right-8 w-6 h-6 bg-emerald-300" />
                <div className="absolute top-11 right-5 w-4 h-4 bg-emerald-300" />
                <div className="absolute -top-3 right-18 w-3 h-3 bg-orange-400" />
                <div className="absolute top-14 right-20 w-3 h-3 bg-emerald-300" />
                <div className="absolute top-4 right-28 w-2 h-2 bg-orange-400" />
                <div className="absolute -top-1 right-2 w-2 h-2 bg-emerald-300" />
                <div className="absolute top-14 right-8 w-2 h-2 bg-orange-400" />
                <div className="absolute top-0 right-32 w-2 h-2 bg-emerald-300" />
              </div>
            </div>

            <div className="absolute -left-3 sm:-left-6 top-1/3 pointer-events-none z-0 hidden sm:block select-none" aria-hidden="true">
              <div className="w-5 h-5 bg-emerald-300 mb-2" />
              <div className="w-2.5 h-2.5 bg-orange-400 ml-3 mb-2" />
              <div className="w-2 h-2 bg-emerald-300 ml-1 mb-1" />
              <div className="w-3.5 h-3.5 bg-orange-400 ml-5" />
            </div>

            <div className="absolute -bottom-8 left-1/4 pointer-events-none z-0 hidden sm:block select-none" aria-hidden="true">
              <div className="flex items-end gap-1">
                <div className="w-12 h-6 bg-orange-400" />
                <div className="w-5 h-5 bg-emerald-300" />
              </div>
              <div className="w-3 h-3 bg-orange-400 mt-1 ml-6" />
              <div className="w-2 h-2 bg-emerald-300 mt-0.5 ml-2" />
            </div>

            <div className="absolute -bottom-6 right-2 sm:right-6 pointer-events-none z-0 hidden sm:block select-none" aria-hidden="true">
              <div className="w-4 h-4 bg-emerald-300 mb-1.5" />
              <div className="w-2 h-2 bg-orange-400 ml-3" />
              <div className="w-3 h-3 bg-emerald-300 ml-5 mt-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-3 xl:gap-4 items-stretch relative z-10">
              {/* Card 1 */}
              <div className="relative p-5 sm:p-7 min-h-[280px] sm:min-h-[350px] flex flex-col justify-between rounded-xs bg-[#fffef7] border-[2.5px] border-orange-400 shadow-sm transform -rotate-1 sm:-rotate-[2.5deg] hover:rotate-0 hover:scale-[1.03] sm:hover:scale-105 hover:-translate-y-2 hover:z-30 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer z-[1] group">
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-orange-400 flex items-center justify-center text-slate-900 shadow-xs mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-10 h-10" />
                  </div>
                </div>

                <div className="relative pl-3.5">
                  <svg
                    className="absolute left-0 top-1 w-3 h-full text-orange-400 pointer-events-none"
                    viewBox="0 0 12 100"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 2 L 4 96"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="3 4"
                      className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <circle cx="4" cy="2" r="2.2" fill="currentColor" />
                  </svg>

                  <span className="relative inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a9478] mb-2 transition-all duration-500 ease-out group-hover:tracking-[0.28em] group-hover:text-[#6f9479]">
                    Strategic Discovery
                  </span>

                  <h3 className="text-xl sm:text-[1.55rem] md:text-[1.7rem] font-bold leading-[1.2] tracking-tight text-[#0f172a] mb-2.5 transition-all duration-500 ease-out group-hover:text-[#17382b] group-hover:-translate-y-0.5">
                    Understanding Your Business First
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700/90 leading-relaxed font-normal transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-slate-800">
                    We learn about your goals, audience, and challenges to create a clear strategy that prioritizes the right features and delivers meaningful business value.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative p-5 sm:p-7 min-h-[280px] sm:min-h-[350px] flex flex-col justify-between rounded-xs bg-[#fffef7] border-[2.5px] border-emerald-300 shadow-sm transform rotate-0.5 sm:rotate-[1deg] hover:rotate-0 hover:scale-[1.03] sm:hover:scale-105 hover:-translate-y-2 hover:z-30 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer z-[2] group">
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-emerald-300 flex items-center justify-center text-white shadow-xs mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Palette className="w-10 h-10" />
                  </div>
                </div>

                <div className="relative pl-3.5">
                  <svg
                    className="absolute left-0 top-1 w-3 h-full text-emerald-300 pointer-events-none"
                    viewBox="0 0 12 100"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 2 L 4 96"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="3 4"
                      className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <circle cx="4" cy="2" r="2.2" fill="currentColor" />
                  </svg>

                  <span className="relative inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a9478] mb-2 transition-all duration-500 ease-out group-hover:tracking-[0.28em] group-hover:text-[#6f9479]">
                    User-Centered Design
                  </span>

                  <h3 className="text-xl sm:text-[1.55rem] md:text-[1.7rem] font-bold leading-[1.2] tracking-tight text-[#0f172a] mb-2.5 transition-all duration-500 ease-out group-hover:text-[#17382b] group-hover:-translate-y-0.5">
                    Experiences That Build Trust
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700/90 leading-relaxed font-normal transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-slate-800">
                    We design intuitive, responsive interfaces that make it easy for customers to navigate, engage with your brand, and take action.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative p-5 sm:p-7 min-h-[280px] sm:min-h-[350px] flex flex-col justify-between rounded-xs bg-[#fffef7] border-[2.5px] border-orange-400 shadow-sm transform -rotate-0.5 sm:-rotate-[1.5deg] hover:rotate-0 hover:scale-[1.03] sm:hover:scale-105 hover:-translate-y-2 hover:z-30 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer z-[3] group">
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-orange-400 flex items-center justify-center text-slate-900 shadow-xs mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Code2 className="w-10 h-10" />
                  </div>
                </div>

                <div className="relative pl-3.5">
                  <svg
                    className="absolute left-0 top-1 w-3 h-full text-orange-400 pointer-events-none"
                    viewBox="0 0 12 100"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 2 L 4 96"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="3 4"
                      className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <circle cx="4" cy="2" r="2.2" fill="currentColor" />
                  </svg>

                  <span className="relative inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a9478] mb-2 transition-all duration-500 ease-out group-hover:tracking-[0.28em] group-hover:text-[#6f9479]">
                    Clean Engineering
                  </span>

                  <h3 className="text-xl sm:text-[1.55rem] md:text-[1.7rem] font-bold leading-[1.2] tracking-tight text-[#0f172a] mb-2.5 transition-all duration-500 ease-out group-hover:text-[#17382b] group-hover:-translate-y-0.5">
                    Built to Perform and Scale
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700/90 leading-relaxed font-normal transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-slate-800">
                    We build secure, maintainable, and scalable digital products using modern technologies, ensuring your solutions remain reliable as your business grows.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative p-5 sm:p-7 min-h-[280px] sm:min-h-[350px] flex flex-col justify-between rounded-xs bg-[#fffef7] border-[2.5px] border-emerald-300 shadow-sm transform rotate-1 sm:rotate-[2.5deg] hover:rotate-0 hover:scale-[1.03] sm:hover:scale-105 hover:-translate-y-2 hover:z-30 hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer z-[4] group">
                <div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-emerald-300 flex items-center justify-center text-white shadow-xs mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Coffee className="w-10 h-10" />
                  </div>
                </div>

                <div className="relative pl-3.5">
                  <svg
                    className="absolute left-0 top-1 w-3 h-full text-emerald-300 pointer-events-none"
                    viewBox="0 0 12 100"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 4 2 L 4 96"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="3 4"
                      className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <circle cx="4" cy="2" r="2.2" fill="currentColor" />
                  </svg>

                  <span className="relative inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a9478] mb-2 transition-all duration-500 ease-out group-hover:tracking-[0.28em] group-hover:text-[#6f9479]">
                    Long-Term Partnership
                  </span>

                  <h3 className="text-xl sm:text-[1.55rem] md:text-[1.7rem] font-bold leading-[1.2] tracking-tight text-[#0f172a] mb-2.5 transition-all duration-500 ease-out group-hover:text-[#17382b] group-hover:-translate-y-0.5">
                    Support Beyond Launch
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700/90 leading-relaxed font-normal transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-slate-800">
                    We provide ongoing technical support, deployment guidance, and continuous improvements to help your digital products evolve with your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. MISSION & VISION */}
      {/* ======================================================== */}
      <section ref={statsRef} className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* OUR MISSION ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[1.5px] w-8 bg-[#6f9479] rounded-full" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f9479]">
                  Our Mission & Vision
                </span>
              </div>
              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 leading-[1.15]">
                Our Mission
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-10 max-w-xl">
                Our mission is to help businesses turn their ideas into impactful digital solutions that drive growth, improve efficiency, and create lasting value. At <span className="font-extrabold text-[#ff9b06]">Web Mung</span>, we combine strategic thinking, modern technology, and user-focused design to develop reliable, scalable solutions aligned with our clients’ business objectives. We aim to build meaningful partnerships by delivering quality, transparency, and measurable value at every stage of the digital journey
              </p>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12">
                <div className="flex flex-col items-start">
                  <div className="relative inline-flex items-center">
                    <span
                      className={`absolute -left-2.5 -top-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#84cc16] transition-all duration-700 ease-out -z-0 ${
                        hasAnimated ? "scale-100 opacity-90" : "scale-50 opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                      {count94}%
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase mt-2.5">
                    CLIENT RETENTION
                  </span>
                </div>

                <div className="flex flex-col items-start">
                  <div className="relative inline-flex items-center">
                    <span
                      className={`absolute -left-2.5 -top-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#f59e0b] transition-all duration-700 ease-out -z-0 ${
                        hasAnimated ? "scale-100 opacity-90" : "scale-50 opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                      {count70}M+
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase mt-2.5">
                    EMAILS PER MONTH
                  </span>
                </div>

                <div className="flex flex-col items-start">
                  <div className="relative inline-flex items-center">
                    <span
                      className={`absolute -left-2.5 -top-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#ec4899] transition-all duration-700 ease-out -z-0 ${
                        hasAnimated ? "scale-100 opacity-90" : "scale-50 opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight">
                      {count10}K+
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase mt-2.5">
                    MONTHLY CAMPAIGNS
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] h-[240px] xs:h-[280px] sm:h-[320px] lg:h-[400px] hero-clip-right overflow-hidden shadow-lg bg-slate-100 group rounded-2xl">
                <Image
                  src="/images/about/mission.jpg.jfif"
                  alt="Our Mission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* OUR VISION ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] lg:max-w-[460px] h-[240px] xs:h-[280px] sm:h-[320px] lg:h-[400px] hero-clip-right overflow-hidden shadow-lg bg-slate-100 group rounded-2xl">
                <Image
                  src="/images/about/vission.jpg.jfif"
                  alt="Our Vision"
                  fill
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 leading-[1.15]">
                <span className="relative inline-block">Our Vision</span>
              </h2>

              <div className="relative pl-4 mb-6 group/para">
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed transition-colors duration-300 group-hover/para:text-[#4b5a50] max-w-xl">
                  Our vision is to become a trusted digital technology partner for businesses seeking sustainable growth and long-term success. We aspire to bridge the gap between business challenges and technological opportunities by creating innovative digital experiences that help organizations adapt, compete, and thrive in an evolving digital world. Through continuous learning, creative problem-solving, and a commitment to excellence, we aim to make technology a powerful driver of business progress
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHY CHOOSE US */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-[1.5px] w-8 bg-[#6f9479] rounded-full" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f9479]">
                  Why Choose Us
                </span>
              </div>

              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 leading-[1.15]">
                Turn Your Business
                <br />
                Ideas Into <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">Digital Success</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8 max-w-xl">
                We help businesses transform ideas into reliable, user-friendly digital solutions. From professional websites to custom web applications, <span className="font-extrabold text-[#ff9b06]">Web Mung</span> combines thoughtful design, modern technology, and practical problem-solving to build digital products that support your goals and grow with your business
              </p>

              <div className="space-y-6 w-full">
                <div className="flex items-start gap-3.5">
                  <svg
                    className="why-checkmark w-6 h-6 text-slate-800 shrink-0 mt-1.5 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1">
                      Built to Grow With Your Business
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      Your business shouldn't outgrow its technology. We build flexible, scalable websites and applications designed around your needs, making it easier to adapt as your business evolves
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <svg
                    className="why-checkmark w-6 h-6 text-slate-800 shrink-0 mt-1.5 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1">
                      Quality You Can Rely On
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      We focus on clean, maintainable code, responsive design, and thorough testing to deliver digital products that work reliably, perform smoothly, and are easier to maintain.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <svg
                    className="why-checkmark w-6 h-6 text-slate-800 shrink-0 mt-1.5 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1">
                      A Team That Understands Your Goals
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      We work closely with you to understand your challenges, business priorities, and vision. Our team turns those requirements into practical digital solutions, keeping your objectives at the center of every decision
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <svg
                    className="why-checkmark w-6 h-6 text-slate-800 shrink-0 mt-1.5 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1">
                      Clear Communication, No Guesswork
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      You deserve to know what's happening with your project. We prioritize open communication, clear expectations, and regular progress updates so you can stay informed from the first discussion to the final delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md lg:max-w-none flex items-center justify-center">
                <Image
                  src="/images/about/why-choosen-us-1.png"
                  alt="Why Choose Us illustration"
                  width={600}
                  height={450}
                  className="w-full h-auto object-contain max-h-[300px] sm:max-h-[380px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. OUR VALUABLE PARTNERS */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-[1.5px] w-8 bg-[#6f9479] rounded-full" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f9479]">
                Our Partners
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] mb-6 leading-[1.15]">
              Our Valuable <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">Partners</span>
            </h2>
            <p className="text-sm sm:text-base text-[#647168] leading-relaxed">
              We are proud to work alongside trusted partners who support our
              journey and help us deliver meaningful digital solutions.
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#f3f7f4] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#f3f7f4] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex items-center gap-6 sm:gap-12">
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, idx) => (
              <div
                key={`${logo.src}-${idx}`}
                className="w-28 sm:w-36 h-16 sm:h-20 px-3 sm:px-4 py-2.5 flex items-center justify-center transition-all duration-300 hover:scale-105 group"
                aria-hidden={idx >= PARTNER_LOGOS.length ? "true" : undefined}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logo.src}
                    alt={idx < PARTNER_LOGOS.length ? logo.alt : ""}
                    width={130}
                    height={55}
                    className="max-h-10 sm:max-h-12 w-auto object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. FAQ SECTION */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] leading-[1.15]">
                FAQ&apos; <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">s</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed mt-3 mb-4 max-w-sm">
                Find quick answers about our services, tech stack, development workflow, and ongoing technical support.
              </p>

              <div className="relative w-full max-w-sm h-[180px] xs:h-[200px] sm:h-[240px] mb-8">
                <Image
                  src="/images/about/FAQ.png"
                  alt="Web Mung FAQ illustration"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-lg sm:text-2xl font-bold text-[#0f172a] mb-2">
                  Still Have A Question?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-xs">
                  Can&apos;t find what you&apos;re looking for? Reach out to our engineering team directly.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#0f172a] hover:bg-[#244b3a] text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200 w-full">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="py-2">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-lg text-[#0f172a] hover:text-[#244b3a] transition-colors cursor-pointer"
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
        </div>
      </section>
    </div>
  );
}