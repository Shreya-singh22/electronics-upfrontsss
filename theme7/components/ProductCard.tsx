"use client";

import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";
import { Product } from "@/data/products";
import { useStore } from "@/contexts/StoreContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50/50 p-4">
        <Link href={`/product/${product.id}`} className="block w-full h-full flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {discount > 0 && (
            <span className="px-2 py-0.5 rounded bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
              {discount}% OFF
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 h-10 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <button
            className="w-10 h-10 rounded-xl bg-white text-gray-700 hover:text-primary flex items-center justify-center shadow-md border border-gray-100 transition-colors"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-gray-50 shadow-sm border border-gray-100 z-20"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.brand}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-600">
              {product.rating} <span className="text-gray-400 font-normal">({Math.floor(Math.random() * 200) + 20})</span>
            </span>
          </div>
        </div>

        <Link href={`/product/${product.id}`} className="mb-2">
          <h3 className="font-heading font-semibold text-sm md:text-base text-gray-900 hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price & Stock */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg md:text-xl text-primary">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
