"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Home,
  Play,
  Plus,
  Brain,
  Palette,
  Code2,
  Coffee,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import Navbar from "@/components/HomePageElements/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ========================================================
// CONFIG / DATA
// ========================================================
const CONTACT_HREF = "/contact";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
const GRAD =
  "bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent";

const SECTION_Y = "py-12 sm:py-14 lg:py-16";
const H2 =
  "text-balance text-[clamp(1.75rem,1.1rem_+_2.9vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-[#111827]";

const HEADLINE = [
  { text: "WEB", kind: "brand" },
  { text: "MUNG", kind: "brand" },
  { text: "Building", kind: "plain" },
  { text: "Digital,", kind: "plain" },
  { text: "Shaping", kind: "plain" },
  { text: "Futures", kind: "mark" },
] as const;

type IconProps = { className?: string };

function NextIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#111827" />
      <path
        d="M9 8v8M9 8l7 9M15.5 8v4"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.1">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

function TypeScriptIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="1" y="1" width="22" height="22" rx="3" fill="#3178C6" />
      <text
        x="12.5"
        y="18"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill="#fff"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        TS
      </text>
    </svg>
  );
}

function NodeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <polygon points="12,1.5 21.5,7 21.5,17 12,22.5 2.5,17 2.5,7" fill="#5FA04E" />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="8"
        fontWeight="800"
        fill="#fff"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        JS
      </text>
    </svg>
  );
}

function TailwindIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#06B6D4"
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
      />
    </svg>
  );
}

const HERO_CHIPS: {
  label: string;
  Icon: React.ComponentType<IconProps>;
  pos: string;
  delay: string;
}[] = [
  { label: "Next.js", Icon: NextIcon, pos: "left-[-18px] top-[-30px]", delay: "0s" },
  { label: "React", Icon: ReactIcon, pos: "right-[8%] top-[-38px]", delay: "0.8s" },
  { label: "TypeScript", Icon: TypeScriptIcon, pos: "left-[3%] bottom-[-34px]", delay: "1.4s" },
  { label: "Node.js", Icon: NodeIcon, pos: "right-[-18px] bottom-[16%]", delay: "2s" },
  { label: "Tailwind CSS", Icon: TailwindIcon, pos: "left-[-26px] top-[46%]", delay: "2.6s" },
];

const SERVICES = [
  "Custom Websites",
  "Web Applications",
  "SaaS Platforms",
  "Cloud Integration",
  "UI/UX Design",
  "Maintenance & Support",
];

const APPROACH: {
  icon: LucideIcon;
  tag: string;
  title: string;
  text: string;
  accent: string;
  soft: string;
}[] = [
  {
    icon: Brain,
    tag: "Strategic Discovery",
    title: "Understanding Your Business First",
    text: "We learn about your goals, audience, and challenges to create a clear strategy that prioritizes the right features and delivers meaningful business value.",
    accent: "#F97316",
    soft: "#FFF4ED",
  },
  {
    icon: Palette,
    tag: "User-Centered Design",
    title: "Experiences That Build Trust",
    text: "We design intuitive, responsive interfaces that make it easy for customers to navigate, engage with your brand, and take action.",
    accent: "#5770D1",
    soft: "#EEF3FF",
  },
  {
    icon: Code2,
    tag: "Clean Engineering",
    title: "Built to Perform and Scale",
    text: "We build secure, maintainable, and scalable digital products using modern technologies, ensuring your solutions remain reliable as your business grows.",
    accent: "#0D9488",
    soft: "#EAF8F8",
  },
  {
    icon: Coffee,
    tag: "Long-Term Partnership",
    title: "Support Beyond Launch",
    text: "We provide ongoing technical support, deployment guidance, and continuous improvements to help your digital products evolve with your business.",
    accent: "#EC4899",
    soft: "#FDF2F8",
  },
];

