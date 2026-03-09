
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import DealsOfDay from "@/components/DealsOfDay";
import ReviewsSection from "@/components/ReviewsSection";
import TrustBadges from "@/components/TrustBadges";


const Index = () => {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-16" />
      <CategoriesSection />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent my-16" />
      <FeaturedProducts />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-16" />
      <DealsOfDay />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent my-16" />
      <ReviewsSection />
    </>
  );
};

export default Index;
