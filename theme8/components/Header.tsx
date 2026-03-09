"use client";

import { useState, useEffect } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, setIsCartOpen, wishlist } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const brandName = customization?.brand?.name || "SOUNDWAVE";
  const brandTagline = customization?.brand?.tagline || "Parallel Sound";
  const brandLogo = customization?.brand?.logo || "/logo.png";

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/90 backdrop-blur-2xl border-b border-primary/10 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] h-16 md:h-20"
        : "bg-transparent border-b border-transparent h-20 md:h-24"
        } text-white`}
      onClick={handleSectionClick('header')}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(212,255,0,0.2)] group-hover:scale-110 transition-transform flex items-center justify-center bg-primary border border-primary/20 p-1.5">
              <img src={brandLogo} alt={`${brandName} Logo`} className="w-full h-full object-contain invert" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl md:text-2xl brand-gradient-text leading-tight tracking-tighter uppercase whitespace-nowrap">
                {brandName}
              </span>
              <span className="text-[9px] md:text-[11px] text-white/50 font-bold uppercase tracking-[0.3em] leading-none">{brandTagline}</span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for gadgets, accessories..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-white/10 text-sm text-white placeholder:text-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
              />
            </form>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link: any) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-white/80 hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Search (Mobile) */}
            <div className="lg:hidden">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="absolute inset-x-0 top-0 h-16 bg-brand-dark px-4 flex items-center gap-2 animate-in slide-in-from-top duration-300">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 h-10 px-4 rounded-lg bg-white/10 text-white text-sm border-none focus:ring-0 placeholder:text-white/60"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="p-2 text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className="p-2 text-white/80 hover:text-primary transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-white/80 hover:text-white transition-colors relative">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-white/80 hover:text-white transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-white/10 pt-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {navLinks.map((link: any) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white px-2 py-1"
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
