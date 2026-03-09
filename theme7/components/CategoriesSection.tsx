"use client";

import Link from "next/link";
import { categories as defaultCategories } from "@/data/products";
import { useCustomizationContext } from "@/contexts/store-context";

const categoryImages: Record<string, string> = {
  speakers: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
  laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  tablets: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
  cameras: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
  tv: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
  mobiles: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  wearables: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
};

const pastelBackgrounds = [
  "bg-blue-50 hover:bg-blue-100",
  "bg-pink-50 hover:bg-pink-100",
  "bg-purple-50 hover:bg-purple-100",
  "bg-green-50 hover:bg-green-100",
  "bg-orange-50 hover:bg-orange-100",
  "bg-gray-50 hover:bg-gray-100"
];

export default function CategoriesSection() {
  const { customization } = useCustomizationContext();

  const categories = customization?.categoriesSection?.categories || defaultCategories.slice(0, 6);

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'categoriesSection' }, '*');
    }
  };

  return (
    <section
      className="py-12 md:py-16 bg-white"
      onClick={handleSectionClick}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-gray-900">Explore Categories</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((cat: any, index: number) => {
            const bgClass = pastelBackgrounds[index % pastelBackgrounds.length];
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${bgClass}`}
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden mb-4 shadow-sm bg-white p-2">
                  <img
                    src={cat.image || categoryImages[cat.id]}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-heading font-semibold text-sm md:text-base text-gray-800 text-center">
                  {cat.name}
                </h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
