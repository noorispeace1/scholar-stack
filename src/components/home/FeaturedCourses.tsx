import Link from "next/link";
import CourseCard from "@/components/courses/CourseCard";
import { ArrowRight } from "lucide-react";

// Mock data for featured courses
const FEATURED_COURSES = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp 2026",
    instructor: "Dr. Angela Yu",
    description: "Learn web development by building 100 projects in 100 days. Covers HTML, CSS, Javascript, React, Node, and more.",
    price: 89.99,
    rating: 4.8,
    reviewCount: 4523,
    duration: "65 hours",
    studentsCount: 125000,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    category: "Development",
  },
  {
    id: "2",
    title: "Advanced UI/UX Design Masterclass",
    instructor: "Gary Simon",
    description: "Master Figma, user research, wireframing, and prototyping. Build a portfolio that gets you hired.",
    price: 69.99,
    rating: 4.9,
    reviewCount: 2150,
    duration: "24 hours",
    studentsCount: 45000,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    category: "Design",
  },
  {
    id: "3",
    title: "Data Science and Machine Learning",
    instructor: "Jose Portilla",
    description: "Learn Python, Pandas, NumPy, Scikit-Learn, and TensorFlow to build real-world AI applications.",
    price: 94.99,
    rating: 4.7,
    reviewCount: 8900,
    duration: "42 hours",
    studentsCount: 210000,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Data Science",
  },
  {
    id: "4",
    title: "Digital Marketing Complete Course",
    instructor: "Seth Godin",
    description: "SEO, Social Media Marketing, Copywriting, Email Marketing, and Analytics in one comprehensive bundle.",
    price: 54.99,
    rating: 4.6,
    reviewCount: 3200,
    duration: "18 hours",
    studentsCount: 85000,
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
    category: "Business",
  }
];

export default function FeaturedCourses() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Courses</h2>
            <p className="text-foreground/70 text-lg">
              Our most popular and highly rated courses picked by our experts.
            </p>
          </div>
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors"
          >
            Explore All Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_COURSES.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
