"use client";
import Logo from "@/assets/logo.png";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [whatsappNumber] = useState("+1234567890"); // Change to your actual WhatsApp number

  const handleWhatsAppRedirect = () => {
    window.open(
      `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20Web%20Mung!%20I%20would%20like%20to%20discuss%20a%20project.`,
      "_blank",
    );
  };
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF9F6]/80 border-b border-[#2B303A]/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Section matching uploaded Web Mung logo design */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <Image src={Logo} alt="Web Mung Logo" width={150} height={100} />
        </div>

        {/* Navigation Menu Pill (Inspired by screenshot design) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#2B303A]/5 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#2B303A]/5">
          {[
            { name: "Home", path: "/" },
            { name: "About us", path: "/about" },
            { name: "Services", path: "/service" },
            { name: "Our Work", path: "/our-work" },
            { name: "Team", path: "/team" },
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },  
          ].map((item, idx) => (
            <Link
              key={idx}
              href={`${item.path}`}
              className="px-4 py-2 text-sm font-medium text-[#2B303A]/80 hover:text-[#FF652F] transition-colors rounded-full hover:bg-white/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* WhatsApp Action & Direct Contact */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleWhatsAppRedirect}
            className="relative group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 transition-all duration-300 shadow-sm font-semibold text-sm"
            title="Chat on WhatsApp"
          >
            {/* Animated pulse dot */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
            </span>

            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
