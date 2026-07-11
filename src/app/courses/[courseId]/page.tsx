"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Users,
  ArrowLeft,
  Play,
  CheckCircle2,
  BookOpen,
  Award,
  Globe,
  ShoppingCart,
  Zap,
  ChevronDown,
  ChevronUp,
  BarChart3,
  MessageSquare,
  Heart,
  Share2,
} from "lucide-react";

// Fallback data for mock IDs
const MOCK_COURSES: Record<string, any> = {
  mock1: {
    _id: "mock1",
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    instructorTitle: "Senior Developer & Lead Instructor",
    instructorAvatar: "https://i.pravatar.cc/150?img=47",
    instructorBio:
      "Dr. Angela Yu is a developer and lead instructor at the London App Brewery. With over 10 years of teaching experience, she has helped hundreds of thousands of students break into tech.",
    description:
      "Learn web development by building 100 projects in 100 days. Covers HTML, CSS, Javascript, React, Node, and more.",
    fullDescription:
      "This is the most comprehensive and beginner-friendly web development course on the internet! Whether you want to become a professional developer, launch your own startup, or just want to learn to code, this course is your ultimate guide. We'll cover everything from basic HTML to advanced React and Node.js, giving you all the tools you need to build real-world, production-ready web applications.",
    price: 89.99,
    originalPrice: 199.99,
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 4523,
    duration: "65 hours",
    studentsCount: 125000,
    lastUpdated: "July 2026",
    language: "English",
    level: "Beginner to Advanced",
    certificate: true,
    lectures: 385,
    articles: 42,
    downloadable: 23,
    whatYouLearn: [
      "Build 16 web development projects for your portfolio",
      "Master HTML5, CSS3, Flexbox & Grid",
      "JavaScript ES6, DOM manipulation & APIs",
      "React, Hooks, Context API & Redux",
      "Node.js, Express & RESTful APIs",
      "MongoDB & SQL database management",
      "Authentication with JWT & OAuth",
      "Deploy full-stack apps to the cloud",
    ],
    requirements: [
      "No programming experience needed — we'll start from scratch",
      "A computer with internet access",
      "Basic computer literacy",
    ],
    curriculum: [
      { section: "Web Development Fundamentals", lectures: 22, duration: "8h 30m" },
      { section: "Advanced CSS & Flexbox", lectures: 18, duration: "5h 45m" },
      { section: "JavaScript Deep Dive", lectures: 60, duration: "14h 20m" },
      { section: "React & Modern Frontend", lectures: 75, duration: "18h 10m" },
      { section: "Node.js & Backend Development", lectures: 55, duration: "12h 05m" },
      { section: "Databases & Authentication", lectures: 40, duration: "8h 50m" },
      { section: "Deployment & DevOps", lectures: 15, duration: "4h 00m" },
    ],
  },
  mock2: {
    _id: "mock2",
    title: "Advanced UI/UX Design Masterclass",
    instructor: "Gary Simon",
    instructorTitle: "UI/UX Designer & YouTuber",
    instructorAvatar: "https://i.pravatar.cc/150?img=12",
    instructorBio:
      "Gary Simon is a professional UI/UX designer with over 15 years of experience working with Fortune 500 companies. He has taught design to over 500,000 students worldwide.",
    description:
      "Master Figma, user research, wireframing, and prototyping. Build a portfolio that gets you hired.",
    fullDescription:
      "This masterclass covers everything you need to go from zero to a professional UI/UX designer. You'll learn industry-standard tools like Figma, master design principles, and build an impressive portfolio that gets you hired at top tech companies.",
    price: 69.99,
    originalPrice: 149.99,
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 2150,
    duration: "24 hours",
    studentsCount: 45000,
    lastUpdated: "June 2026",
    language: "English",
    level: "Intermediate",
    certificate: true,
    lectures: 145,
    articles: 18,
    downloadable: 35,
    whatYouLearn: [
      "Design beautiful, user-friendly interfaces in Figma",
      "Conduct user research and usability testing",
      "Create professional wireframes and prototypes",
      "Master typography, color theory and visual hierarchy",
      "Build a portfolio of 5+ real-world projects",
      "Design for accessibility and inclusivity",
    ],
    requirements: [
      "Basic computer skills",
      "No prior design experience needed",
      "A free Figma account",
    ],
    curriculum: [
      { section: "Design Fundamentals", lectures: 20, duration: "3h 15m" },
      { section: "Figma Mastery", lectures: 35, duration: "6h 30m" },
      { section: "User Research", lectures: 18, duration: "3h 20m" },
      { section: "Wireframing & Prototyping", lectures: 30, duration: "5h 45m" },
      { section: "Portfolio Projects", lectures: 42, duration: "8h 10m" },
    ],
  },
};

