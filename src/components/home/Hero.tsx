"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const BANNERS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    alt: "Students collaborating",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    alt: "Student studying with laptop",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=1200&auto=format&fit=crop",
    alt: "Online learning setup",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const scrollToCourses = () => {
    const section = document.getElementById("courses-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background min-h-[60vh] lg:h-[70vh] lg:min-h-[520px] lg:max-h-[630px] flex items-center py-10 lg:py-0">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[var(--color-primary)] opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-[var(--color-secondary)] opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 mb-4 text-xs font-semibold text-blue-400">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
              Empowering your learning journey
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-[1.1] text-white">
              Master New Skills with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                Expert-Led Courses
              </span>
            </h1>
            
            <p className="text-xs md:text-sm text-slate-400 mb-6 leading-relaxed">
              Join thousands of students worldwide. Learn programming, design, business, and more from industry professionals at your own pace.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-3 text-sm font-bold text-white shadow-[0_0_15px_rgba(0,102,255,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-sm font-bold text-white hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer">
                <Play className="h-4 w-4 text-blue-400 fill-current" />
                Watch Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-xl">4.9</span>
                <span className="text-amber-500 text-sm">★★★★★</span>
                <span className="text-xs">10k+ reviews</span>
              </div>
              <div className="hidden sm:block h-6 w-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-white">JD</div>
                  <div className="h-7 w-7 rounded-full border border-slate-900 bg-blue-800 flex items-center justify-center text-[8px] font-bold text-white">MK</div>
                  <div className="h-7 w-7 rounded-full border border-slate-900 bg-emerald-800 flex items-center justify-center text-[8px] font-bold text-white">SL</div>
                </div>
                <p className="text-xs">Join <span className="font-bold text-white">50k+</span> active students</p>
              </div>
            </div>
          </motion.div>

          {/* Right Slider */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative h-[240px] sm:h-[280px] lg:h-[350px] w-full rounded-2xl overflow-hidden shadow-2xl group border border-white/10"
          >
            {BANNERS.map((banner, index) => (
              <div
                key={banner.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            ))}

            {/* Slider Controls */}
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <button
                onClick={prevSlide}
                className="h-8 w-8 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                className="h-8 w-8 rounded-xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-5 left-0 right-0 z-20 flex justify-center gap-1.5">
              {BANNERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300 cursor-pointer",
                    index === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Down Scroll flow indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1">
        <button 
          onClick={scrollToCourses}
          className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-1 animate-bounce cursor-pointer"
        >
          <span>Explore Courses</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
