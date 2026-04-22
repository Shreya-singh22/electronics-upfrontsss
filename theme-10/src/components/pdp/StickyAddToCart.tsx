import { ShoppingCart } from "lucide-react";
import { useStore, getImageSrc, type Product } from "@/context/StoreContext";
import { useToast } from "@/hooks/use-toast";

interface StickyAddToCartProps {
  product: Product;
  visible: boolean;
}

const StickyAddToCart = ({ product, visible }: StickyAddToCartProps) => {
  const { addToCart } = useStore();
  const { toast } = useToast();
  const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-hero">
      <div className="voltix-container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <img src={getImageSrc(product.image)} alt={product.name} className="h-10 w-10 flex-shrink-0 rounded-lg bg-secondary object-contain p-1" />
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-semibold text-foreground">{product.name}</h3>
            <p className="font-display text-sm font-bold text-foreground">{formatPrice(product.price)}</p>
          </div>
        </div>
        <button
          onClick={() => { addToCart(product); toast({ title: "Added to cart", description: `${product.name} added to your cart.` }); }}
          className="flex h-10 flex-shrink-0 items-center gap-2 rounded-lg bg-primary px-6 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default StickyAddToCart;
