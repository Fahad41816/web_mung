"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Quote,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const reviewsData = [
  {
    id: 1,
    quote:
      "Web Mung completely transformed our digital presence. Their full-stack Next.js architecture and quick turnaround gave our SaaS product a major competitive edge.",
    clientName: "Ron Farnum",
    clientTitle: "Founder & CEO, Damen Jack",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Working with Web Mung has been seamless. They built our automated e-commerce workflow and platform with incredible precision and clean code.",
    clientName: "Evan Wiecha",
    clientTitle: "Agency Executive, 829 Studios",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The team's expertise in React, Tailwind, and scalable cloud deployment is top-tier. They communicate proactively and deliver stellar results every time.",
    clientName: "Sarah Jenkins",
    clientTitle: "Product Director, TechFlow US",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "Finding an agency that understands both UI/UX design and heavy backend engineering is rare. Web Mung nailed our web application project within record time.",
    clientName: "Michael Chang",
    clientTitle: "Co-Founder, ScaleUp Ventures",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    rating: 5,
  },
];

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + reviewsData.length) % reviewsData.length,
    );
  };

  const handleWhatsAppRedirect = (clientName: string) => {
    const message = encodeURIComponent(
      `Hello Web Mung, I saw the review by ${clientName} and I'd like to discuss a project.`,
    );
    window.open(`https://wa.me/8801800000000?text=${message}`, "_blank");
  };

  const rotations = [-3, 2, -2, 4];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] text-[#2B303A] overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#FF652F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header and Controls Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF652F]/10 border border-[#FF652F]/20 text-[#FF652F] text-xs font-bold uppercase tracking-wider mb-4"
            >
              <Quote className="w-3.5 h-3.5" />
              Client Success Stories
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2B303A] tracking-tight leading-tight"
            >
              70% of firms find new opportunities within 90 days with Web <span className="text-[#fc7f31]">Mung</span> 
            </motion.h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-[#2B303A] hover:bg-[#2B303A] hover:text-white hover:border-[#2B303A] transition-all duration-300 group cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="w-12 h-12 rounded-full bg-[#2B303A] text-white border border-[#2B303A] shadow-md flex items-center justify-center hover:bg-[#FF652F] hover:border-[#FF652F] transition-all duration-300 group cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Slanted Overlapping Cards Container */}
        <div className="relative min-h-[380px] sm:min-h-[360px] flex items-center overflow-x-clip py-6">
          <div
            className="flex gap-6 w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 340}px)` }}
          >
            {reviewsData.map((review, idx) => {
              const rotation = rotations[idx % rotations.length];

              return (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, rotate: 0, scale: 1.02 }}
                  style={{ rotate: `${rotation}deg` }}
                  className="flex-shrink-0 w-[320px] sm:w-[360px] bg-white border border-gray-200 rounded-3xl p-7 shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group"
                >
                  {/* Top Bar: Stars & Contact Sales button */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      {/* Contact Sales / WhatsApp Pill */}
                      <button
                        onClick={() =>
                          handleWhatsAppRedirect(review.clientName)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#4ECDC4]/20 text-xs font-semibold text-[#2B303A] transition-colors cursor-pointer"
                      >
                        <span>Contact sales</span>
                        <div className="w-5 h-5 rounded-full bg-[#2B303A] text-white flex items-center justify-center">
                          <PhoneCall className="w-2.5 h-2.5 text-[#FF652F]" />
                        </div>
                      </button>
                    </div>

                    {/* Review Quote */}
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal mb-8">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Client Info Footer */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                      <Image
                        src={review.avatar}
                        alt={review.clientName}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2B303A]">
                        {review.clientName}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {review.clientTitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Brands Trust Banner */}
        <div className="mt-16 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
            Recent deals were landed with these brands through Web Mung
            partnerships
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-extrabold text-xl tracking-tight text-[#2B303A]">
              CraftyDTF
            </span>
            <span className="font-extrabold text-xl tracking-tight text-[#FF652F]">
              ClothingFitz
            </span>
            <span className="font-extrabold text-xl tracking-tight text-blue-600">
              Istimate Pro
            </span>
            <span className="font-extrabold text-xl tracking-tight text-emerald-600">
              RecipeNext
            </span>
            <span className="font-extrabold text-xl tracking-tight text-[#4ECDC4]">
              Sportify Nation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
