"use client";

import { Star, Heart, ShoppingCart, Eye, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/contexts/cart-context";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-secondary/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-[0_20px_40px_-15px_rgba(0,229,255,0.2)] relative flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-white/5 p-6">
        <Link href={`/product/${product.id}`} className="block w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className="px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
              {discount}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              New
            </span>
          )}
          {product.rating >= 4.8 && (
            <span className="px-3 py-1 rounded-full bg-yellow-500/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Star className="w-3 h-3 fill-black" /> Top Rated
            </span>
          )}
        </div>

        {/* Floating Quick Actions Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border border-white/10 ${isInWishlist(product.id)
              ? "bg-primary text-primary-foreground"
              : "bg-black/60 text-white hover:bg-primary hover:text-primary-foreground"
              }`}
          >
            <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center transition-all hover:bg-accent hover:text-accent-foreground border border-white/10 text-white"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1 bg-gradient-to-b from-transparent to-black/40">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{product.brand}</p>
          <div className="flex items-center gap-1.5 bg-white/5 py-1 px-2 rounded-full">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="text-[11px] font-bold text-white/90">
              {product.rating}
            </span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} className="mb-3">
          <h3 className="font-heading font-bold text-base md:text-lg text-white hover:text-accent transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Price & Stock */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-black text-xl md:text-2xl text-primary">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-white/30 line-through font-medium">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
