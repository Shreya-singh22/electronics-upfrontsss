"use client";

import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useStore, getImageSrc, type Product } from "@/context/StoreContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { productDetails } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { toast } = useToast();
  const wishlisted = isInWishlist(product.id);
  const [heartAnim, setHeartAnim] = useState(false);

  const detail = productDetails[product.id];
  const rating = detail?.rating ?? 4.5;
  const reviewCount = detail?.reviewCount ?? 0;
  const originalPrice = Math.round(product.price * 1.12);
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast({ title: "Added to cart", description: `${product.name} added to cart.` });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 300);
  };

  const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-foreground">
          {product.badge}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110"
      >
        <Heart
          className={`h-4 w-4 transition-all duration-200 ${wishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground"} ${heartAnim ? "animate-heart-pop" : ""}`}
        />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f7] p-6">
        <img
          src={getImageSrc(product.image)}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 flex items-end justify-center gap-2 p-4 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-black/90 py-2.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:bg-black active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); router.push(`/product/${product.id}`); }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white active:scale-95"
          >
            <Eye className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="font-display text-sm font-semibold leading-tight text-foreground line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`}
              />
            ))}
          </div>
          <span className="font-body text-[11px] text-muted-foreground">
            {rating.toFixed(1)} {reviewCount > 0 && `(${reviewCount.toLocaleString()})`}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-end gap-2 pt-1">
          <p className="font-display text-base font-bold text-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="font-body text-xs text-muted-foreground line-through">
            {formatPrice(originalPrice)}
          </p>
          <span className="ml-auto rounded-md bg-green-50 px-1.5 py-0.5 font-body text-[10px] font-semibold text-green-700">
            -{discount}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
