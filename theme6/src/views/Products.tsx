"use client";

"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import { products, priceRanges } from "@/data/products";

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams?.get("search") || "";
    const filterType = searchParams?.get("filter") || "";
    const categoryParam = searchParams?.get("category") || "";

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        categoryParam ? [categoryParam] : []
    );
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("featured");

    const filteredProducts = useMemo(() => {
        return products
            .filter((p) => {
                const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.brand.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
                const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(rangeId => {
                    const range = priceRanges.find(r => r.id === rangeId);
                    return range ? p.price >= range.min && p.price <= range.max : true;
                });
                const matchesFilter = !filterType || p.category.toLowerCase() === filterType.toLowerCase();

                return matchesSearch && matchesCategory && matchesPrice && matchesFilter;
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return a.price - b.price;
                if (sortBy === "price-high") return b.price - a.price;
                if (sortBy === "rating") return b.rating - a.rating;
                return 0;
            });
    }, [searchQuery, selectedCategories, selectedPriceRanges, sortBy, filterType]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-black mb-8">All Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <aside className="space-y-8">
                        {/* Filter UI implementation... */}
                    </aside>
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
                <TrustBadges />
            </main>
            <Footer />
        </div>
    );
}
