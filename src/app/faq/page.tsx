"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, ArrowLeft, MessageSquare, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Account" | "Courses";
  icon: React.ReactNode;
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const faqs: FAQItem[] = [
    {
      category: "General",
      icon: <HelpCircle className="h-5 w-5 text-blue-400" />,
      question: "What is ScholarStack?",
      answer: "ScholarStack is a modern online course and student enrollment platform. We connect learners with real-world tech experts, providing premium programming, design, and business courses in a clean, ad-free environment."
    },
    {
      category: "Account",
      icon: <User className="h-5 w-5 text-indigo-400" />,
      question: "How do I sign up as a Student or a Course Teacher?",
      answer: "During registration on our 'Create Account' page, you will see a 'Join As' selection. Choose 'Student' if you want to enroll in classes, or 'Course Teacher' if you wish to launch and sell your own courses. The platform will dynamically configure your dashboard based on this choice."
    },
    {
      category: "Courses",
      icon: <BookOpen className="h-5 w-5 text-emerald-400" />,
      question: "How can teachers create and list new courses?",
      answer: "Course Teachers have a dedicated dashboard containing an 'Add Course' button (in both the sidebar and header). Clicking this opens a modal where you can enter the title, description, price, and category, and upload a banner image directly to our ImgBB hosting database."
    },
    {
      category: "Account",
      icon: <User className="h-5 w-5 text-indigo-400" />,
      question: "Can I edit my name, role, and profile photos?",
      answer: "Absolutely! Go to the 'Profile Settings' page from your dashboard or navbar dropdown. There, you can edit your display name, location, contact number, and upload a new profile picture or cover photo. All data will be saved directly to MongoDB."
    },
    {
      category: "Courses",
      icon: <BookOpen className="h-5 w-5 text-emerald-400" />,
      question: "Where can I view all the courses listed on the platform?",
      answer: "You can click on 'Courses' in the top navigation bar. This opens our central courses catalog page where you can search, filter by category, and view individual course details."
    },
    {
      category: "General",
      icon: <MessageSquare className="h-5 w-5 text-blue-400" />,
      question: "How can I contact support if I have issues?",
      answer: "You can reach out to us directly through the 'Contact' page available in the top navbar. Send us a message and our support team will reply via email as soon as possible."
    }
  ];

  const categories = ["All", "General", "Account", "Courses"];

  const filteredFaqs = faqs.filter(
    (faq) => filterCategory === "All" || faq.category === filterCategory
  );

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#181a1f] text-slate-100 min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Background glowing spots */}
      <div className="absolute top-[10%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.06)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.06)_0%,_transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 mb-8 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm md:text-base"
          >
            Find quick answers to common questions about ScholarStack's dashboards, profiles, courses, and accounts.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilterCategory(category);
                setOpenIndex(null); // Close accordion on filter change
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                filterCategory === category
                  ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : "border-white/5 bg-[#20222b] hover:bg-[#2c2f3d] text-slate-400 hover:text-slate-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accordions Container */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  key={idx}
                  className="rounded-2xl bg-[#20222b] overflow-hidden transition-all duration-200"
                >
                  {/* Header Button */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[#2c2f3d] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <div className="p-2 bg-[#181a1f] rounded-lg shrink-0">
                        {faq.icon}
                      </div>
                      <span className="font-bold text-sm md:text-base text-slate-200">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {/* Body Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 md:px-6 md:pb-6 text-xs md:text-sm text-slate-400 leading-relaxed pl-14 md:pl-16 border-t border-white/[0.02] pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Support Callout */}
        <div className="mt-16 text-center border-t border-white/5 pt-10">
          <p className="text-xs md:text-sm text-slate-500 mb-3">
            Still have questions? We're here to help you get started.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 text-xs shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  );
}
