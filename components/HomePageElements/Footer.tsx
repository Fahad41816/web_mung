"use client";

import { ArrowRight, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const email = "hello@webmung.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <footer className="w-full bg-[#181924] text-white   ">
      {/* Main Footer Dark Container Card */}
      <div className="relative overflow-hidden bg-[#0B0C10] rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Ambient Background Gradient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5C38]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2DD4BF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* LEFT COLUMN: Call to Action & Contact Info */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              {/* Category Tag */}
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5C38] mb-3 block">
                CONTACT US
              </span>

              {/* Main Tagline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-md">
                Let's Build Something Bold Together.
              </h2>
            </div>

            {/* Schedule Call Button */}
            <div>
              <a
                href="#schedule"
                className="inline-flex items-center justify-center gap-3 bg-white text-slate-950 font-semibold px-7 py-3.5 rounded-full shadow-lg hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>Schedule a call now</span>
                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Email Interactive Copy Card */}
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
                OR EMAIL US AT
              </span>

              <div className="inline-flex items-center gap-3 bg-[#161822] border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-2xl transition-all group max-w-full">
                <Mail className="w-4 h-4 text-[#2DD4BF]" />
                <span className="text-sm font-medium text-slate-200 select-all font-mono tracking-tight">
                  {email}
                </span>
                <button
                  onClick={handleCopy}
                  title="Copy email address"
                  className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors relative"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in-50" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Copy Notification Toast */}
              {copied && (
                <span className="block text-xs text-emerald-400 font-medium mt-2 animate-fade-in">
                  ✓ Email copied to clipboard!
                </span>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Link Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 pt-4 lg:pt-0">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2DD4BF] mb-5">
                QUICK LINKS
              </h3>
              <ul className="space-y-3.5 text-sm font-medium">
                {["Home", "Case Studies", "Gallery", "Blogs", "About Me"].map(
                  (link, i) => (
                    <li key={i}>
                      <a
                        href={`#${link.toLowerCase().replace(" ", "-")}`}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-1 group"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {link}
                        </span>
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Information Links Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#2DD4BF] mb-5">
                INFORMATION
              </h3>
              <ul className="space-y-3.5 text-sm font-medium">
                {["Terms of Service", "Privacy Policy", "Cookies Settings"].map(
                  (link, i) => (
                    <li key={i}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-px bg-slate-800/80 my-8 sm:my-12"></div>

        {/* Bottom Row: Copyright & Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <div className="tracking-widest uppercase">
            © {new Date().getFullYear()} WEB MUNG. ALL RIGHTS RESERVED.
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-5 text-slate-400">
            <a
              href="#facebook"
              aria-label="Facebook"
              className="hover:text-[#FF5C38] transition-colors p-1"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a
              href="#twitter"
              aria-label="Twitter"
              className="hover:text-[#FF5C38] transition-colors p-1"
            >
              <BsTwitter className="w-4 h-4" />
            </a>
            <a
              href="#instagram"
              aria-label="Instagram"
              className="hover:text-[#FF5C38] transition-colors p-1"
            >
              <BsInstagram className="w-4 h-4" />
            </a>
            {/* <a
              href="#linkedin"
              aria-label="LinkedIn"
              className="hover:text-[#FF5C38] transition-colors p-1"
            >
              <LiaLinkedin className="w-4 h-4" />
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
