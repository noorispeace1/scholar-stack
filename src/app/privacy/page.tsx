import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Eye className="h-5 w-5 text-purple-400" />,
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us when creating an account, updating your profile, enrolling in courses, or communicating with support. This includes your name, email address, password hash (securely encrypted), and profile picture (if using Google OAuth).",
    },
    {
      icon: <FileText className="h-5 w-5 text-indigo-400" />,
      title: "2. How We Use Your Information",
      content: "We use the collected data to process course registrations, authenticate user sessions via Better Auth, personalize your dashboard, monitor student progress, and send relevant platform updates or transactional emails. We do not sell or trade your personal data with third-party advertisers.",
    },
    {
      icon: <Lock className="h-5 w-5 text-pink-400" />,
      title: "3. Data Security and Protection",
      content: "ScholarStack implements robust security protocols to protect your personal information. Database access is strictly controlled, and session management is handled using standard secure cookies. However, no transmission of data over the internet can be guaranteed as 100% secure.",
    },
    {
      icon: <Shield className="h-5 w-5 text-teal-400" />,
      title: "4. Your Rights & Data Export",
      content: "You have the right to access, edit, or delete your personal information at any time from your Profile Settings. You can also request a full export of your account data or terminate your account completely, which will wipe all session records from our MongoDB database.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline mb-8">
          &larr; Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-border pb-8 mb-12">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            Legal Document
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-foreground/60">Last Updated: July 11, 2026</p>
        </div>

        {/* Intro */}
        <div className="prose prose-slate max-w-none mb-12">
          <p className="text-base text-foreground/80 leading-relaxed">
            Welcome to ScholarStack. We respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, handle, secure, and store your information when you use our student enrollment platform, and your options regarding your database records.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="space-y-8 mb-16">
          {sections.map((sec, i) => (
            <div key={i} className="p-6 sm:p-8 rounded-2xl border border-border bg-surface hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-surface-hover rounded-lg">
                  {sec.icon}
                </div>
                <h2 className="text-xl font-bold tracking-tight">{sec.title}</h2>
              </div>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed pl-1.5">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Cookies / Third Party */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-hover/30 border border-border space-y-4 mb-16">
          <h3 className="text-lg font-bold">Cookies and Tracking</h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            We use essential cookies strictly to maintain user authentication states (managing login sessions) and to improve the page load performance of our React interface. No marketing tracking pixels or cross-site advertisement cookies are loaded on our domain.
          </p>
          <div className="flex items-center gap-2.5 text-xs text-foreground/60 font-semibold uppercase tracking-wider bg-surface border border-border py-2 px-3 rounded-xl w-fit">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            GDPR & CCPA Compliant Database Config
          </div>
        </div>

        {/* Contact Footer */}
        <div className="text-center border-t border-border pt-12">
          <p className="text-sm text-foreground/60 mb-3">
            Have questions about our data privacy policies or want to request account removal?
          </p>
          <Link href="/contact" className="text-sm font-bold text-[var(--color-primary)] hover:underline">
            Contact our Privacy Officer &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
