"use client";

import React from 'react';
import { ArrowUpRight, Sparkles, Send, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { FaFacebookSquare, FaGithub, FaLinkedin } from 'react-icons/fa';

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-[#fc7f31] selection:text-white">
      
      {/* 1. Team Section */}
      <section className="relative py-28 px-6 bg-white overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fc7f31]/10 border border-[#fc7f31]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#fc7f31]">
              <Sparkles className="h-3.5 w-3.5" /> Our Creative Team
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              Team Behind Metaballs Innovators & Experts
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Meet the dedicated professionals driving our success and delivering exceptional solutions to elevate your digital projects.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Team Member 1 */}
            <div className="group relative h-[520px] overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 shadow-xl transition-all duration-500 hover:border-[#fc7f31]/50">
              {/* Full Image Container */}
              <img
                src="https://i.ibb.co.com/XZnCwkyy/photo-2026-10-27-01-53-47.jpg"
              />
              
              {/* Floating Glassmorphic Details Box (1/3 inside bottom of the card) */}
              <div className="absolute -bottom-6 left-4 right-4 translate-y-1/3 rounded-2xl border border-white/40 bg-white/80 p-6 backdrop-blur-xl text-slate-900 shadow-2xl transition-all duration-500 group-hover:translate-y-0 group-hover:border-[#fc7f31]/40">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Tanvir Hossain</h3>
                    <p className="text-xs text-[#fc7f31] font-semibold uppercase tracking-wider">Full-Stack Software Engineer</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 transition-transform duration-300 group-hover:bg-[#fc7f31] group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Expert frontend engineer specializing in Next.js, React, and creating seamless digital experiences.
                </p>
                {/* <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <a href="#social" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaFacebookSquare className='h-6 w-6' />
                  </a>
                  <a href="https://www.linkedin.com/in/tanvirhossainayan/" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaLinkedin className='h-6 w-6' />
                  </a>
                  <a href="https://github.com/tanvir499" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaGithub className='h-6 w-6' />
                  </a>
                </div> */}
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group relative h-[520px] overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 shadow-xl transition-all duration-500 hover:border-[#fc7f31]/50">
              {/* Full Image Container */}
              <img
                src="https://i.ibb.co.com/Ygjn9TN/Professional-Portrait-with-Warm-Office-Background.png"
              />
              
              {/* Floating Glassmorphic Details Box (1/3 inside bottom of the card) */}
              <div className="absolute -bottom-6 left-4 right-4 translate-y-1/3 rounded-2xl border border-white/40 bg-white/80 p-6 backdrop-blur-xl text-slate-900 shadow-2xl transition-all duration-500 group-hover:translate-y-0 group-hover:border-[#fc7f31]/40">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Shahed Anwar Akash Chowdhury</h3>
                    <p className="text-xs text-[#fc7f31] font-semibold uppercase tracking-wider">Full-Stack Software Engineer</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 transition-transform duration-300 group-hover:bg-[#fc7f31] group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Expert frontend engineer specializing in Next.js, React, and creating seamless digital experiences.
                </p>
               {/* <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <a href="https://www.facebook.com/share/1DVDJDtqjJ/" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaFacebookSquare className='h-6 w-6' />
                  </a>
                  <a href="https://www.linkedin.com/in/shahedanwarakash/" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaLinkedin className='h-6 w-6' />
                  </a>
                  <a href="https://github.com/akashchy23" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaGithub className='h-6 w-6' />
                  </a>
                </div> */}
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="group relative h-[520px] overflow-hidden rounded-3xl bg-slate-100 border border-slate-200 shadow-xl transition-all duration-500 hover:border-[#fc7f31]/50">
              {/* Full Image Container */}
              <img
                src="https://i.ibb.co.com/JwH9hW6J/photo-2026-10-27-02-04-07.jpg"
              />
              
              {/* Floating Glassmorphic Details Box (1/3 inside bottom of the card) */}
              <div className="absolute -bottom-6 left-4 right-4 translate-y-1/3 rounded-2xl border border-white/40 bg-white/80 p-6 backdrop-blur-xl text-slate-900 shadow-2xl transition-all duration-500 group-hover:translate-y-0 group-hover:border-[#fc7f31]/40">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Nahidul Islam Fahad</h3>
                    <p className="text-xs text-[#fc7f31] font-semibold uppercase tracking-wider">Full-Stack Software Engineer</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 transition-transform duration-300 group-hover:bg-[#fc7f31] group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Expert frontend engineer specializing in Next.js, React, and creating seamless digital experiences.
                </p>
               {/* <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                  <a href="#social" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaFacebookSquare className='h-6 w-6' />
                  </a>
                  <a href="https://www.linkedin.com/in/nifahad/" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaLinkedin className='h-6 w-6' />
                  </a>
                  <a href="#social" target='_blank' className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-200/60 text-slate-700 hover:bg-[#fc7f31] hover:text-white transition-all">
                  <FaGithub className='h-6 w-6' />
                  </a>
                </div> */}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Start Your Project With Us Section */}
      <section className="relative py-28 px-6 bg-slate-100 border-t border-slate-200">
        <div className="mx-auto max-w-7xl">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="inline-block rounded-full bg-[#fc7f31]/10 border border-[#fc7f31]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#fc7f31]">
              Contact With Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Start Your Project With Us
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Let's turn your vision into reality. Whether residential, commercial, or industrial, our team is ready to guide you.
            </p>
          </div>

          {/* Main Grid: Image + Unique Form Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Showcase (5 Cols) */}
           <div className="lg:col-span-5 relative overflow-hidden rounded-3xl shadow-xl h-[580px] border border-slate-200 bg-slate-900 flex items-center justify-center group">
  {/* Animated Glowing Ambient Circles */}
  <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-[#fc7f31]/20 blur-3xl animate-pulse pointer-events-none" />
  <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl animate-pulse pointer-events-none delay-1000" />

  {/* Center Animated Illustration / Graphic Container */}
  <div className="relative z-10 text-center p-8 space-y-6">
    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-tr from-[#fc7f31] to-amber-400 text-white shadow-2xl shadow-[#fc7f31]/40 animate-bounce duration-1000">
      <MessageSquare className="h-12 w-12" />
    </div>
    
    <div className="space-y-2">
      <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-400 backdrop-blur-md">
        Live Support 24/7
      </span>
      <h3 className="text-3xl font-extrabold text-white tracking-tight">
        Let's Talk &amp; Build Together
      </h3>
      <p className="text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
        Our team is online and ready to answer your questions. Send us a message and experience seamless communication.
      </p>
    </div>
  </div>

  {/* Bottom Overlay Info Card */}
  <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl text-white shadow-lg flex items-center gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fc7f31] text-white">
      <CheckCircle2 className="h-5 w-5" />
    </div>
    <div>
      <h4 className="text-sm font-bold">Fast Response Guarantee</h4>
      <p className="text-xs text-slate-300">We reply within a few hours on business days.</p>
    </div>
  </div>
</div>

            {/* Right Unique Form Card (7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h3>
                <p className="text-slate-600 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Jahidul Islam Jidan"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#fc7f31] focus:ring-2 focus:ring-[#fc7f31]/20"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Email Address
                    </label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-4 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="demo@gmail.com"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#fc7f31] focus:ring-2 focus:ring-[#fc7f31]/20"
                      />
                    </div>
                  </div>

                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-4 h-4 w-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+800 1234 567 890"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#fc7f31] focus:ring-2 focus:ring-[#fc7f31]/20"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project requirements..."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#fc7f31] focus:ring-2 focus:ring-[#fc7f31]/20 resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-slate-300 bg-slate-50 text-[#fc7f31] focus:ring-[#fc7f31]"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-600 select-none cursor-pointer">
                    I agree to the terms of service and privacy policy.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full group relative flex items-center justify-center gap-2 rounded-2xl bg-[#fc7f31] px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#e06d28] hover:shadow-xl active:scale-[0.99]"
                >
                  <span>Submit Application</span>
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Page;