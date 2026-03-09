"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  const featured = products.filter((p) => p.isFeatured).slice(0, 4);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-16 py-12">
      {/* Featured */}
      <section onClick={handleSectionClick('featuredProducts')} className="container mx-auto px-4 cursor-pointer">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">🔥 Best Sellers</h2>
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
      <section onClick={handleSectionClick('trendingProducts')} className="container mx-auto px-4 cursor-pointer">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">📈 Trending Electronics</h2>
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
      <section onClick={handleSectionClick('newArrivals')} className="container mx-auto px-4 cursor-pointer">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading font-bold text-2xl text-foreground">✨ New Arrivals</h2>
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
