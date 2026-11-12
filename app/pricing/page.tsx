"use client";

import React, { useState, createContext, useContext, useRef, useEffect, useLayoutEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";
import {
  Check,
  MessageCircle,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Folder,
  Plus,
  Minus,
  ChevronDown,
  X,
} from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarGroup } from "@heroui/react";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import Navbar from "@/components/HomePageElements/Navbar";

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- MOVING BORDER BUTTON COMPONENTS (INLINED) ---
function MovingBorderButton({
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

// --- 3D CARD COMPONENTS (INLINED) ---
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

const CardContainer = ({
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

const CardBody = ({
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

const CardItem = ({
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

const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

// --- AVATAR DATA ---
// Performance: images requested at w=200 (they are shown at 24–48px),
// instead of w=600–3500. Same look, a fraction of the download size.
const users = [
  {
    id: 1,
    image: "https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    name: "John Doe",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1757744705465-ea08b0ddc38a?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    name: "Kate Wilson",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1633367583895-08545d733dfe?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    name: "Emily Chen",
  },
  {
    id: 4,
    image: "https://plus.unsplash.com/premium_photo-1705883266860-81c76b274f3b?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    name: "Michael Brown",
  },
];

function ClientAvatars() {
  const total = 12;

  return (
    <AvatarGroup size="md" className="justify-start gap-1">
      {users.slice(0, 3).map((user) => (
        <Avatar key={user.id} className="border-[2.5px] border-white shadow-sm ring-1 ring-slate-100">
          <Avatar.Image 
            alt={user.name} 
            src={user.image} 
            className="object-cover"
          />
          <Avatar.Fallback className="bg-slate-100 text-slate-600 text-xs font-medium">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar.Fallback>
        </Avatar>
      ))}
      <AvatarGroup.Count className="bg-[#EEF3FF] text-[#5770D1] border-[2.5px] border-white shadow-sm ring-1 ring-slate-100 text-xs font-bold">
        +{total - 3}
      </AvatarGroup.Count>
    </AvatarGroup>
  );
}

// --- CONFIG ---
// TODO: put your real WhatsApp number here (country code, no + or spaces), e.g. "8801XXXXXXXXX"
const WHATSAPP_NUMBER = "1234567890";

const HERO_POINTS = ["Clear project pricing", "Free consultation"];

// --- PRICING DATA ---
interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  perk?: string;
  priceLabel: string;
  priceNumber?: number;
  priceText?: string;
  pricePeriod: string;
  priceNote: string;
  range: string;
  description: string;
  buttonText: string;
  buttonVariant: "outline" | "solid";
  featureHeading: string;
  features: string[];
  gradientBg: string;
  patternType: "peach" | "blue" | "teal";
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    priceLabel: "Starting from",
    priceNumber: 10000,
    pricePeriod: "BDT / project",
    priceNote: "Typical range ৳10,000 – 20,000",
    range: "৳10,000 – 20,000",
    description:
      "Good for small businesses, personal portfolios, or simple landing pages looking for clean online presence.",
    buttonText: "Talk to our team",
    buttonVariant: "outline",
    featureHeading: "Starter plan features:",
    features: [
      "Landing page",
      "1 month support",
      "1-5 page design",
      "Hosting and domain setup",
      "Responsive Design",
      "WordPress / Webflow Development",
      "Unlimited revisions",
    ],
    gradientBg: "from-[#FFF4ED] via-[#FFF9F6] to-white",
    patternType: "peach",
  },
  {
    id: "standard",
    name: "Standard",
    badge: "Most popular",
    perk: "30-day free trial",
    priceLabel: "Starting from",
    priceNumber: 30000,
    pricePeriod: "BDT / project",
    priceNote: "Typical range ৳30,000 – 50,000",
    range: "৳30,000 – 50,000",
    description:
      "Best for growing businesses, startups, and service brands needing high conversion and modern engineering.",
    buttonText: "Talk to our team",
    buttonVariant: "solid",
    featureHeading: "Standard features, plus:",
    features: [
      "5–10 Page Custom Design & Development",
      "Custom logo design included",
      "React.js / Next.js development",
      "Meta Pixel setup",
      "Analytics Setup",
      "Hosting and domain setup",
      "2 Months maintenance",
    ],
    gradientBg: "from-[#EEF3FF] via-[#F5F8FF] to-white",
    patternType: "blue",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceLabel: "Starting from",
    priceText: "Custom",
    pricePeriod: "Value-based",
    priceNote: "Quote after a short call",
    range: "Custom scope",
    description:
      "Best for web applications, custom portals, e-commerce stores, or complex systems requiring scalability.",
    buttonText: "Talk to our team",
    buttonVariant: "outline",
    featureHeading: "Organization plan features, plus:",
    features: [
      "Fully Custom Web App / E-Commerce Architecture",
      "Advanced Integrations (Payment gateways, APIs, dashboards, DB)",
      "High-Performance Optimization (SEO-ready, speed & security)",
      "Dedicated Priority Support & Extended Maintenance",
      "Scalable Infrastructure Setup (Cloud/VPS deployment ready)",
    ],
    gradientBg: "from-[#EAF8F8] via-[#F3FAFA] to-white",
    patternType: "teal",
  },
];

// Mobile cards: one feature list for all plans (cumulative, like your "Standard features, plus:" copy).
// from  = first plan that includes it (0 Starter, 1 Standard, 2 Enterprise)
// until = plan index where it is replaced by something bigger (so it is hidden there)
// If a feature is NOT included in a higher plan, give it an `until` so it doesn't show as ✓.
interface Feature {
  label: string;
  from: number;
  until?: number;
}

const FEATURES: Feature[] = [
  { label: "Responsive design", from: 0 },
  { label: "Hosting and domain setup", from: 0 },
  { label: "Landing page", from: 0, until: 1 },
  { label: "1–5 page design", from: 0, until: 1 },
  { label: "WordPress / Webflow development", from: 0, until: 1 },
  { label: "1 month support", from: 0, until: 1 },
  { label: "Unlimited revisions", from: 0 },
  { label: "5–10 page custom design & development", from: 1, until: 2 },
  { label: "Custom logo design included", from: 1 },
  { label: "React.js / Next.js development", from: 1 },
  { label: "Meta Pixel setup", from: 1 },
  { label: "Analytics setup", from: 1 },
  { label: "2 months maintenance", from: 1, until: 2 },
  { label: "Fully custom web app / e-commerce architecture", from: 2 },
  { label: "Advanced integrations (payment gateways, APIs, dashboards, DB)", from: 2 },
  { label: "High-performance optimization (SEO-ready, speed & security)", from: 2 },
  { label: "Dedicated priority support & extended maintenance", from: 2 },
  { label: "Scalable infrastructure setup (Cloud/VPS ready)", from: 2 },
];

function splitFeatures(tierIndex: number) {
  const included = FEATURES.filter(
    (f) => f.from <= tierIndex && tierIndex < (f.until ?? 99)
  );
  // Only show what the NEXT plan adds as "not included" (gentle upgrade nudge)
  const excluded = FEATURES.filter((f) => f.from === tierIndex + 1);
  return { included, excluded };
}

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

// --- FAQ DATA (Web Mung Specific) ---
const FAQS = [
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, for our Standard plan we offer a 30-day free trial. We will provide you with a fully functional staging environment so you can review the design and development before final payment.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely. As your business grows, you can easily upgrade from Starter to Standard or Enterprise. We will simply adjust the scope of work and provide a new proposal for the difference in cost.",
  },
  {
    // TODO: make sure this matches the terms of your 30-day money-back guarantee badge.
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your project at any time. If you cancel during the design phase, you only pay for the work completed up to that milestone. The initial 50% deposit is non-refundable once development begins.",
  },
  {
    question: "How long does a project take?",
    answer:
      "It depends on the plan and the scope. We share a clear timeline in your proposal before the project starts, and you can follow progress on a staging site while we build.",
  },
  {
    question: "Can other info be added to an invoice?",
    answer:
      "Yes. We can include your company name, VAT/TIN number, and specific billing addresses on all official invoices. Just let us know your requirements before we send the final bill.",
  },
  {
    question: "How does billing and milestones work?",
    answer:
      "We require a 50% upfront deposit to kick off the project. The remaining 50% is due upon final review and approval of the completed website, right before we deploy it to your live domain.",
  },
  {
    question: "What happens after my website goes live?",
    answer:
      "Every plan includes post-launch support: 1 month on Starter, 2 months of maintenance on Standard, and extended priority support on Enterprise.",
  },
  {
    question: "Are there any hidden costs, domain, or hosting fees?",
    answer:
      "No hidden fees whatsoever. All our packages include complete domain and hosting configuration. Third-party hosting and domain renewals are billed directly to your own account so you retain 100% ownership.",
  },
];

// --- TESTIMONIALS (module-level: not re-created on every render) ---
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

function GuaranteeBadge() {
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
// --- NOTCHED CARD (mobile pricing card shape) ---
// A rounded card with a "tab" cut out of the top-right corner (badge sits inside).
// The shape is a CSS clip-path generated from the real card size and updated
// live with ResizeObserver, so the curves stay perfect when the card grows
// (e.g. "Show all features").
// ========================================================
const NOTCH = { r: 30, w: 118, h: 44, r1: 16, r2: 16, rb: 22 };

function notchPath(w: number, h: number) {
  const { r, w: nw, h: nh, r1, r2, rb } = NOTCH;
  const px = w - nw;
  return [
    `M ${r} 0`,
    `H ${px - r1}`,
    `A ${r1} ${r1} 0 0 1 ${px} ${r1}`,
    `V ${nh - r2}`,
    `A ${r2} ${r2} 0 0 0 ${px + r2} ${nh}`,
    `H ${w - rb}`,
    `A ${rb} ${rb} 0 0 1 ${w} ${nh + rb}`,
    `V ${h - r}`,
    `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
    `H ${r}`,
    `A ${r} ${r} 0 0 1 0 ${h - r}`,
    `V ${r}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    "Z",
  ].join(" ");
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function NotchCard({
  className = "",
  stroke,
  shadow,
  badge,
  children,
}: {
  className?: string;
  stroke?: string;
  shadow?: string;
  badge: React.ReactNode;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);

  useIsoLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const apply = () => {
      const d = notchPath(el.offsetWidth, el.offsetHeight);
      el.style.clipPath = `path('${d}')`;
      strokeRef.current?.setAttribute("d", d);
    };
    apply();
    setReady(true);
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative" style={{ opacity: ready ? 1 : 0, filter: shadow }}>
      <div ref={cardRef} className={className}>
        {children}
      </div>

      {stroke && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-visible"
          fill="none"
        >
          <path ref={strokeRef} stroke={stroke} strokeWidth={1.5} />
        </svg>
      )}

      <div
        className="absolute right-0 top-0 flex items-center justify-center"
        style={{ width: NOTCH.w, height: NOTCH.h }}
      >
        {badge}
      </div>
    </div>
  );
}

function TabBadge({
  label,
  dot,
  className = "",
}: {
  label: string;
  dot: string;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-1.5 text-[11px] font-bold ${className}`}>
      {label}
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
    </span>
  );
}

// --- COUNT-UP PRICE (runs once when the price scrolls into view) ---
function CountUp({ to, duration = 1.2 }: { to: number; duration?: number }) {
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

// --- MOBILE PLAN CARD CONTENT ---
function FeatureRow({ label, ok, dark }: { label: string; ok: boolean; dark: boolean }) {
  return (
    <div role="listitem" className="flex items-start gap-3 text-[13px] leading-snug">
      {ok ? (
        <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#22C55E] text-white shadow-sm">
          <Check className="h-3 w-3 stroke-[3]" />
        </span>
      ) : (
        <X
          className={`mt-px h-5 w-5 shrink-0 p-0.5 ${dark ? "text-slate-600" : "text-slate-400"}`}
        />
      )}
      <span
        className={
          ok
            ? dark
              ? "text-slate-100"
              : "text-[#1E2433]"
            : dark
            ? "text-slate-500"
            : "text-slate-400"
        }
      >
        {label}
      </span>
    </div>
  );
}

function ExtraRows({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="space-y-3.5 pt-3.5">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PlanBody({
  index,
  dark,
  ctaClass,
  onAction,
}: {
  index: number;
  dark: boolean;
  ctaClass: string;
  onAction: (plan: string, price: string) => void;
}) {
  const tier = PRICING_TIERS[index];
  const [expanded, setExpanded] = useState(false);
  const { included, excluded } = splitFeatures(index);
  const extraCount = Math.max(included.length - 5, 0) + Math.max(excluded.length - 2, 0);

  return (
    <div className="px-6 pb-6" style={{ paddingTop: NOTCH.h + 14 }}>
      {/* Title */}
      <div className="flex flex-wrap items-center gap-2">
        <h4
          className={`text-xl font-semibold tracking-tight ${
            dark ? "text-white" : "text-[#111827]"
          }`}
        >
          {tier.name}
        </h4>
        {tier.perk && (
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#C7D2FE]">
            {tier.perk}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mt-4">
        <p
          className={`text-[46px] font-light leading-none tracking-tight ${
            dark ? "text-[#A5B4FC]" : "text-[#111827]"
          }`}
        >
          {tier.priceNumber ? (
            <>
              <span className="mr-0.5 text-[30px]"></span>
              <CountUp to={tier.priceNumber} />
            </>
          ) : (
            tier.priceText
          )}
        </p>
        <p className={`mt-2 text-[12px] font-medium ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {tier.priceLabel} · {tier.pricePeriod}
        </p>
        <p className={`text-[11px] ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {tier.priceNote}
        </p>
      </div>

      <p
        className={`mt-4 text-[13px] leading-relaxed ${
          dark ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {tier.description}
      </p>

      <div
        className={`my-5 border-b border-dashed ${
          dark ? "border-slate-600/70" : "border-slate-300/80"
        }`}
      />

      {/* Features */}
      <div role="list" className="space-y-3.5">
        {included.slice(0, 5).map((f) => (
          <FeatureRow key={f.label} label={f.label} ok dark={dark} />
        ))}
        <ExtraRows show={expanded && included.length > 5}>
          {included.slice(5).map((f) => (
            <FeatureRow key={f.label} label={f.label} ok dark={dark} />
          ))}
        </ExtraRows>
        {excluded.slice(0, 2).map((f) => (
          <FeatureRow key={f.label} label={f.label} ok={false} dark={dark} />
        ))}
        <ExtraRows show={expanded && excluded.length > 2}>
          {excluded.slice(2).map((f) => (
            <FeatureRow key={f.label} label={f.label} ok={false} dark={dark} />
          ))}
        </ExtraRows>
      </div>

      {extraCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className={`mt-4 flex w-full items-center justify-center gap-1 text-[12px] font-semibold cursor-pointer ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {expanded ? "Show less" : `Show all features (+${extraCount})`}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* CTA */}
      <button
        type="button"
        onClick={() => onAction(tier.name, tier.range)}
        className={`mt-5 w-full rounded-full py-3.5 text-center text-sm font-bold shadow-sm transition-all cursor-pointer ${ctaClass}`}
      >
        {tier.buttonText}
      </button>
      <p
        className={`mt-2.5 text-center text-[11px] ${dark ? "text-slate-400" : "text-slate-500"}`}
      >
        Free consultation · No payment today
      </p>
    </div>
  );
}

const HATCH =
  "repeating-linear-gradient(135deg, rgba(255,255,255,0.22) 0 2px, transparent 2px 6px)";

function MobilePlanCard({
  index,
  onAction,
}: {
  index: number;
  onAction: (plan: string, price: string) => void;
}) {
  // Plan 1: light card with a thin outline that follows the notch
  if (index === 0) {
    return (
      <NotchCard
        className="bg-gradient-to-br from-[#FFF4ED] via-white to-[#FFE3CF]"
        stroke="#E4B290"
        shadow="drop-shadow(0 14px 24px rgba(251,146,60,0.18))"
        badge={<TabBadge label="Quick start" dot="bg-orange-400" className="text-[#7C3A12]" />}
      >
        <PlanBody
          index={0}
          dark={false}
          onAction={onAction}
          ctaClass="bg-white border border-[#E4B290] text-[#7C2D12] hover:bg-[#FFF4ED]"
        />
      </NotchCard>
    );
  }

  // Plan 2: dark card inside a hatched frame (recommended plan)
  if (index === 1) {
    return (
      <div
        className="rounded-[40px] p-[10px]"
        style={{
          backgroundColor: "#5770D1",
          backgroundImage: HATCH,
          boxShadow: "0 18px 45px -8px rgba(87,112,209,0.45)",
        }}
      >
        <NotchCard
          className="bg-[#14171F]"
          badge={<TabBadge label="Most popular" dot="bg-white" className="text-white" />}
        >
          <PlanBody
            index={1}
            dark
            onAction={onAction}
            ctaClass="bg-white text-[#0B0F19] hover:bg-slate-100 font-black"
          />
        </NotchCard>
      </div>
    );
  }

  // Plan 3: soft gradient card, no outline, floating shadow
  return (
    <NotchCard
      className="bg-gradient-to-br from-[#EAF8F8] via-white to-[#D3F1EC]"
      shadow="drop-shadow(0 16px 28px rgba(20,184,166,0.2))"
      badge={<TabBadge label="For scale" dot="bg-teal-500" className="text-[#0F766E]" />}
    >
      <PlanBody
        index={2}
        dark={false}
        onAction={onAction}
        ctaClass="bg-white border border-[#5EEAD4] text-[#0F766E] hover:bg-[#EAF8F8]"
      />
    </NotchCard>
  );
}

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
  step: { title: string; text: string };
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
        <p className="mt-1 text-sm leading-relaxed text-slate-500 md:px-2">{step.text}</p>
      </div>
    </motion.li>
  );
}

// --- PROCESS (scroll-drawn squiggly line) ---
function ProcessSection() {
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

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeMobileTier, setActiveMobileTier] = useState<number>(1);
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

  const openWhatsApp = (message: string) => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Conversion tracking (safe no-op if Meta Pixel / gtag are not installed)
  const track = (plan: string) => {
    const w = window as any;
    w.fbq?.("trackCustom", "PricingCtaClick", { plan });
    w.gtag?.("event", "pricing_cta_click", { plan });
  };

  const handleAction = (tierName: string, price: string) => {
    track(tierName);
    openWhatsApp(
      `Hello Web Mung! I'm interested in the ${tierName} plan (${price}). I would love to discuss my project requirements.`
    );
  };

  const handleContact = (source: string) => {
    track(source);
    openWhatsApp("Hello Web Mung! I'd like a free consultation about my project.");
  };

  const goMobileTier = (dir: number) =>
    setActiveMobileTier((prev) => (prev + dir + 3) % 3);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E2433] selection:bg-[#5770D1]/20 selection:text-[#1E2433] relative overflow-hidden font-sans">
      {/* Background Architectural Blueprint Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.55]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient background soft light gradients */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#E6ECFC]/60 via-[#F0F4FD]/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[650px] -left-48 w-96 h-96 bg-orange-100/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[850px] -right-48 w-96 h-96 bg-teal-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation Bar */}
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-24 sm:pb-32">
        {/* HERO / SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-start justify-center gap-4 md:gap-6 lg:gap-40 sm:mb-16">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-xl flex flex-col"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111827] tracking-tight leading-[1.12]">
              World-Class <br />
              Engineering, Local <br />
              Pricing at WEB <span className="text-orange-400">MUNG</span>
            </h1>

            {/* Avatar Group - directly after 'Pricing' */}
            <div className="flex items-center gap-3 mt-4">
              <ClientAvatars />
              <span className="text-sm font-medium text-slate-600">
                Trusted by 12+ clients
              </span>
            </div>

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal max-w-lg mt-4">
              Stop overpaying for basic templates. Get custom-designed, high-performance digital products built by expert engineers to scale your business.
            </p>

            {/* Trust points */}
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-slate-600">
              {HERO_POINTS.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 stroke-[3] text-emerald-600" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Content: Animated 30-Day Money Back Guarantee Seal (Hidden on mobile) */}
          <div className="hidden md:flex items-center justify-center relative shrink-0">
            <GuaranteeBadge />
          </div>
        </div>

        <div id="plans" className="scroll-mt-24">
          {/* ======================================================== */}
          {/* DESKTOP PRICING CARDS (visible on md+) */}
          {/* ======================================================== */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
            {PRICING_TIERS.map((tier, index) => {
              const isMiddle = tier.id === "standard";

              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.12,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  whileHover={{
                    y: -6,
                    transition: { type: "spring", stiffness: 350, damping: 25 },
                  }}
                  className={`relative flex flex-col bg-white rounded-[26px] border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_40px_-8px_rgba(15,23,42,0.08)] transition-all duration-300 ${
                    isMiddle ? "ring-1 ring-[#5770D1]/25" : ""
                  }`}
                >
                  {/* Floating pill badge for the recommended card */}
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
                      <span className="inline-block bg-[#5770D1] text-white text-[11px] font-semibold tracking-wide px-3.5 py-1 rounded-full shadow-md whitespace-nowrap">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Upper Hero Block */}
                  <div
                    className={`relative p-7 sm:p-8 bg-gradient-to-b ${tier.gradientBg} rounded-t-[26px] overflow-hidden`}
                  >
                    {/* SVG Patterns */}
                    {tier.patternType === "peach" && (
                      <svg
                        className="absolute top-0 right-0 w-44 h-44 pointer-events-none opacity-40"
                        viewBox="0 0 160 160"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="75" y="12" width="32" height="32" stroke="#FDBA8C" strokeWidth="1" strokeDasharray="2 2" />
                        <rect x="110" y="12" width="32" height="32" stroke="#FDBA8C" strokeWidth="1" />
                        <rect x="75" y="46" width="32" height="32" stroke="#FDBA8C" strokeWidth="1" />
                        <rect x="110" y="46" width="32" height="32" stroke="#FDBA8C" strokeWidth="1" strokeDasharray="2 2" />
                        <rect x="40" y="46" width="32" height="32" stroke="#FDBA8C" strokeWidth="1" />
                        <rect x="75" y="80" width="32" height="32" stroke="#FDBA8C" strokeWidth="1" />
                        <rect x="110" y="80" width="32" height="32" stroke="#FDBA8C" strokeWidth="1" />
                      </svg>
                    )}

                    {tier.patternType === "blue" && (
                      <svg
                        className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-50"
                        viewBox="0 0 180 180"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line x1="50" y1="22" x2="170" y2="22" stroke="#C7D2FE" strokeWidth="1" />
                        <line x1="50" y1="56" x2="170" y2="56" stroke="#C7D2FE" strokeWidth="1" />
                        <line x1="50" y1="90" x2="170" y2="90" stroke="#C7D2FE" strokeWidth="1" />
                        <line x1="80" y1="10" x2="80" y2="130" stroke="#C7D2FE" strokeWidth="1" />
                        <line x1="115" y1="10" x2="115" y2="130" stroke="#C7D2FE" strokeWidth="1" />
                        <line x1="150" y1="10" x2="150" y2="130" stroke="#C7D2FE" strokeWidth="1" />
                        <circle cx="80" cy="56" r="2.5" fill="#818CF8" />
                        <circle cx="115" cy="56" r="2.5" fill="#818CF8" />
                        <circle cx="150" cy="56" r="2.5" fill="#818CF8" />
                        <circle cx="115" cy="90" r="2.5" fill="#818CF8" />
                      </svg>
                    )}

                    {tier.patternType === "teal" && (
                      <svg
                        className="absolute top-0 right-0 w-48 h-48 pointer-events-none opacity-45"
                        viewBox="0 0 180 180"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect x="62" y="20" width="85" height="85" stroke="#99F6E4" strokeWidth="1" />
                        <rect x="82" y="40" width="45" height="45" stroke="#5EEAD4" strokeWidth="1" />
                        <line x1="62" y1="62.5" x2="147" y2="62.5" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="104.5" y1="20" x2="104.5" y2="105" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="128" y1="10" x2="128" y2="130" stroke="#99F6E4" strokeWidth="1" />
                      </svg>
                    )}

                    {/* Tier Content */}
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-extrabold text-[#1E2433] tracking-tight">
                          {tier.name}
                        </h3>
                        {tier.perk && (
                          <span className="rounded-full bg-[#5770D1]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#4256B0]">
                            {tier.perk}
                          </span>
                        )}
                      </div>

                      <div className="mt-5 mb-2.5">
                        <p className="text-[13px] font-normal text-slate-500">
                          {tier.priceLabel}
                        </p>
                        <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                          <span className="text-3xl sm:text-[34px] font-extrabold text-[#111827] tracking-tight">
                            {tier.priceNumber ? (
                              <>
                                <CountUp to={tier.priceNumber} />
                              </>
                            ) : (
                              tier.priceText
                            )}
                          </span>
                          <span className="text-xs sm:text-[13px] text-slate-500 font-normal">
                            {tier.pricePeriod}
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] text-slate-500">{tier.priceNote}</p>
                      </div>

                      <p className="text-[13px] text-slate-600 leading-relaxed min-h-[48px] mb-6">
                        {tier.description}
                      </p>

                      <div className="w-full">
                        <MovingBorderButton
                          borderRadius="0.75rem"
                          containerClassName="w-full h-[46px]"
                          className={`w-full h-full text-sm font-semibold transition-all duration-200 ${
                            tier.buttonVariant === "solid"
                              ? "bg-[#5770D1] text-white hover:bg-[#475EBC] border-none"
                              : "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200/90 shadow-sm"
                          }`}
                          onClick={() => handleAction(tier.name, tier.range)}
                        >
                          {tier.buttonText}
                        </MovingBorderButton>
                        <p className="mt-2.5 text-center text-[11px] text-slate-500">
                          Free consultation · No payment today
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-px bg-slate-100" />

                  {/* Features Section */}
                  <div className="p-7 sm:p-8 bg-white flex-1 flex flex-col justify-between rounded-b-[26px]">
                    <div>
                      <h4 className="text-sm font-semibold text-[#111827] mb-5 tracking-tight">
                        {tier.featureHeading}
                      </h4>

                      <ul className="space-y-3.5">
                        {tier.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-[#334155] leading-snug"
                          >
                            <Check className="w-4 h-4 text-[#111827] shrink-0 mt-0.5 stroke-[2.2]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* MOBILE PRICING CARDS (notched card design) */}
          {/* ======================================================== */}
          <div className="block md:hidden pt-2 mt-10">
            {/* Pricing Title & 3 Stepper Dashes */}
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-2xl font-extrabold text-[#111827] tracking-tight">
                Pricing
              </h3>

              {/* 3 Indicator Dashes with color tone from active card */}
              <div className="flex items-center gap-1.5 bg-slate-100/90 px-2.5 py-1.5 rounded-full border border-slate-200/70">
                {[0, 1, 2].map((idx) => {
                  const activeColor =
                    activeMobileTier === 0
                      ? "bg-[#F97316]"
                      : activeMobileTier === 1
                      ? "bg-[#5770D1]"
                      : "bg-[#0D9488]";

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveMobileTier(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeMobileTier === idx
                          ? `w-7 ${activeColor}`
                          : "w-2.5 bg-slate-300"
                      }`}
                      aria-label={`View plan ${idx + 1}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Quick Plan Tabs Selector with matching real colors */}
            <div className="flex items-center justify-between p-1 bg-slate-100/90 rounded-full mb-5 border border-slate-200/80">
              {[
                { name: "Starter", activeClass: "bg-[#FFF4ED] text-[#C2410C] border border-[#FDBA8C] shadow-sm" },
                { name: "Standard", activeClass: "bg-[#5770D1] text-white shadow-sm" },
                { name: "Enterprise", activeClass: "bg-[#0D9488] text-white shadow-sm" },
              ].map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMobileTier(idx)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    activeMobileTier === idx
                      ? tab.activeClass
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Card (swipe left / right to change plan) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMobileTier}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) goMobileTier(1);
                  else if (info.offset.x > 70) goMobileTier(-1);
                }}
              >
                <MobilePlanCard index={activeMobileTier} onAction={handleAction} />
              </motion.div>
            </AnimatePresence>

            {/* Previous / Next Plan Switcher on Mobile */}
            <div className="flex items-center justify-between mt-4 px-2 text-xs text-slate-500">
              <button
                onClick={() => goMobileTier(-1)}
                className="flex items-center gap-1 font-medium hover:text-slate-800 transition-colors py-1 cursor-pointer"
              >
                ← Previous plan
              </button>
              <span className="text-[11px] text-slate-400 font-medium">
                {activeMobileTier + 1} of 3
              </span>
              <button
                onClick={() => goMobileTier(1)}
                className="flex items-center gap-1 font-medium hover:text-slate-800 transition-colors py-1 cursor-pointer"
              >
                Next plan →
              </button>
            </div>
          </div>
        </div>

        {/* HOW WE WORK */}
        <ProcessSection />

        {/* ======================================================== */}
        {/* REVIEW SECTION WITH 3D HOVER ANIMATION */}
        {/* ======================================================== */}
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

        {/* ======================================================== */}
        {/* FAQ SECTION (According to Web Mung website design) */}
        {/* ======================================================== */}
        <section className="mt-28 sm:mt-36 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
            {/* Left Column: Heading, Illustration & Contact Info */}
            <div className="lg:col-span-5 flex flex-col items-start text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0f172a] leading-[1.15]">
                FAQ&apos; <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-200 bg-clip-text text-transparent">s</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed mt-3 mb-6 max-w-sm font-normal">
                Find quick answers about our pricing packages, development workflow, billing milestones, and ongoing technical support.
              </p>

              {/* FAQ-pricing Image */}
              <div className="relative w-full max-w-sm h-[200px] xs:h-[220px] sm:h-[260px] mb-8">
                <Image
                  src="/images/about/FAQ-pricing.png"
                  alt="Web Mung FAQ illustration"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-lg sm:text-2xl font-bold text-[#0f172a] mb-2">
                  Still Have A Question?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-xs leading-relaxed">
                  Can&apos;t find what you&apos;re looking for? Reach out to our engineering team directly.
                </p>
                <div className="flex items-center gap-3">      
                  <MovingBorderButton
                    borderRadius="1.75rem"
                    containerClassName="h-12 w-auto"
                    className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-none px-5 text-sm font-semibold transition-colors duration-200"
                    onClick={() => handleContact("FAQ WhatsApp")}
                  >
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp</span>
                    </span>
                  </MovingBorderButton>
                </div>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200 w-full">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="py-2">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-lg text-[#0f172a] hover:text-[#ff9b06] transition-colors cursor-pointer"
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
        </section>

        {/* ======================================================== */}
        {/* LAUNCH FASTER / PRODUCTION-READY UI SECTION */}
        {/* ======================================================== */}
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
                          Let's launch your site this week.
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
      </main>

  
    </div>
  );
}