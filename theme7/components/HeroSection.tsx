"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStoreContext } from "@/contexts/store-context";

export default function HeroSection() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const title = customization?.heroSection?.title || "Choose Your Latest Electronics Products";
  const subtitle = customization?.heroSection?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus suspendisse morbi arcu adipiscing nunc. Amet, cras tempus netus libero.";
  const mainImage = customization?.heroSection?.image || "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&auto=format&fit=crop";
  const primaryButtonText = customization?.heroSection?.primaryButtonText || "Explore more";

  return (
    <section
      className="relative w-full bg-brand-dark pt-12 pb-32 lg:pt-24 lg:pb-40 overflow-hidden"
      onClick={handleSectionClick}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white leading-[1.2] mb-6">
              {title.includes('Electronics') ? (
                <>
                  {title.split('Electronics')[0]}
                  <span className="text-primary">Electronics</span>
                  {title.split('Electronics')[1]}
                </>
              ) : title}
            </h1>

            <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {subtitle}
            </p>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 h-12 md:h-14 px-8 rounded-lg bg-primary text-white font-bold text-base md:text-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/30"
            >
              {primaryButtonText}
            </Link>
          </div>

          {/* Right Column - Image Composition */}
          <div className="flex-1 relative w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-square md:aspect-[4/3] w-full">
              {/* Main Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 shadow-2xl transform lg:rotate-2 transition-transform hover:rotate-0 duration-500">
                <img
                  src={mainImage}
                  alt="Electronics Collection"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Floating Element 1 - Headphone */}
              <div className="absolute -left-6 md:-left-12 top-10 w-32 md:w-48 aspect-square rounded-2xl bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop"
                  alt="Headphones"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Floating Element 2 - Watch */}
              <div className="absolute -right-4 md:-right-8 -bottom-6 md:-bottom-10 w-28 md:w-40 aspect-square rounded-2xl bg-white/10 backdrop-blur-md p-2 border border-white/20 shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop"
                  alt="Smartwatch"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
