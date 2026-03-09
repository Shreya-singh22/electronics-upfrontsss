import { Link } from "react-router-dom";
import { categories as defaultCategories } from "@/data/products";
import { Heart } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";
import { useCustomizationContext } from "@/contexts/store-context";

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
  const { toggleFavoriteCategory, isCategoryFavorite } = useStore();
  const { customization } = useCustomizationContext();

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
      className="py-12 md:py-20 bg-secondary/30"
      onClick={handleSectionClick}
    >
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground">{sectionTitle}</h2>
            <p className="text-muted-foreground mt-2">{sectionSubtitle}</p>
          </div>
          <Link to="/products" className="text-sm font-bold text-primary hover:underline">
            View All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat: any) => (
            <div key={cat.id} className="relative group">
              <Link
                to={`/products?category=${cat.id}`}
                className="block relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <img
                  src={cat.image || categoryImages[cat.id]}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-black/40 transition-all" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest mb-2 md:mb-3">
                    {cat.count} Items
                  </span>
                  <h3 className="font-heading font-bold text-xl md:text-2xl text-white mb-1">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-white/70 text-xs md:text-sm font-medium transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0">
                    Shop Category <span className="text-lg">→</span>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavoriteCategory(cat.id);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-inner border border-white/20 z-20 hover:bg-white group/btn transition-all"
              >
                <Heart className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isCategoryFavorite(cat.id) ? "fill-primary text-primary" : "text-white group-hover/btn:text-primary"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
