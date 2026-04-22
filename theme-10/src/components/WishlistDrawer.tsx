import { X, ShoppingCart, Trash2, Heart } from "lucide-react";
import { useStore, getImageSrc } from "@/context/StoreContext";

const WishlistDrawer = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, moveToCartFromWishlist } = useStore();
  const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

  if (!isWishlistOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm" onClick={() => setIsWishlistOpen(false)} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-hero animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-lg font-bold text-foreground">Your Wishlist</h2>
          <button onClick={() => setIsWishlistOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
            <Heart className="h-12 w-12" />
            <p className="font-body text-sm">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-border">
                  <div className="flex aspect-square items-center justify-center bg-secondary p-4">
                    <img src={getImageSrc(item.image)} alt={item.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex flex-col gap-2 p-3">
                    <h3 className="font-display text-xs font-semibold text-foreground leading-tight">{item.name}</h3>
                    <p className="font-display text-sm font-bold text-foreground">{formatPrice(item.price)}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveToCartFromWishlist(item)}
                        className="flex flex-1 items-center justify-center gap-1 rounded bg-primary px-2 py-1.5 text-[11px] font-medium text-primary-foreground hover:bg-primary/90"
                      >
                        <ShoppingCart className="h-3 w-3" /> Cart
                      </button>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="flex h-auto items-center justify-center rounded border border-border px-2 text-destructive hover:bg-secondary"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistDrawer;
