"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/courses/CourseCard";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";



export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

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

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#070814] text-white pt-24 pb-20 relative overflow-hidden">
      {/* Background glowing spots */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.06)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.06)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6"
          >
            Explore All Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-base md:text-lg"
          >
            Upgrade your tech capabilities with verified online classes taught by global industry leaders.
          </motion.p>
        </div>

        {/* Filter Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 p-5 rounded-[2.5rem] bg-slate-950/45 backdrop-blur-md border border-white/5 flex flex-col md:flex-row items-center justify-between gap-5"
        >
          {/* Search Input */}
          <div className="relative w-full md:max-w-sm group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-4 w-4 transition-colors group-focus-within:text-pink-400" />
            <input
              type="text"
              placeholder="Search by title, instructor, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 text-white transition-colors"
            />
          </div>

          {/* Category buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4.5 py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                    : "border-white/5 bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-slate-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
            <p className="text-slate-400 text-sm">Fetching catalog from server...</p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {paginatedCourses.map((course, idx) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 gap-2 relative z-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-white/10 hover:bg-slate-800 hover:border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border text-sm font-bold transition-all duration-300 ${
                      currentPage === i + 1 
                        ? "bg-gradient-to-tr from-purple-600 to-indigo-600 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-110" 
                        : "bg-slate-900/80 backdrop-blur-sm border-white/10 text-slate-400 hover:bg-slate-800 hover:border-purple-500/30 hover:text-slate-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-white/10 hover:bg-slate-800 hover:border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-28 border border-white/5 rounded-3xl bg-slate-950/20">
            <p className="text-slate-500 text-sm">No courses matching your search criteria were found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
