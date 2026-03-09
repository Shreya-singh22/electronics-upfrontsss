"use client";

import { products } from "@/data/products";
import ProductCarousel from "@/components/ProductCarousel";
import Link from "next/link";
import { useStoreContext } from "@/contexts/store-context";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const { customization } = useStoreContext();
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const trending = products.filter((p) => p.isTrending).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 8);

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  return (
    <div className="space-y-16 py-12">
      {/* Featured */}
      <section onClick={handleSectionClick('featuredProducts')} className="container mx-auto px-4 cursor-pointer">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">
            {customization?.featuredProducts?.title || "Best Sellers"}
          </h2>
          <Link href="/products?filter=featured" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductCarousel products={featured} />
      </section>

      {/* Trending */}
      <section onClick={handleSectionClick('trendingProducts')} className="container mx-auto px-4 cursor-pointer">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-black text-3xl md:text-5xl brand-gradient-text tracking-tighter uppercase whitespace-nowrap">
            {customization?.trendingProducts?.title || "Trending Electronics"}
          </h2>
          <Link href="/products?filter=trending" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductCarousel products={trending} />
      </section>

      {/* New Arrivals */}
      <section onClick={handleSectionClick('newArrivals')} className="container mx-auto px-4 cursor-pointer">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-black text-3xl md:text-5xl brand-gradient-text tracking-tighter uppercase whitespace-nowrap">
            {customization?.newArrivals?.title || "New Arrivals"}
          </h2>
          <Link href="/products?filter=new" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductCarousel products={newArrivals} />
      </section>
    </div>
  );
}
