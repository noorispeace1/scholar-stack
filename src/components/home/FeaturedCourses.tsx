"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CourseCard from "@/components/courses/CourseCard";
import { ArrowRight, Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data fallback if database fetch returns empty


export default function FeaturedCourses() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const categories = ["All", "Development", "Design", "Data Science", "Business"];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      course.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Limit to exactly 8 courses for homepage
  const homepageCourses = filteredCourses.slice(0, 8);

  return (
    <section className="py-20 bg-background relative overflow-hidden text-white">
      {/* Background glowing spot */}
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.05)_0%,_rgba(0,0,0,0)_70%)] blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title and Action Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              Featured Courses
            </h2>
            <p className="text-slate-400 text-base">
              Discover industry-approved programs taught by verified tech experts.
            </p>
          </div>
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-purple-400 hover:text-purple-300 transition-colors group cursor-pointer"
          >
            Explore All Courses
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="mb-10 p-5 rounded-[2rem] bg-slate-950/40 backdrop-blur-md border border-white/5 flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Search box */}
          <div className="relative w-full md:max-w-xs group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-4 w-4 transition-colors group-focus-within:text-pink-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 text-white transition-colors"
            />
          </div>

          {/* Category buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    : "border-white/5 bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Cards Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
            <p className="text-slate-400 text-sm">Loading featured courses...</p>
          </div>
        ) : homepageCourses.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {homepageCourses.map((course, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={`${course._id || course.id || 'course'}-${idx}`}
                >
                  <CourseCard {...course} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 border border-white/5 rounded-3xl bg-slate-950/20">
            <p className="text-slate-500 text-sm">No courses matching your filters were found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
