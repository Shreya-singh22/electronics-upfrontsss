"use client";

import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";
import { useStoreContext } from "@/contexts/store-context";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Featured", href: "/#featured" },
  { label: "About", href: "/#about" },
];

const Header = () => {
  const { cartCount, setIsCartOpen, wishlist, setIsWishlistOpen } = useStore();
  const { customization } = useStoreContext();
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = customization?.brandName || "Voltix";

  const handleSectionClick = () => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'header' }, '*');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 transition-all duration-300 shadow-soft" onClick={handleSectionClick}>
      <div className="voltix-container flex h-20 items-center justify-between gap-6">
        {/* Brand */}
        <a href="/" className="flex-shrink-0 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {brandName}
        </a>

        {/* Nav Links - Desktop */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 font-body text-sm font-medium text-[#6e6e73] transition-colors hover:text-foreground group"
            >
              {link.label}
              <span className="absolute inset-x-4 bottom-1 h-px scale-x-0 bg-foreground transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Search - Desktop */}
        <div className={`relative hidden flex-1 max-w-sm md:block transition-all duration-200 ${searchFocused ? "max-w-md" : ""}`}>
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for perfection..."
            className="h-11 w-full rounded-full border-none bg-[#f5f5f7] pl-11 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:bg-white focus:shadow-md focus:outline-none focus:ring-1 focus:ring-black/5 transition-all outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary sm:flex">
            <User className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border px-4 pb-4 pt-3 md:hidden">
          {/* Mobile Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              className="h-11 w-full rounded-full border-none bg-[#f5f5f7] pl-10 pr-4 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 font-body text-sm font-medium text-[#6e6e73] transition-colors hover:bg-[#f5f5f7] hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
