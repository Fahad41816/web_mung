"use client";

import React, { useState, useEffect } from 'react';
import { Code, Layout, Server, TrendingUp, ArrowUpRight, Headphones, ArrowRight, Sparkles, PenTool, Wrench, Search, Rocket } from 'lucide-react';

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play / Carousel timer effect (switches expanded card every 3.5 seconds)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Header / Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#fc7f31] via-[#8d4c2593] to-[#fc7f3100] px-6 py-20 text-center sm:py-28">
        <div className="mx-auto max-w-4xl space-y-4">
          <span className="inline-block rounded-full bg-amber-200/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-900">
            Digital Agency
          </span>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl sm:leading-tight">
            We Turn Vision Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Digital Reality
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-700 sm:text-xl">
            Thoughtfully crafted websites and smart digital solutions designed to move your business forward.
          </p>
        </div>
      </div>

      {/* Services Header Section */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
              What We Do
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Our Services
            </h2>
          </div>
          
        </div>
      </div>

      {/* Interactive Accordion Image / Card Showcase */}
      <div className="mx-auto max-w-7xl px-6 pb-20">
        <div 
          className="flex flex-col gap-4 lg:h-[500px] lg:flex-row"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Card 1: Full-Stack Development */}
          <div
            onClick={() => setActiveIndex(0)}
            onMouseEnter={() => setActiveIndex(0)}
            className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-700 ease-in-out lg:min-h-full ${
              activeIndex === 0 ? 'lg:flex-[3] flex-1 border-purple-400 shadow-2xl' : 'lg:flex-[1] flex-1 opacity-80 hover:opacity-100'
            }`}
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
                alt="Full-Stack Development"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white transition-all duration-300 group-hover:bg-purple-600">
                  <Code className="h-7 w-7" />
                </div>
                <span className="text-2xl font-black text-white/50 group-hover:text-white">01</span>
              </div>

              <div>
                <h3 className={`font-bold transition-all duration-500 ${activeIndex === 0 ? 'text-3xl sm:text-4xl mb-3' : 'text-xl sm:text-2xl mb-1'}`}>
                  Full-Stack Development
                </h3>

                <p className={`text-slate-200 transition-all duration-500 max-w-lg ${activeIndex === 0 ? 'opacity-100 max-h-40 text-base mb-6' : 'opacity-0 max-h-0 text-xs overflow-hidden'}`}>
                  Building robust, high-performance web applications, mobile apps, and e-commerce platforms using modern frameworks (Next.js, React.js, Node.js).
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-purple-300 transition-colors group-hover:text-purple-100">
                  <span>Explore Service</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Product Strategy & UI/UX */}
          <div
            onClick={() => setActiveIndex(1)}
            onMouseEnter={() => setActiveIndex(1)}
            className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-700 ease-in-out lg:min-h-full ${
              activeIndex === 1 ? 'lg:flex-[3] flex-1 border-purple-400 shadow-2xl' : 'lg:flex-[1] flex-1 opacity-80 hover:opacity-100'
            }`}
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80"
                alt="Product Strategy & UI/UX"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white transition-all duration-300 group-hover:bg-purple-600">
                  <Layout className="h-7 w-7" />
                </div>
                <span className="text-2xl font-black text-white/50 group-hover:text-white">02</span>
              </div>

              <div>
                <h3 className={`font-bold transition-all duration-500 ${activeIndex === 1 ? 'text-3xl sm:text-4xl mb-3' : 'text-xl sm:text-2xl mb-1'}`}>
                  Product Strategy &amp; UI/UX
                </h3>

                <p className={`text-slate-200 transition-all duration-500 max-w-lg ${activeIndex === 1 ? 'opacity-100 max-h-40 text-base mb-6' : 'opacity-0 max-h-0 text-xs overflow-hidden'}`}>
                  Defining the roadmap, high-converting wireframes, user flows, intuitive interfaces, and custom branding tailored to your product goals.
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-purple-300 transition-colors group-hover:text-purple-100">
                  <span>Explore Service</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Cloud & Infrastructure */}
          <div
            onClick={() => setActiveIndex(2)}
            onMouseEnter={() => setActiveIndex(2)}
            className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-700 ease-in-out lg:min-h-full ${
              activeIndex === 2 ? 'lg:flex-[3] flex-1 border-purple-400 shadow-2xl' : 'lg:flex-[1] flex-1 opacity-80 hover:opacity-100'
            }`}
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                alt="Cloud & Infrastructure"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white transition-all duration-300 group-hover:bg-purple-600">
                  <Server className="h-7 w-7" />
                </div>
                <span className="text-2xl font-black text-white/50 group-hover:text-white">03</span>
              </div>

              <div>
                <h3 className={`font-bold transition-all duration-500 ${activeIndex === 2 ? 'text-3xl sm:text-4xl mb-3' : 'text-xl sm:text-2xl mb-1'}`}>
                  Cloud &amp; Infrastructure
                </h3>

                <p className={`text-slate-200 transition-all duration-500 max-w-lg ${activeIndex === 2 ? 'opacity-100 max-h-40 text-base mb-6' : 'opacity-0 max-h-0 text-xs overflow-hidden'}`}>
                  Ensuring high security, infinite scalability, automated CI/CD pipelines, and seamless cloud deployments on AWS, Azure, or Google Cloud.
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-purple-300 transition-colors group-hover:text-purple-100">
                  <span>Explore Service</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Digital Growth & Performance */}
          <div
            onClick={() => setActiveIndex(3)}
            onMouseEnter={() => setActiveIndex(3)}
            className={`group relative min-h-[300px] cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-700 ease-in-out lg:min-h-full ${
              activeIndex === 3 ? 'lg:flex-[3] flex-1 border-purple-400 shadow-2xl' : 'lg:flex-[1] flex-1 opacity-80 hover:opacity-100'
            }`}
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                alt="Digital Growth & Performance"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white transition-all duration-300 group-hover:bg-purple-600">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <span className="text-2xl font-black text-white/50 group-hover:text-white">04</span>
              </div>

              <div>
                <h3 className={`font-bold transition-all duration-500 ${activeIndex === 3 ? 'text-3xl sm:text-4xl mb-3' : 'text-xl sm:text-2xl mb-1'}`}>
                  Digital Growth &amp; Performance
                </h3>

                <p className={`text-slate-200 transition-all duration-500 max-w-lg ${activeIndex === 3 ? 'opacity-100 max-h-40 text-base mb-6' : 'opacity-0 max-h-0 text-xs overflow-hidden'}`}>
                  Driving tangible business results through strategic SEO, lead generation, conversion optimization, and targeted digital marketing campaigns.
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-purple-300 transition-colors group-hover:text-purple-100">
                  <span>Explore Service</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Carousel Indicator Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                activeIndex === idx ? 'w-8 bg-purple-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Our Development Process Section */}
      <div className="bg-white py-20 px-6 text-slate-900">
  <div className="mx-auto max-w-7xl">
    
    {/* Section Header */}
    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
      <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-900">
        Our Process
      </span>
      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
        How We Bring Ideas to Life
      </h2>
      <p className="text-slate-600 text-base sm:text-lg">
        A thoughtful, human-centered approach engineered to transform your vision into reality.
      </p>
    </div>

    {/* Process Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* Step 1 */}
      <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-amber-300 hover:shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-black text-amber-500/80">
              01
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Discovery &amp; Listening
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            We sit down with you to understand your core values, business goals, and the human stories behind your brand.
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-amber-300 hover:shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-black text-amber-500/80">
              02
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
              <PenTool className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Thoughtful Strategy
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Crafting clear user flows, wireframes, and creative blueprints tailored specifically for your target audience.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-amber-300 hover:shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-black text-amber-500/80">
              03
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
              <Wrench className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Crafting &amp; Building
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Writing clean, high-performance code and designing engaging interfaces with meticulous attention to detail.
          </p>
        </div>
      </div>

      {/* Step 4 */}
      <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-amber-300 hover:shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-black text-amber-500/80">
              04
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
              <Search className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Testing &amp; Refining
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Ensuring smooth interactions, robust security, and flawless responsiveness across all devices and screen sizes.
          </p>
        </div>
      </div>

      {/* Step 5 */}
      <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-amber-300 hover:shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-black text-amber-500/80">
              05
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
              <Rocket className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Gentle Launch
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Releasing your project out into the world smoothly with full support and guidance every step of the way.
          </p>
        </div>
      </div>

      {/* Step 6 */}
      <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-50/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-amber-300 hover:shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-black text-amber-500/80">
              06
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-inner">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Ongoing Growth
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Continuous improvements, analytics optimization, and nurturing your digital presence as your business expands.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>

      {/* New Section: Ready to Transform & Brand Banner */}
      <div className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl space-y-16">
          
       



          {/* First Component (From Image: Call to Action Banner) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 px-6 py-16 text-center text-white shadow-xl sm:px-16 sm:py-20">
            {/* Background Decorative Glow */}
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-black/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-base sm:text-lg text-teal-100 max-w-xl mx-auto leading-relaxed">
                Let's discuss how we can help you achieve your digital goals with our proven expertise and innovative solutions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#e67e22] to-[#f1c40f] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
                >
                  <Headphones className="h-4 w-4" />
                  <span>Free Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="#project"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-transparent px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white"
                >
                  <span>Start My Project</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

         

         

        </div>
      </div>
    </div>
  );
};

export default Page;