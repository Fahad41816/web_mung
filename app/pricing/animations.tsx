"use client";

// ========================================================
// Shared animation primitives + small shared helpers.
// Everything animated on the pricing page lives in this one file:
//   - MovingBorderButton (animated border button)
//   - CardContainer / CardBody / CardItem (3D hover card)
//   - GuaranteeBadge (animated 30-day money-back seal)
//   - CountUp (price count-up on scroll into view)
// The tiny shared helpers (cn, WhatsApp actions) are at the top so no
// extra file is needed for them.
// ========================================================

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Shared helpers ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: put your real WhatsApp number here (country code, no + or spaces), e.g. "8801XXXXXXXXX"
export const WHATSAPP_NUMBER = "1234567890";

export function openWhatsApp(message: string) {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

// Conversion tracking (safe no-op if Meta Pixel / gtag are not installed)
export function track(plan: string) {
  const w = window as any;
  w.fbq?.("trackCustom", "PricingCtaClick", { plan });
  w.gtag?.("event", "pricing_cta_click", { plan });
}

export function handleAction(tierName: string, price: string) {
  track(tierName);
  openWhatsApp(
    `Hello Web Mung! I'm interested in the ${tierName} plan (${price}). I would love to discuss my project requirements.`
  );
}

export function handleContact(source: string) {
  track(source);
  openWhatsApp("Hello Web Mung! I'd like a free consultation about my project.");
}

// ========================================================
// --- MOVING BORDER BUTTON ---
// ========================================================
export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative h-12 w-auto overflow-hidden bg-transparent p-[1px] text-sm",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-200 bg-white text-sm font-semibold text-slate-900 antialiased transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

// Performance: one getTotalLength + one getPointAtLength per frame (was 3 + 2),
// and the animation pauses while the button is off-screen / hidden.
const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const visibleRef = useRef(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = pathRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((time) => {
    if (!visibleRef.current) return;
    const el = pathRef.current;
    if (!el) return;
    try {
      const length = el.getTotalLength?.();
      if (length && length > 0) {
        const pxPerMillisecond = length / duration;
        const point = el.getPointAtLength((time * pxPerMillisecond) % length);
        x.set(point.x);
        y.set(point.y);
      }
    } catch {
      // Ignore if element path is empty or unmeasured
    }
  });

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

// ========================================================
// --- 3D CARD ---
// ========================================================
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

// ========================================================
// --- GUARANTEE SEAL (animated hero badge) ---
// Layers (back → front):
//   1. Sonar ripples        – trust "signal" expanding outward
//   2. Breathing glow       – orange / indigo / teal (your 3 plan colours)
//   3. Float + stamp-in     – gentle bob, bouncy "stamped" entrance
//   4. 3D tilt (cursor)     – spring-smoothed, tactile like a real coin
//   5. Counter-rotating text ring (SVG textPath)
//   6. Your image, STATIC in the middle
//   7. Glossy shine that follows the cursor + twinkling sparkles
// All motion is disabled automatically for users who prefer reduced motion.
// ========================================================
const RING_TEXT = "30 DAYS MONEY BACK GUARANTEE • WEB MUNG • RISK FREE • ";

const SPARKLES = [
  { pos: "top-1 right-3", icon: "w-5 h-5 text-orange-400", delay: 0 },
  { pos: "bottom-5 -left-2", icon: "w-4 h-4 text-indigo-400", delay: 0.9 },
  { pos: "top-1/2 -right-4", icon: "w-3.5 h-3.5 text-teal-400", delay: 1.7 },
];

export function GuaranteeBadge() {
  // The ref lives on the NON-rotating outer wrapper, so the cursor maths
  // stays stable while the badge tilts (no jitter).
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Tilt (spring-smoothed)
  const rx = useSpring(0, { stiffness: 140, damping: 14, mass: 0.6 });
  const ry = useSpring(0, { stiffness: 140, damping: 14, mass: 0.6 });

  // Shine position (%)
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shineBg = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.7), rgba(255,255,255,0.12) 35%, transparent 55%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 26);
    rx.set((0.5 - py) * 26);
    shineX.set(px * 100);
    shineY.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    shineX.set(50);
    shineY.set(50);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-52 h-52 lg:w-64 lg:h-64"
      style={{ perspective: 900 }}
    >
      {/* 1. Sonar ripples */}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute inset-[10%] rounded-full border border-indigo-400/40 pointer-events-none"
            initial={{ scale: 0.9, opacity: 0.55 }}
            animate={{ scale: 1.75, opacity: 0 }}
            transition={{
              duration: 3.9,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut",
            }}
          />
        ))}

      {/* 2. Breathing tri-colour glow */}
      <motion.div
        aria-hidden
        className="absolute inset-[8%] rounded-full bg-gradient-to-tr from-orange-300/45 via-indigo-400/35 to-teal-300/35 blur-2xl pointer-events-none"
        animate={
          reduce
            ? undefined
            : { scale: [0.92, 1.12, 0.92], opacity: [0.55, 0.95, 0.55] }
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Float wrapper */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Stamp-in entrance */}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.5, opacity: 0, rotate: -28 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 12,
            mass: 0.9,
            delay: 0.2,
          }}
        >
          {/* 4. Tilt wrapper */}
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            whileHover={reduce ? undefined : { scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 cursor-pointer select-none rounded-full"
          >
            {/* 5. Counter-rotating text ring */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ transform: "translateZ(26px)" }}
            >
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
                aria-hidden
              >
                <defs>
                  <path
                    id="wm-seal-ring"
                    d="M 100,100 m -88,0 a 88,88 0 1,1 176,0 a 88,88 0 1,1 -176,0"
                  />
                </defs>
                <text
                  fontSize="10.5"
                  fontWeight="700"
                  fill="#1E2433"
                  fillOpacity="0.78"
                  letterSpacing="2"
                >
                  <textPath
                    href="#wm-seal-ring"
                    textLength="550"
                    lengthAdjust="spacing"
                  >
                    {RING_TEXT}
                  </textPath>
                </text>
              </motion.svg>
            </div>

            {/* 6. Your badge image (STATIC in the middle) */}
            <div
              className="absolute inset-[14%]"
              style={{ transform: "translateZ(8px)" }}
            >
              <Image
                src="/images/about/pricing-hero-image.png"
                alt="Money Back 30 Days Guarantee"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>

            {/* 7a. Glossy shine following the cursor */}
            <motion.div
              aria-hidden
              className="absolute inset-[14%] rounded-full pointer-events-none mix-blend-overlay"
              style={{ background: shineBg, transform: "translateZ(40px)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 7b. Twinkling sparkles */}
      {!reduce &&
        SPARKLES.map((s, i) => (
          <motion.div
            key={i}
            aria-hidden
            className={`absolute pointer-events-none ${s.pos}`}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90, 180] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >
            <Sparkles className={`${s.icon} fill-current`} />
          </motion.div>
        ))}
    </div>
  );
}

// ========================================================
// --- COUNT-UP PRICE (runs once when the price scrolls into view) ---
// ========================================================
export function CountUp({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return <span ref={ref}>{to.toLocaleString("en-US")}</span>;
}
