"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

export default function FeaturedProducts() {
  const { customization } = useStoreContext();

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const bestSellersTitle = customization?.featuredProducts?.bestSellersTitle || "🔥 Best Sellers";
  const trendingTitle = customization?.featuredProducts?.trendingTitle || "📈 Trending Electronics";
  const newArrivalsTitle = customization?.featuredProducts?.newArrivalsTitle || "✨ New Arrivals";

  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-16 py-12">
      {/* Featured */}
      <section className="container mx-auto px-4 cursor-pointer" onClick={handleSectionClick('featuredProducts')}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">{bestSellersTitle}</h2>
          <Link href="/products?filter=featured" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 cursor-pointer" onClick={handleSectionClick('trendingProducts')}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">{trendingTitle}</h2>
          <Link href="/products?filter=trending" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 cursor-pointer" onClick={handleSectionClick('newArrivals')}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">{newArrivalsTitle}</h2>
          <Link href="/products?filter=new" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
