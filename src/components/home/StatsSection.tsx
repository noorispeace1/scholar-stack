export default function StatsSection() {
  return (
    <section className="py-20 bg-transparent text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-[var(--color-secondary)] opacity-20 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center p-4">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">50K+</span>
            <span className="text-white/80 font-medium text-lg">Active Students</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">1,200+</span>
            <span className="text-white/80 font-medium text-lg">Online Courses</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">350+</span>
            <span className="text-white/80 font-medium text-lg">Expert Instructors</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-4xl md:text-5xl font-extrabold mb-2">99%</span>
            <span className="text-white/80 font-medium text-lg">Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
