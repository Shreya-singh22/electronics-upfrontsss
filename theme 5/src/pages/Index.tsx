import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PromoBanners from "@/components/PromoBanners";
import TrendingProductsTabs from "@/components/TrendingProductsTabs";
import CategoriesSection from "@/components/CategoriesSection";
import DealsOfDay from "@/components/DealsOfDay";
import ReviewsSection from "@/components/ReviewsSection";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PromoBanners />
        <TrustBadges />
        <TrendingProductsTabs />
        <CategoriesSection />
        <DealsOfDay />
        <ReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
