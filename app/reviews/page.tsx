'use client'

import React, { useState, useRef, useEffect } from 'react'

// Dynamic Review Cards Data
const reviewsData = [
  {
    id: 1,
    rating: 5,
    quote:
      "Web Mung completely transformed our digital presence. Their full-stack Next.js architecture and quick turnaround gave our SaaS product a major competitive edge.",
    author: 'Ron Farnum',
    role: 'Founder & CEO, Damen Jack',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    videoUrl: '/Vedio/2026-11-07%2014-37-11.mp4',
    poster: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[-2deg]',
    company: 'Damen Jack',
    bgColor: 'bg-[#f9df8a]',
  },
  {
    id: 2,
    rating: 5,
    quote:
      "Working with Web Mung has been seamless. They built our automated e-commerce workflow and platform with incredible precision and clean code.",
    author: 'Evan Wiecha',
    role: 'Agency Executive, 829 Studios',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[1deg]',
    company: '829 Studios',
    bgColor: 'bg-[#c5c9fb]',
  },
  {
    id: 3,
    rating: 5,
    quote:
      "The team's expertise in React, Tailwind, and scalable cloud deployment is top-tier. They communicate proactively and deliver stellar results every time.",
    author: 'Sarah Jenkins',
    role: 'Product Director, TechFlow US',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    poster: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[-1.5deg]',
    company: 'TechFlow US',
    bgColor: 'bg-[#f1d3b3]',
  },
  {
    id: 4,
    rating: 5,
    quote:
      "From the first call to launch day, Web Mung felt like an extension of our own team. Our new site loads fast and converts far better than before.",
    author: 'Liam Vance',
    role: 'Co-Founder, TripMate',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[1deg]',
    company: 'TripMate',
    bgColor: 'bg-[#bfe6d2]',
  },
  {
    id: 5,
    rating: 5,
    quote:
      "They redesigned our booking flow and cut drop-offs in half. Clear communication, fast delivery, and genuinely smart product thinking.",
    author: 'Sophie Lindqvist',
    role: 'CMO, Damenia',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[-1deg]',
    company: 'Damenia',
    bgColor: 'bg-[#f8c9c4]',
  },
  {
    id: 6,
    rating: 5,
    quote:
      "Web Mung rebuilt our learning platform on Next.js and it feels effortless to use. Our students noticed the difference right away.",
    author: 'Gulsan Rakhy',
    role: 'Founder, Skillify',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[1.5deg]',
    company: 'Skillify',
    bgColor: 'bg-[#cfe3f8]',
  },
  {
    id: 7,
    rating: 5,
    quote:
      "Reliable, fast and detail-obsessed. Every milestone landed on time, and the handover documentation made our own team's life easy.",
    author: 'Kurde Adeleya',
    role: 'CEO, Plenty Pay',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    poster: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[-2deg]',
    company: 'Plenty Pay',
    bgColor: 'bg-[#e4d4f4]',
  },
  {
    id: 8,
    rating: 5,
    quote:
      "We needed a partner who could design and build. Web Mung delivered both, and our fitness app launched with great reviews.",
    author: 'Daniel Wight',
    role: 'CEO, Fitmate',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80',
    tilt: 'rotate-[1deg]',
    company: 'Fitmate',
    bgColor: 'bg-[#fbd9a8]',
  },
]

