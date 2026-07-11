export default function CourseCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-2xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[16/9] w-full bg-border" />

      {/* Content Skeleton */}
      <div className="flex flex-col flex-grow p-5 space-y-4">
        {/* Rating */}
        <div className="h-4 w-16 bg-border rounded" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-border rounded" />
          <div className="h-5 w-2/3 bg-border rounded" />
        </div>
        
        {/* Instructor */}
        <div className="h-4 w-1/3 bg-border rounded" />
        
        {/* Description */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 w-full bg-border rounded" />
          <div className="h-4 w-5/6 bg-border rounded" />
        </div>
        
        {/* Meta info */}
        <div className="flex items-center gap-4 py-2 border-b border-border">
          <div className="h-4 w-16 bg-border rounded" />
          <div className="h-4 w-16 bg-border rounded" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="h-6 w-16 bg-border rounded" />
          <div className="h-9 w-32 bg-border rounded-lg" />
        </div>
      </div>
    </div>
  );
}
