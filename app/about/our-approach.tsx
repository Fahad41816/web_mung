"use client";

// --- OUR APPROACH ---

import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Brain, Code2, Coffee, Palette, type LucideIcon } from "lucide-react";
import { Eyebrow, GRAD, H2, SECTION_Y, Tilt } from "./animations";

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

export function Approach() {
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
