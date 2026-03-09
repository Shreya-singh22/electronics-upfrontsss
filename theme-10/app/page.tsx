"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import ProductGrid from "@/components/ProductGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import { products, newArrivals } from "@/data/products";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <HeroSection />
                <section id="products">
                    <CategorySection />
                </section>
                <section id="featured">
                    <ProductGrid title="Featured Products" products={products} />
                </section>
                <ProductGrid title="New Arrivals" products={newArrivals} />
                <section id="about">
                    <Newsletter />
                </section>
            </main>
            <Footer />
            <CartDrawer />
            <WishlistDrawer />
        </div>
    );
}
