"use client";

import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
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
    <div className="group bg-card rounded-3xl border border-border overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 relative">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className="px-3 py-1 rounded-full bg-destructive text-white text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
              -{discount}%
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest shadow-lg">
              New
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 z-10">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-xl hover:bg-primary/90 transition-all active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button
            className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md text-foreground flex items-center justify-center shadow-xl hover:bg-white transition-all active:scale-95"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm z-20"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-black text-primary uppercase tracking-widest">{product.brand}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="text-[10px] font-bold text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-heading font-bold text-foreground hover:text-primary transition-colors line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* Price & Stock */}
        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through opacity-50">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 mb-1">
              <div className={`w-1.5 h-1.5 rounded-full ${product.inStock ? "bg-success animate-pulse" : "bg-destructive"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${product.inStock ? "text-success" : "text-destructive"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
