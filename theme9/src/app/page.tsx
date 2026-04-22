"use client";

import { useState } from "react";
import Navbar from "@/components/store/Navbar";
import HeroSection from "@/components/store/HeroSection";
import ProductsSection from "@/components/store/ProductsSection";
import BrandsSection from "@/components/store/BrandsSection";
import FeaturesSection from "@/components/store/FeaturesSection";
import AboutSection from "@/components/store/AboutSection";
import CartDrawer from "@/components/store/CartDrawer";
import WishlistDrawer from "@/components/store/WishlistDrawer";
import Footer from "@/components/store/Footer";

export default function Home() {
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-background">
            <Navbar
                onCartOpen={() => setCartOpen(true)}
                onWishlistOpen={() => setWishlistOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <HeroSection />
            <ProductsSection searchQuery={searchQuery} />
            <BrandsSection />
            <FeaturesSection />
            <AboutSection />
            <Footer />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
        </div>
    );
}
