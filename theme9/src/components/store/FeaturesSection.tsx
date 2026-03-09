"use client";

import { Truck, Shield, Headphones, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "Free delivery on orders over ₹500. Fast and reliable nationwide shipping." },
  { icon: Shield, title: "Secure Payments", desc: "256-bit SSL encryption. Your payment information is always safe." },
  { icon: Headphones, title: "24/7 Support", desc: "Expert tech support available around the clock via chat, phone, or email." },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free return policy. No questions asked." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-secondary/30">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">
        Why Choose <span className="text-gradient">VoltTech</span>
      </h2>
      <p className="text-muted-foreground text-center mb-14 max-w-md mx-auto">
        We go above and beyond to ensure the best shopping experience.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-card rounded-xl border border-border p-6 text-center shadow-card"
          >
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
