"use client";

"use client";

import { useState } from "react";
import { Search, ShoppingCart, Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/cart-context";
import { useStoreContext } from "@/contexts/store-context";

export default function Header() {
  const { customization } = useStoreContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = customization?.navigation?.links || [
    { label: "Products", href: "/products" },
    { label: "Featured", href: "/products?filter=featured" },
    { label: "About", href: "/about" },
  ];

  const brandName = customization?.brand?.name || "ELECTROPULSE";
  const brandTagline = customization?.brand?.tagline || "Technology";
  const brandLogo = customization?.brand?.logo || "/logo.png";

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  return (
    <header
      className="sticky top-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
      onClick={handleSectionClick('header')}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,243,255,0.3)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] group-hover:scale-105 transition-all duration-300 flex items-center justify-center bg-black/50 border border-primary/30 relative">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
              <img src={brandLogo} alt={`${brandName} Logo`} className="w-full h-full object-cover relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg md:text-xl text-white leading-tight tracking-tighter uppercase whitespace-nowrap glow-text group-hover:text-primary transition-colors">
                {brandName}
              </span>
              <span className="text-[8px] md:text-[10px] text-primary/70 font-bold uppercase tracking-[0.2em] leading-none">{brandTagline}</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/70" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the neon grid..."
                className="w-full h-10 pl-11 pr-4 rounded-full bg-black/40 text-sm text-white placeholder:text-gray-500 border border-white/10 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all glass-panel"
              />
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link: any) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-semibold text-gray-300 hover:text-white transition-all whitespace-nowrap group py-2"
              >
                <span className="relative z-10 group-hover:glow-text transition-all duration-300">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(0,243,255,0.8)]"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Search (Mobile) */}
            <div className="lg:hidden">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="absolute inset-x-0 top-0 h-16 bg-card px-4 flex items-center gap-2 animate-in slide-in-from-top duration-300">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 h-10 px-4 rounded-lg bg-secondary text-sm border-none focus:ring-0"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="p-2 text-muted-foreground">
                    <X className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-gray-400 hover:text-accent transition-all relative group">
              <Heart className="w-5 h-5 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(188,19,254,0.6)]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-white shadow-[0_0_10px_rgba(188,19,254,0.8)] text-[10px] flex items-center justify-center font-bold border border-black/50">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-gray-400 hover:text-primary transition-all relative group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-black shadow-[0_0_10px_rgba(0,243,255,0.8)] text-[10px] flex items-center justify-center font-black border border-black/50">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border pt-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {navLinks.map((link: any) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground px-2 py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
