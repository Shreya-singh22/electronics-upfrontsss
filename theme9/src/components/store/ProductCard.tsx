"use client";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Product, useStore } from "@/lib/store-context";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      onClick={() => router.push(`/product/${product.id}`)}
      className="group bg-gradient-card rounded-2xl border border-border overflow-hidden card-lift cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[11px] font-bold tracking-wide uppercase shadow-glow">
            {product.badge}
          </span>
        )}

        {/* Hover action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button
            onClick={handleWishlist}
            whileTap={{ scale: 0.85 }}
            className="p-2 rounded-xl glass-premium opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300"
          >
            <Heart className={`h-4 w-4 transition-colors ${wishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); router.push(`/product/${product.id}`); }}
            whileTap={{ scale: 0.85 }}
            className="p-2 rounded-xl glass-premium opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-75"
          >
            <Eye className="h-4 w-4 text-foreground" />
          </motion.button>
        </div>

        {/* Quick Add to Cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.96 }}
            className="btn-glow w-full py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] text-primary font-semibold uppercase tracking-wider mb-1.5">{product.category}</p>
        <h3 className="font-display font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary/90 transition-colors">{product.name}</h3>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="text-[11px] text-muted-foreground ml-1">({product.reviews.toLocaleString("en-IN")})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-xl text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-[11px] font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-md">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
