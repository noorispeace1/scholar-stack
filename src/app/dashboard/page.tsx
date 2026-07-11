"use client";

import { useState, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
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
  UserCheck
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_COVER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";

export default function Dashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  
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
  if (!session) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
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
      <AnimatePresence>
        {isAddCourseOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isCreatingCourse && setIsAddCourseOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-6 md:p-8 shadow-2xl z-10 text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.15)_0%,_rgba(0,0,0,0)_70%)] blur-[80px] pointer-events-none" />

              <div className="flex justify-between items-center mb-6 relative">
                <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Add New Course
                </h3>
                <button
                  onClick={() => !isCreatingCourse && setIsAddCourseOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Status alerts */}
              <AnimatePresence>
                {modalSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 text-sm"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Course created successfully!</span>
                  </motion.div>
                )}

                {modalError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{modalError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleCreateCourse} className="space-y-4 relative">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Course Title</label>
                  <input
                    type="text"
                    required
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    placeholder="e.g. Next.js 15 Premium Course"
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                    placeholder="Short course description..."
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Category</label>
                    <select
                      value={courseCategory}
                      onChange={(e) => setCourseCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                    >
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={coursePrice}
                      onChange={(e) => setCoursePrice(e.target.value)}
                      placeholder="e.g. 99"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Course Image Upload */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-purple-300/80 mb-2">Course Banner Image</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleCourseImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  {courseImage ? (
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 h-32 group">
                      <img src={courseImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-purple-600 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-purple-500 cursor-pointer"
                        >
                          Change Banner
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-2xl hover:border-purple-500/50 transition-colors bg-slate-900/60 min-h-[120px]">
                      {isUploadingImg ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                          <p className="text-xs text-slate-400">Uploading banner to ImgBB...</p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center gap-2 cursor-pointer text-slate-400 hover:text-purple-400 transition-colors"
                        >
                          <Upload className="h-8 w-8" />
                          <span className="text-xs font-semibold">Select and Upload Banner Image</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Save button */}
                <div className="flex justify-end pt-4 border-t border-white/5 gap-3">
                  <button
                    type="button"
                    disabled={isCreatingCourse}
                    onClick={() => setIsAddCourseOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingCourse || isUploadingImg}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                  >
                    {isCreatingCourse ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Create Course</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
