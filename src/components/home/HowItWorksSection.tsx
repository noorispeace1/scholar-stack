import { BookOpen, Trophy, Users, MonitorPlay } from "lucide-react";

const FEATURES = [
  {
    icon: <MonitorPlay className="h-6 w-6" />,
    title: "Learn from Anywhere",
    description: "Access your courses on any device, anytime. Our platform is fully responsive and mobile-friendly.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience and proven track records.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Vast Library",
    description: "Choose from thousands of courses covering everything from programming to design and business.",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Earn Certificates",
    description: "Get industry-recognized certificates upon completion to showcase your new skills to employers.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose ScholarStack?</h2>
          <p className="text-foreground/70 text-lg">
            We provide everything you need to start your learning journey and achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface hover:bg-surface-hover border border-transparent hover:border-border transition-colors group"
            >
              <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-6 group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
