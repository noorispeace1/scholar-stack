import Hero from "@/components/home/Hero";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <HowItWorksSection />
      <CategoriesSection />
      <StatsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
