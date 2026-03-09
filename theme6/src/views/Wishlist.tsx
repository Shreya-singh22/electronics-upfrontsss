"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { useStore } from "@/contexts/StoreContext";
import { products } from "@/data/products";

export default function WishlistPage() {
    const { wishlist } = useStore();
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-black mb-8">Your Wishlist</h1>
                {wishlistProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlistProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-secondary/20 rounded-3xl">
                        <p className="text-xl text-muted-foreground">Your wishlist is empty.</p>
                    </div>
                )}
                <div className="mt-20">
                    <TrustBadges />
                </div>
            </main>
            <Footer />
        </div>
    );
}