// Stacked Projects Data (More compact height styling)
const stackedProjects = [
  {
    id: 1,
    category: 'FMCG',
    title: 'Brand Identity Design That Tells Stories',
    desc: 'A playful identity system giving every flavor its own lovable personality while keeping the entire candy family instantly recognizable together.',
    service: 'Branding',
    duration: '3 Months',
    clientName: 'Sophie Lindqvist',
    clientRole: 'Damenia CMO',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    mockupImg: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&auto=format&fit=crop&q=80',
    bgColor: 'bg-[#b6e5ff]',
    textColor: 'text-blue-950',
  },
  {
    id: 2,
    category: 'FinTech',
    title: 'The Friendlier Side of Finance',
    desc: 'Built to simplify personal finance, the app combines saving, investing, and global transfers into one clear and intuitive experience.',
    service: 'Mobile App Design',
    duration: '6 Months',
    clientName: 'Kurde Adeleya',
    clientRole: 'Plenty Pay CEO',
    clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    mockupImg: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=700&auto=format&fit=crop&q=80',
    bgColor: 'bg-[#d4edda]',
    textColor: 'text-green-950',
  },
  {
    id: 3,
    category: 'EdTech',
    title: 'Learning Platform That Never Feels Heavy',
    desc: 'A smarter learning platform bringing live classes, recorded lessons, and personalized learning together in one engaging experience.',
    service: 'Web App Design',
    duration: '4 Months',
    clientName: 'Gulsan Rakhy',
    clientRole: 'Founder, Skillify',
    clientAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    mockupImg: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=700&auto=format&fit=crop&q=80',
    bgColor: 'bg-[#fff3cd]',
    textColor: 'text-amber-950',
  },
  {
    id: 4,
    category: 'Booking Platform',
    title: 'A Travel Platform That Books Smiles',
    desc: 'Everything travelers need comes together in one platform that simply makes trip planning, booking, & personalized recommendations feel effortless.',
    service: 'Web App Design',
    duration: '3 Months',
    clientName: 'Liam Vance',
    clientRole: 'TripMate Co-Founder',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    mockupImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&auto=format&fit=crop&q=80',
    bgColor: 'bg-[#f8d7da]',
    textColor: 'text-rose-950',
  },
  {
    id: 5,
    category: 'Fitness',
    title: 'A Smarter Way to Sweat',
    desc: 'Finding the right gym, booking classes, and tracking fitness goals now feel like one smooth journey instead of separate everyday tasks.',
    service: 'Mobile App Design',
    duration: '4 Months',
    clientName: 'Daniel Wight',
    clientRole: 'Fitmate CEO',
    clientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    mockupImg: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&auto=format&fit=crop&q=80',
    bgColor: 'bg-[#b6e5ff]',
    textColor: 'text-blue-950',
  },
]

// Words that rotate inside the hero headline
const heroWords = ['websites', 'web apps', 'online stores', 'brands']

// Hero animation styles (scoped with the "wm-" prefix)
const heroStyles = `
  @keyframes wm-rise {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wm-float-a {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(40px, 30px) scale(1.12); }
  }
  @keyframes wm-float-b {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50%      { transform: translate(-36px, -26px) scale(1.1); }
  }
  @keyframes wm-gradient {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
  @keyframes wm-word-in {
    0%   { opacity: 0; transform: translateY(70%) rotateX(-50deg); filter: blur(6px); }
    100% { opacity: 1; transform: translateY(0) rotateX(0); filter: blur(0); }
  }
  @keyframes wm-star-spin {
    0%, 70% { transform: rotate(0deg) scale(1); }
    85%     { transform: rotate(180deg) scale(1.3); }
    100%    { transform: rotate(360deg) scale(1); }
  }
  @keyframes wm-draw {
    from { stroke-dashoffset: 320; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes wm-ping {
    0%       { transform: scale(1); opacity: 0.7; }
    80%,100% { transform: scale(2.4); opacity: 0; }
  }

  .wm-rise      { opacity: 0; animation: wm-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .wm-d1 { animation-delay: 0.05s; }
  .wm-d2 { animation-delay: 0.2s; }
  .wm-d3 { animation-delay: 0.38s; }
  .wm-d4 { animation-delay: 0.55s; }
  .wm-d5 { animation-delay: 0.72s; }

  .wm-blob-a { animation: wm-float-a 14s ease-in-out infinite; }
  .wm-blob-b { animation: wm-float-b 17s ease-in-out infinite; }

  .wm-grad-text {
    background-image: linear-gradient(90deg, #ff6b35, #ff9a5c, #2dd4bf, #ff6b35);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: wm-gradient 5s linear infinite;
  }

  .wm-word-wrap { perspective: 600px; }
  .wm-word      { display: inline-block; transform-origin: 50% 100%; animation: wm-word-in 0.65s cubic-bezier(0.22, 1, 0.36, 1) both; }

  .wm-star { animation: wm-star-spin 4s ease-in-out infinite; }
  .wm-underline path {
    stroke-dasharray: 320;
    stroke-dashoffset: 320;
    animation: wm-draw 1.4s ease-out 0.9s forwards;
  }
  .wm-ping { animation: wm-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }

  @media (prefers-reduced-motion: reduce) {
    .wm-rise, .wm-blob-a, .wm-blob-b, .wm-grad-text, .wm-word, .wm-star, .wm-underline path, .wm-ping {
      animation: none !important;
      opacity: 1 !important;
      stroke-dashoffset: 0 !important;
    }
  }
`

