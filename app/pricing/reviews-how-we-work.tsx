"use client";

// --- REVIEWS + HOW WE WORK ---
// The "How we work" scroll-drawn process and the auto-advancing 3D
// testimonial card live together — both are mid-page trust sections.

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CardBody, CardContainer, CardItem } from "./animations";

// ========================================================
// --- HOW WE WORK (scroll-drawn squiggly line) ---
// ========================================================
const STEPS = [
  {
    title: "Discuss",
  },
  {
    title: "Design",
  },
  {
    title: "Develop"
  },
  {
    title: "Launch",
  },
];

// --- WAVE PATHS (generated once) ---
// Desktop: horizontal wave crossing each step circle (x = 125, 375, 625, 875 of 1000)
const H_WAVE = (() => {
  const amp = 18;
  let d = "M125 20";
  for (let i = 0; i < 6; i++) {
    const x0 = 125 + i * 125;
    const dir = i % 2 === 0 ? -1 : 1;
    d += ` C ${x0 + 40} ${20 + dir * amp}, ${x0 + 85} ${20 + dir * amp}, ${x0 + 125} 20`;
  }
  return d;
})();

// Mobile: vertical wave running down the left side
const V_WAVE = (() => {
  const amp = 12;
  const seg = 37.5;
  let d = "M20 0";
  for (let i = 0; i < 8; i++) {
    const y0 = i * seg;
    const dir = i % 2 === 0 ? 1 : -1;
    d += ` C ${20 + dir * amp} ${y0 + 12}, ${20 + dir * amp} ${y0 + 25.5}, 20 ${y0 + seg}`;
  }
  return d;
})();

function ProcessStep({
  step,
  index,
  progress,
  reduce,
}: {
  // NOTE: STEPS only has titles right now — text is optional, so the
  // step renders title-only. Add a `text` line per step above if you
  // want a description under each step.
  step: { title: string; text?: string };
  index: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // Each step appears when the wave reaches its circle
  const start = (index / 3) * 0.9;
  const range = [start - 0.1, start + 0.02];
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [24, 0]);
  const scale = useTransform(progress, range, [0.6, 1]);

  return (
    <motion.li
      style={reduce ? undefined : { opacity, y }}
      className="flex gap-4 md:flex-col md:items-center md:text-center"
    >
      <motion.span
        style={reduce ? undefined : { scale }}
        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-bold text-[#111827] shadow-sm"
      >
        {index + 1}
      </motion.span>
      <div>
        <h3 className="text-base font-bold text-[#111827]">{step.title}</h3>
        {step.text && (
          <p className="mt-1 text-sm leading-relaxed text-slate-500 md:px-2">{step.text}</p>
        )}
      </div>
    </motion.li>
  );
}

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 });
  const draw = useTransform(progress, [0, 0.9], [0, 1]);
  const pathStyle = reduce ? { pathLength: 1 } : { pathLength: draw };

  return (
    <section className="mt-24 sm:mt-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
          How we work
        </h2>
        <p className="mt-3 text-center text-sm sm:text-base text-slate-500">
          Four clear steps, and you approve each one before we move on.
        </p>

        <div ref={ref} className="relative mt-12">
          {/* Desktop: horizontal squiggly line */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-0 hidden h-10 w-full overflow-visible md:block"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="wm-wave-h" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="50%" stopColor="#5770D1" />
                <stop offset="100%" stopColor="#2DD4BF" />
              </linearGradient>
            </defs>
            <path
              d={H_WAVE}
              stroke="#E2E8F0"
              strokeWidth={2}
              strokeDasharray="4 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={H_WAVE}
              stroke="url(#wm-wave-h)"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={pathStyle}
            />
          </svg>

          {/* Mobile: vertical squiggly line */}
          <svg
            aria-hidden
            className="pointer-events-none absolute bottom-5 left-0 top-5 w-10 overflow-visible md:hidden"
            viewBox="0 0 40 300"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="wm-wave-v" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="50%" stopColor="#5770D1" />
                <stop offset="100%" stopColor="#2DD4BF" />
              </linearGradient>
            </defs>
            <path
              d={V_WAVE}
              stroke="#E2E8F0"
              strokeWidth={2}
              strokeDasharray="4 6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d={V_WAVE}
              stroke="url(#wm-wave-v)"
              strokeWidth={2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={pathStyle}
            />
          </svg>

          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-4">
            {STEPS.map((s, i) => (
              <ProcessStep key={s.title} step={s} index={i} progress={progress} reduce={reduce} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ========================================================
// --- REVIEWS (3D hover card, auto-advancing) ---
// ========================================================
// TESTIMONIALS are module-level: not re-created on every render.
const TESTIMONIALS = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Working with Web Mung was a breeze. They understood our brand perfectly and delivered a stunning website ahead of schedule.",
    name: "David Miller",
    designation: "Founder at Bloom Studio",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function ReviewsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  // Auto-advance reviews (pauses on hover, off for reduced-motion users)
  useEffect(() => {
    if (reviewsPaused || reduceMotion) return;
    const id = setInterval(
      () => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length),
      6000
    );
    return () => clearInterval(id);
  }, [reviewsPaused, reduceMotion]);

  return (
    <div
      className="mt-24 sm:mt-32 flex flex-col items-center justify-center relative w-full"
      onMouseEnter={() => setReviewsPaused(true)}
      onMouseLeave={() => setReviewsPaused(false)}
    >
      <div className="flex gap-1 mb-6 text-[#111827]">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      <CardContainer className="inter-var w-full max-w-3xl">
        <CardBody className="bg-transparent relative w-full h-auto rounded-xl py-8 px-4 sm:px-12 flex flex-col items-center text-center">
          <CardItem
            translateZ="30"
            className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-[#111827] leading-snug max-w-2xl"
          >
            "{TESTIMONIALS[activeTestimonial].quote}"
          </CardItem>

          <CardItem translateZ="40" className="mt-8 flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={TESTIMONIALS[activeTestimonial].src}
                alt={TESTIMONIALS[activeTestimonial].name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-[#111827]">{TESTIMONIALS[activeTestimonial].name}</p>
              <p className="text-xs text-slate-500">{TESTIMONIALS[activeTestimonial].designation}</p>
            </div>
          </CardItem>

          {/* Navigation Buttons inside the card */}
          <div className="flex gap-8 sm:gap-14 md:gap-20 mt-6 sm:mt-8 relative z-20">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              aria-label="Previous review"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <svg className="h-5 w-5 text-slate-700 transition-transform duration-300 group-hover/button:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
              aria-label="Next review"
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <svg className="h-5 w-5 text-slate-700 transition-transform duration-300 group-hover/button:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress dots */}
          <div className="mt-5 flex items-center gap-1.5 relative z-20">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Show review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeTestimonial ? "w-6 bg-[#111827]" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
