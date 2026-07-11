"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <section className="relative overflow-hidden bg-background pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-[var(--color-primary)] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-[var(--color-secondary)] opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-3 py-1 mb-6 text-sm font-medium text-[var(--color-primary)]">
              <span className="flex h-2 w-2 rounded-full bg-[var(--color-primary)]" />
              Empowering your learning journey
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Master New Skills with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                Expert-Led Courses
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 mb-8 leading-relaxed">
              Join thousands of students worldwide. Learn programming, design, business, and more from industry professionals at your own pace.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-8 py-4 text-base font-semibold text-white hover:bg-[var(--color-primary)]/90 transition-all hover:scale-105 shadow-lg shadow-[var(--color-primary)]/30"
              >
                Explore Courses
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border-2 border-border bg-surface px-8 py-4 text-base font-semibold hover:bg-surface-hover hover:border-border transition-all">
                <Play className="h-5 w-5 text-[var(--color-primary)]" />
                Watch Demo
              </button>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-foreground/60">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground text-2xl">4.9</span>
                <div className="flex text-amber-500">
                  {"★★★★★"}
                </div>
                <span className="text-sm">10k+ reviews</span>
              </div>
              <div className="hidden sm:block h-8 w-px bg-border" />
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-surface bg-border" />
                  ))}
                </div>
                <p className="text-sm">Join <span className="font-bold text-foreground">50k+</span> students</p>
              </div>
            </div>
          </div>

          {/* Right Slider */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl group border-4 border-surface/50 backdrop-blur-sm">
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
                {/* Gradient overlay for better contrast if needed later */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            ))}

            {/* Slider Controls */}
            <div className="absolute bottom-6 right-6 z-20 flex gap-3">
              <button
                onClick={prevSlide}
                className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
              {BANNERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
