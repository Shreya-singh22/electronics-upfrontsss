"use client";

import Link from "next/link";
import { useStoreContext } from "@/contexts/store-context";

export default function PromoBanners() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        if (typeof window !== "undefined" && window.parent !== window) {
            e.stopPropagation();
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'promoBanners' }, '*');
        }
    };

    const defaultBanners = [
        {
            id: 1,
            tag: "Save up to 60% off",
            title: "Little Smartphone",
            link: "/products",
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&fit=crop&bg=transparent",
            bgClass: "bg-gray-200",
        },
        {
            id: 2,
            tag: "Special Offer",
            title: "New Headphone",
            link: "/products",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop&bg=transparent",
            bgClass: "bg-gray-300",
        },
        {
            id: 3,
            tag: "Weekend Offer",
            title: "Isometric Desktop",
            link: "/products",
            image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=500&fit=crop&bg=transparent",
            bgClass: "bg-gray-200",
        }
    ];

    const banners = customization?.promoBanners?.banners || defaultBanners;

    return (
        <section className="container mx-auto px-4 py-8 cursor-pointer" onClick={handleSectionClick}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`relative overflow-hidden ${banner.bgClass} flex items-center justify-end p-6 md:p-8 min-h-[220px] transition-transform hover:-translate-y-1`}
                    >
                        {/* Background Image Container */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-full object-cover opacity-60 mix-blend-multiply"
                            />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 w-1/2 flex flex-col items-start gap-1">
                            <span className="text-blue-500 font-semibold text-xs md:text-sm">
                                {banner.tag}
                            </span>
                            <h3 className="text-gray-900 font-bold text-lg md:text-xl lg:text-2xl mb-2">
                                {banner.title}
                            </h3>
                            <Link
                                href={banner.link}
                                className="text-blue-500 font-bold text-sm uppercase hover:underline decoration-2 underline-offset-4"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
