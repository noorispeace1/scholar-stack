"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/courses/CourseCard";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_COURSES = [
  {
    _id: "mock1",
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    description: "Learn web development by building 100 projects in 100 days. Covers HTML, CSS, Javascript, React, Node, and more.",
    price: 89.99,
    category: "Development",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 4523,
    duration: "65 hours",
    studentsCount: 125000
  },
  {
    _id: "mock2",
    title: "Advanced UI/UX Design Masterclass",
    instructor: "Gary Simon",
    description: "Master Figma, user research, wireframing, and prototyping. Build a portfolio that gets you hired.",
    price: 69.99,
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 2150,
    duration: "24 hours",
    studentsCount: 45000
  },
  {
    _id: "mock3",
    title: "Data Science and Machine Learning",
    instructor: "Jose Portilla",
    description: "Learn Python, Pandas, NumPy, Scikit-Learn, and TensorFlow to build real-world AI applications.",
    price: 94.99,
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 8900,
    duration: "42 hours",
    studentsCount: 210000
  },
  {
    _id: "mock4",
    title: "Digital Marketing Complete Course",
    instructor: "Seth Godin",
    description: "SEO, Social Media Marketing, Copywriting, Email Marketing, and Analytics in one comprehensive bundle.",
    price: 54.99,
    category: "Business",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 3200,
    duration: "18 hours",
    studentsCount: 85000
  },
  {
    _id: "mock5",
    title: "Next.js 15 Premium Course",
    instructor: "Hitesh Choudhary",
    description: "Learn Next.js 15 App Router, Server Actions, Server Components, Route Handlers, and Authentication.",
    price: 79.99,
    category: "Development",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 1540,
    duration: "30 hours",
    studentsCount: 28000
  },
  {
    _id: "mock6",
    title: "Graphic Design Masterclass",
    instructor: "Lindsay Marsh",
    description: "Learn Photoshop, Illustrator, and InDesign. Discover graphic design theory, branding, and logo design.",
    price: 49.99,
    category: "Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 950,
    duration: "28 hours",
    studentsCount: 12000
  },
  {
    _id: "mock7",
    title: "Python for Artificial Intelligence",
    instructor: "Andrej Karpathy",
    description: "Deep dive into neural networks, PyTorch, backpropagation, and build your own GPT from scratch.",
    price: 119.99,
    category: "Data Science",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 18900,
    duration: "55 hours",
    studentsCount: 95000
  },
  {
    _id: "mock8",
    title: "Financial Analysis & Modeling",
    instructor: "Bill Gates",
    description: "Learn Excel, accounting, financial statements, forecasting, and investment analysis with case studies.",
    price: 64.99,
    category: "Business",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 1100,
    duration: "20 hours",
    studentsCount: 9800
  }
];

export default function CoursesPage() {
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
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        } else {
          setCourses(FALLBACK_COURSES);
        }
      } catch {
        setCourses(FALLBACK_COURSES);
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
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, idx) => (
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
          <div className="text-center py-28 border border-white/5 rounded-3xl bg-slate-950/20">
            <p className="text-slate-500 text-sm">No courses matching your search criteria were found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
