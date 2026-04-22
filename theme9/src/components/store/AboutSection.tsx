"use client";

import { useStoreContext } from "@/contexts/store-context";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { customization } = useStoreContext();

  const title = customization?.aboutSection?.title || "About VoltTech";
  const description = customization?.aboutSection?.description || "Founded in 2020, VoltTech is your trusted destination for premium electronics. We partner directly with top brands to bring you authentic products at the best prices. With over 500,000 happy customers worldwide, we're committed to making cutting-edge technology accessible to everyone.";

  const stats = customization?.aboutSection?.stats || [
    { value: "500K+", label: "Happy Customers" },
    { value: "50+", label: "Brand Partners" },
    { value: "99.8%", label: "Satisfaction Rate" },
  ];

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'aboutSection' }, '*');
    }
  };

  return (
    <section id="about" onClick={handleSectionClick} className="py-20 cursor-pointer">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold mb-6"
          >
            {title.includes(' ') ? (
              <>
                {title.split(' ')[0]} <span className="text-gradient">{title.split(' ').slice(1).join(' ')}</span>
              </>
            ) : title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed mb-8"
          >
            {description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-8"
          >
            {stats.map((stat: any) => (
              <div key={stat.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};


export default AboutSection;
