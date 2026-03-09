import { Star, Heart, ShoppingCart, Eye, Plus } from "lucide-react";
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
    <div className="group relative bg-[#050508] border border-white/10 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] h-full flex flex-col">
      {/* Sci-fi corner cutouts / brackets decoration */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/50 z-20 transition-all duration-500 group-hover:scale-150 group-hover:border-primary"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/50 z-20 transition-all duration-500 group-hover:scale-150 group-hover:border-primary"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/50 z-20 transition-all duration-500 group-hover:scale-150 group-hover:border-primary"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/50 z-20 transition-all duration-500 group-hover:scale-150 group-hover:border-primary"></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#0a0a0f] to-[#020203] p-8 flex items-center justify-center border-b border-white/5 group-hover:border-primary/20 z-10 transition-colors duration-500">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative z-10 flex items-center justify-center">
          {/* Subtle glow behind image */}
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <img
            src={product.image}
            alt={product.name}
            className="w-[85%] h-[85%] object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110 relative z-10"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {discount > 0 && (
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-red-500/50 px-2 py-1">
              <span className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full"></span>
              <span className="text-red-500 text-[9px] font-mono font-bold tracking-widest uppercase">
                -{discount}% CRIT
              </span>
            </div>
          )}
          {product.isNewArrival && (
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md border border-primary/50 px-2 py-1 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
              <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></span>
              <span className="text-primary text-[9px] font-mono font-bold tracking-widest uppercase">
                NEW INTEL
              </span>
            </div>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 bg-gradient-to-t from-black via-black/80 to-transparent flex gap-3">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 h-10 bg-primary/20 border border-primary text-primary font-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all shadow-[0_0_15px_rgba(0,243,255,0.3)]"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Acquire
          </button>
          <button
            className="w-10 h-10 bg-black/60 border border-white/20 text-white flex items-center justify-center hover:border-accent hover:text-accent hover:bg-accent/20 transition-all backdrop-blur-md"
            title="Scan Specs"
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
          className="absolute top-4 right-4 z-20 group/heart p-2"
        >
          <Heart
            className={`w-5 h-5 transition-all ${isInWishlist(product.id) ? "fill-accent text-accent drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]" : "text-white/50 hover:text-white"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between z-10 relative bg-[#030305]">
        <div>
          {/* Telemetry info */}
          <div className="flex justify-between items-center mb-3 text-[10px] font-mono uppercase tracking-widest">
            <span className="text-primary/80 border-b border-primary/30 pb-0.5">{product.brand}</span>
            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 border border-white/10">
              <Star className="w-3 h-3 text-accent fill-accent" />
              <span className="text-white font-bold">{product.rating}</span>
            </div>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="font-heading font-black text-lg text-white hover:text-primary transition-all line-clamp-2 leading-tight tracking-tight mt-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Stock */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-end justify-between">
          <div>
            <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Value</div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xl text-white glow-text shadow-primary">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-red-400 line-through opacity-60">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className={`flex items-center gap-1.5 ${product.inStock ? "text-primary" : "text-red-500"}`}>
              <Plus className={`w-3 h-3 ${product.inStock ? "animate-spin-slow" : ""}`} />
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest">
                {product.inStock ? "Active" : "Depleted"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