const STATS = [
  { to: 12, suffix: "+", label: "Happy clients", dot: "bg-orange-300" },
  { to: 30, suffix: "-day", label: "Money-back guarantee", dot: "bg-[#a5b4fc]" },
  { to: 4, suffix: "", label: "Step clear process", dot: "bg-teal-300" },
];

const WHY = [
  {
    title: "Built to Grow With Your Business",
    text: "Your business shouldn't outgrow its technology. We build flexible, scalable websites and applications designed around your needs, making it easier to adapt as your business evolves",
  },
  {
    title: "Quality You Can Rely On",
    text: "We focus on clean, maintainable code, responsive design, and thorough testing to deliver digital products that work reliably, perform smoothly, and are easier to maintain.",
  },
  {
    title: "A Team That Understands Your Goals",
    text: "We work closely with you to understand your challenges, business priorities, and vision. Our team turns those requirements into practical digital solutions, keeping your objectives at the center of every decision",
  },
  {
    title: "Clear Communication, No Guesswork",
    text: "You deserve to know what's happening with your project. We prioritize open communication, clear expectations, and regular progress updates so you can stay informed from the first discussion to the final delivery.",
  },
];

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
      "It depends on the plan and the scope. We share a clear timeline in your proposal before the project starts, and you can follow progress on a staging site while we build.",
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

// ========================================================
// GLOBAL HOOKS
// ========================================================
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);
}

function useParallax() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const s = parseFloat(el.dataset.speed || "0.2");
        gsap.fromTo(
          el,
          { y: s * 120 },
          {
            y: s * -120,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, []);
}

// ========================================================
// SMALL REUSABLE PIECES
// ========================================================
function GlobalStyles() {
  return (
    <style>{`
      @keyframes wm-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .marquee-track {
        display: flex;
        width: max-content;
        animation: wm-marquee 40s linear infinite;
      }
      .marquee-reverse { animation-direction: reverse; }
      .marquee-pause:hover .marquee-track { animation-play-state: paused; }

      @keyframes wm-float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .float-y { animation: wm-float 5s ease-in-out infinite; }

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

      @media (prefers-reduced-motion: reduce) {
        .marquee-track { animation: none; flex-wrap: wrap; justify-content: center; }
        .float-y { animation: none; }
      }
    `}</style>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[70] h-1 bg-gradient-to-r from-orange-300 via-[#5770D1] to-teal-400"
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-[1.5px] w-8 rounded-full bg-orange-400" aria-hidden />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
        {children}
      </span>
    </div>
  );
}

function Tilt({
  children,
  className = "",
  max = 10,
  radius = "rounded-3xl",
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  radius?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 160, damping: 18, mass: 0.5 });
  const ry = useSpring(0, { stiffness: 160, damping: 18, mass: 0.5 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useSpring(0, { stiffness: 180, damping: 24 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.4), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
    glareOpacity.set(1);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: glare, opacity: glareOpacity, transform: "translateZ(1px)" }}
          className={`pointer-events-none absolute inset-0 ${radius}`}
        />
      </motion.div>
    </div>
  );
}

function Magnetic({
  children,
  strength = 0.3,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}

function Word({
  word,
  index,
  total,
  progress,
  reduce,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const start = index / total;
  const end = Math.min(start + 1.6 / total, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const accent = /^(Web|Mung)/.test(word);
  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity }}
      className={accent ? "font-extrabold text-[#ff9b06]" : ""}
    >
      {word}{" "}
    </motion.span>
  );
}

function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          index={i}
          total={words.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </p>
  );
}

