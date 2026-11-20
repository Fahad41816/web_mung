"use client";

// --- PRICING CARDS (desktop grid + mobile notched cards) ---
// All pricing data lives at the top of this file. Desktop cards and the
// mobile swipe cards are in the same file because they render the same
// three plans — change a price once, both update.

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { CountUp, MovingBorderButton, handleAction } from "./animations";

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
    priceNumber: 15000,
    pricePeriod: "BDT / project",
    priceNote: "Typical range ৳15,000 – 30,000",
    range: "৳15,000 – 30,000",
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

// ========================================================
// --- DESKTOP PRICING CARDS (visible on md+) ---
// ========================================================
export function DesktopPricingCards() {
  return (
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

// ========================================================
// --- MOBILE PRICING CARDS (visible below md) ---
// ========================================================
export function MobilePricingSection() {
  const [activeMobileTier, setActiveMobileTier] = useState<number>(1);

  const goMobileTier = (dir: number) =>
    setActiveMobileTier((prev) => (prev + dir + 3) % 3);

  return (
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
  );
}
