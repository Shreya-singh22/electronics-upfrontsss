"use client";

import { X, Heart, ShoppingCart } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
}

const WishlistDrawer = ({ open, onClose }: WishlistDrawerProps) => {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50" />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-display text-lg font-semibold">Wishlist ({wishlist.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            {wishlist.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                <Heart className="h-12 w-12 mb-3" />
                <p>Your wishlist is empty</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-secondary/50 rounded-lg p-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">{item.name}</h4>
                      <p className="text-sm font-bold text-primary mt-0.5">₹{item.price.toLocaleString("en-IN")}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => { addToCart(item); toast.success("Added to cart"); }}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded bg-primary text-primary-foreground text-xs font-medium"
                        >
                          <ShoppingCart className="h-3 w-3" /> Add to Cart
                        </button>
                        <button onClick={() => toggleWishlist(item)} className="text-xs text-destructive hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