// ========================================================
// 1. HERO
// ========================================================
function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  const play = () => {
    videoRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {});
  };
  const pause = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };
  const toggle = () => {
    if (videoRef.current?.paused) play();
    else pause();
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const q = gsap.utils.selector(wrap);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(q(".hp-left"), { rotateY: 28, transformPerspective: 900, transformOrigin: "100% 50%" });
      gsap.set(q(".hp-right"), { rotateY: -28, transformPerspective: 900, transformOrigin: "0% 50%" });
      gsap.set(q(".hp-center"), { scale: 0.9 });
      gsap.set(q(".hp-chip"), { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top 55%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      });
      tl.to(q(".hp-left"), { rotateY: 0, x: -24 }, 0)
        .to(q(".hp-right"), { rotateY: 0, x: 24 }, 0)
        .to(q(".hp-center"), { scale: 1.1 }, 0)
        .to(q(".hp-chip"), { opacity: 1, y: 0, stagger: 0.08 }, 0.1);
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative pt-10 sm:pt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        data-speed="0.25"
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl"
      />
      <div
        data-speed="0.4"
        aria-hidden
        className="pointer-events-none absolute -right-28 top-24 h-[26rem] w-[26rem] rounded-full bg-indigo-200/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mx-auto mb-4 max-w-3xl text-balance text-center text-[clamp(1.875rem,1rem_+_4.6vw,3.75rem)] font-extrabold leading-[1.15] tracking-tight">
          {HEADLINE.map((w, i) => (
            <React.Fragment key={w.text}>
              <span className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 * i, ease: EASE }}
                  className={`relative isolate inline-block ${
                    w.kind === "brand" ? GRAD : "text-[#111827]"
                  }`}
                >
                  {w.text}
                  {w.kind === "mark" && (
                    <span
                      aria-hidden
                      className="absolute bottom-[2px] left-0 -z-10 h-[6px] w-full rounded-full bg-orange-300/70"
                    />
                  )}
                </motion.span>
              </span>{" "}
            </React.Fragment>
          ))}
        </h1>

        <div className="mb-12 flex justify-center">
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
            Crafting digital experiences since day one
          </span>
        </div>
      </div>

      <div ref={wrapRef} className="relative z-10 md:h-[150vh]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 md:sticky md:top-[16vh] lg:px-8">
          <div className="relative">
            {HERO_CHIPS.map((c) => {
              const Icon = c.Icon;
              return (
                <div
                  key={c.label}
                  className={`hp-chip absolute z-30 hidden md:block ${c.pos}`}
                >
                  <div
                    role="img"
                    aria-label={c.label}
                    title={c.label}
                    className="float-y flex h-11 w-11 items-center justify-center  backdrop-blur lg:h-14 lg:w-14"
                    style={{ animationDelay: c.delay }}
                  >
                    <Icon className="h-6 w-6 lg:h-8 lg:w-8" />
                  </div>
                </div>
              );
            })}

            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 lg:gap-8">
              <div className="hp-left flex justify-center md:col-span-3">
                <div className="hero-clip-left relative h-[220px] w-full max-w-[300px] overflow-hidden bg-slate-100 shadow-lg sm:h-[280px] lg:h-[300px]">
                  <Image
                    src="/images/about/image-1.jpg"
                    alt="Web Mung team collaboration"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div className="hp-center relative z-20 flex justify-center md:col-span-6">
                <button
                  type="button"
                  aria-label={playing ? "Pause video" : "Play video"}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") play();
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") pause();
                  }}
                  onClick={toggle}
                  className="hero-clip-center group relative h-[260px] w-full max-w-[520px] cursor-pointer overflow-hidden bg-slate-900 shadow-2xl sm:h-[360px] lg:h-[400px]"
                >
                  <video
                    ref={videoRef}
                    src="/images/about/image-2.mp4"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                      playing ? "scale-90 opacity-0" : "scale-100 opacity-100"
                    }`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/50 bg-white/30 text-white shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                      <Play size={24} className="ml-1 fill-white text-white" />
                    </span>
                  </span>
                </button>
              </div>

              <div className="hp-right flex justify-center md:col-span-3">
                <div className="hero-clip-right relative h-[220px] w-full max-w-[300px] overflow-hidden bg-slate-100 shadow-lg sm:h-[280px] lg:h-[300px]">
                  <Image
                    src="/images/about/image-3.jpg"
                    alt="Web Mung digital engineering"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 1b. SERVICES BAND
// ========================================================
function ServicesBand() {
  return (
    <div
      aria-label="Our services"
      className="marquee-pause relative z-10 -ml-[2.5%] my-6 w-[105%] -rotate-1 bg-[#111827] py-4 sm:py-5"
    >
      <div className="marquee-track" style={{ animationDuration: "45s" }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {SERVICES.map((s) => (
              <span
                key={`${copy}-${s}`}
                className="flex items-center whitespace-nowrap pr-10 text-lg font-extrabold tracking-tight text-white sm:text-2xl"
              >
                {s}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================================
// 2. WHO WE ARE
// ========================================================
function WhoWeAre() {
  return (
    <section className={`relative ${SECTION_Y}`}>
      <div
        data-speed="0.3"
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl"
      />
      <div
        data-speed="0.2"
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-teal-100/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="order-2 lg:order-1 lg:col-span-5"
          >
            <Tilt max={12} radius="rounded-[28px]" className="mx-auto w-full max-w-md">
              <div className="relative aspect-[4/5] w-full">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-[28px] border-2 border-orange-400/80"
                  style={{ transform: "translate3d(16px, 16px, -40px)" }}
                />
                <div className="absolute inset-0 overflow-hidden rounded-[28px] bg-slate-100 shadow-2xl">
                  <Image
                    src="/images/about/whoweare.jfif"
                    alt="Web Mung team collaboration and thoughtful planning"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </Tilt>
          </motion.div>

          <div className="order-1 flex flex-col items-start text-left lg:order-2 lg:col-span-7">
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className={`mb-6 ${H2}`}>
              Your Vision.{" "}
              <span className="relative isolate inline-block">
                Our Expertise.
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 -z-10 h-[6px] w-full rounded-full bg-orange-400"
                />
              </span>{" "}
              Built for <span className={GRAD}>Business Growth.</span>
            </h2>

            <ScrollWords
              className="mb-5 text-base leading-relaxed text-slate-700 sm:text-lg"
              text="At Web Mung, we help businesses turn ideas into powerful digital experiences that create real value. We partner with founders, startups, and growing companies to build custom web applications, high-performing websites, and technology solutions designed around their business goals. We believe great technology should do more than look good — it should solve problems, simplify operations, and create opportunities for growth. That's why we combine strategic thinking, modern development, and user-focused design to deliver solutions that are practical, scalable, and built for the future."
            />
            <p className="mb-8 text-sm leading-relaxed text-slate-500 sm:text-base">
              Beyond delivering projects, we believe in building lasting partnerships. From understanding your vision to bringing it to life, we work closely with you through transparent communication, thoughtful execution, and a commitment to quality. Your business deserves more than a service provider. It deserves a technology partner invested in your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 3. OUR APPROACH
// ========================================================
function StackCard({
  item,
  index,
  total,
  progress,
}: {
  item: (typeof APPROACH)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.05]
  );
  const Icon = item.icon;

  return (
    <div
      className={`sticky ${index === total - 1 ? "" : "mb-8 sm:mb-12"}`}
      style={{ top: 96 + index * 20, zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale: reduce ? 1 : scale, transformOrigin: "50% 0%" }}
      >
        <Tilt max={3} radius="rounded-[28px]">
          <div
            className="relative grid min-h-[300px] grid-cols-1 gap-6 overflow-hidden rounded-[28px] border-2 p-6 shadow-xl sm:p-10 md:grid-cols-12 md:gap-10"
            style={{ backgroundColor: item.soft, borderColor: item.accent }}
          >
            <div className="flex items-start justify-between md:col-span-4 md:flex-col md:justify-between">
              <span
                className="text-7xl font-extrabold leading-none tracking-tighter sm:text-8xl"
                style={{ color: item.accent, opacity: 0.9 }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg"
                style={{ backgroundColor: item.accent, transform: "translateZ(40px)" }}
              >
                <Icon className="h-7 w-7" />
              </span>
            </div>

            <div className="md:col-span-8" style={{ transform: "translateZ(24px)" }}>
              <span
                className="mb-3 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: item.accent }}
              >
                {item.tag}
              </span>
              <h3 className="mb-3 text-2xl font-bold leading-[1.2] tracking-tight text-[#111827] sm:text-3xl">
                {item.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {item.text}
              </p>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle, ${item.accent} 1.5px, transparent 1.5px)`,
                backgroundSize: "14px 14px",
              }}
            />
          </div>
        </Tilt>
      </motion.div>
    </div>
  );
}

