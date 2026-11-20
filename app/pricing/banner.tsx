"use client";

// --- BANNER (hero) ---
// Headline, client avatars, trust points, and the animated guarantee seal.
// `users` is also used by the final CTA chat card, so it is exported here
// and imported from ./banner there (no duplicated data).

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Avatar, AvatarGroup } from "@heroui/react";
import { GuaranteeBadge } from "./animations";

const HERO_POINTS = ["Clear project pricing", "Free consultation"];

// Performance: images requested at w=200 (they are shown at 24–48px),
// instead of w=600–3500. Same look, a fraction of the download size.
export const users = [
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

export function PricingHero() {
  return (
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
  );
}
