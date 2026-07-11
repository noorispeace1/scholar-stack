import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

export interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  studentsCount: number;
  imageUrl: string;
  category: string;
}

export default function CourseCard({
  id,
  title,
  instructor,
  description,
  price,
  rating,
  reviewCount,
  duration,
  studentsCount,
  imageUrl,
  category,
}: CourseCardProps) {
  return (
    <div className="group flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-hover">
        {/* Placeholder gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-tertiary)]/20" />
        
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-foreground/40 font-medium">
            Course Image
          </div>
        )}
        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-md text-foreground">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-center gap-1 text-amber-500 mb-2 text-sm font-medium">
          <Star className="h-4 w-4 fill-current" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-foreground/50 font-normal ml-1">({reviewCount})</span>
        </div>
        
        <h3 className="text-lg font-bold line-clamp-2 mb-1 group-hover:text-[var(--color-primary)] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-foreground/60 mb-3">By {instructor}</p>
        
        <p className="text-sm text-foreground/70 line-clamp-2 mb-4 flex-grow">
          {description}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-foreground/60 mb-5 pb-5 border-b border-border">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>{studentsCount.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="font-bold text-xl text-foreground">
            {price === 0 ? "Free" : `$${price.toFixed(2)}`}
          </div>
          <Link
            href={`/courses/${id}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
