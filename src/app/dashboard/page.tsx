"use client";

import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import CourseCard from "@/components/courses/CourseCard";
import {
  LayoutDashboard,
  BookOpen,
  Book,
  CreditCard,
  Settings,
  Bell,
  Smartphone,
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  ChevronLeft,
  GraduationCap,
  Calendar as CalendarIcon,
  LogOut,
  Clock,
  Menu,
  X,
  Loader2,
  Users,
  Award,
  ListTodo,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Plus,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Upload,
  UserCheck,
  Video,
  Ban,
  Trash2,
  Send,
  MessageCircle,
  BookMarked,
  TrendingUp,
  TrendingDown,
  Minus,
  Shield,
  ShieldOff,
  ExternalLink,
  Download,
  Star,
  UserPlus,
  UserMinus,
  Eye,
  Filter
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_COVER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [myCourses, setMyCourses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchMyCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMyCourses(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    }
    fetchMyCourses();
  }, []);
  
  // Mobile drawer states
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Add Course Modal states
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseCategory, setCourseCategory] = useState("Development");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseImage, setCourseImage] = useState("");
  
  // Upload states
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notes state
  const [notes, setNotes] = useState([
    { id: "1", title: "Chemistry - Atomic Structure", content: "Review periodic table, electron configuration, and valence electrons before Friday's class.", color: "purple", date: "Jul 8, 2026", tag: "Chemistry" },
    { id: "2", title: "UX Design Principles", content: "Gestalt principles: proximity, similarity, continuity, closure. Apply these when reviewing student portfolios.", color: "indigo", date: "Jul 9, 2026", tag: "Design" },
    { id: "3", title: "Class 3A Assignment", content: "Collect and grade the completed equations worksheet. Deadline is July 12th. Arrange extra session if needed.", color: "emerald", date: "Jul 10, 2026", tag: "Assignment" },
    { id: "4", title: "Parent-Teacher Meeting", content: "Schedule parent-teacher meetings for underperforming students. Prepare progress reports in advance.", color: "amber", date: "Jul 11, 2026", tag: "Meeting" },
  ]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteTag, setNoteTag] = useState("General");
  const [noteColor, setNoteColor] = useState("purple");
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Calendar state
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  // ── CLASSROOM CHAT STATE ──
  const [activeChatClassroom, setActiveChatClassroom] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [classroomChats, setClassroomChats] = useState<Record<string, { id: string; sender: string; text: string; time: string; isTeacher: boolean }[]>>({
    "class-3a": [
      { id: "1", sender: "Einstein", text: "Sir, can we reschedule tomorrow's class?", time: "10:32 AM", isTeacher: false },
      { id: "2", sender: "You", text: "No changes — please be on time.", time: "10:35 AM", isTeacher: true },
      { id: "3", sender: "Charlotte Fox", text: "Understood, sir. We'll be there!", time: "10:36 AM", isTeacher: false },
    ],
    "class-3b": [
      { id: "1", sender: "Edison", text: "Sir can we solve the problems for homework?", time: "09:14 AM", isTeacher: false },
      { id: "2", sender: "You", text: "Yes, complete problems 1–10 from Chapter 5.", time: "09:20 AM", isTeacher: true },
    ],
    "class-5c": [
      { id: "1", sender: "Marcus Rivera", text: "Sir when is the next test?", time: "Yesterday", isTeacher: false },
    ],
  });

  // ── STUDENTS MANAGEMENT STATE ──
  const [managedStudents, setManagedStudents] = useState([
    { id: "s1", name: "Robert Jones",   email: "robert.jones@school.edu",   role: "Student", joinDate: "Jul 1, 2026",  status: "active",  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",  classroom: "Class 3A" },
    { id: "s2", name: "Charlotte Fox",  email: "charlotte.fox@school.edu",  role: "Student", joinDate: "Jul 2, 2026",  status: "active",  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100", classroom: "Class 3A" },
    { id: "s3", name: "Benjamin Wood",  email: "ben.wood@school.edu",        role: "Student", joinDate: "Jul 3, 2026",  status: "pending", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100", classroom: "Class 3B" },
    { id: "s4", name: "Samantha Lee",   email: "sam.lee@school.edu",         role: "Student", joinDate: "Jul 4, 2026",  status: "active",  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100", classroom: "Class 3B" },
    { id: "s5", name: "James Carter",   email: "james.carter@school.edu",    role: "Student", joinDate: "Jul 5, 2026",  status: "pending", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",  classroom: "Class 5C" },
    { id: "s6", name: "Emily Zhang",    email: "emily.zhang@school.edu",     role: "Student", joinDate: "Jul 6, 2026",  status: "active",  avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100", classroom: "Class 5C" },
    { id: "s7", name: "Marcus Rivera",  email: "marcus.r@school.edu",        role: "Student", joinDate: "Jul 7, 2026",  status: "banned",  avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=100",  classroom: "Class 3A" },
    { id: "s8", name: "Priya Sharma",   email: "priya.s@school.edu",         role: "Student", joinDate: "Jul 8, 2026",  status: "pending", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100", classroom: "Class 3B" },
    { id: "s9", name: "Lucas Martin",   email: "lucas.m@school.edu",         role: "Student", joinDate: "Jul 9, 2026",  status: "active",  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100", classroom: "Class 5C" },
    { id: "s10", name: "Olivia Brown",  email: "olivia.b@school.edu",        role: "Student", joinDate: "Jul 10, 2026", status: "active",  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100", classroom: "Class 3A" },
  ]);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentFilter, setStudentFilter] = useState<"all"|"active"|"pending"|"banned">("all");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // ── BOOKS STATE ──
  const [bookSearch, setBookSearch] = useState("");
  const books = [
    { id: "b1", title: "Fundamentals of Physics", author: "Halliday & Resnick", genre: "Physics", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop", pages: 1248, rating: 4.9, description: "The definitive textbook for understanding classical and modern physics.", color: "from-blue-600 to-indigo-700", readUrl: "#" },
    { id: "b2", title: "Organic Chemistry", author: "Paula Yurkanis Bruice", genre: "Chemistry", cover: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=300&auto=format&fit=crop", pages: 1296, rating: 4.7, description: "A student-friendly approach to organic chemistry with real-world applications.", color: "from-emerald-600 to-teal-700", readUrl: "#" },
    { id: "b3", title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest", genre: "Computer Science", cover: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=300&auto=format&fit=crop", pages: 1312, rating: 4.8, description: "The bible of algorithms — comprehensive coverage from sorting to graph theory.", color: "from-purple-600 to-violet-700", readUrl: "#" },
    { id: "b4", title: "Calculus: Early Transcendentals", author: "James Stewart", genre: "Mathematics", cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=300&auto=format&fit=crop", pages: 1368, rating: 4.6, description: "Intuition-led calculus with thousands of examples and practice problems.", color: "from-amber-600 to-orange-700", readUrl: "#" },
    { id: "b5", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Literature", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop", pages: 281, rating: 4.9, description: "A timeless novel exploring racial injustice and moral growth in the American South.", color: "from-rose-600 to-pink-700", readUrl: "#" },
    { id: "b6", title: "The Art of War", author: "Sun Tzu", genre: "Philosophy", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=300&auto=format&fit=crop", pages: 273, rating: 4.8, description: "Ancient Chinese treatise on military strategy and philosophy, applicable to life.", color: "from-slate-600 to-gray-700", readUrl: "#" },
    { id: "b7", title: "A Brief History of Time", author: "Stephen Hawking", genre: "Physics", cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=300&auto=format&fit=crop", pages: 212, rating: 4.7, description: "Hawking's landmark journey from the Big Bang to black holes and the nature of time.", color: "from-cyan-600 to-blue-700", readUrl: "#" },
    { id: "b8", title: "Principles of Economics", author: "N. Gregory Mankiw", genre: "Economics", cover: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=300&auto=format&fit=crop", pages: 880, rating: 4.5, description: "The world's most popular economics textbook — clear, engaging, and comprehensive.", color: "from-green-600 to-emerald-700", readUrl: "#" },
  ];

  // Handle logout
  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070814]">
        <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (!session) {
    return null;
  }

  const user = session.user;
  const isTeacher = (user as any).role === "instructor";

  // Course Upload Handler
  const handleCourseImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      setModalError("ImgBB API key is missing. Please check .env file.");
      return;
    }

    setIsUploadingImg(true);
    setModalError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error?.message || "Failed to upload image");
      }

      setCourseImage(result.data.url);
    } catch (err: any) {
      setModalError(err.message || "Failed to upload image.");
    } finally {
      setIsUploadingImg(false);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingCourse(true);
    setModalError(null);
    setModalSuccess(false);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: courseTitle,
          description: courseDesc,
          category: courseCategory,
          price: Number(coursePrice) || 0,
          image: courseImage
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create course");
      }

      setModalSuccess(true);
      setTimeout(() => {
        setIsAddCourseOpen(false);
        setModalSuccess(false);
        // Reset fields
        setCourseTitle("");
        setCourseDesc("");
        setCourseCategory("Development");
        setCoursePrice("");
        setCourseImage("");
        
        // Redirect to where the course was added
        router.push("/courses");
      }, 2000);
    } catch (err: any) {
      setModalError(err.message || "Something went wrong.");
    } finally {
      setIsCreatingCourse(false);
    }
  };

  // ==========================================
  // STUDENT DASHBOARD RENDER
  // ==========================================
  const renderStudentDashboard = () => {
    // Menu items
    const menuItems = [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "My Course", icon: BookOpen },
      { name: "Ebook", icon: Book },
      { name: "Transaction", icon: CreditCard },
      { name: "Settings", icon: Settings },
    ];

    // Mock Data
    const activities = [
      {
        course: "UI/UX Fundamental",
        text: "Don't forget with your new task! your assignments will be collected in the near future",
        user: "Rommy Enakin",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
        time: "5 min"
      },
      {
        course: "Flutter Development",
        text: "Don't forget with your new task! your assignments will be collected in the near future",
        user: "Moonlay",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
        time: "15 min"
      }
    ];

    const coursesInProgress = [
      {
        name: "UI/UX Fundamental",
        completed: 8,
        total: 16,
        color: "bg-purple-600",
        image: "https://images.unsplash.com/photo-1581291518655-9523c932dede?q=80&w=150"
      },
      {
        name: "Flutter Development",
        completed: 8,
        total: 24,
        color: "bg-indigo-600",
        image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=150"
      },
      {
        name: "Data Analyst",
        completed: 12,
        total: 16,
        color: "bg-emerald-600",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=150"
      }
    ];

    const upcomingTasks = [
      {
        title: "Discussion - UI/UX Fundamental",
        time: "09.00 AM - 10.30 AM",
        iconBg: "bg-purple-500/10 text-purple-400"
      },
      {
        title: "Task - Flutter Development",
        time: "Due: Tuesday, 10 November",
        iconBg: "bg-indigo-500/10 text-indigo-400"
      },
      {
        title: "Task - UI/UX Fundamental",
        time: "Due: Tuesday, 10 November",
        iconBg: "bg-purple-500/10 text-purple-400"
      }
    ];

    return (
      <div className="min-h-screen bg-[#070814] text-white flex relative overflow-hidden w-full">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-slate-950/40 backdrop-blur-xl shrink-0 p-6">
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-purple-500" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">ScholarStack</span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-600/10 border border-purple-500/20 text-purple-400"
                      : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-white/10 p-4 relative overflow-hidden group">
              <Smartphone className="h-6 w-6 text-purple-400 mb-3" />
              <h4 className="font-bold text-sm mb-1 text-white">Download our app now!</h4>
              <p className="text-xs text-slate-400 mb-4">Learn on the go with our mobile app available on iOS & Android.</p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg font-bold text-slate-300 hover:text-white cursor-pointer hover:bg-slate-800 transition-colors">App Store</span>
                <span className="text-[10px] bg-slate-900 border border-white/5 px-2.5 py-1.5 rounded-lg font-bold text-slate-300 hover:text-white cursor-pointer hover:bg-slate-800 transition-colors">Google Play</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-white/10 p-6 z-50 flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-8 w-8 text-purple-500" />
                    <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">ScholarStack</span>
                  </div>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setActiveTab(item.name);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-purple-600/10 border border-purple-500/20 text-purple-400"
                            : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Panel */}
        <div className="flex-grow flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <header className="h-16 border-b border-white/5 bg-slate-950/20 backdrop-blur-md px-6 md:px-8 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg md:text-xl font-bold tracking-tight">Student Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-purple-500/30 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors animate-in fade-in"
              >
                {user.image ? (
                  <img src={user.image} alt={user.name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                )}
                <span className="hidden sm:inline text-xs font-semibold text-slate-300">{user.name}</span>
              </Link>
            </div>
          </header>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-6 flex-grow">
            {activeTab === "Dashboard" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Sub banner */}
                <div className="bg-gradient-to-r from-purple-700/80 to-indigo-700/80 border border-purple-500/30 rounded-3xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[0_0_30px_0_rgba(124,58,237,0.15)] relative overflow-hidden">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-yellow-400">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base md:text-lg">Subscription is less than 5 days away!</h3>
                      <p className="text-xs md:text-sm text-purple-200/70 mt-0.5">Please upgrade your premium plan to keep unlimited course access.</p>
                    </div>
                  </div>
                  <button className="bg-white hover:bg-purple-50 text-purple-950 font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer">
                    Upgrade
                  </button>
                </div>

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* New Activity */}
                  <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col">
                    <h3 className="font-bold text-base mb-1">New Activity</h3>
                    <p className="text-xs text-slate-500 mb-6">Your course information update</p>
                    <div className="space-y-4 flex-1">
                      {activities.map((act, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/10 transition-colors flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                              <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-red-400' : 'bg-orange-400'}`} />
                              <h4 className="font-bold text-sm">{act.course}</h4>
                            </div>
                            <span className="text-[10px] text-slate-500">{act.time}</span>
                          </div>
                          <p className="text-xs text-slate-400">{act.text}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <img src={act.avatar} alt={act.user} className="h-5 w-5 rounded-full object-cover" />
                            <span className="text-[10px] text-slate-500 font-semibold">{act.user}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full text-center text-xs text-purple-400 hover:text-purple-300 font-bold mt-6 pt-4 border-t border-white/5 cursor-pointer">
                      View all
                    </button>
                  </div>

                  {/* Course Progress */}
                  <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col justify-between gap-6">
                    <div>
                      <h3 className="font-bold text-base">Course Progress</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Your course progress statistics</p>
                    </div>
                    <div className="flex items-center justify-center gap-6 my-2">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.75)} />
                          <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.15)} transform="rotate(270 50 50)" />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-2xl font-extrabold text-white">75%</span>
                          <span className="text-[10px] text-slate-500 font-bold uppercase">Avg</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-purple-500" />
                          <div>
                            <p className="text-xs font-bold text-white">75%</p>
                            <p className="text-[10px] text-slate-500">Completed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-amber-500" />
                          <div>
                            <p className="text-xs font-bold text-white">15%</p>
                            <p className="text-[10px] text-slate-500">On Going</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-white/10 p-4 flex justify-between items-center gap-3">
                      <div>
                        <h4 className="font-bold text-xs text-white">Upgrade Premium pack now !</h4>
                        <p className="text-lg font-extrabold text-purple-400 mt-1">$ 120 <span className="text-[10px] text-slate-500 font-medium">/ Month</span></p>
                      </div>
                      <button className="bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold px-4 py-2 rounded-xl cursor-pointer">
                        Upgrade
                      </button>
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-bold flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-purple-400" />
                        November, 10 Tuesday
                      </span>
                      <div className="flex gap-1">
                        <button className="p-1 rounded hover:bg-white/5 text-slate-400"><ChevronLeft className="h-4 w-4" /></button>
                        <button className="p-1 rounded hover:bg-white/5 text-slate-400"><ChevronRight className="h-4 w-4" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <span key={day} className="text-purple-300/40 font-bold py-1">{day}</span>
                      ))}
                      {Array.from({ length: 30 }).map((_, idx) => {
                        const day = idx + 1;
                        const isToday = day === 10;
                        const isHighlighted = day === 26;
                        return (
                          <span
                            key={day}
                            className={`py-1.5 font-semibold flex items-center justify-center rounded-lg ${
                              isToday
                                ? "bg-amber-500 text-white font-bold"
                                : isHighlighted
                                ? "bg-purple-600 text-white font-bold"
                                : "text-slate-400 hover:bg-white/5"
                            }`}
                          >
                            {day}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Courses In progress & Tasks */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6">
                    <h3 className="font-bold text-base mb-6">Course in progress</h3>
                    <div className="space-y-4">
                      {coursesInProgress.map((course, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/10 transition-colors">
                          <div className="flex items-center gap-4">
                            <img src={course.image} alt={course.name} className="h-12 w-16 rounded-xl object-cover" />
                            <div>
                              <h4 className="font-bold text-sm text-white">{course.name}</h4>
                              <p className="text-xs text-slate-500 mt-1">{course.completed} of {course.total} course progress</p>
                            </div>
                          </div>
                          <div className="flex-1 max-w-xs w-full">
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full ${course.color}`} style={{ width: `${(course.completed / course.total) * 100}%` }} />
                            </div>
                          </div>
                          <button className="p-2 rounded-xl hover:bg-white/5 text-slate-400"><ChevronRight className="h-5 w-5" /></button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base mb-1">Upcoming task</h3>
                      <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Tuesday, 10 November 2026</span>
                    </div>
                    <div className="space-y-4 my-6">
                      {upcomingTasks.map((t, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-purple-500/10 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-xl ${t.iconBg} flex items-center justify-center`}><CalendarIcon className="h-5 w-5" /></div>
                            <div>
                              <h4 className="font-bold text-xs text-white truncate max-w-[180px]">{t.title}</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">{t.time}</p>
                            </div>
                          </div>
                          <button className="p-1 text-slate-500 hover:text-white"><MoreHorizontal className="h-4 w-4" /></button>
                        </div>
                      ))}
                    </div>
                    <button className="w-full text-center text-xs text-purple-400 hover:text-purple-300 font-bold border-t border-white/5 pt-4 cursor-pointer">View all tasks</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── MY COURSE TAB ── */}
            {activeTab === "My Course" && (
              <div className="animate-in fade-in duration-300 space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">My Courses</h2>
                  <p className="text-slate-400 text-sm mt-1">Pick up where you left off</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {myCourses.map((course, idx) => (
                    <CourseCard key={course._id || idx} {...course} />
                  ))}
                </div>
              </div>
            )}

            {/* ── EBOOK TAB ── */}
            {activeTab === "Ebook" && (() => {
              const filteredBooks = books.filter(b => 
                b.title.toLowerCase().includes(bookSearch.toLowerCase()) || 
                b.author.toLowerCase().includes(bookSearch.toLowerCase()) || 
                b.genre.toLowerCase().includes(bookSearch.toLowerCase())
              );
              const genreColors: Record<string, string> = {
                "Physics": "bg-blue-500 text-blue-100 border-blue-400",
                "Chemistry": "bg-emerald-500 text-emerald-100 border-emerald-400",
                "Computer Science": "bg-purple-500 text-purple-100 border-purple-400",
                "Mathematics": "bg-amber-500 text-amber-100 border-amber-400",
                "Literature": "bg-rose-500 text-rose-100 border-rose-400",
                "Philosophy": "bg-slate-500 text-slate-100 border-slate-400",
                "Economics": "bg-green-500 text-green-100 border-green-400",
              };
              
              return (
                <div className="animate-in fade-in duration-300 space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">E-Books Library</h2>
                      <p className="text-slate-400 text-sm mt-1">{books.length} curated e-books across subjects</p>
                    </div>
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        value={bookSearch}
                        onChange={e => setBookSearch(e.target.value)}
                        placeholder="Search books, authors, genres..."
                        className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {filteredBooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-600">
                      <BookMarked className="h-14 w-14 mb-4 opacity-30" />
                      <p className="font-bold text-slate-500">No books found</p>
                      <p className="text-xs text-slate-600 mt-1">Try a different search term</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filteredBooks.map(book => (
                        <div key={book.id} className="group relative rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl hover:shadow-black/40 duration-300">
                          {/* Book Cover */}
                          <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${book.color} flex items-center justify-center`}>
                            <img src={book.cover} alt={book.title}
                              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity group-hover:scale-105 duration-500" />
                            <div className="relative z-10 text-center p-4">
                              <BookMarked className="h-10 w-10 text-white/80 mx-auto mb-1" />
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${genreColors[book.genre] || "bg-white/10 text-white border-white/20"} bg-black/30 backdrop-blur-sm`}>
                                {book.genre}
                              </span>
                            </div>
                          </div>

                          {/* Book Info */}
                          <div className="p-4 flex flex-col flex-1 gap-3">
                            <div>
                              <h4 className="font-bold text-white text-sm leading-snug line-clamp-2">{book.title}</h4>
                              <p className="text-[11px] text-slate-400 mt-1">{book.author}</p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 flex-1">{book.description}</p>

                            <div className="flex items-center justify-between text-[10px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                <span className="text-amber-400 font-bold">{book.rating}</span>
                              </span>
                              <span>{book.pages.toLocaleString()} pages</span>
                            </div>

                            <div className="flex gap-2 pt-1">
                              <a href={book.readUrl} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-[11px] py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md">
                                <Eye className="h-3.5 w-3.5" /> Read Online
                              </a>
                              <button className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold hover:bg-white/10 hover:border-white/20 transition-all">
                                <Download className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // TEACHER DASHBOARD RENDER
  // ==========================================
  const renderTeacherDashboard = () => {
    // Menu items
    const menuItems = [
      { name: "Dashboard", icon: LayoutDashboard },
      { name: "Classrooms", icon: Users },
      { name: "Students", icon: UserCheck },
      { name: "Performance", icon: Award },
      { name: "Books", icon: Book },
      { name: "Calendar", icon: CalendarIcon },
      { name: "View Results", icon: ListTodo },
      { name: "Notes", icon: BookOpen },
    ];

    // Top Overview Statistics
    const stats = [
      { label: "No of Students", value: "250", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
      { label: "No of Classes", value: "10", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
      { label: "Course in progress", value: "18", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
      { label: "Course completed", value: "23", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    ];

    // Messages Mock Data
    const messages = [
      { group: "Teacher's Group", text: "Einstein: Mr. Heisenberg can I borrow your...", count: 8, avatarText: "T" },
      { group: "Class 3A", text: "You: Complete the equations and come...", count: null, avatarText: "3A" },
      { group: "Class 3B", text: "Edison: Sir can we solve the problems for...", count: 3, avatarText: "3B" },
    ];

    // Students Mock Data Table
    const students = [
      { name: "Robert Jones", chapter: "Chemistry", grade: "A (Very Good)", status: "In Progress", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100" },
      { name: "Charlotte Fox", chapter: "Heuristics in UX", grade: "B+ (Good)", status: "In Progress", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100" },
      { name: "Benjamin Wood", chapter: "Chemistry", grade: "C (Pass)", status: "Reviewed", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100" },
      { name: "Samantha Lee", chapter: "Gestalt Principles in UX", grade: "A+ (Excellent)", status: "Not viewed", color: "text-red-400 bg-red-500/10 border-red-500/20", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100" },
    ];

    // Timetable Mock Data
    const timetable = [
      { time: "10:00", subject: "Chemistry | Class 3A", info: "May 22, Offline" },
      { time: "11:30", subject: "Chemistry | Class 3A", info: "May 22, Offline" },
      { time: "15:30", subject: "Chemistry | Class 5C", info: "May 22, Offline" },
    ];

    return (
      <div className="min-h-screen bg-[#070814] text-white flex relative overflow-hidden w-full animate-in fade-in duration-300">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-slate-950/40 backdrop-blur-xl shrink-0 p-6">
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-purple-500" />
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">ScholarStack</span>
          </div>

          <nav className="flex-1 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-600/10 border border-purple-500/20 text-purple-400"
                      : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Add Course Promo Box */}
          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="rounded-2xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-white/10 p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <Plus className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-sm mb-1 text-white">Add new course now</h4>
              <p className="text-xs text-slate-400 mb-4">Launch a new learning catalog for your students.</p>
              <button
                type="button"
                onClick={() => setIsAddCourseOpen(true)}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-xl text-xs shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Add Course
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-white/10 p-6 z-50 flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-8 w-8 text-purple-500" />
                    <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">ScholarStack</span>
                  </div>
                  <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 space-y-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          setActiveTab(item.name);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-purple-600/10 border border-purple-500/20 text-purple-400"
                            : "text-slate-400 border border-transparent hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </nav>
                <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      setIsAddCourseOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Course</span>
                  </button>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Panel */}
        <div className="flex-grow flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <header className="h-16 border-b border-white/5 bg-slate-950/20 backdrop-blur-md px-6 md:px-8 flex items-center justify-between z-10 shrink-0">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
                <Menu className="h-6 w-6" />
              </button>
              <div className="hidden sm:block">
                <h2 className="text-base font-extrabold text-white">Welcome back, {user.name}</h2>
                <p className="text-[10px] text-slate-500">May 21, Wednesday</p>
              </div>
            </div>

            {/* Quick action button & Profile */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddCourseOpen(true)}
                className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-3 py-1.5 rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Course
              </button>

              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-purple-500/30 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
              >
                {user.image ? (
                  <img src={user.image} alt={user.name} className="h-6 w-6 rounded-full object-cover" />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                )}
                <span className="hidden sm:inline text-xs font-semibold text-slate-300">{user.name}</span>
              </Link>
            </div>
          </header>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-6 flex-grow">

            {/* ── CALENDAR TAB ── */}
            {activeTab === "Calendar" && (() => {
              const year = calendarDate.getFullYear();
              const month = calendarDate.getMonth();
              const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
              const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
              const firstDay = new Date(year, month, 1).getDay();
              const daysInMonth = new Date(year, month + 1, 0).getDate();
              const today = new Date();
              const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
              const todayDate = isCurrentMonth ? today.getDate() : -1;

              const calendarEvents: Record<number, { title: string; color: string; time: string }[]> = {
                3:  [{ title: "Chemistry Test", color: "purple", time: "09:00 AM" }],
                8:  [{ title: "Parent Meeting", color: "amber",  time: "11:00 AM" }, { title: "Staff Debrief", color: "indigo", time: "3:00 PM" }],
                12: [{ title: "Class 3A Exam", color: "emerald", time: "10:00 AM" }],
                15: [{ title: "UX Workshop",   color: "pink",    time: "2:00 PM"  }],
                22: [{ title: "Grade Review",  color: "purple",  time: "09:30 AM" }],
                26: [{ title: "End of Term",   color: "rose",    time: "All Day"  }],
              };

              const colorMap: Record<string, string> = {
                purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
                indigo:  "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
                amber:   "bg-amber-500/20 text-amber-300 border-amber-500/30",
                emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                pink:    "bg-pink-500/20 text-pink-300 border-pink-500/30",
                rose:    "bg-rose-500/20 text-rose-300 border-rose-500/30",
              };

              const dotMap: Record<string, string> = {
                purple: "bg-purple-400", indigo: "bg-indigo-400",
                amber: "bg-amber-400", emerald: "bg-emerald-400",
                pink: "bg-pink-400", rose: "bg-rose-400",
              };

              const selectedEvents = selectedDay ? (calendarEvents[selectedDay] || []) : [];

              return (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">Calendar</h2>
                      <p className="text-slate-400 text-sm mt-1">Manage your schedule and upcoming events</p>
                    </div>
                    <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all hover:scale-105">
                      <Plus className="h-4 w-4" /> Add Event
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Calendar */}
                    <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl p-6">
                      {/* Month Nav */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-extrabold text-white">{monthNames[month]} {year}</h3>
                        <div className="flex gap-2">
                          <button onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
                            className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-colors">
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button onClick={() => setCalendarDate(new Date())}
                            className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-bold hover:bg-purple-600/30 transition-colors">
                            Today
                          </button>
                          <button onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
                            className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-colors">
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Day headers */}
                      <div className="grid grid-cols-7 mb-2">
                        {dayNames.map(d => (
                          <div key={d} className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider py-2">{d}</div>
                        ))}
                      </div>

                      {/* Date Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const isToday = day === todayDate;
                          const isSelected = day === selectedDay;
                          const hasEvents = !!calendarEvents[day];
                          return (
                            <button key={day} onClick={() => setSelectedDay(day)}
                              className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all hover:scale-105 ${
                                isToday ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40" :
                                isSelected ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" :
                                "text-slate-400 hover:bg-white/5 hover:text-white"
                              }`}>
                              {day}
                              {hasEvents && (
                                <div className="flex gap-0.5 mt-0.5">
                                  {calendarEvents[day].slice(0,3).map((ev, ei) => (
                                    <span key={ei} className={`w-1 h-1 rounded-full ${dotMap[ev.color] || "bg-purple-400"}`} />
                                  ))}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Side Panel */}
                    <div className="flex flex-col gap-4">
                      {/* Selected day events */}
                      <div className="rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl p-6 flex-1">
                        <h4 className="font-bold text-white mb-1">
                          {selectedDay ? `${monthNames[month]} ${selectedDay}` : "Select a day"}
                        </h4>
                        <p className="text-slate-500 text-xs mb-5">{selectedEvents.length} event{selectedEvents.length !== 1 ? "s" : ""}</p>
                        {selectedEvents.length > 0 ? (
                          <div className="space-y-3">
                            {selectedEvents.map((ev, i) => (
                              <div key={i} className={`p-3.5 rounded-2xl border ${colorMap[ev.color]} flex items-start gap-3`}>
                                <div className={`w-2 h-2 rounded-full mt-1.5 ${dotMap[ev.color]}`} />
                                <div>
                                  <p className="font-bold text-sm">{ev.title}</p>
                                  <p className="text-[11px] opacity-70 mt-0.5 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />{ev.time}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-slate-600">
                            <CalendarIcon className="h-10 w-10 mb-3 opacity-40" />
                            <p className="text-xs text-center">No events scheduled for this day</p>
                          </div>
                        )}
                      </div>

                      {/* Upcoming Events */}
                      <div className="rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl p-6">
                        <h4 className="font-bold text-white mb-4">Upcoming</h4>
                        <div className="space-y-3">
                          {[
                            { day: "Jul 12", title: "Class 3A Exam", color: "emerald" },
                            { day: "Jul 15", title: "UX Workshop",   color: "pink" },
                            { day: "Jul 22", title: "Grade Review",  color: "purple" },
                          ].map((ev, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold text-slate-400 text-center leading-tight">
                                {ev.day.split(" ")[0]}<br/>{ev.day.split(" ")[1]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-white truncate">{ev.title}</p>
                                <div className={`inline-flex items-center gap-1 mt-0.5`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${dotMap[ev.color]}`} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── NOTES TAB ── */}
            {activeTab === "Notes" && (() => {
              const colorOptions = [
                { key: "purple", label: "Purple", bg: "bg-purple-500/20 border-purple-500/30 hover:border-purple-400/50", dot: "bg-purple-400", text: "text-purple-300", header: "from-purple-900/40 to-purple-800/20" },
                { key: "indigo",  label: "Indigo",  bg: "bg-indigo-500/20 border-indigo-500/30 hover:border-indigo-400/50",   dot: "bg-indigo-400",  text: "text-indigo-300",  header: "from-indigo-900/40 to-indigo-800/20" },
                { key: "emerald", label: "Green",   bg: "bg-emerald-500/20 border-emerald-500/30 hover:border-emerald-400/50", dot: "bg-emerald-400", text: "text-emerald-300", header: "from-emerald-900/40 to-emerald-800/20" },
                { key: "amber",   label: "Amber",   bg: "bg-amber-500/20 border-amber-500/30 hover:border-amber-400/50",       dot: "bg-amber-400",   text: "text-amber-300",   header: "from-amber-900/40 to-amber-800/20" },
                { key: "rose",    label: "Rose",    bg: "bg-rose-500/20 border-rose-500/30 hover:border-rose-400/50",           dot: "bg-rose-400",    text: "text-rose-300",    header: "from-rose-900/40 to-rose-800/20" },
              ];
              const getColor = (key: string) => colorOptions.find(c => c.key === key) || colorOptions[0];

              const handleAddNote = () => {
                if (!noteTitle.trim() || !noteContent.trim()) return;
                const now = new Date();
                const dateStr = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                setNotes(prev => [
                  { id: Date.now().toString(), title: noteTitle, content: noteContent, color: noteColor, date: dateStr, tag: noteTag },
                  ...prev,
                ]);
                setNoteTitle(""); setNoteContent(""); setNoteTag("General"); setNoteColor("purple");
                setIsAddingNote(false);
              };

              return (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">Notes</h2>
                      <p className="text-slate-400 text-sm mt-1">{notes.length} notes saved</p>
                    </div>
                    <button onClick={() => setIsAddingNote(true)}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all hover:scale-105">
                      <Plus className="h-4 w-4" /> Add Note
                    </button>
                  </div>

                  {/* Add Note Form */}
                  <AnimatePresence>
                    {isAddingNote && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-6 rounded-3xl border border-purple-500/20 bg-slate-950/60 backdrop-blur-xl">
                        <h3 className="font-bold text-white mb-4">New Note</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Title</label>
                            <input value={noteTitle} onChange={e => setNoteTitle(e.target.value)}
                              placeholder="Note title..." maxLength={60}
                              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Tag</label>
                              <input value={noteTag} onChange={e => setNoteTag(e.target.value)}
                                placeholder="e.g. Chemistry"
                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors" />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Color</label>
                              <div className="flex gap-2 pt-1">
                                {colorOptions.map(c => (
                                  <button key={c.key} onClick={() => setNoteColor(c.key)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all ${c.dot} ${noteColor === c.key ? "border-white scale-125" : "border-transparent opacity-60"}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Content</label>
                          <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}
                            placeholder="Write your note here..." rows={4} maxLength={400}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors resize-none" />
                        </div>
                        <div className="flex justify-end gap-3">
                          <button onClick={() => setIsAddingNote(false)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10 transition-colors">
                            Cancel
                          </button>
                          <button onClick={handleAddNote}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors">
                            <Plus className="h-3.5 w-3.5" /> Save Note
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Notes Grid */}
                  {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-600">
                      <BookOpen className="h-14 w-14 mb-4 opacity-30" />
                      <p className="font-bold text-slate-500">No notes yet</p>
                      <p className="text-xs text-slate-600 mt-1">Click &quot;Add Note&quot; to create your first note</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      <AnimatePresence>
                        {notes.map(note => {
                          const c = getColor(note.color);
                          return (
                            <motion.div key={note.id}
                              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                              className={`group relative rounded-2xl border ${c.bg} flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-0.5 duration-200`}>
                              {/* Card header gradient strip */}
                              <div className={`h-1.5 w-full bg-gradient-to-r ${c.header.replace("from-", "from-").replace("to-", "to-")}`}>
                                <div className={`h-full w-full ${c.dot} opacity-60`} />
                              </div>
                              <div className="p-5 flex flex-col flex-1">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                  <h4 className="font-bold text-sm text-white leading-snug line-clamp-2">{note.title}</h4>
                                  <button onClick={() => setNotes(prev => prev.filter(n => n.id !== note.id))}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 flex-shrink-0">
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed flex-1 line-clamp-5">{note.content}</p>
                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.bg} ${c.text}`}>{note.tag}</span>
                                  <span className="text-[10px] text-slate-600">{note.date}</span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── CLASSROOMS TAB ── */}
            {activeTab === "Classrooms" && (() => {
              const classrooms = [
                { id: "class-3a", name: "Class 3A", subject: "Chemistry", students: 28, schedule: "Mon, Wed, Fri · 09:00 AM", meetLink: "https://meet.google.com/abc-defg-hij", color: "from-purple-600 to-indigo-700", icon: "3A", unread: 8, status: "live" },
                { id: "class-3b", name: "Class 3B", subject: "Chemistry", students: 31, schedule: "Tue, Thu · 11:00 AM", meetLink: "https://meet.google.com/klm-nopq-rst", color: "from-blue-600 to-cyan-700", icon: "3B", unread: 3, status: "upcoming" },
                { id: "class-5c", name: "Class 5C", subject: "Advanced Physics", students: 22, schedule: "Mon, Fri · 03:30 PM", meetLink: "https://meet.google.com/uvw-xyz1-234", color: "from-emerald-600 to-teal-700", icon: "5C", unread: 0, status: "offline" },
              ];

              const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
                live:     { label: "Live Now",  dot: "bg-red-400 animate-ping",    badge: "bg-red-500/20 text-red-400 border-red-500/30" },
                upcoming: { label: "Upcoming",  dot: "bg-amber-400",               badge: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
                offline:  { label: "Offline",   dot: "bg-slate-500",               badge: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
              };

              const activeChat = activeChatClassroom ? classrooms.find(c => c.id === activeChatClassroom) : null;
              const chatMsgs = activeChatClassroom ? (classroomChats[activeChatClassroom] || []) : [];

              const handleSendMessage = () => {
                if (!chatInput.trim() || !activeChatClassroom) return;
                const now = new Date();
                const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                const newMsg = { id: Date.now().toString(), sender: "You", text: chatInput.trim(), time: timeStr, isTeacher: true };
                setClassroomChats(prev => ({
                  ...prev,
                  [activeChatClassroom]: [...(prev[activeChatClassroom] || []), newMsg],
                }));
                setChatInput("");
              };

              return (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">Classrooms</h2>
                      <p className="text-slate-400 text-sm mt-1">Manage your classes — join Google Meet or chat with students</p>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    {/* Classrooms grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 content-start">
                      {classrooms.map(cls => {
                        const sc = statusConfig[cls.status];
                        const isActiveChat = activeChatClassroom === cls.id;
                        return (
                          <div key={cls.id} className={`group relative rounded-3xl border ${ isActiveChat ? "border-purple-500/50 shadow-lg shadow-purple-900/20" : "border-white/5" } bg-slate-950/40 backdrop-blur-xl overflow-hidden flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-xl`}>
                            {/* Card header gradient */}
                            <div className={`h-2 w-full bg-gradient-to-r ${cls.color}`} />
                            <div className="p-5 flex flex-col gap-4 flex-1">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center font-extrabold text-white text-sm shadow-lg`}>{cls.icon}</div>
                                  <div>
                                    <h3 className="font-extrabold text-white text-base">{cls.name}</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">{cls.subject}</p>
                                  </div>
                                </div>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${sc.badge}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                  {sc.label}
                                </span>
                              </div>

                              <div className="flex items-center gap-4 text-xs text-slate-400">
                                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{cls.students} students</span>
                                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{cls.schedule}</span>
                              </div>

                              <div className="flex gap-2 pt-1">
                                <a
                                  href={cls.meetLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                  <Video className="h-3.5 w-3.5" />
                                  Join Google Meet
                                  <ExternalLink className="h-3 w-3 opacity-70" />
                                </a>
                                <button
                                  onClick={() => setActiveChatClassroom(prev => prev === cls.id ? null : cls.id)}
                                  className={`relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all hover:scale-[1.02] border ${
                                    isActiveChat
                                      ? "bg-purple-600 border-purple-500 text-white"
                                      : "bg-white/5 border-white/10 text-slate-300 hover:border-purple-500/30 hover:text-white"
                                  }`}
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                  Chat
                                  {cls.unread > 0 && !isActiveChat && (
                                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-purple-500 text-white text-[9px] font-bold flex items-center justify-center">{cls.unread}</span>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Chat Panel */}
                    <AnimatePresence>
                      {activeChatClassroom && activeChat && (
                        <motion.div
                          initial={{ opacity: 0, x: 40, width: 0 }}
                          animate={{ opacity: 1, x: 0, width: 340 }}
                          exit={{ opacity: 0, x: 40, width: 0 }}
                          className="shrink-0 rounded-3xl border border-purple-500/20 bg-slate-950/60 backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl shadow-purple-900/20"
                          style={{ minWidth: 300, maxWidth: 360 }}
                        >
                          {/* Chat Header */}
                          <div className={`p-4 bg-gradient-to-r ${activeChat.color} flex items-center justify-between`}>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center font-extrabold text-white text-sm">{activeChat.icon}</div>
                              <div>
                                <p className="font-extrabold text-white text-sm">{activeChat.name}</p>
                                <p className="text-[10px] text-white/70">{activeChat.students} students</p>
                              </div>
                            </div>
                            <button onClick={() => setActiveChatClassroom(null)} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Messages */}
                          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 400, minHeight: 300 }}>
                            {chatMsgs.length === 0 ? (
                              <div className="flex flex-col items-center justify-center h-full text-slate-600 py-8">
                                <MessageCircle className="h-10 w-10 mb-2 opacity-30" />
                                <p className="text-xs">No messages yet</p>
                              </div>
                            ) : chatMsgs.map(msg => (
                              <div key={msg.id} className={`flex flex-col ${msg.isTeacher ? "items-end" : "items-start"}`}>
                                <span className="text-[10px] text-slate-500 mb-1 px-1">{msg.isTeacher ? "You" : msg.sender}</span>
                                <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                                  msg.isTeacher
                                    ? "bg-purple-600 text-white rounded-tr-sm"
                                    : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-sm"
                                }`}>
                                  {msg.text}
                                </div>
                                <span className="text-[9px] text-slate-600 mt-1 px-1">{msg.time}</span>
                              </div>
                            ))}
                          </div>

                          {/* Input */}
                          <div className="p-3 border-t border-white/5">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 focus-within:border-purple-500/40 transition-colors">
                              <input
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                                placeholder="Type a message..."
                                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                              />
                              <button
                                onClick={handleSendMessage}
                                disabled={!chatInput.trim()}
                                className="h-7 w-7 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                              >
                                <Send className="h-3 w-3 text-white" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })()}

            {/* ── STUDENTS TAB ── */}
            {activeTab === "Students" && (() => {
              const totalUsers = 320;
              const activeCount  = managedStudents.filter(s => s.status === "active").length;
              const pendingCount = managedStudents.filter(s => s.status === "pending").length;
              const bannedCount  = managedStudents.filter(s => s.status === "banned").length;

              const filtered = managedStudents.filter(s => {
                const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                                     s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
                                     s.classroom.toLowerCase().includes(studentSearch.toLowerCase());
                const matchesFilter = studentFilter === "all" || s.status === studentFilter;
                return matchesSearch && matchesFilter;
              });

              const handleApprove = (id: string) => {
                setManagedStudents(prev => prev.map(s => s.id === id ? { ...s, status: "active" } : s));
              };
              const handleBan = (id: string) => {
                setManagedStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === "banned" ? "active" : "banned" } : s));
              };
              const handleDelete = (id: string) => {
                setManagedStudents(prev => prev.filter(s => s.id !== id));
                setDeleteConfirmId(null);
              };

              const statusBadge: Record<string, string> = {
                active:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
                banned:  "bg-red-500/10 text-red-400 border-red-500/20",
              };

              return (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">Students</h2>
                      <p className="text-slate-400 text-sm mt-1">Manage student access, approvals and bans</p>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Total Users",       value: totalUsers,    color: "text-slate-300",   bg: "from-slate-900/80 to-slate-800/40 border-white/5",          icon: <Users className="h-5 w-5" /> },
                      { label: "Students Joined",   value: managedStudents.length, color: "text-purple-400", bg: "from-purple-900/40 to-purple-800/20 border-purple-500/20", icon: <GraduationCap className="h-5 w-5" /> },
                      { label: "Pending Approval",  value: pendingCount,  color: "text-amber-400",   bg: "from-amber-900/30 to-amber-800/10 border-amber-500/20",     icon: <UserPlus className="h-5 w-5" /> },
                      { label: "Banned",             value: bannedCount,   color: "text-red-400",     bg: "from-red-900/30 to-red-800/10 border-red-500/20",           icon: <Ban className="h-5 w-5" /> },
                    ].map((st, i) => (
                      <div key={i} className={`rounded-2xl bg-gradient-to-br ${st.bg} border p-4 flex items-center gap-3`}>
                        <div className={`${st.color} opacity-70`}>{st.icon}</div>
                        <div>
                          <p className="text-xs text-slate-400 font-semibold">{st.label}</p>
                          <p className={`text-2xl font-extrabold ${st.color}`}>{st.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Search + Filter Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        value={studentSearch}
                        onChange={e => setStudentSearch(e.target.value)}
                        placeholder="Search by name, email or classroom..."
                        className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                    <div className="flex gap-2">
                      {(["all", "active", "pending", "banned"] as const).map(f => (
                        <button key={f} onClick={() => setStudentFilter(f)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                            studentFilter === f
                              ? "bg-purple-600 border-purple-500 text-white"
                              : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                          }`}
                        >{f}</button>
                      ))}
                    </div>
                  </div>

                  {/* Students Table */}
                  <div className="rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                      <h3 className="font-bold text-white text-sm">Student List</h3>
                      <span className="text-xs text-slate-500">{filtered.length} of {managedStudents.length} shown</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-white/5">
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Classroom</th>
                            <th className="px-6 py-3">Joined</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                          {filtered.length === 0 ? (
                            <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500 text-sm">No students found</td></tr>
                          ) : filtered.map((student, idx) => (
                            <tr key={student.id} className="hover:bg-white/[0.015] transition-colors group">
                              <td className="px-6 py-4 text-slate-500 text-xs">{idx + 1}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img src={student.avatar} alt={student.name} className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10" />
                                  <span className="font-semibold text-white text-xs">{student.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-400 text-xs">{student.email}</td>
                              <td className="px-6 py-4 text-slate-400 text-xs">{student.classroom}</td>
                              <td className="px-6 py-4 text-slate-400 text-xs">{student.joinDate}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border capitalize ${statusBadge[student.status]}`}>
                                  {student.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-end gap-2">
                                  {student.status === "pending" && (
                                    <button onClick={() => handleApprove(student.id)}
                                      title="Approve"
                                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-colors">
                                      <CheckCircle className="h-3 w-3" /> Approve
                                    </button>
                                  )}
                                  <button onClick={() => handleBan(student.id)}
                                    title={student.status === "banned" ? "Unban" : "Ban"}
                                    className={`p-1.5 rounded-lg border transition-colors ${
                                      student.status === "banned"
                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                                        : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                                    }`}>
                                    {student.status === "banned" ? <ShieldOff className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                                  </button>
                                  {deleteConfirmId === student.id ? (
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => handleDelete(student.id)}
                                        className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold hover:bg-red-500 transition-colors">
                                        Confirm
                                      </button>
                                      <button onClick={() => setDeleteConfirmId(null)}
                                        className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold hover:bg-white/10 transition-colors">
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setDeleteConfirmId(student.id)}
                                      title="Delete"
                                      className="p-1.5 rounded-lg border bg-white/5 border-white/10 text-slate-500 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 transition-colors">
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── PERFORMANCE TAB ── */}
            {activeTab === "Performance" && (() => {
              const perfStudents = [
                { name: "Robert Jones",   avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100", subject: "Chemistry",          score: 92, grade: "A",  trend: "+4", attendance: 96, assignments: 12, passed: 12 },
                { name: "Charlotte Fox",  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100", subject: "UX Design",          score: 85, grade: "B+", trend: "+2", attendance: 88, assignments: 12, passed: 11 },
                { name: "Benjamin Wood",  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100", subject: "Chemistry",          score: 73, grade: "C",  trend: "-1", attendance: 75, assignments: 12, passed: 9  },
                { name: "Samantha Lee",   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100", subject: "Gestalt Principles",  score: 97, grade: "A+", trend: "+6", attendance: 100,assignments: 12, passed: 12 },
                { name: "James Carter",   avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100", subject: "Data Science",        score: 68, grade: "C+", trend: "+1", attendance: 70, assignments: 12, passed: 8  },
                { name: "Emily Zhang",    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100", subject: "Machine Learning",    score: 88, grade: "B+", trend: "+3", attendance: 93, assignments: 12, passed: 11 },
                { name: "Marcus Rivera",  avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=100", subject: "Web Development",     score: 78, grade: "B",  trend: "0",  attendance: 82, assignments: 12, passed: 10 },
                { name: "Priya Sharma",   avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100", subject: "UI/UX Design",        score: 94, grade: "A",  trend: "+5", attendance: 98, assignments: 12, passed: 12 },
              ];

              const avg          = Math.round(perfStudents.reduce((s, r) => s + r.score, 0) / perfStudents.length);
              const topScorer    = perfStudents.reduce((a, b) => a.score > b.score ? a : b);
              const improving    = perfStudents.filter(s => s.trend.startsWith("+") && parseInt(s.trend) >= 3).length;
              const struggling   = perfStudents.filter(s => s.score < 75).length;

              const scoreColor = (s: number) =>
                s >= 90 ? "bg-emerald-500" : s >= 75 ? "bg-blue-500" : s >= 60 ? "bg-amber-500" : "bg-rose-500";
              const gradeColor = (g: string) =>
                g.startsWith("A") ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                : g.startsWith("B") ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                : "text-amber-400 bg-amber-500/10 border-amber-500/20";

              return (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">Performance</h2>
                      <p className="text-slate-400 text-sm mt-1">Detailed student performance analytics — July 2026</p>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Class Average",    value: `${avg}%`,           sub: "Overall score",       color: "text-purple-400",  bg: "from-purple-900/40 to-purple-800/10 border-purple-500/20" },
                      { label: "Top Scorer",        value: topScorer.score + "%", sub: topScorer.name,      color: "text-emerald-400", bg: "from-emerald-900/30 to-emerald-800/10 border-emerald-500/20" },
                      { label: "Rapidly Improving", value: improving,           sub: "Trend ≥ +3 pts",       color: "text-blue-400",   bg: "from-blue-900/30 to-blue-800/10 border-blue-500/20" },
                      { label: "Need Support",      value: struggling,          sub: "Score < 75%",          color: "text-rose-400",   bg: "from-rose-900/30 to-rose-800/10 border-rose-500/20" },
                    ].map((st, i) => (
                      <div key={i} className={`rounded-3xl bg-gradient-to-br ${st.bg} border p-5 flex flex-col gap-1`}>
                        <span className="text-xs text-slate-400 font-semibold">{st.label}</span>
                        <span className={`text-3xl font-extrabold ${st.color}`}>{st.value}</span>
                        <span className="text-[10px] text-slate-500 truncate">{st.sub}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bar Chart */}
                  <div className="rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl p-6 mb-6">
                    <h3 className="font-bold text-white text-sm mb-6">Score Overview — All Students</h3>
                    <div className="flex items-end gap-3 h-40">
                      {perfStudents.map((s, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                          <span className="text-[9px] text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">{s.score}%</span>
                          <div className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-default relative"
                            style={{ height: `${(s.score / 100) * 120}px` }}
                          >
                            <div className={`absolute inset-0 rounded-t-lg ${scoreColor(s.score)}`} />
                          </div>
                          <span className="text-[9px] text-slate-500 font-semibold text-center leading-tight max-w-[50px] truncate">{s.name.split(" ")[0]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 mt-4">
                      {[["Excellent ≥90","bg-emerald-500"],["Good 75–89","bg-blue-500"],["Pass 60–74","bg-amber-500"],["Fail <60","bg-rose-500"]].map(([label, bg], i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${bg}`} />
                          <span className="text-[10px] text-slate-400">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Student Performance Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {perfStudents.map((s, i) => (
                      <div key={i} className="rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-xl p-4 flex flex-col gap-3 hover:border-purple-500/20 transition-all hover:-translate-y-0.5">
                        <div className="flex items-center gap-3">
                          <img src={s.avatar} alt={s.name} className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10" />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-white text-xs truncate">{s.name}</p>
                            <p className="text-[10px] text-slate-500 truncate">{s.subject}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${gradeColor(s.grade)}`}>{s.grade}</span>
                        </div>

                        {/* Score bar */}
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] text-slate-500">Score</span>
                            <span className="text-xs font-extrabold text-white">{s.score}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${scoreColor(s.score)}`} style={{ width: `${s.score}%` }} />
                          </div>
                        </div>

                        {/* Stats row */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <div className="text-center">
                            <p className="text-[10px] text-slate-500">Attend.</p>
                            <p className="text-xs font-bold text-white">{s.attendance}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-slate-500">Tasks</p>
                            <p className="text-xs font-bold text-white">{s.passed}/{s.assignments}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] text-slate-500">Trend</p>
                            <p className={`text-xs font-bold flex items-center gap-0.5 ${
                              s.trend.startsWith("+") ? "text-emerald-400" : s.trend === "0" ? "text-slate-400" : "text-rose-400"
                            }`}>
                              {s.trend.startsWith("+") ? <TrendingUp className="h-3 w-3" /> : s.trend === "0" ? <Minus className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {s.trend === "0" ? "—" : s.trend}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* ── BOOKS TAB ── */}
            {activeTab === "Books" && (() => {
              const filteredBooks = books.filter(b =>
                b.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
                b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
                b.genre.toLowerCase().includes(bookSearch.toLowerCase())
              );

              const genreColors: Record<string, string> = {
                "Physics":          "bg-blue-500/10 text-blue-400 border-blue-500/20",
                "Chemistry":        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                "Computer Science": "bg-purple-500/10 text-purple-400 border-purple-500/20",
                "Mathematics":      "bg-amber-500/10 text-amber-400 border-amber-500/20",
                "Literature":       "bg-rose-500/10 text-rose-400 border-rose-500/20",
                "Philosophy":       "bg-slate-500/10 text-slate-400 border-slate-500/20",
                "Economics":        "bg-green-500/10 text-green-400 border-green-500/20",
              };

              return (
                <div className="animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">Books Library</h2>
                      <p className="text-slate-400 text-sm mt-1">{books.length} curated books across subjects</p>
                    </div>
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        value={bookSearch}
                        onChange={e => setBookSearch(e.target.value)}
                        placeholder="Search books, authors, genres..."
                        className="w-full bg-slate-900/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  {filteredBooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-600">
                      <BookMarked className="h-14 w-14 mb-4 opacity-30" />
                      <p className="font-bold text-slate-500">No books found</p>
                      <p className="text-xs text-slate-600 mt-1">Try a different search term</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filteredBooks.map(book => (
                        <div key={book.id} className="group relative rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:border-white/10 hover:shadow-2xl hover:shadow-black/40 duration-300">
                          {/* Book Cover */}
                          <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${book.color} flex items-center justify-center`}>
                            <img src={book.cover} alt={book.title}
                              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity group-hover:scale-105 duration-500" />
                            <div className="relative z-10 text-center p-4">
                              <BookMarked className="h-10 w-10 text-white/80 mx-auto mb-1" />
                              <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${genreColors[book.genre] || "bg-white/10 text-white border-white/20"} bg-black/30 backdrop-blur-sm`}>
                                {book.genre}
                              </span>
                            </div>
                          </div>

                          {/* Book Info */}
                          <div className="p-4 flex flex-col flex-1 gap-3">
                            <div>
                              <h4 className="font-bold text-white text-sm leading-snug line-clamp-2">{book.title}</h4>
                              <p className="text-[11px] text-slate-400 mt-1">{book.author}</p>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 flex-1">{book.description}</p>

                            <div className="flex items-center justify-between text-[10px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                <span className="text-amber-400 font-bold">{book.rating}</span>
                              </span>
                              <span>{book.pages.toLocaleString()} pages</span>
                            </div>

                            <div className="flex gap-2 pt-1">
                              <a href={book.readUrl} target="_blank" rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-[11px] py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md">
                                <Eye className="h-3.5 w-3.5" /> Read Online
                              </a>
                              <button className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold hover:bg-white/10 hover:border-white/20 transition-all">
                                <Download className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── VIEW RESULTS TAB ── */}
            {activeTab === "View Results" && (() => {
              const results = [
                { name: "Robert Jones",    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100", subject: "Chemistry",              score: 92, grade: "A",  status: "Excellent",   trend: "+4" },
                { name: "Charlotte Fox",   avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100", subject: "Heuristics in UX",       score: 85, grade: "B+", status: "Good",        trend: "+2" },
                { name: "Benjamin Wood",   avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100", subject: "Chemistry",              score: 73, grade: "C",  status: "Pass",        trend: "-1" },
                { name: "Samantha Lee",    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100", subject: "Gestalt Principles",     score: 97, grade: "A+", status: "Excellent",   trend: "+6" },
                { name: "James Carter",    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100", subject: "Data Science",           score: 68, grade: "C+", status: "Pass",        trend: "+1" },
                { name: "Emily Zhang",     avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100", subject: "Machine Learning",       score: 88, grade: "B+", status: "Good",        trend: "+3" },
                { name: "Marcus Rivera",   avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=100", subject: "Web Development",        score: 78, grade: "B",  status: "Good",        trend: "0"  },
                { name: "Priya Sharma",    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100", subject: "UI/UX Design",           score: 94, grade: "A",  status: "Excellent",   trend: "+5" },
              ];

              const gradeColors: Record<string, string> = {
                "A+": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                "A":  "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                "B+": "text-blue-400   bg-blue-500/10   border-blue-500/20",
                "B":  "text-blue-400   bg-blue-500/10   border-blue-500/20",
                "C+": "text-amber-400  bg-amber-500/10  border-amber-500/20",
                "C":  "text-amber-400  bg-amber-500/10  border-amber-500/20",
              };

              const avg = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
              const excellent = results.filter(r => r.score >= 90).length;
              const passing   = results.filter(r => r.score >= 60 && r.score < 90).length;
              const failing   = results.filter(r => r.score < 60).length;

              return (
                <div className="animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-extrabold text-white">View Results</h2>
                      <p className="text-slate-400 text-sm mt-1">Student performance overview — July 2026</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-purple-500/30 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all">
                        <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
                      </button>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: "Class Average", value: `${avg}%`, sub: "Overall score", color: "text-purple-400", bg: "from-purple-900/30 to-purple-800/10 border-purple-500/20" },
                      { label: "Excellent",     value: excellent,  sub: "Score ≥ 90",   color: "text-emerald-400", bg: "from-emerald-900/30 to-emerald-800/10 border-emerald-500/20" },
                      { label: "Passing",       value: passing,    sub: "Score 60–89",  color: "text-blue-400",    bg: "from-blue-900/30 to-blue-800/10 border-blue-500/20" },
                      { label: "Needs Help",    value: failing,    sub: "Score < 60",   color: "text-rose-400",    bg: "from-rose-900/30 to-rose-800/10 border-rose-500/20" },
                    ].map((s, i) => (
                      <div key={i} className={`rounded-3xl bg-gradient-to-br ${s.bg} border p-5 flex flex-col gap-1`}>
                        <span className="text-xs text-slate-400 font-semibold">{s.label}</span>
                        <span className={`text-3xl font-extrabold ${s.color}`}>{s.value}</span>
                        <span className="text-[10px] text-slate-500">{s.sub}</span>
                      </div>
                    ))}
                  </div>

                  {/* Score Distribution Bar */}
                  <div className="rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl p-6 mb-6">
                    <h3 className="font-bold text-white mb-5 text-sm">Score Distribution</h3>
                    <div className="flex h-10 rounded-2xl overflow-hidden gap-0.5">
                      {results.sort((a,b) => b.score - a.score).map((r, i) => (
                        <div key={i} title={`${r.name}: ${r.score}%`}
                          style={{ width: `${100/results.length}%`, height: `${r.score}%`, alignSelf: "flex-end" }}
                          className={`rounded-t-lg transition-all hover:opacity-80 cursor-pointer ${
                            r.score >= 90 ? "bg-emerald-500" : r.score >= 75 ? "bg-blue-500" : r.score >= 60 ? "bg-amber-500" : "bg-rose-500"
                          }`} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
                      <span>0%</span><span>50%</span><span>100%</span>
                    </div>
                    <div className="flex gap-4 mt-3">
                      {[["Excellent ≥90","bg-emerald-500"],["Good 75–89","bg-blue-500"],["Pass 60–74","bg-amber-500"],["Fail <60","bg-rose-500"]].map(([label,bg],i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${bg}`} />
                          <span className="text-[10px] text-slate-400">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results Table */}
                  <div className="rounded-3xl border border-white/5 bg-slate-950/40 backdrop-blur-xl overflow-hidden">
                    <div className="flex items-center justify-between p-6 pb-4">
                      <h3 className="font-bold text-white text-sm">Individual Results</h3>
                      <span className="text-xs text-slate-500">{results.length} students</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-t border-white/5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Subject</th>
                            <th className="px-6 py-3">Score</th>
                            <th className="px-6 py-3">Grade</th>
                            <th className="px-6 py-3">Trend</th>
                            <th className="px-6 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                          {results.map((r, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.015] transition-colors group">
                              <td className="px-6 py-4 text-slate-500 text-xs">{idx + 1}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <img src={r.avatar} alt={r.name} className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10" />
                                  <span className="font-semibold text-white text-xs">{r.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-400 text-xs">{r.subject}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="h-1.5 w-20 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all ${r.score >= 90 ? "bg-emerald-500" : r.score >= 75 ? "bg-blue-500" : r.score >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                                      style={{ width: `${r.score}%` }} />
                                  </div>
                                  <span className="text-white font-bold text-xs w-8">{r.score}%</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${gradeColors[r.grade] || "text-slate-400 bg-white/5 border-white/10"}`}>{r.grade}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-bold ${r.trend.startsWith("+") ? "text-emerald-400" : r.trend === "0" ? "text-slate-400" : "text-rose-400"}`}>{r.trend === "0" ? "—" : r.trend}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-semibold ${r.status === "Excellent" ? "text-emerald-400" : r.status === "Good" ? "text-blue-400" : "text-amber-400"}`}>{r.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── DEFAULT DASHBOARD CONTENT (only show when on Dashboard tab) ── */}
            {activeTab === "Dashboard" && (
            <>
            {/* Top row overview stats & Instructor card */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              
              {/* Stat Boxes Grid (spanning 3 cols on xl) */}
              <div className="xl:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((st, idx) => (
                  <div key={idx} className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-5 flex flex-col justify-between min-h-[120px]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold leading-none">{st.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    </div>
                    <span className="text-4xl font-extrabold tracking-tight text-white mt-4">{st.value}</span>
                  </div>
                ))}
              </div>

              {/* Instructor Card (spanning 1 col on xl) */}
              <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950/60 to-slate-900/60 p-5 flex items-center gap-4 relative overflow-hidden">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="h-16 w-16 rounded-2xl object-cover border border-white/10" />
                ) : (
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-2xl text-white">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                )}
                <div>
                  <h4 className="font-extrabold text-sm text-white">{user.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate max-w-[140px] mt-0.5">{user.email}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Rank</p>
                      <p className="text-xs font-extrabold text-purple-400">12</p>
                    </div>
                    <div className="border-l border-white/10 h-6" />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Classes</p>
                      <p className="text-xs font-extrabold text-indigo-400">10</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Middle Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Messages widget */}
              <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-base">Messages</h3>
                  <button className="text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors cursor-pointer">View all</button>
                </div>
                <div className="space-y-3 flex-grow">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs">
                          {msg.avatarText}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">{msg.group}</h4>
                          <p className="text-[10px] text-slate-400 truncate max-w-[170px] mt-0.5">{msg.text}</p>
                        </div>
                      </div>
                      {msg.count && (
                        <span className="h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-[10px]">
                          {msg.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Performance Chart */}
              <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-bold text-base">Student Performance</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Average grades overview</p>
                </div>

                <div className="flex items-center justify-center gap-6 my-2">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="10" />
                      {/* Segment 1: Excellent 75% */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.75)} />
                      {/* Segment 2: Good 15% */}
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.15)} transform="rotate(270 50 50)" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-extrabold text-white">75%</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase">Avg</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                      <span className="text-[10px] text-slate-300 font-bold">Excellent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                      <span className="text-[10px] text-slate-300 font-bold">Good</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-slate-300 font-bold">Average</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Calendar */}
              <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold flex items-center gap-2 text-slate-300">
                    <CalendarIcon className="h-4 w-4 text-purple-400" />
                    May 2026
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1 rounded hover:bg-white/5 text-slate-400"><ChevronLeft className="h-4 w-4" /></button>
                    <button className="p-1 rounded hover:bg-white/5 text-slate-400"><ChevronRight className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                    <span key={`${day}-${idx}`} className="text-purple-300/40 font-bold py-1">{day}</span>
                  ))}
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const day = idx + 1;
                    const isToday = day === 8;
                    const isHighlighted = day === 22 || day === 26;
                    return (
                      <span
                        key={day}
                        className={`py-1.5 font-semibold flex items-center justify-center rounded-lg ${
                          isToday
                            ? "bg-purple-600 text-white font-bold"
                            : isHighlighted
                            ? "bg-indigo-500/30 text-indigo-400"
                            : "text-slate-400 hover:bg-white/5"
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Lower Grid (Students Table & Timetable) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Students Table */}
              <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 overflow-x-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-base">Students Table</h3>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-xl text-xs text-slate-300 border border-white/5 hover:border-purple-500/20 cursor-pointer"><SlidersHorizontal className="h-3 w-3" /> Filter</button>
                    <button className="text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors ml-2 cursor-pointer">View all</button>
                  </div>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      <th className="pb-3 pl-2">#</th>
                      <th className="pb-3">Student</th>
                      <th className="pb-3">Chapter</th>
                      <th className="pb-3">Grade</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs divide-y divide-white/[0.02]">
                    {students.map((student, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-3 pl-2 text-slate-500">{idx + 1}.</td>
                        <td className="py-3 flex items-center gap-2">
                          <img src={student.avatar} alt={student.name} className="h-6 w-6 rounded-full object-cover" />
                          <span className="font-semibold text-white">{student.name}</span>
                        </td>
                        <td className="py-3 text-slate-400">{student.chapter}</td>
                        <td className="py-3 text-slate-400">{student.grade}</td>
                        <td className="py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${student.color}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 text-right pr-2">
                          <button className="p-1 text-slate-500 hover:text-white cursor-pointer"><MoreHorizontal className="h-4 w-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Weekly Timetable */}
              <div className="rounded-3xl border border-white/5 bg-slate-950/30 backdrop-blur-xl p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-base">Weekly Timetable</h3>
                  <button className="text-xs text-purple-400 hover:text-purple-300 font-bold transition-colors cursor-pointer">View all</button>
                </div>
                <div className="space-y-4 flex-grow">
                  {timetable.map((tt, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xs">
                          {tt.time}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">{tt.subject}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">{tt.info}</p>
                        </div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
            </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isTeacher ? renderTeacherDashboard() : renderStudentDashboard()}

      {/* ==========================================
          ADD COURSE DIALOG / MODAL (FOR TEACHERS)
          ========================================== */}
        {isAddCourseOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
              onClick={() => !isCreatingCourse && setIsAddCourseOpen(false)}
              className="absolute inset-0 bg-[#070814] flex items-center justify-center overflow-hidden"
            >
              {/* Colorful blobs for glassmorphism effect */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/40 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/40 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* Modal Body */}
            <div
              className="relative w-full max-w-3xl rounded-[2rem] border border-white/40 bg-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-xl z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-8 py-6 bg-gradient-to-r from-[#6b52a3] to-[#8a6ec7] relative z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#23154d] border border-white/10 flex items-center justify-center shadow-inner">
                    <Sparkles className="h-6 w-6 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-white tracking-wide">
                      Create New Course
                    </h3>
                    <p className="text-sm text-purple-100 font-light mt-1">Fill out the details to launch your course</p>
                  </div>
                </div>
                <button
                  onClick={() => !isCreatingCourse && setIsAddCourseOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="p-8 overflow-y-auto relative z-10">
                {/* Status alerts */}
                {modalSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-sm shadow-sm mb-6">
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">Course created successfully!</span>
                  </div>
                )}

                {modalError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm shadow-sm mb-6">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span className="font-semibold">{modalError}</span>
                  </div>
                )}

                <form id="create-course-form" onSubmit={handleCreateCourse} className="space-y-6">
                  {/* Title & Category Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Course Title</label>
                      <div className="relative group">
                        <input
                          type="text"
                          required
                          value={courseTitle}
                          onChange={(e) => setCourseTitle(e.target.value)}
                          placeholder="e.g. Master React in 30 Days"
                          className="w-full bg-white/50 border-2 border-blue-200/60 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all placeholder:text-slate-500 text-slate-800 shadow-[inset_0_2px_10px_rgba(59,130,246,0.1)] backdrop-blur-sm"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Category</label>
                      <div className="relative group flex items-center">
                        <div className="absolute left-4 z-10 p-1.5 bg-teal-500 rounded-lg">
                          <BookMarked className="h-4 w-4 text-white" />
                        </div>
                        <select
                          value={courseCategory}
                          onChange={(e) => setCourseCategory(e.target.value)}
                          className="w-full bg-white/50 border-2 border-teal-200/60 rounded-2xl pl-14 pr-10 py-4 text-sm focus:outline-none focus:border-teal-400 focus:bg-white/80 transition-all appearance-none cursor-pointer text-slate-800 shadow-[inset_0_2px_10px_rgba(20,184,166,0.1)] backdrop-blur-sm"
                        >
                          <option value="Development">Development</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Business">Business</option>
                          <option value="Science">Science</option>
                          <option value="Mathematics">Mathematics</option>
                        </select>
                        <ChevronRight className="absolute right-4 h-5 w-5 text-teal-600 rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={courseDesc}
                      onChange={(e) => setCourseDesc(e.target.value)}
                      placeholder="Write a compelling overview of what students will learn..."
                      className="w-full bg-white/50 border-2 border-pink-200/60 rounded-2xl p-5 text-sm focus:outline-none focus:border-pink-400 focus:bg-white/80 transition-all resize-none placeholder:text-slate-500 text-slate-800 shadow-[inset_0_2px_10px_rgba(236,72,153,0.1)] backdrop-blur-sm"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1">Price</label>
                    <div className="relative group max-w-[240px]">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <div className="h-7 w-7 rounded-full bg-orange-200 flex items-center justify-center">
                          <span className="text-orange-700 font-bold text-sm">$</span>
                        </div>
                      </div>
                      <input
                        type="number"
                        required
                        value={coursePrice}
                        onChange={(e) => setCoursePrice(e.target.value)}
                        placeholder="e.g. 99"
                        className="w-full bg-orange-50/50 border-2 border-orange-200/60 rounded-2xl pl-14 pr-4 py-4 text-sm focus:outline-none focus:border-orange-400 focus:bg-orange-50/80 transition-all placeholder:text-slate-500 font-semibold text-slate-800 shadow-[inset_0_2px_10px_rgba(249,115,22,0.1)] backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  {/* Course Image Upload */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 ml-1 flex items-center gap-2">
                      Course Cover Image
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200/50 text-slate-600 normal-case border border-slate-300/50">16:9 Recommended</span>
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleCourseImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {courseImage ? (
                      <div className="relative rounded-3xl overflow-hidden border border-white/40 h-36 group shadow-lg bg-black/10">
                        <img src={courseImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm gap-3">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-white/20 hover:bg-white/30 border border-white/30 px-5 py-2.5 rounded-xl text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
                          >
                            <Upload className="h-4 w-4" /> Change Image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingImg}
                        className={`w-full flex flex-col items-center justify-center p-6 rounded-3xl transition-all cursor-pointer min-h-[140px] relative overflow-hidden group shadow-md ${
                          isUploadingImg ? "opacity-70 cursor-wait" : "hover:shadow-xl hover:scale-[1.01]"
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#003b5c] via-[#4a004a] to-[#003b5c] opacity-90" />
                        <div className="absolute inset-0 bg-black/10" />
                        
                        <div className="relative z-10 flex flex-col items-center gap-2 text-white">
                          {isUploadingImg ? (
                            <>
                              <div className="relative">
                                <div className="h-10 w-10 rounded-xl border-2 border-white/20" />
                                <div className="absolute inset-0 h-10 w-10 rounded-xl border-2 border-white border-t-transparent animate-spin" />
                                <Upload className="absolute inset-0 m-auto h-4 w-4 text-white animate-pulse" />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold text-white drop-shadow-md">Uploading to cloud...</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <Upload className="h-8 w-8 mb-1 drop-shadow-md text-white/90 group-hover:text-white transition-colors" />
                              <p className="text-base font-bold drop-shadow-md group-hover:text-white transition-colors">Click to upload cover image</p>
                              <p className="text-xs text-white/80 drop-shadow-md">PNG, JPG or WEBP (Max 5MB)</p>
                            </>
                          )}
                        </div>
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Footer / Actions */}
              <div className="px-8 py-6 shrink-0 flex items-center justify-end gap-6 z-10 relative">
                <button
                  type="button"
                  disabled={isCreatingCourse || isUploadingImg}
                  onClick={() => setIsAddCourseOpen(false)}
                  className="text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer underline underline-offset-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="create-course-form"
                  disabled={isCreatingCourse || isUploadingImg || !courseTitle || !courseDesc || !coursePrice || !courseImage}
                  className="group relative flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-[#3f2b70] hover:bg-[#2a1d4a] text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 cursor-pointer overflow-hidden border border-[#5c40a6]"
                >
                  <div className="relative z-10 flex items-center gap-2 transition-colors">
                    {isCreatingCourse ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>PUBLISH COURSE</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
