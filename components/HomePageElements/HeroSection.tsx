"use client";
import {
  ArrowUpRight,
  Calendar,
  Code,
  Globe,
  Layers,
  MessageCircle,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
 

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2B303A] font-sans selection:bg-[#FF652F] selection:text-white relative overflow-hidden">
      {/* Background Decorative Glow Gradients matching logo colors */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#FF652F]/15 via-[#4ECDC4]/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-gradient-to-bl from-[#4ECDC4]/15 via-[#FF652F]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Dynamic Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-[#2B303A] 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

     
    

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF652F]/10 border border-[#FF652F]/20 text-[#FF652F] text-xs sm:text-sm font-semibold mb-8 animate-fade-in shadow-xs">
            <Sparkles className="w-4 h-4 text-[#FF652F]" />
            <span>Transforming Ideas into Digital Magic</span>
            <span className="bg-[#4ECDC4] text-[#2B303A] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              New
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#2B303A] leading-[1.1] mb-6">
            Building bold brands <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF652F] via-[#FF8552] to-[#4ECDC4] bg-clip-text text-transparent">
              with thoughtful design
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-[#2B303A]/70 leading-relaxed mb-10 font-normal">
            At{" "}
            <strong className="text-[#2B303A] font-semibold">Web Mung</strong>,
            we empower ambitious startups and enterprises with high-performing
            web applications, brand strategies, and custom digital experiences
            engineered for growth.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            {/* Primary CTA Button: Get Started */}
            <button className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2B303A] text-white font-semibold text-base rounded-full shadow-lg hover:shadow-2xl hover:bg-[#FF652F] transform hover:-translate-y-0.5 transition-all duration-300">
              <span>Get Started</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-[#FF652F] transition-all">
                <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform" />
              </div>
            </button>

            {/* Secondary CTA Button: Book Free Consultation */}
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white border border-[#2B303A]/15 text-[#2B303A] hover:border-[#4ECDC4] hover:text-[#FF652F] font-semibold text-base rounded-full shadow-xs hover:shadow-md transition-all duration-300">
              <Calendar className="w-5 h-5 text-[#4ECDC4]" />
              <span>Book Free Consultation</span>
            </button>

            {/* ANIMATED VIDEO CALL TO ACTION BUTTON */}
            <div className="relative group mt-2 sm:mt-0">
              {/* Outer Ripple / Pulse Ring Animation */}
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#FF652F] to-[#4ECDC4] opacity-75 blur-md group-hover:opacity-100 animate-pulse transition duration-500"></span>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="relative flex items-center gap-3 px-5 py-3.5 bg-white text-[#2B303A] rounded-full border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 font-semibold text-sm"
              >
                {/* Animated Play Circle */}
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#FF652F] text-white shadow-inner transform group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-xs text-gray-500 font-normal leading-none">
                    Watch Showreel
                  </span>
                  <span className="text-xs font-bold text-[#2B303A]">
                    1:45 Min Video
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Social Proof & Trust Ratings */}
          <div className="flex flex-wrap items-center justify-center gap-4 bg-white/70 backdrop-blur-sm px-6 py-3.5 rounded-full border border-gray-200/60 shadow-xs mb-16">
            {/* Avatars Stack */}
            {/* <div className="flex -space-x-2.5 overflow-hidden">
              <Image
                fill
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User 1"
              />
              <Image
                fill
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="User 2"
              />
              <Image
                fill
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="User 3"
              />
              <Image
                fill
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="User 4"
              />
            </div> */}

            {/* Star Rating */}
            <div className="flex flex-col items-start text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="font-bold text-[#2B303A] ml-1">4.9/5</span>
              </div>
              <span className="text-gray-500 font-medium">
                Trusted by 1000+ global brands
              </span>
            </div>
          </div>

          
        </div>
      </section>

      {/* CLIENT LOGOS / SPONSORS CAROUSEL SECTION */}
      <footer className="w-full border-t border-gray-200/60 py-12 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-8">
            Loved by 1000+ big and small brands around the world
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Logo 1 */}
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 hover:text-[#FF652F] transition-colors">
              <Globe className="w-6 h-6 text-[#FF652F]" />
              <span>Logoipsum</span>
            </div>

            {/* Logo 2 */}
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 hover:text-[#4ECDC4] transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#4ECDC4]" />
              <span>Logoipsum</span>
            </div>

            {/* Logo 3 */}
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 hover:text-[#2B303A] transition-colors">
              <Zap className="w-6 h-6 text-[#2B303A]" />
              <span>University</span>
            </div>

            {/* Logo 4 */}
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 hover:text-[#FF652F] transition-colors">
              <Sparkles className="w-6 h-6 text-[#FF652F]" />
              <span>Logoipsum*</span>
            </div>

            {/* Logo 5 */}
            <div className="flex items-center gap-2 font-bold text-xl text-gray-700 hover:text-[#4ECDC4] transition-colors">
              <Users className="w-6 h-6 text-[#4ECDC4]" />
              <span>Logoipsum</span>
            </div>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL (TRIGGERED BY THE ANIMATED VIDEO CTA BUTTON) */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative bg-[#2B303A] rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/10">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-[#FF652F]" />
                <span className="font-bold text-lg">
                  Web Mung Agency Showreel
                </span>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Container (Sample Embed) */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Web Mung Showreel Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
