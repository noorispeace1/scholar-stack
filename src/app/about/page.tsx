import Link from "next/link";
import { BookOpen, Users, Award, Shield, CheckCircle, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { value: "15K+", label: "Active Students" },
    { value: "120+", label: "Expert Instructors" },
    { value: "450+", label: "Premium Courses" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const values = [
    {
      icon: <BookOpen className="h-6 w-6 text-indigo-500" />,
      title: "Quality Content",
      desc: "Our courses are designed by industry professionals and vetted by education experts to ensure you get world-class knowledge.",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Peer Collaboration",
      desc: "Join a vibrant community of learners, exchange feedback, participate in study groups, and build together.",
    },
    {
      icon: <Award className="h-6 w-6 text-pink-500" />,
      title: "Industry Recognition",
      desc: "Earn certificates that showcase your practical skills, recognized by leading employers and tech startups globally.",
    },
    {
      icon: <Shield className="h-6 w-6 text-teal-500" />,
      title: "Trusted Platform",
      desc: "Secure progress tracking, verified instructor accounts, and a commitment to protecting user data and privacy.",
    },
  ];

  const instructors = [
    {
      name: "Dr. Sarah Jenkins",
      role: "Lead Software Architect",
      company: "Ex-Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Alex Rivera",
      role: "Full-Stack Dev Advocate",
      company: "Vercel Expert",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Maria Zhang",
      role: "UI/UX Design Director",
      company: "Figma Community Leader",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-950 text-white">
        {/* Colorful backdrop blobs */}
        <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.25)_0%,_rgba(0,0,0,0)_70%)] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[radial-gradient(circle,_rgba(79,70,229,0.2)_0%,_rgba(0,0,0,0)_70%)] blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6">
              Our Vision & Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6">
              Empowering Next-Gen Learners
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              ScholarStack is a student-centric platform designed to bridge the gap between theory and execution through peer learning, structured pathways, and expert curation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-6 py-3.5 text-sm font-semibold shadow-md transition-all duration-200"
              >
                Explore Courses <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3.5 text-sm font-semibold transition-all duration-200"
              >
                Talk to Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-border bg-surface-hover/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-foreground/75">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Why Choose ScholarStack?
            </h2>
            <p className="text-foreground/70">
              We focus on building a robust ecosystem that drives outcomes, confidence, and real-world mastery.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border bg-surface hover:bg-surface-hover hover:border-[var(--color-primary)]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 bg-surface-hover rounded-xl w-fit group-hover:scale-110 transition-transform mb-5">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{val.title}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Grid Section */}
      <section className="py-20 lg:py-28 bg-surface-hover/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-md">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                From a Small Study Group to a Global Learning Community
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                ScholarStack started with a simple belief: education should be collaborative, practical, and accessible. In 2024, our founders realized that traditional online lectures lacked interactive engagement, community accountability, and feedback mechanisms.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                To solve this, we created a comprehensive learning platform where students can not only acquire skills, but also share their progress, join peer review forums, and earn certification through tangible project enrollments.
              </p>
              
              <ul className="space-y-3 pt-2">
                {[
                  "100% online, flexible learning schedules",
                  "Collaborative workspace integrations",
                  "Vetted mentors and strict curriculum standards",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
                alt="Students collaborating"
                className="rounded-3xl border border-border shadow-xl w-full object-cover aspect-[4/3] relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4">
              Learn from Industry Experts
            </h2>
            <p className="text-foreground/70">
              Our instructors bring experience from top-tier technology companies, design agencies, and universities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instructors.map((ins, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border bg-surface text-center hover:shadow-md transition-all group"
              >
                <div className="relative w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden border border-border group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={ins.image}
                    alt={ins.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">{ins.name}</h3>
                <p className="text-sm font-medium text-[var(--color-primary)] mb-1">{ins.role}</p>
                <p className="text-xs text-foreground/60 mb-5">{ins.company}</p>
                
                <div className="flex justify-center gap-4 text-foreground/40">
                  <a href="#" className="hover:text-[var(--color-primary)] transition-colors" aria-label="Twitter">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="hover:text-[var(--color-primary)] transition-colors" aria-label="LinkedIn">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
                  </a>
                  <a href="#" className="hover:text-[var(--color-primary)] transition-colors" aria-label="GitHub">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            Join the Next Class of Innovators
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Take the first step towards mastering new skills. Sign up today and get unlimited access to free starter courses.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-950 hover:bg-slate-100 px-6 py-3.5 text-sm font-semibold shadow-md transition-all"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