// Generate fallback for other mock IDs
for (let i = 3; i <= 8; i++) {
  const id = `mock${i}`;
  const fallbackData: Record<string, any> = {
    mock3: { title: "Data Science and Machine Learning", instructor: "Jose Portilla", category: "Data Science", price: 94.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop", rating: 4.7, reviewCount: 8900, duration: "42 hours", studentsCount: 210000 },
    mock4: { title: "Digital Marketing Complete Course", instructor: "Seth Godin", category: "Business", price: 54.99, originalPrice: 129.99, image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop", rating: 4.6, reviewCount: 3200, duration: "18 hours", studentsCount: 85000 },
    mock5: { title: "Next.js 15 Premium Course", instructor: "Hitesh Choudhary", category: "Development", price: 79.99, originalPrice: 169.99, image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200&auto=format&fit=crop", rating: 4.8, reviewCount: 1540, duration: "30 hours", studentsCount: 28000 },
    mock6: { title: "Graphic Design Masterclass", instructor: "Lindsay Marsh", category: "Design", price: 49.99, originalPrice: 109.99, image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop", rating: 4.7, reviewCount: 950, duration: "28 hours", studentsCount: 12000 },
    mock7: { title: "Python for Artificial Intelligence", instructor: "Andrej Karpathy", category: "Data Science", price: 119.99, originalPrice: 249.99, image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop", rating: 4.9, reviewCount: 18900, duration: "55 hours", studentsCount: 95000 },
    mock8: { title: "Financial Analysis & Modeling", instructor: "Bill Gates", category: "Business", price: 64.99, originalPrice: 139.99, image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop", rating: 4.5, reviewCount: 1100, duration: "20 hours", studentsCount: 9800 },
  };
  if (fallbackData[id]) {
    MOCK_COURSES[id] = {
      _id: id,
      instructorTitle: "Expert Instructor",
      instructorAvatar: `https://i.pravatar.cc/150?img=${i * 7}`,
      instructorBio: `${fallbackData[id].instructor} is an expert in ${fallbackData[id].category} with years of industry experience, helping students achieve real-world results.`,
      description: "A comprehensive, hands-on course designed to take you from beginner to professional level.",
      fullDescription: "This course is packed with practical exercises, real-world projects, and expert-led instruction. You'll gain the skills employers are actively looking for and build a portfolio that showcases your capabilities.",
      lastUpdated: "July 2026",
      language: "English",
      level: "All Levels",
      certificate: true,
      lectures: Math.floor(Math.random() * 150) + 80,
      articles: Math.floor(Math.random() * 30) + 10,
      downloadable: Math.floor(Math.random() * 30) + 10,
      whatYouLearn: [
        "Master core concepts from beginner to advanced",
        "Build real-world projects for your portfolio",
        "Understand industry best practices",
        "Gain hands-on experience with practical exercises",
        "Learn from an industry expert with years of experience",
        "Get lifetime access and regular course updates",
      ],
      requirements: ["Basic computer literacy", "Enthusiasm to learn", "Internet connection"],
      curriculum: [
        { section: "Getting Started", lectures: 12, duration: "2h 00m" },
        { section: "Core Concepts", lectures: 35, duration: "7h 30m" },
        { section: "Advanced Topics", lectures: 48, duration: "10h 45m" },
        { section: "Real-World Projects", lectures: 30, duration: "8h 00m" },
        { section: "Certification Prep", lectures: 15, duration: "3h 30m" },
      ],
      ...fallbackData[id],
    };
  }
}

const REVIEWS = [
  { name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=33", rating: 5, date: "2 weeks ago", comment: "Absolutely phenomenal course! The instructor explains everything so clearly. I went from zero coding knowledge to building full-stack apps in just a few months." },
  { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?img=5", rating: 5, date: "1 month ago", comment: "Best investment I ever made. The projects are real-world and the curriculum is incredibly well-structured. Highly recommend to anyone serious about learning." },
  { name: "Marcus Rivera", avatar: "https://i.pravatar.cc/150?img=60", rating: 4, date: "3 weeks ago", comment: "Great content overall! Could use a bit more depth in certain advanced sections, but for the price it's exceptional value. Already landed my first freelance gig!" },
];

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;

  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "reviews">("overview");

  useEffect(() => {
    async function fetchCourse() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (res.ok) {
          const data = await res.json();
          // Enrich with additional display data if not present
          setCourse({
            instructorTitle: "Expert Instructor",
            instructorAvatar: `https://i.pravatar.cc/150?img=25`,
            instructorBio: `${data.instructor} is a seasoned industry expert and passionate educator with a track record of helping students achieve real-world results.`,
            fullDescription: data.description,
            originalPrice: (data.price * 2.2).toFixed(2),
            lastUpdated: "July 2026",
            language: "English",
            level: "All Levels",
            certificate: true,
            lectures: 120,
            articles: 15,
            downloadable: 20,
            whatYouLearn: [
              "Master all core concepts from basics to advanced",
              "Build real-world projects for your portfolio",
              "Learn industry-standard best practices",
              "Get hands-on experience with practical assignments",
              "Access lifetime course updates",
              "Earn a verified completion certificate",
            ],
            requirements: ["No prior experience needed", "A computer with internet access", "Enthusiasm and dedication to learn"],
            curriculum: [
              { section: "Introduction & Setup", lectures: 10, duration: "1h 30m" },
              { section: "Core Fundamentals", lectures: 30, duration: "6h 00m" },
              { section: "Advanced Topics", lectures: 45, duration: "9h 30m" },
              { section: "Capstone Projects", lectures: 25, duration: "6h 00m" },
              { section: "Final Review & Certification", lectures: 10, duration: "2h 30m" },
            ],
            ...data,
          });
        } else if (MOCK_COURSES[courseId]) {
          setCourse(MOCK_COURSES[courseId]);
        }
      } catch {
        if (MOCK_COURSES[courseId]) {
          setCourse(MOCK_COURSES[courseId]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (courseId) fetchCourse();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070814] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm animate-pulse">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#070814] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-slate-400 mb-6">This course may have been removed or doesn&apos;t exist.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-semibold text-sm transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const displayImage = course.imageUrl || course.image || "";
  const discount = course.originalPrice
    ? Math.round(((parseFloat(course.originalPrice) - course.price) / parseFloat(course.originalPrice)) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-[#070814] text-white">
      {/* ── HERO SECTION ── */}
      <div className="relative overflow-hidden">
        {/* Hero background blur overlay */}
        <div className="absolute inset-0 z-0">
          {displayImage && (
            <Image src={displayImage} alt={course.title} fill className="object-cover opacity-10 scale-110 blur-2xl" sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070814]/80 via-[#070814]/90 to-[#070814]" />
        </div>

        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <button onClick={() => router.back()} className="flex items-center gap-1.5 hover:text-purple-400 transition-colors group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
            <span>/</span>
            <Link href="/courses" className="hover:text-purple-400 transition-colors">Courses</Link>
            <span>/</span>
            <span className="text-slate-300 truncate max-w-xs">{course.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Left — Text Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Category Badge */}
              <span className="inline-block bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg mb-5">
                {course.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-5 bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                {course.title}
              </h1>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-7 max-w-2xl">
                {course.fullDescription || course.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-5 text-sm mb-7">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{(course.rating || 4.8).toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({(course.reviewCount || 0).toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users className="h-4 w-4 text-indigo-400" />
                  <span>{(course.studentsCount || 0).toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="h-4 w-4 text-purple-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                  <span>{course.level || "All Levels"}</span>
                </div>
              </div>

              {/* Meta tags */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-purple-400" /> {course.language || "English"}</span>
                <span className="flex items-center gap-1.5"><Award className="h-3.5 w-3.5 text-amber-400" /> Certificate of Completion</span>
                <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-emerald-400" /> Last updated {course.lastUpdated || "2026"}</span>
              </div>
            </motion.div>

            {/* Right — Purchase Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:sticky lg:top-24"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-purple-950/30">
                {/* Course Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden">
                  {displayImage ? (
                    <Image src={displayImage} alt={course.title} fill className="object-cover" sizes="400px" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/50 to-indigo-900/50 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-purple-400/40" />
                    </div>
                  )}
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="h-6 w-6 text-white fill-white ml-1" />
                    </div>
                  </div>
                  {/* Discount badge */}
                  {discount > 0 && (
                    <div className="absolute top-3 right-3 bg-rose-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg">
                      -{discount}% OFF
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="p-6">
                  <div className="flex items-end gap-3 mb-5">
                    <span className="text-4xl font-extrabold text-white">
                      {course.price === 0 ? "Free" : `$${course.price}`}
                    </span>
                    {course.originalPrice && (
                      <span className="text-slate-500 line-through text-lg">${course.originalPrice}</span>
                    )}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-3 mb-5">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold text-sm tracking-wide shadow-lg shadow-purple-900/40 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Enroll Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`w-full py-3.5 rounded-2xl border font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 ${
                        isWishlisted
                          ? "border-rose-500/50 bg-rose-500/10 text-rose-400"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-rose-400" : ""}`} />
                      {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                    </motion.button>
                  </div>

                  {/* Course quick stats */}
                  <div className="border-t border-white/5 pt-5 space-y-3">
                    {[
                      { icon: BookOpen, label: `${course.lectures || 120} lectures`, color: "text-purple-400" },
                      { icon: Clock, label: `${course.duration} of content`, color: "text-indigo-400" },
                      { icon: Award, label: "Certificate of completion", color: "text-amber-400" },
                      { icon: Globe, label: "Full lifetime access", color: "text-emerald-400" },
                      { icon: Share2, label: "Access on all devices", color: "text-sky-400" },
                    ].map(({ icon: Icon, label, color }) => (
                      <div key={label} className="flex items-center gap-3 text-sm text-slate-300">
                        <Icon className={`h-4 w-4 flex-shrink-0 ${color}`} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-xs text-slate-500 mt-5">30-day money-back guarantee</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── TABS NAVIGATION ── */}
      <div className="border-b border-white/5 bg-[#070814]/80 backdrop-blur sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {(["overview", "curriculum", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-semibold capitalize border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-slate-400 hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          <div>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                {/* What You'll Learn */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white">What you&apos;ll learn</h2>
                  <div className="grid sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-slate-950/50 border border-white/5">
                    {(course.whatYouLearn || []).map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white">Requirements</h2>
                  <ul className="space-y-3">
                    {(course.requirements || []).map((req: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructor */}
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-white">Your Instructor</h2>
                  <div className="flex items-start gap-5 p-6 rounded-2xl bg-slate-950/50 border border-white/5">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={course.instructorAvatar || `https://i.pravatar.cc/150?u=${course.instructor}`}
                        alt={course.instructor}
                        fill
                        className="rounded-2xl object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{course.instructor}</h3>
                      <p className="text-purple-400 text-sm mb-3">{course.instructorTitle || "Expert Instructor"}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">{course.instructorBio}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CURRICULUM TAB */}
            {activeTab === "curriculum" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
                  <span className="text-sm text-slate-400">{course.lectures || 120} lectures · {course.duration}</span>
                </div>
                <div className="space-y-3">
                  {(course.curriculum || []).map((section: any, i: number) => (
                    <div key={i} className="rounded-2xl border border-white/5 bg-slate-950/50 overflow-hidden">
                      <button
                        onClick={() => setOpenSection(openSection === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/2 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
                            {i + 1}
                          </div>
                          <span className="font-semibold text-white text-sm">{section.section}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span>{section.lectures} lectures</span>
                          <span>{section.duration}</span>
                          {openSection === i
                            ? <ChevronUp className="h-4 w-4" />
                            : <ChevronDown className="h-4 w-4" />
                          }
                        </div>
                      </button>
                      {openSection === i && (
                        <div className="px-5 pb-5 border-t border-white/5 pt-4">
                          <div className="space-y-2">
                            {Array.from({ length: Math.min(section.lectures, 4) }).map((_, j) => (
                              <div key={j} className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/3 transition-colors">
                                <Play className="h-3.5 w-3.5 text-purple-400 fill-purple-400/30 flex-shrink-0" />
                                <span className="text-sm text-slate-300">Lecture {j + 1}: {section.section} — Part {j + 1}</span>
                                <span className="ml-auto text-xs text-slate-500">8:30</span>
                              </div>
                            ))}
                            {section.lectures > 4 && (
                              <p className="text-xs text-slate-500 pl-3 pt-1">+{section.lectures - 4} more lectures</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* REVIEWS TAB */}
            {activeTab === "reviews" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-2xl font-bold text-white mb-8">Student Reviews</h2>

                {/* Rating Summary */}
                <div className="flex items-center gap-8 p-6 rounded-2xl bg-slate-950/50 border border-white/5 mb-8">
                  <div className="text-center flex-shrink-0">
                    <div className="text-6xl font-extrabold text-amber-400">{(course.rating || 4.8).toFixed(1)}</div>
                    <div className="flex items-center justify-center gap-0.5 my-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(course.rating || 4.8) ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">Course Rating</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 7 : star === 2 ? 2 : 1;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <div className="h-2 flex-1 rounded-full bg-slate-800 overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-400 w-12 flex-shrink-0">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span>{star}</span>
                          </div>
                          <span className="text-xs text-slate-500 w-8 text-right">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-5">
                  {REVIEWS.map((review, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-purple-500/20 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <Image src={review.avatar} alt={review.name} width={44} height={44} className="rounded-xl flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white text-sm">{review.name}</h4>
                            <span className="text-xs text-slate-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5 mb-2">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`} />
                            ))}
                          </div>
                          <p className="text-slate-300 text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="mt-6 w-full py-3.5 rounded-2xl border border-white/10 text-slate-400 hover:text-white hover:border-purple-500/30 transition-all text-sm font-semibold flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Load More Reviews
                </button>
              </motion.div>
            )}
          </div>

          {/* Right column spacer (card is sticky) */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </div>
  );
}