const CUBE_CLUSTERS: {
  pos: React.CSSProperties;
  speed: string;
  cubes: { s: number; c: string; x: number; y: number; r: number }[];
}[] = [
  {
    pos: { top: "3%", right: "2%" },
    speed: "0.25",
    cubes: [
      { s: 52, c: "bg-orange-400", x: 50, y: 10, r: 0 },
      { s: 24, c: "bg-emerald-300", x: 20, y: 0, r: 12 },
      { s: 16, c: "bg-emerald-300", x: 112, y: 56, r: -8 },
      { s: 12, c: "bg-orange-400", x: 6, y: 50, r: 0 },
      { s: 10, c: "bg-emerald-300", x: 96, y: 0, r: 20 },
    ],
  },
  {
    pos: { top: "26%", left: "1%" },
    speed: "0.35",
    cubes: [
      { s: 20, c: "bg-emerald-300", x: 0, y: 0, r: 0 },
      { s: 10, c: "bg-orange-400", x: 24, y: 28, r: 15 },
      { s: 8, c: "bg-emerald-300", x: 6, y: 46, r: 0 },
      { s: 14, c: "bg-orange-400", x: 32, y: 54, r: -10 },
    ],
  },
  {
    pos: { top: "48%", right: "2%" },
    speed: "0.2",
    cubes: [
      { s: 44, c: "bg-orange-400", x: 30, y: 20, r: 0 },
      { s: 18, c: "bg-emerald-300", x: 0, y: 0, r: 10 },
      { s: 10, c: "bg-orange-400", x: 84, y: 6, r: 0 },
      { s: 12, c: "bg-emerald-300", x: 90, y: 62, r: -14 },
    ],
  },
  {
    pos: { top: "70%", left: "3%" },
    speed: "0.3",
    cubes: [
      { s: 40, c: "bg-orange-400", x: 10, y: 12, r: 0 },
      { s: 20, c: "bg-emerald-300", x: 58, y: 24, r: 12 },
      { s: 12, c: "bg-orange-400", x: 30, y: 0, r: 0 },
      { s: 10, c: "bg-emerald-300", x: 0, y: 58, r: 0 },
    ],
  },
  {
    pos: { bottom: "3%", right: "6%" },
    speed: "0.15",
    cubes: [
      { s: 18, c: "bg-emerald-300", x: 0, y: 0, r: 0 },
      { s: 10, c: "bg-orange-400", x: 26, y: 22, r: 14 },
      { s: 14, c: "bg-emerald-300", x: 44, y: 40, r: 0 },
    ],
  },
];

