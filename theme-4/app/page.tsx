"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import DealsOfDay from "@/components/DealsOfDay";
import ReviewsSection from "@/components/ReviewsSection";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <CategoriesSection />
        <FeaturedProducts />
        <DealsOfDay />
        <ReviewsSection />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
