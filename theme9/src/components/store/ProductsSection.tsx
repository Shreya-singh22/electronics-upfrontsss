"use client";

import { useState, useMemo } from "react";
import { products, categories } from "@/lib/products";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface ProductsSectionProps {
  searchQuery: string;
}

const ProductsSection = ({ searchQuery }: ProductsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-3">
          Featured <span className="text-gradient">Products</span>
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-md mx-auto">
          Curated selection of the best tech gear, handpicked for you.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className={`filter-pill ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground filter-pill-active"
                  : "bg-secondary/80 text-secondary-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-16">No products found matching your search.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