// Video Testimonial Card Component (tall portrait card, video plays on hover)
const ReviewCard = ({ review }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  const startVideo = () => {
    setIsPlaying(true)
    const video = videoRef.current
    if (video) {
      video.muted = true // browsers only allow autoplay when muted
      video.currentTime = 0
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn('Video could not play:', err))
      }
    }
  }

  const stopVideo = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      tabIndex={0}
      onMouseEnter={startVideo}
      onMouseLeave={stopVideo}
      onFocus={startVideo}
      onBlur={stopVideo}
      className={`group relative aspect-[3/4.3] w-full max-w-[300px] cursor-pointer overflow-hidden rounded-3xl ${review.bgColor} shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b35]`}
    >
      {/* Poster photo (full card) */}
      <img
        src={review.poster}
        alt={`${review.author}, ${review.role}`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Video (fades in over the photo on hover) */}
      <video
        ref={videoRef}
        src={review.videoUrl}
        poster={review.poster}
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => console.warn('Video file not found or unsupported:', review.videoUrl)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
          isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Centered play button */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg className="ml-0.5 h-5 w-5 fill-current text-[#1e232a]" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 4l10 6-10 6V4z" />
          </svg>
        </span>
      </div>

      {/* Blurred dark fade + text at the bottom (hidden while the video plays) */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-[58%] backdrop-blur-md"
          style={{
            WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent)',
            maskImage: 'linear-gradient(to top, black 55%, transparent)',
          }}
        />
        <div className="relative bg-gradient-to-t from-black/90 via-black/65 to-transparent px-5 pb-5 pt-24 text-white">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20 text-[11px] font-bold">
              {review.company.charAt(0)}
            </span>
            <span className="text-sm font-semibold">{review.company}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-white/90">{review.quote}</p>
          <p className="mt-3 text-base font-bold leading-tight">{review.author}</p>
          <p className="text-xs text-gray-300">{review.role}</p>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [selectedBudget, setSelectedBudget] = useState('$10K - $20K')
  const [wordIndex, setWordIndex] = useState(0)

  // Rotate the highlighted word in the hero headline
  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length)
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfbfa] via-[#f7f5f0] to-[#f2eee9] text-[#1e232a] font-sans selection:bg-[#ff6b35] selection:text-white">
      <style>{heroStyles}</style>

      {/* ---------------- SECTION 1: HERO SECTION (ANIMATED) ---------------- */}
      <section className="relative isolate px-6 py-24 md:py-28 text-center max-w-5xl mx-auto">
        {/* Drifting colour blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="wm-blob-a absolute left-4 top-10 h-64 w-64 rounded-full bg-[#ff6b35]/20 blur-3xl" />
          <div className="wm-blob-b absolute right-4 top-24 h-72 w-72 rounded-full bg-[#2dd4bf]/20 blur-3xl" />
          <div className="wm-blob-a absolute left-1/3 bottom-0 h-56 w-56 rounded-full bg-[#ffd8a8]/40 blur-3xl" />
        </div>

        {/* Badge */}
        <div className="wm-rise wm-d1 inline-flex items-center gap-2.5 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-sm font-semibold text-[#1e232a] mb-8 border border-[#e2dcd4] shadow-sm">
          <svg className="wm-star h-4 w-4 text-[#ff6b35] fill-current" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Trusted by 40+ brands worldwide</span>
          
        </div>

        {/* Headline */}
        <h1 className="wm-rise wm-d2 text-4xl md:text-6xl font-extrabold tracking-tight text-[#1e232a] mb-6 leading-[1.15]">
          We build{' '}
          <span className="wm-word-wrap inline-block align-bottom overflow-hidden pb-1">
            <span key={wordIndex} className="wm-word wm-grad-text">
              {heroWords[wordIndex]}
            </span>
          </span>
          <br />
          people remember{' '}
          <span className="relative inline-block">
            <span className="text-[#a3937d]">and buy from</span>
            <svg
              className="wm-underline absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M2 8 C 40 1, 80 12, 120 5 S 180 3, 198 7" stroke="#ff6b35" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          .
        </h1>

        {/* Sub line */}
        <p className="wm-rise wm-d3 mx-auto max-w-2xl text-base md:text-lg text-[#5b6b7d] leading-relaxed mb-10">
          Web Mung pairs sharp design with production-grade Next.js engineering, so your product launches fast and keeps growing.
        </p>

       

        {/* Quick proof points */}
        <div className="wm-rise wm-d5 mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#5b6b7d]">
          <span className="flex items-center gap-2"><span className="text-[#2dd4bf] font-bold">✓</span> Reply within 24 hours</span>
          <span className="flex items-center gap-2"><span className="text-[#2dd4bf] font-bold">✓</span> NDA on request</span>
          <span className="flex items-center gap-2"><span className="text-[#2dd4bf] font-bold">✓</span> Dedicated product specialists</span>
        </div>
      </section>

      {/* ---------------- SECTION 2: STACKED SCROLLING CARDS (More compact height) ---------------- */}
      <section id="projects" className="px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#ff6b35] font-bold">Every Industry</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#1e232a] mt-1">Projects That Deliver Impact</h2>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative space-y-3">
          {stackedProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`sticky top-20 ${project.bgColor} rounded-3xl p-6 md:p-8 shadow-lg border-4 border-white transition-all duration-500`}
              style={{
                zIndex: idx + 1,
                transform: `translateY(${idx * 12}px)`,
              }}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <span className="font-serif italic text-base font-semibold opacity-80">{project.category}</span>
                  <h3 className={`text-2xl md:text-3xl font-bold tracking-tight leading-snug ${project.textColor}`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-xs md:text-sm max-w-lg">
                    {project.desc}
                  </p>

                  <div className="flex items-center gap-8 py-1">
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-semibold">Scope</span>
                      <span className="text-sm md:text-base font-bold text-[#1e232a]">{project.service}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block uppercase tracking-wider font-semibold">Duration</span>
                      <span className="text-sm md:text-base font-bold text-[#1e232a]">{project.duration}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center justify-between gap-4 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-200 max-w-sm w-full">
                    <div className="flex items-center gap-2.5">
                      <img src={project.clientAvatar} alt={project.clientName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <h5 className="font-bold text-xs text-[#1e232a]">{project.clientName}</h5>
                        <p className="text-[10px] text-gray-500">{project.clientRole}</p>
                      </div>
                    </div>
                    <span className="text-[#ff6b35] font-bold text-sm">→</span>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex justify-center">
                  <img
                    src={project.mockupImg}
                    alt={project.title}
                    className="rounded-xl shadow-xl object-cover h-[240px] md:h-[280px] w-full border-2 border-white/80"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:opacity-90 transition">
            See All Projects →
          </button>
        </div>
      </section>

      {/* ---------------- SECTION 3: HOVER-TO-VIDEO CARD GRID ---------------- */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-10">
  <span className="text-xs uppercase tracking-widest text-[#ff6b35] font-bold">Client Reviews</span>
  <h2 className="text-2xl md:text-4xl font-extrabold text-[#1e232a] mt-1">
    Happy Customers, <span className="font-serif italic font-normal text-[#ff6b35]">Real Results</span>
  </h2>
  <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
    Hear straight from the founders and teams we've built with. Hover over any card to watch their story and see how Web Mung helped them launch faster and grow with confidence.
  </p>
</div>
        <div className="grid grid-cols-1 justify-items-center gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 4: WHY CHOOSE WEB MUNG COMPARISON ---------------- */}
      <section className="bg-[#f0ebe3] py-24 px-6 relative border-t border-b border-[#e2dcd4]">
        <div className="max-w-5xl mx-auto text-center space-y-4 mb-16">
          <span className="inline-block bg-[#e1f5fe] text-[#0288d1] border border-[#b3e5fc] text-xs px-3.5 py-1 rounded-full font-medium">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#1e232a]">
            Web Mung’s Alternative? <br />
            <span className="font-serif italic font-normal text-[#ff6b35]">Think One More Time!</span>
          </h2>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="min-w-[750px] bg-white border border-[#e2dcd4] rounded-3xl p-8 shadow-sm">
            <div className="grid grid-cols-6 pb-6 border-b border-gray-100 text-xs md:text-sm font-bold text-gray-500 text-center">
              <div className="text-left font-extrabold text-gray-900">Platform</div>
              <div>Speed</div>
              <div>Flexibility</div>
              <div>Quality</div>
              <div>Scalability</div>
              <div>Affordability</div>
            </div>

            <div className="grid grid-cols-6 py-5 border-b border-gray-100 items-center text-center bg-orange-50/50 rounded-2xl px-4 my-2">
              <div className="text-left flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ff6b35] flex items-center justify-center text-white font-bold text-xs">WM</div>
                <div>
                  <h4 className="font-bold text-sm text-[#1e232a]">Web Mung</h4>
                  <p className="text-[10px] text-gray-500">Expert-driven & full support</p>
                </div>
              </div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
            </div>

            <div className="grid grid-cols-6 py-5 border-b border-gray-100 items-center text-center px-4">
              <div className="text-left">
                <h4 className="font-bold text-sm text-[#1e232a]">In House Team</h4>
                <p className="text-[10px] text-gray-500">High ongoing salary overhead</p>
              </div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
            </div>

            <div className="grid grid-cols-6 py-5 border-b border-gray-100 items-center text-center px-4">
              <div className="text-left">
                <h4 className="font-bold text-sm text-[#1e232a]">Creative Agencies</h4>
                <p className="text-[10px] text-gray-500">High costs & slow timelines</p>
              </div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
            </div>

            <div className="grid grid-cols-6 py-5 border-b border-gray-100 items-center text-center px-4">
              <div className="text-left">
                <h4 className="font-bold text-sm text-[#1e232a]">Freelancers</h4>
                <p className="text-[10px] text-gray-500">Lack reliability & consistency</p>
              </div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
            </div>

            <div className="grid grid-cols-6 py-5 items-center text-center px-4">
              <div className="text-left">
                <h4 className="font-bold text-sm text-[#1e232a]">Self-Service Tools</h4>
                <p className="text-[10px] text-gray-500">Limited strategic thinking</p>
              </div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-emerald-600 font-bold text-lg">✓</div>
              <div className="text-rose-500 font-bold text-lg">✕</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: CONSULTATION & INQUIRY FORM ---------------- */}
      <section id="inquiry" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="bg-white text-[#1e232a] border border-[#e2dcd4] rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block bg-[#e1f5fe] text-[#0288d1] border border-[#b3e5fc] text-xs px-3 py-1 rounded-full font-medium">
                Claim a $799 Consultation, on Us!
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#1e232a]">
                Enhance Your Brand Potential <span className="font-serif italic text-[#ff6b35]">At No Cost!</span>
              </h2>

              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#2dd4bf] font-bold">✓</span> Expect a response from us within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2dd4bf] font-bold">✓</span> We're happy to sign an NDA upon request.
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#2dd4bf] font-bold">✓</span> Get access to a team of dedicated product specialists.
                </li>
              </ul>

              <div className="bg-[#f7f5f0] border border-[#e2dcd4] rounded-2xl p-5 flex items-center gap-4 mt-8">
                
                <div>
                  <p className="text-xs text-[#ff6b35] font-semibold mt-1 cursor-pointer hover:underline">
                    📞 Book a Call Directly
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#fcfbfa] border border-[#e2dcd4] rounded-2xl p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full bg-white border border-[#e2dcd4] rounded-lg px-4 py-3 text-sm text-[#1e232a] focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1 font-medium">Your Email*</label>
                    <input
                      type="email"
                      placeholder="yourmail@gmail.com"
                      className="w-full bg-white border border-[#e2dcd4] rounded-lg px-4 py-3 text-sm text-[#1e232a] focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1 font-medium">Whatsapp Number</label>
                    <input
                      type="text"
                      placeholder="+1 123 456 7890"
                      className="w-full bg-white border border-[#e2dcd4] rounded-lg px-4 py-3 text-sm text-[#1e232a] focus:outline-none focus:border-[#ff6b35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-2 font-medium">Project Budget</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Less than $5K', '$5K - $10K', '$10K - $20K', '$20K - $50K', 'More than $50K'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b)}
                        className={`py-2 px-3 text-xs rounded-lg border transition text-center ${
                          selectedBudget === b
                            ? 'bg-[#ff6b35] border-[#ff6b35] text-white font-semibold'
                            : 'bg-white border-[#e2dcd4] text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1 font-medium">Project Details*</label>
                  <textarea
                    rows={3}
                    placeholder="I want to redesign my website..."
                    className="w-full bg-white border border-[#e2dcd4] rounded-lg px-4 py-3 text-sm text-[#1e232a] focus:outline-none focus:border-[#ff6b35]"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-[#ff6b35] text-white font-bold py-3.5 rounded-xl hover:bg-[#e05a2b] transition shadow-lg"
                >
                  Send Inquiry →
                </button>
              </div>
            </div>

          </div>

          <div className="mt-10 bg-[#e0f2f1] text-[#00695c] border border-[#b2dfdb] rounded-2xl py-3 px-6 flex items-center justify-between text-xs md:text-sm font-semibold">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="" />
                <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="" />
                <img className="w-6 h-6 rounded-full border border-white" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" alt="" />
              </div>
              <span>40+ Brands Trust Us</span>
            </div>
            <span>Get 100% Value And Guarantee. Don't Miss Out - Secure Your Brand's Future Today</span>
          </div>

        </div>
      </section>

    </div>
  )
}