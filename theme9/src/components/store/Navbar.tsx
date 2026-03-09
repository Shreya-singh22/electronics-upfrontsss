"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, Zap } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onCartOpen: () => void;
  onWishlistOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const Navbar = ({ onCartOpen, onWishlistOpen, searchQuery, onSearchChange }: NavbarProps) => {
  const { cartCount, wishlist } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartShake, setCartShake] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    setCartShake(true);
    setTimeout(() => setCartShake(false), 400);
    onCartOpen();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 shrink-0 group">
          <div className="relative">
            <Zap className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-xl font-bold text-foreground tracking-tight">VoltTech</span>
        </button>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/80 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:bg-secondary text-sm transition-all"
          />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {["products", "features", "about"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors capitalize rounded-lg hover:bg-secondary/50"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onWishlistOpen}
            className="relative p-2.5 rounded-xl hover:bg-secondary/80 transition-all group"
          >
            <Heart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {wishlist.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow"
              >
                {wishlist.length}
              </motion.span>
            )}
          </button>
          <button
            onClick={handleCartClick}
            className={`relative p-2.5 rounded-xl hover:bg-secondary/80 transition-all group ${cartShake ? "animate-cart-shake" : ""}`}
          >
            <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-glow"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2.5 rounded-xl hover:bg-secondary/80">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/50"
          >
            <div className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
              </div>
              {["products", "features", "about"].map((s) => (
                <button key={s} onClick={() => scrollTo(s)} className="block w-full text-left py-2.5 px-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 capitalize transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
