"use client";

import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import DealsOfDay from "@/components/DealsOfDay";
import ReviewsSection from "@/components/ReviewsSection";
import TrustBadges from "@/components/TrustBadges";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">

      <main>
        <HeroSection />
        <TrustBadges />
        <CategoriesSection />
        <FeaturedProducts />
        <DealsOfDay />
        <ReviewsSection />
      </main>

    </div>
  );
};

export default Index;
