import { useState } from "react";
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield } from "lucide-react";
import { useStore, type Product } from "@/context/StoreContext";
import { useToast } from "@/hooks/use-toast";

interface ProductInfoProps {
  product: Product;
  rating: number;
  reviewCount: number;
  highlights: string[];
  variants?: { label: string; options: string[] }[];
}

const ProductInfo = ({ product, rating, reviewCount, highlights, variants }: ProductInfoProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { toast } = useToast();
  const wishlisted = isInWishlist(product.id);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variants?.forEach((v) => { initial[v.label] = v.options[0]; });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast({ title: "Added to cart", description: `${product.name} × ${quantity} added to your cart.` });
  };

  const renderStars = (r: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < Math.floor(r) ? "fill-amber-400 text-amber-400" : i < r ? "fill-amber-400/50 text-amber-400" : "text-border"}`} />
    ));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Badge */}
      {product.badge && (
        <span className="w-fit rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          {product.badge}
        </span>
      )}

      {/* Category */}
      <span className="text-sm font-medium text-muted-foreground">{product.category}</span>

      {/* Name */}
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">{renderStars(rating)}</div>
        <span className="font-display text-sm font-semibold text-foreground">{rating}/5</span>
        <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-display text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
        <span className="text-sm text-muted-foreground line-through">{formatPrice(Math.round(product.price * 1.15))}</span>
        <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">15% OFF</span>
      </div>

      {/* Highlights */}
      <ul className="flex flex-col gap-2">
        {highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
            {h}
          </li>
        ))}
      </ul>

      {/* Variants */}
      {variants?.map((variant) => (
        <div key={variant.label} className="flex flex-col gap-2">
          <span className="font-display text-sm font-semibold text-foreground">{variant.label}</span>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.label]: option }))}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  selectedVariants[variant.label] === option
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-foreground hover:border-muted-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Quantity + Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center rounded-lg border border-border">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:bg-secondary">−</button>
          <span className="flex h-11 w-12 items-center justify-center border-x border-border font-body text-sm font-medium text-foreground">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} className="flex h-11 w-11 items-center justify-center text-muted-foreground hover:bg-secondary">+</button>
        </div>

        <button onClick={handleAddToCart} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-primary font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>

        <button
          onClick={() => { toggleWishlist(product); toast({ title: wishlisted ? "Removed from wishlist" : "Added to wishlist" }); }}
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border transition-colors ${
            wishlisted ? "border-destructive bg-destructive/10 text-destructive" : "border-border text-muted-foreground hover:bg-secondary"
          }`}
        >
          <Heart className={`h-5 w-5 ${wishlisted ? "fill-destructive" : ""}`} />
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3 rounded-xl border border-border p-4">
        {[
          { icon: Truck, label: "Free Delivery", sub: "Orders above ₹999" },
          { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
          { icon: Shield, label: "1 Year Warranty", sub: "Official warranty" },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <Icon className="h-5 w-5 text-accent" />
            <span className="font-display text-xs font-semibold text-foreground">{label}</span>
            <span className="text-[10px] text-muted-foreground">{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
