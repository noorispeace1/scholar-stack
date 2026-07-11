import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

export interface CourseCardProps {
  id?: string;
  _id?: string;
  title: string;
  instructor: string;
  description: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  duration?: string;
  studentsCount?: number;
  imageUrl?: string;
  image?: string;
  category: string;
}

export default function CourseCard({
  id,
  _id,
  title,
  instructor,
  description,
  price,
  rating = 4.8,
  reviewCount = 85,
  duration = "18 hours",
  studentsCount = 1240,
  imageUrl,
  image,
  category,
}: CourseCardProps) {
  const displayId = id || _id || "";
  const displayImage = imageUrl || image || "";

  return (
    <div className="group flex flex-col h-full bg-slate-950/45 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {/* Placeholder gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/20" />
        
        {displayImage ? (
          <Image
            src={displayImage}
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
        <div className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white">
          {category}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5 text-white">
        <div className="flex items-center gap-1 text-amber-500 mb-2 text-sm font-medium">
          <Star className="h-4 w-4 fill-current" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-slate-500 font-normal ml-1">({reviewCount})</span>
        </div>
        
        <h3 className="text-base font-bold line-clamp-2 mb-1 group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-400 mb-3">By {instructor}</p>
        
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 flex-grow">
          {description}
        </p>
        
        {/* Meta info */}
        <div className="flex items-center gap-4 text-[10px] text-slate-400 mb-5 pb-5 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-purple-400" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-indigo-400" />
            <span>{studentsCount.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="font-extrabold text-lg text-white">
            {price === 0 ? "Free" : `$${price.toFixed(2)}`}
          </div>
          <Link
            href={`/courses/${displayId}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 text-xs font-bold transition-all"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
