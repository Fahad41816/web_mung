"use client";

// ========================================================
// Shared animation primitives, hooks and small reusable pieces.
// Everything the About sections share lives in this one file:
//   - useSmoothScroll (Lenis) + useParallax (GSAP)
//   - GlobalStyles, Eyebrow, Tilt, Magnetic
//   - CountUp, Word, ScrollWords (scroll-reveal text)
//   - Shared constants: EASE, GRAD, SECTION_Y, H2, CONTACT_HREF
// ========================================================

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- SHARED CONSTANTS ---
export const CONTACT_HREF = "/contact";

export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];
export const GRAD =
  "bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent";

export const SECTION_Y = "py-12 sm:py-14 lg:py-16";
export const H2 =
  "text-balance text-[clamp(1.75rem,1.1rem_+_2.9vw,3rem)] font-extrabold leading-[1.15] tracking-tight text-[#111827]";

// ========================================================
// GLOBAL HOOKS
// ========================================================
export function useSmoothScroll() {
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

export function useParallax() {
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
export function GlobalStyles() {
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

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-[1.5px] w-8 rounded-full bg-orange-400" aria-hidden />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-500">
        {children}
      </span>
    </div>
  );
}

export function Tilt({
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

export function Magnetic({
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

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
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

export function Word({
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

export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
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
