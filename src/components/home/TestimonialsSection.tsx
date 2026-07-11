import Image from "next/image";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Frontend Developer",
    content: "ScholarStack completely transformed my career. I went from knowing zero code to landing a full-time role in just 6 months. The project-based learning is unparalleled.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    content: "The quality of the design courses here is top-notch. The instructors don't just teach tools, they teach the underlying principles of good design.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    role: "Data Analyst",
    content: "I loved how practical the data science track was. Being able to run code and build models alongside the video lectures made the concepts stick.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Students Say</h2>
          <p className="text-foreground/70 text-lg">
            Don't just take our word for it. Hear from the people who have transformed their lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <div key={i} className="relative p-8 rounded-2xl bg-surface border border-border shadow-sm">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-[var(--color-primary)]/20" />
              <p className="text-foreground/80 leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
