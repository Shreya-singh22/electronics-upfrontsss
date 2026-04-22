"use client";

import { useState, use } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Calendar, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { products } from "@/data/products";
import { useCart } from "@/contexts/cart-context";
import { useStoreContext } from "@/contexts/store-context";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { customization } = useStoreContext();
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ArrowLeft className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-black mb-4">Product Not Found</h1>
          <p className="text-muted-foreground text-lg mb-8">The product you're looking for might have been moved or deleted.</p>
          <Link href="/products" className="inline-flex h-12 px-8 rounded-xl bg-primary text-primary-foreground font-bold items-center justify-center hover:opacity-90 transition-opacity">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8 md:mb-10 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span className="opacity-30">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
          {/* Images */}
          <div className="space-y-4 md:space-y-6">
            <div className="aspect-square rounded-3xl md:rounded-[40px] bg-secondary overflow-hidden shadow-2xl relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all ${i === selectedImage ? "border-primary scale-105 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col" onClick={handleSectionClick('productContent')}>
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                {product.brand}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
                <span className="text-xs md:text-sm font-bold text-foreground ml-1">{product.rating}</span>
                <span className="text-[10px] md:text-xs text-muted-foreground opacity-50 ml-1">({product.reviewCount})</span>
              </div>
            </div>

            <h1 className="font-heading font-black text-3xl md:text-5xl text-foreground leading-[1.1] mb-6">{product.name}</h1>

            {/* Price section */}
            <div className="p-6 md:p-8 rounded-3xl md:rounded-[32px] bg-secondary/50 border border-border mb-8 shadow-inner">
              <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                <span className="font-heading font-black text-3xl md:text-4xl text-foreground">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg md:text-xl text-muted-foreground line-through opacity-50">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-success font-bold text-xs md:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Save ₹{(product.originalPrice! - product.price).toLocaleString()} ({discount}% off)
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-[2] h-12 md:h-14 rounded-xl md:rounded-2xl brand-gradient text-primary-foreground font-black text-base md:text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all"
                >
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl border border-border flex items-center justify-center transition-all ${isInWishlist(product.id) ? "bg-destructive/10 border-destructive shadow-inner" : "bg-white hover:bg-secondary shadow-sm"
                    }`}
                >
                  <Heart className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isInWishlist(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                </button>
              </div>
            </div>

            {/* Delivery Estimator */}
            <div className="mb-10 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Fastest Delivery by</p>
                  <p className="text-sm font-bold text-foreground">Monday, 10th March</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Standard Shipping</p>
                  <p className="text-sm font-bold text-foreground">Free for Prime Members</p>
                </div>
              </div>
            </div>

            {/* Description Tab (simplified) */}
            <div className="mb-10">
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Product Overview</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-lg">{product.description}</p>
            </div>

            {/* Optimized Specs Table */}
            <div className="mt-auto">
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">Full Specifications</h3>
              <div className="rounded-3xl border border-border overflow-hidden bg-card shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <tbody>
                      {Object.entries(product.specs).map(([key, value], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? "bg-secondary/20" : ""}>
                          <th className="py-4 px-6 text-muted-foreground font-bold uppercase tracking-widest text-[10px] w-1/3">{key}</th>
                          <td className="py-4 px-6 text-foreground font-medium">{value as string}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <TrustBadges />
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-8 md:mb-12">
              <div>
                <h2 className="font-heading font-black text-3xl md:text-4xl text-foreground">You May Also Like</h2>
                <p className="text-muted-foreground mt-2">Explore similar premium gadgets</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
