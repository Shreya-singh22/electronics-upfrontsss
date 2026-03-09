import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useStore, getImageSrc } from "@/context/StoreContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();
  const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-hero animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-lg font-bold text-foreground">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="h-12 w-12" />
            <p className="font-body text-sm">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-lg border border-border p-3">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img src={getImageSrc(item.image)} alt={item.name} className="h-full w-full object-contain p-2" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-display text-sm font-semibold text-foreground">{item.name}</h3>
                        <p className="font-display text-sm font-bold text-foreground">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:bg-secondary">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center font-body text-sm font-medium text-foreground">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:bg-secondary">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs font-medium text-destructive hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border px-6 py-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg font-bold text-foreground">{formatPrice(cartTotal)}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-medium" size="lg">
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
