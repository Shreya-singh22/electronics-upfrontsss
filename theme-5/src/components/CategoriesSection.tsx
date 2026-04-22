"use client";

import Link from "next/link";
import { categories as defaultCategories } from "@/data/products";
import { Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useStoreContext } from "@/contexts/store-context";

const categoryImages: Record<string, string> = {
  speakers: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=800&fit=crop",
  laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=800&fit=crop",
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop",
  tablets: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=800&fit=crop",
  cameras: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=800&fit=crop",
  tv: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=800&fit=crop",
  mobiles: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=800&fit=crop",
  wearables: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop",
};

export default function CategoriesSection() {
  const { toggleFavoriteCategory, isCategoryFavorite } = useCart();
  const { customization } = useStoreContext();

  const categories = customization?.categoriesSection?.categories || defaultCategories.slice(0, 8);
  const sectionTitle = customization?.categoriesSection?.title || "Top Categories";
  const sectionSubtitle = customization?.categoriesSection?.subtitle || "Explore our handpicked collections for you";

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'categoriesSection' }, '*');
    }
  };

  return (
    <section
      className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden"
      onClick={handleSectionClick}
    >
      {/* Background glow lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col items-center justify-between mb-12 md:mb-16 gap-6">
          <div className="text-center w-full max-w-2xl mx-auto">
            <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 uppercase tracking-tight mb-4 drop-shadow-lg">
              {sectionTitle}
            </h2>
            <p className="text-gray-400 text-lg">{sectionSubtitle}</p>
          </div>
          <Link href="/products" className="group flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-6 py-3 rounded-full border border-blue-500/20 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <span>View All Categories</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat: any) => (
            <div key={cat.id} className="relative group perspective-1000">
              <Link
                href={`/products?category=${cat.id}`}
                className="block relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-black border border-white/5 transition-all duration-500 group-hover:border-blue-500/30 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] group-hover:-translate-y-2 group-hover:rotate-y-2"
              >
                {/* Image */}
                <img
                  src={cat.image || categoryImages[cat.id]}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                {/* Complex Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] filter grayscale group-hover:grayscale-0 transition-all duration-500">{cat.icon}</span>
                    <span className="inline-block px-3 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-bold text-gray-300 uppercase tracking-widest border border-white/10 group-hover:border-blue-400/30 group-hover:text-blue-300 transition-colors">
                      {cat.count} Items
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl md:text-3xl text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-300 transition-all">
                    {cat.name}
                  </h3>

                  <div className="flex items-center gap-2 text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100 uppercase tracking-widest">
                    Explore <span className="text-lg leading-none">→</span>
                  </div>
                </div>
              </Link>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavoriteCategory(cat.id);
                }}
                className={`absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center shadow-lg border z-20 transition-all duration-300 overflow-hidden group/btn ${isCategoryFavorite(cat.id) ? "bg-blue-500/20 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" : "bg-black/40 border-white/20 hover:bg-white/10 hover:border-white/40"}`}
              >
                <Heart className={`w-6 h-6 transition-all duration-300 ${isCategoryFavorite(cat.id) ? "fill-blue-500 text-blue-500 scale-110 drop-shadow-[0_0_8px_rgba(59,130,246,1)]" : "text-white group-hover/btn:text-red-400"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
