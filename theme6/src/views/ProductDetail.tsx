"use client";

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Calendar, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { products } from "@/data/products";
import { useCart } from "@/contexts/cart-context";
import { useStoreContext } from "@/contexts/store-context";

export default function ProductDetail() {
    const { customization } = useStoreContext();
    const params = useParams();
    const id = params?.id as string;
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

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 py-8 md:py-12">
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
                    <div className="space-y-4 md:space-y-6">
                        <div className="aspect-square rounded-3xl md:rounded-[40px] bg-secondary overflow-hidden shadow-2xl relative group">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="font-heading font-black text-3xl md:text-5xl mb-6">{product.name}</h1>
                        <div className="p-6 md:p-8 rounded-3xl bg-secondary/50 border mb-8 shadow-inner">
                            <span className="font-heading font-black text-3xl md:text-4xl">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <span className="text-lg md:text-xl text-muted-foreground line-through opacity-50 ml-4">₹{product.originalPrice.toLocaleString()}</span>
                            )}
                            <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                <button
                                    onClick={() => addToCart(product)}
                                    className="flex-[2] h-12 md:h-14 rounded-xl brand-gradient text-primary-foreground font-black text-lg flex items-center justify-center gap-3 shadow-xl"
                                >
                                    <ShoppingCart className="w-6 h-6" />
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className={`flex-1 h-12 md:h-14 rounded-xl border flex items-center justify-center transition-all ${isInWishlist(product.id) ? "bg-destructive/10 border-destructive" : "bg-white"}`}
                                >
                                    <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                                </button>
                            </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-lg">{product.description}</p>
                    </div>
                </div>
                <TrustBadges />
            </main>
            <Footer />
        </div>
    );
}
