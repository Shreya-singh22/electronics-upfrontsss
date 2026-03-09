"use client";

import Link from "next/link";
import { categories as defaultCategories } from "@/data/products";
import { Heart, ArrowUpRight } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useStoreContext } from "@/contexts/store-context";

const categoryImages: Record<string, string> = {
  speakers: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&fit=crop",
  laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&fit=crop",
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&fit=crop",
  tablets: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&fit=crop",
  cameras: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&fit=crop",
  tv: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&fit=crop",
  mobiles: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&fit=crop",
  wearables: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&fit=crop",
};

export default function CategoriesSection() {
  const { toggleFavoriteCategory, isCategoryFavorite } = useCart();
  const { customization } = useStoreContext();

  const categories = customization?.categoriesSection?.categories || defaultCategories.slice(0, 7);
  const title = customization?.categoriesSection?.title || "SYSTEM DIRECTORY";
  const subtitle = customization?.categoriesSection?.subtitle || "Filter the grid by hardware classification.";

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'categoriesSection' }, '*');
    }
  };

  return (
    <section id="categories" className="py-24 bg-[#030305] relative overflow-hidden cursor-pointer" onClick={handleSectionClick}>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-heading font-black text-4xl md:text-6xl text-white mb-4 tracking-tighter uppercase whitespace-nowrap glow-text">
              {title}
            </h2>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest font-bold">
              {subtitle}
            </p>
          </div>
          <Link href="/products" className="group flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest hover:text-primary transition-colors glass-panel px-8 py-4 rounded-full border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">
            <span>View Hub</span>
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-4 md:gap-6">
          {categories.slice(0, 7).map((cat: any, index: number) => {
            // Calculate spans for bento box effect
            const isLarge = index === 0;
            const isWide = index === 3 || index === 6;
            const colSpan = isLarge ? "md:col-span-2 lg:col-span-2" : isWide ? "md:col-span-2 lg:col-span-2" : "col-span-1 md:col-span-1 lg:col-span-1";
            const rowSpan = isLarge ? "row-span-2" : "row-span-1";

            return (
              <div key={cat.id} className={`relative group ${colSpan} ${rowSpan}`}>
                <Link
                  href={`/products?category=${cat.id}`}
                  className="block relative w-full h-full rounded-3xl overflow-hidden bg-card border border-white/5 transition-all duration-700 hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(0,243,255,0.15)]"
                >
                  {/* Image Background */}
                  <img
                    src={cat.image || categoryImages[cat.id]}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-70 mix-blend-screen"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/60 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay z-10" />

                  {/* Top Bar inside card */}
                  <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-gray-300 uppercase tracking-widest border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                      {cat.count} Units
                    </span>
                  </div>

                  {/* Bottom Content inside card */}
                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:border-primary group-hover:text-primary transition-colors group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-2xl md:text-3xl text-white tracking-tight group-hover:glow-text transition-all">
                          {cat.name}
                        </h3>
                        <div className="flex items-center gap-1 text-primary text-xs font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100 uppercase tracking-widest mt-1">
                          Initialize sequence <ArrowUpRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavoriteCategory(cat.id);
                  }}
                  className={`absolute top-6 right-6 w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center shadow-lg border z-30 transition-all duration-300 overflow-hidden group/btn ${isCategoryFavorite(cat.id) ? "bg-accent/20 border-accent shadow-[0_0_20px_rgba(188,19,254,0.6)]" : "glass-panel hover:bg-white/10 hover:border-white/40"}`}
                >
                  <Heart className={`w-4 h-4 transition-all duration-300 ${isCategoryFavorite(cat.id) ? "fill-accent text-accent scale-110 drop-shadow-[0_0_8px_rgba(188,19,254,1)]" : "text-white group-hover/btn:text-accent group-hover/btn:drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]"}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