function CubeField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
      {CUBE_CLUSTERS.map((cl, i) => (
        <div
          key={i}
          data-speed={cl.speed}
          className="absolute h-24 w-40"
          style={cl.pos}
        >
          {cl.cubes.map((cb, j) => (
            <div
              key={j}
              className={`absolute ${cb.c}`}
              style={{
                width: cb.s,
                height: cb.s,
                left: cb.x,
                top: cb.y,
                transform: `rotate(${cb.r}deg)`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Approach() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section className={`relative ${SECTION_Y}`}>
      <CubeField />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mb-12 max-w-2xl text-left sm:mb-16">
          <Eyebrow>Our Approach</Eyebrow>
          <h2 className={`mb-6 ${H2}`}>
            How We Work <span className={GRAD}>With You</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            We believe great digital products come from deliberate planning, thoughtful design, and disciplined engineering.
          </p>
        </div>

        <div ref={ref} className="relative">
          {APPROACH.map((item, i) => (
            <StackCard
              key={item.tag}
              item={item}
              index={i}
              total={APPROACH.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 4. MISSION & VISION
// ========================================================
function MissionVision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const missionOpacity = useTransform(scrollYProgress, [0.4, 0.58], [1, 0]);
  const visionOpacity = useTransform(scrollYProgress, [0.4, 0.58], [0, 1]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-14, 0, 14]);

  return (
    <section className={`relative ${SECTION_Y}`}>
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 lg:grid-cols-12">
          <div
            className="sticky top-28 hidden self-start lg:col-span-6 lg:block"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={{ rotateY, transformStyle: "preserve-3d" }}
              className="relative mx-auto h-[460px] w-full max-w-[470px]"
            >
              <motion.div
                style={{ opacity: missionOpacity }}
                className="hero-clip-right absolute inset-0 overflow-hidden bg-slate-100 shadow-xl"
              >
                <Image
                  src="/images/about/mission.jpg.jfif"
                  alt="Our Mission"
                  fill
                  sizes="470px"
                  className="object-cover object-center"
                />
              </motion.div>
              <motion.div
                style={{ opacity: visionOpacity }}
                className="hero-clip-right absolute inset-0 overflow-hidden bg-slate-100 shadow-xl"
              >
                <Image
                  src="/images/about/vission.jpg.jfif"
                  alt="Our Vision"
                  fill
                  sizes="470px"
                  className="object-cover object-center"
                />
              </motion.div>

              <motion.span
                style={{ opacity: missionOpacity, transform: "translateZ(60px)" }}
                className="absolute -left-3 bottom-8 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-[#111827] shadow-xl"
              >
                Mission
              </motion.span>
              <motion.span
                style={{ opacity: visionOpacity, transform: "translateZ(60px)" }}
                className="absolute -left-3 bottom-8 rounded-full bg-[#111827] px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-white shadow-xl"
              >
                Vision
              </motion.span>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col justify-center py-10 lg:min-h-[85vh]">
              <div className="hero-clip-right relative mb-8 h-[240px] w-full max-w-[400px] overflow-hidden bg-slate-100 shadow-lg sm:h-[320px] lg:hidden">
                <Image
                  src="/images/about/mission.jpg.jfif"
                  alt="Our Mission"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
              <Eyebrow>Our Mission &amp; Vision</Eyebrow>
              <h2 className={`mb-6 ${H2}`}>Our Mission</h2>
              <p className="mb-10 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Our mission is to help businesses turn their ideas into impactful digital solutions that drive growth, improve efficiency, and create lasting value. At Web <span className="font-extrabold text-[#ff9b06]">Mung</span>, we combine strategic thinking, modern technology, and user-focused design to develop reliable, scalable solutions aligned with our clients’ business objectives. We aim to build meaningful partnerships by delivering quality, transparency, and measurable value at every stage of the digital journey
              </p>

              <div className="flex flex-wrap items-start gap-8 sm:gap-12">
                {STATS.map((s) => (
                  <div key={s.label} className="flex flex-col items-start">
                    <div className="relative inline-flex items-center">
                      <motion.span
                        aria-hidden
                        initial={{ scale: 0.4, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 0.9 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className={`absolute -left-2.5 -top-1 h-9 w-9 rounded-full sm:h-11 sm:w-11 ${s.dot}`}
                      />
                      <span className="relative z-10 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                        <CountUp to={s.to} suffix={s.suffix} />
                      </span>
                    </div>
                    <span className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center py-10 lg:min-h-[85vh]">
              <div className="hero-clip-right relative mb-8 h-[240px] w-full max-w-[400px] overflow-hidden bg-slate-100 shadow-lg sm:h-[320px] lg:hidden">
                <Image
                  src="/images/about/vission.jpg.jfif"
                  alt="Our Vision"
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-center"
                />
              </div>
              <h2 className={`mb-6 ${H2}`}>Our Vision</h2>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Our vision is to become a trusted digital technology partner for businesses seeking sustainable growth and long-term success. We aspire to bridge the gap between business challenges and technological opportunities by creating innovative digital experiences that help organizations adapt, compete, and thrive in an evolving digital world. Through continuous learning, creative problem-solving, and a commitment to excellence, we aim to make technology a powerful driver of business progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 5. WHY CHOOSE US
// ========================================================
function DrawCheck() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 shrink-0" aria-hidden>
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      />
    </svg>
  );
}

function WhyChoose() {
  return (
    <section className={`relative ${SECTION_Y}`}>
      <div
        data-speed="0.3"
        aria-hidden
        className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-orange-100/50 blur-3xl"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-8 sm:mb-14 lg:mb-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl text-left">
            <Eyebrow>Why Choose Us</Eyebrow>
            <h2 className={`mb-6 ${H2}`}>
              Turn Your Business
              <br />
              Ideas Into <span className={GRAD}>Digital Success</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
              We help businesses transform ideas into reliable, user-friendly digital solutions. From professional websites to custom web applications, <span className="font-extrabold text-[#ff9b06]">Web Mung</span> combines thoughtful design, modern technology, and practical problem-solving to build digital products that support your goals and grow with your business
            </p>
          </div>

          <div className="flex lg:shrink-0">
            <LetsTalkRing />
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
            {WHY.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.12, ease: EASE }}
              >
                <Tilt max={8} radius="rounded-3xl" className="h-full">
                  <div
                    className="group h-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-orange-300 hover:shadow-xl"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="mb-4 text-slate-800 transition-colors duration-300 group-hover:text-orange-500"
                      style={{ transform: "translateZ(40px)" }}
                    >
                      <DrawCheck />
                    </div>
                    <div style={{ transform: "translateZ(24px)" }}>
                      <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900">
                        {w.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                        {w.text}
                      </p>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center lg:col-span-5">
            <div data-speed="0.12" className="w-full max-w-[320px] sm:max-w-md lg:max-w-none">
              <div className="float-y">
                <Image
                  src="/images/about/why-choosen-us-1.png"
                  alt="Why Choose Us illustration"
                  width={600}
                  height={450}
                  className="h-auto max-h-[300px] w-full object-contain sm:max-h-[380px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 6. PARTNERS
// ========================================================
function LogoRow({ reverse = false }: { reverse?: boolean }) {
  const logos = reverse ? [...PARTNER_LOGOS].reverse() : PARTNER_LOGOS;
  return (
    <div className="marquee-pause overflow-hidden py-2">
      <div
        className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
        style={{ animationDuration: reverse ? "50s" : "42s" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {logos.map((logo) => (
              <div
                key={`${copy}-${logo.src}`}
                className="mr-8 flex h-16 w-28 shrink-0 items-center justify-center sm:mr-12 sm:h-20 sm:w-36"
              >
                <Image
                  src={logo.src}
                  alt={copy === 0 ? logo.alt : ""}
                  width={130}
                  height={55}
                  className="max-h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 sm:max-h-12"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Partners() {
  return (
    <section className={`relative ${SECTION_Y}`}>
      <div className="mx-auto mb-10 max-w-6xl px-4 sm:mb-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <Eyebrow>Our Partners</Eyebrow>
          <h2 className={`mb-6 ${H2}`}>
            Our Valuable <span className={GRAD}>Partners</span>
          </h2>
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            We are proud to work alongside trusted partners who support our journey and help us deliver meaningful digital solutions.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden" style={{ perspective: 1200 }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#FAF9F6] to-transparent sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#FAF9F6] to-transparent sm:w-28"
        />
        <div style={{ transform: "rotateX(12deg)" }} className="space-y-3">
          <LogoRow />
          <LogoRow reverse />
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 7. FAQ
// ========================================================
function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className={`relative ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col items-start text-left lg:sticky lg:top-28 lg:col-span-5">
            <h2 className={H2}>
              FAQ&apos;<span className={GRAD}>s</span>
            </h2>
            <p className="mb-4 mt-3 max-w-sm text-sm leading-relaxed text-slate-500 sm:text-base">
              Find quick answers about our services, tech stack, development workflow, and ongoing technical support.
            </p>

            <div className="relative mb-8 h-[180px] w-full max-w-sm sm:h-[240px]">
              <Image
                src="/images/about/FAQ.png"
                alt="Web Mung FAQ illustration"
                fill
                className="object-contain object-left"
              />
            </div>

            <h3 className="mb-2 text-lg font-bold text-[#111827] sm:text-2xl">
              Still Have A Question?
            </h3>
            <p className="mb-6 max-w-xs text-xs text-slate-500 sm:text-sm">
              Can&apos;t find what you&apos;re looking for? Reach out to our engineering team directly.
            </p>
            <Magnetic>
              <Link
                href={CONTACT_HREF}
                className="inline-flex items-center justify-center rounded-full bg-[#111827] px-6 py-3 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#5770D1] sm:px-8 sm:py-3.5 sm:text-sm"
              >
                Contact Us
              </Link>
            </Magnetic>
          </div>

          <div className="w-full divide-y divide-slate-200 border-y border-slate-200 lg:col-span-7">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-[#111827] transition-colors hover:text-[#ff9b06] sm:py-5 sm:text-lg"
                  >
                    <span className="flex items-start gap-4">
                      <span className="mt-1 text-xs font-bold text-slate-300 transition-colors group-hover:text-orange-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{faq.question}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0 text-slate-700"
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pl-8 pr-4 text-xs leading-relaxed text-slate-500 sm:pl-9 sm:pr-6 sm:text-base">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// 8. "LET'S TALK" RING
// ========================================================
const CTA_RING = "LET'S TALK • LET'S TALK • LET'S TALK • ";

function LetsTalkRing() {
  const reduce = useReducedMotion();

  return (
    <Magnetic strength={0.25}>
      <Link
        href={CONTACT_HREF}
        aria-label="Contact us"
        className="group relative flex h-36 w-36 items-center justify-center rounded-full bg-[#ff9b06] text-[#111827] shadow-[0_20px_60px_-15px_rgba(255,155,6,0.6)] transition-transform duration-300 hover:scale-105 sm:h-44 sm:w-44 lg:h-52 lg:w-52"
      >
        <motion.svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          aria-hidden
        >
          <defs>
            <path
              id="wm-cta-ring"
              d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
            />
          </defs>
          <text fontSize="13" fontWeight="800" fill="#111827" letterSpacing="2">
            <textPath href="#wm-cta-ring" textLength="495" lengthAdjust="spacing">
              {CTA_RING}
            </textPath>
          </text>
        </motion.svg>
        <ArrowUpRight className="relative h-10 w-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 sm:h-12 sm:w-12" />
      </Link>
    </Magnetic>
  );
}

// ========================================================
// PAGE
// ========================================================
export default function AboutPage() {
  useSmoothScroll();
  useParallax();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FAF9F6] font-sans text-[#1E2433] selection:bg-[#5770D1]/20 selection:text-[#1E2433]">
      <GlobalStyles />
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <ServicesBand />
        <WhoWeAre />
        <Approach />
        <MissionVision />
        <WhyChoose />
        <Partners />
        <Faq />
      </main>
    </div>
  );
}