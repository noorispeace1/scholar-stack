"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    // Mock form submission delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfos = [
    {
      icon: <Mail className="h-6 w-6 text-purple-400" />,
      title: "Email Support",
      details: "support@scholarstack.com",
      subText: "We reply within 24 hours.",
    },
    {
      icon: <Phone className="h-6 w-6 text-indigo-400" />,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      subText: "Mon-Fri, 9am - 6pm EST",
    },
    {
      icon: <MapPin className="h-6 w-6 text-pink-400" />,
      title: "Office Location",
      details: "100 Innovation Way, Suite 400",
      subText: "San Francisco, CA 94107",
    },
    {
      icon: <Clock className="h-6 w-6 text-teal-400" />,
      title: "Active Response Hours",
      details: "Monday – Friday",
      subText: "9:00 AM – 6:00 PM EST",
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            Connect with us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-foreground/70">
            Have questions about ScholarStack? Our team is here to help you choose the right path for your educational journey.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Contact Information</h2>
              <p className="text-foreground/70 mb-6">
                Feel free to reach out via phone, email, or by visiting our headquarters. You can also fill out the contact form, and we will get back to you as soon as possible.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfos.map((info, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border bg-surface hover:shadow-sm transition-all duration-200">
                  <div className="p-3 bg-surface-hover rounded-xl shrink-0 h-fit">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground/50 uppercase tracking-wider mb-1">{info.title}</h3>
                    <p className="font-bold text-base text-foreground mb-0.5">{info.details}</p>
                    <p className="text-sm text-foreground/60">{info.subText}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-indigo-600/10 rounded-[2rem] blur-2xl -z-10 opacity-70" />
            
            <div className="p-8 sm:p-10 rounded-[2rem] bg-surface border border-border shadow-md">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-400" /> Send a Message
              </h3>
              <p className="text-sm text-foreground/60 mb-8">
                Fill out the details below and we will route your inquiry to the appropriate department.
              </p>

              {success ? (
                <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-3">
                  <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
                  <h4 className="font-bold text-lg text-green-400">Message Sent Successfully!</h4>
                  <p className="text-sm text-green-500/80 max-w-md mx-auto">
                    Thank you for contacting ScholarStack. A support representative will review your message and reply via email shortly.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-foreground/60 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-surface-hover border border-border focus:border-[var(--color-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-foreground/60 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-surface-hover border border-border focus:border-[var(--color-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-foreground/60 ml-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full bg-surface-hover border border-border focus:border-[var(--color-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-foreground/60 ml-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Type your message here..."
                      className="w-full bg-surface-hover border border-border focus:border-[var(--color-primary)] rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 px-4 transition-all duration-300 shadow-[0_0_20px_0_rgba(168,85,247,0.2)] hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.35)] disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
