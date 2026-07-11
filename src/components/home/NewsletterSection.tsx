export default function NewsletterSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[var(--color-primary)] text-white px-6 py-16 sm:px-12 sm:py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Ready to transform your career?
              </h2>
              <p className="text-white/80 text-lg mb-0">
                Join our newsletter to get weekly tips, new course announcements, and exclusive discounts.
              </p>
            </div>
            
            <div className="w-full max-w-md">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-4 py-3 rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-[var(--color-secondary)] font-semibold hover:bg-[var(--color-secondary)]/90 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-white/60 mt-3 text-center sm:text-left">
                We care about your data in our <a href="/privacy" className="underline hover:text-white">privacy policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
