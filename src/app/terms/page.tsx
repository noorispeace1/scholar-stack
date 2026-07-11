import { Scale, ShieldCheck, HelpCircle, FileCheck, Info } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const rules = [
    {
      icon: <Scale className="h-5 w-5 text-purple-400" />,
      title: "1. Acceptance of Terms",
      content: "By creating an account or accessing ScholarStack, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you are not authorized to use the platform for course signups or dashboard navigation.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-indigo-400" />,
      title: "2. User Accounts and Credentials",
      content: "When registering, you must provide accurate and complete email/profile details. You are solely responsible for maintaining the confidentiality of your credentials. Any unauthorized access to your account should be reported to support immediately.",
    },
    {
      icon: <FileCheck className="h-5 w-5 text-pink-400" />,
      title: "3. Course Licenses & Intellectual Property",
      content: "All courses, video lectures, coding exercises, and resources on ScholarStack are copyrighted material. Enrolling in a course grants you a limited, non-transferable, personal license for educational learning. You may not resell or redistribute any course content.",
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-teal-400" />,
      title: "4. Prohibited Behaviors & Abuse",
      content: "You agree not to attempt to scrape, reverse engineer, or systematically download platform content. Any attempt to upload malicious code, execute DDoS attacks, or exploit database routes will result in immediate termination of account access.",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline mb-8">
          &larr; Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-border pb-8 mb-12">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-3">
            Legal Terms
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-foreground/60">Last Updated: July 11, 2026</p>
        </div>

        {/* Introduction */}
        <div className="prose prose-slate max-w-none mb-12">
          <p className="text-base text-foreground/80 leading-relaxed">
            Please read these Terms of Service carefully before using the ScholarStack application. By accessing our platform, you agree to be bound by these rules. These terms dictate user logins, license structures, and acceptable behaviors on our network.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="space-y-8 mb-16">
          {rules.map((rule, i) => (
            <div key={i} className="p-6 sm:p-8 rounded-2xl border border-border bg-surface hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-surface-hover rounded-lg">
                  {rule.icon}
                </div>
                <h2 className="text-xl font-bold tracking-tight">{rule.title}</h2>
              </div>
              <p className="text-sm sm:text-base text-foreground/75 leading-relaxed pl-1.5">
                {rule.content}
              </p>
            </div>
          ))}
        </div>

        {/* Warning / Important Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-hover/30 border border-border space-y-4 mb-16">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Info className="h-5 w-5 text-indigo-400" /> Limitation of Liability
          </h3>
          <p className="text-sm text-foreground/70 leading-relaxed">
            ScholarStack services and course content are provided on an 'as-is' and 'as-available' basis. We make no warranty that courses will meet your specific employment outcomes, or that the database will be accessible 100% of the time due to standard cloud provider maintenance.
          </p>
        </div>

        {/* Contact Link */}
        <div className="text-center border-t border-border pt-12">
          <p className="text-sm text-foreground/60 mb-3">
            Have questions or clarifications regarding our terms of service agreements?
          </p>
          <Link href="/contact" className="text-sm font-bold text-[var(--color-primary)] hover:underline">
            Contact Support Team &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
