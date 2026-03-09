"use client";

import { useStoreContext } from "@/contexts/store-context";
import { motion } from "framer-motion";

const BrandsSection = () => {
  const { customization } = useStoreContext();

  const title = customization?.brandsSection?.title || "Trusted by the world's best brands";
  const brandsList = customization?.brandsSection?.brands || [
    { name: "Apple", logo: "🍎" },
    { name: "Samsung", logo: "📱" },
    { name: "Sony", logo: "🎧" },
    { name: "Microsoft", logo: "💻" },
    { name: "Logitech", logo: "🖱️" },
    { name: "LG", logo: "📺" },
  ];

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'brandsSection' }, '*');
    }
  };

  return (
    <section onClick={handleSectionClick} className="py-16 border-y border-border/50 cursor-pointer">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground font-medium uppercase tracking-widest mb-10">
          {title}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brandsList.map((brand: any, i: number) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2.5 text-muted-foreground/60 hover:text-foreground transition-colors duration-300 cursor-default group"
            >
              <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">{brand.logo}</span>
              <span className="font-display text-lg font-semibold tracking-tight">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default BrandsSection;
