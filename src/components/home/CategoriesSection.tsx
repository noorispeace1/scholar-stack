import { Code, Palette, Briefcase, Camera, Music, HeartPulse, LineChart, Cpu } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Development", icon: <Code className="h-8 w-8" />, courses: 124 },
  { name: "Design", icon: <Palette className="h-8 w-8" />, courses: 85 },
  { name: "Business", icon: <Briefcase className="h-8 w-8" />, courses: 62 },
  { name: "Photography", icon: <Camera className="h-8 w-8" />, courses: 43 },
  { name: "Music", icon: <Music className="h-8 w-8" />, courses: 31 },
  { name: "Health & Fitness", icon: <HeartPulse className="h-8 w-8" />, courses: 56 },
  { name: "Finance", icon: <LineChart className="h-8 w-8" />, courses: 78 },
  { name: "IT & Software", icon: <Cpu className="h-8 w-8" />, courses: 110 },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Top Categories</h2>
            <p className="text-foreground/70 text-lg">
              Explore our wide range of categories and find the perfect course for your career goals.
            </p>
          </div>
          <Link 
            href="/courses" 
            className="inline-flex font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors"
          >
            Browse All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              href={`/courses?category=${category.name.toLowerCase().replace(/ & | /g, "-")}`}
              className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-surface border border-border hover:border-[var(--color-primary)] hover:shadow-lg transition-all text-center"
            >
              <div className="text-foreground/60 group-hover:text-[var(--color-primary)] mb-4 transition-colors">
                {category.icon}
              </div>
              <h3 className="font-bold mb-1">{category.name}</h3>
              <p className="text-sm text-foreground/60">{category.courses} Courses</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
