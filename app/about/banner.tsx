"use client";

// --- BANNER (hero + services band) ---

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";
import { EASE, GRAD } from "./animations";

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

// ========================================================
// 1. HERO
// ========================================================
export function Hero() {
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
export function ServicesBand() {
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
