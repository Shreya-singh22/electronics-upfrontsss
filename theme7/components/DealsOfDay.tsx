"use client";

import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

import { useStoreContext } from "@/contexts/store-context";

export default function DealsOfDay() {
    const { customization } = useStoreContext();
    const handleSectionClick = (e: React.MouseEvent) => {
        if (typeof window !== "undefined" && window.parent !== window) {
            e.stopPropagation();
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'dealsOfDay' }, '*');
        }
    };

    const title = customization?.dealsOfDay?.title || "Deals of the Day";
    const subtitle = customization?.dealsOfDay?.subtitle || "Don't miss out on these amazing offers";
    const dealProducts = products.filter(p => p.originalPrice).slice(0, 4);

    return (
        <section onClick={handleSectionClick} className="py-16 bg-gray-50/50 cursor-pointer">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                            <Flame className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h2 className="font-heading font-black text-2xl md:text-3xl text-gray-900">{title}</h2>
                            <p className="text-sm md:text-base text-gray-500 mt-1">{subtitle}</p>
                        </div>
                    </div>

                    <Link href="/products?filter=deals" className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-2 group">
                        View All Deals <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {dealProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
