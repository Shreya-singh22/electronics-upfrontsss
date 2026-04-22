"use client";

import { useState, useMemo } from "react";
import { Search, X, Star, ChevronDown, Filter, Package, Zap, Truck } from "lucide-react";
import Link from "next/link";
import { allProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", "Phones", "Laptops", "Audio", "Wearables", "Tablets"];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
    All: <Package className="h-4 w-4" />,
    Phones: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="18" r="1" /></svg>,
    Laptops: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M2 20h20" /></svg>,
    Audio: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" /></svg>,
    Wearables: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="4" width="10" height="16" rx="3" /><path d="M7 9h10M7 15h10" /></svg>,
    Tablets: <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="17" r="1" /></svg>,
};

const SORT_OPTIONS = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Newest", value: "newest" },
    { label: "Name: A–Z", value: "name_asc" },
];

const BRANDS = ["Apple", "Samsung", "Sony", "Google", "SoundCore", "Pulse", "ProBook"];

const RATINGS = [4, 3, 2, 1];

const PAGE_SIZE = 8;

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("recommended");
    const [page, setPage] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Sidebar filters
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 250000]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);
    const [inStockOnly, setInStockOnly] = useState(false);

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
        );
        setPage(1);
    };

    const clearAllFilters = () => {
        setActiveCategory("All");
        setSearch("");
        setSort("recommended");
        setPriceRange([0, 250000]);
        setSelectedBrands([]);
        setMinRating(0);
        setInStockOnly(false);
        setPage(1);
    };

    const activeFilterCount =
        (activeCategory !== "All" ? 1 : 0) +
        selectedBrands.length +
        (minRating > 0 ? 1 : 0) +
        (inStockOnly ? 1 : 0) +
        (priceRange[0] > 0 || priceRange[1] < 250000 ? 1 : 0);

    const filtered = useMemo(() => {
        let result = [...allProducts];
        if (activeCategory !== "All") result = result.filter((p) => p.category === activeCategory);
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        }
        result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
        if (selectedBrands.length > 0) {
            result = result.filter((p) =>
                selectedBrands.some((b) => p.name.toLowerCase().includes(b.toLowerCase()))
            );
        }
        switch (sort) {
            case "price_asc": result.sort((a, b) => a.price - b.price); break;
            case "price_desc": result.sort((a, b) => b.price - a.price); break;
            case "name_asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
        }
        return result;
    }, [activeCategory, search, sort, priceRange, selectedBrands, minRating]);

    const visible = filtered.slice(0, page * PAGE_SIZE);
    const hasMore = visible.length < filtered.length;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                {/* ── Hero ── */}
                <section className="border-b border-border bg-gradient-to-b from-[#f5f5f7] to-white py-12">
                    <div className="voltix-container">
                        <Link href="/" className="mb-5 inline-flex items-center gap-1.5 font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                            ← Back to Home
                        </Link>
                        <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-foreground sm:text-5xl">
                            All Products
                        </h1>
                        <p className="mt-2 font-body text-lg text-muted-foreground">
                            Explore premium electronics curated for performance & design.
                        </p>

                        {/* Stat Badges */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            {[
                                { Icon: Package, label: `${allProducts.length} Products` },
                                { Icon: Zap, label: "5 Categories" },
                                { Icon: Truck, label: "Fast Delivery" },
                            ].map(({ Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm"
                                >
                                    <Icon className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-body text-sm font-medium text-foreground">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Category Pills ── */}
                <section className="border-b border-border bg-white">
                    <div className="voltix-container">
                        <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setPage(1); }}
                                    className={`flex flex-shrink-0 items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                            ? "bg-foreground text-background shadow-sm"
                                            : "text-muted-foreground hover:bg-[#f5f5f7] hover:text-foreground"
                                        }`}
                                >
                                    {CATEGORY_ICONS[cat]}
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Main Content ── */}
                <section className="voltix-container py-8">
                    <div className="flex gap-8">
                        {/* ── Sidebar ── */}
                        <aside className="hidden w-56 flex-shrink-0 lg:block">
                            <div className="sticky top-24 space-y-6">
                                {/* Filter header */}
                                <div className="flex items-center justify-between">
                                    <span className="font-display text-sm font-semibold text-foreground">Filters</span>
                                    {activeFilterCount > 0 && (
                                        <button onClick={clearAllFilters} className="font-body text-xs text-accent hover:underline">
                                            Clear all ({activeFilterCount})
                                        </button>
                                    )}
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Price Range
                                    </h3>
                                    <div className="space-y-2">
                                        <input
                                            type="range"
                                            min={0}
                                            max={250000}
                                            step={5000}
                                            value={priceRange[1]}
                                            onChange={(e) => { setPriceRange([priceRange[0], +e.target.value]); setPage(1); }}
                                            className="w-full accent-foreground"
                                        />
                                        <div className="flex justify-between font-body text-xs text-muted-foreground">
                                            <span>₹0</span>
                                            <span>Up to ₹{(priceRange[1] / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Brand */}
                                <div>
                                    <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Brand
                                    </h3>
                                    <div className="space-y-2">
                                        {BRANDS.map((brand) => (
                                            <label key={brand} className="flex cursor-pointer items-center gap-2.5 group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => toggleBrand(brand)}
                                                    className="h-4 w-4 rounded border-border accent-foreground"
                                                />
                                                <span className="font-body text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                                    {brand}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div>
                                    <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Min Rating
                                    </h3>
                                    <div className="space-y-1.5">
                                        {RATINGS.map((r) => (
                                            <button
                                                key={r}
                                                onClick={() => { setMinRating(minRating === r ? 0 : r); setPage(1); }}
                                                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors ${minRating === r ? "bg-[#f5f5f7]" : "hover:bg-[#f5f5f7]/50"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} className={`h-3 w-3 ${s <= r ? "fill-amber-400 text-amber-400" : "fill-border text-border"}`} />
                                                    ))}
                                                </div>
                                                <span className="font-body text-xs text-muted-foreground">& up</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability */}
                                <div>
                                    <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                        Availability
                                    </h3>
                                    <label className="flex cursor-pointer items-center gap-2.5">
                                        <input
                                            type="checkbox"
                                            checked={inStockOnly}
                                            onChange={(e) => { setInStockOnly(e.target.checked); setPage(1); }}
                                            className="h-4 w-4 rounded border-border accent-foreground"
                                        />
                                        <span className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                                            In Stock Only
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </aside>

                        {/* ── Product Grid Area ── */}
                        <div className="flex-1 min-w-0">
                            {/* Toolbar */}
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                {/* Search */}
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                        placeholder="Search products..."
                                        className="h-11 w-full rounded-full border-none bg-[#f5f5f7] pl-11 pr-10 font-body text-sm text-foreground placeholder:text-muted-foreground focus:bg-white focus:shadow-md focus:outline-none focus:ring-1 focus:ring-black/5 transition-all"
                                    />
                                    {search && (
                                        <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                                            <X className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Mobile filter */}
                                    <button
                                        onClick={() => setSidebarOpen(!sidebarOpen)}
                                        className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 font-body text-sm font-medium transition-colors hover:bg-[#f5f5f7] lg:hidden"
                                    >
                                        <Filter className="h-4 w-4" />
                                        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                                    </button>

                                    {/* Sort */}
                                    <div className="relative">
                                        <select
                                            value={sort}
                                            onChange={(e) => setSort(e.target.value)}
                                            className="h-11 appearance-none rounded-full border border-border bg-white pl-4 pr-9 font-body text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-black/10 cursor-pointer"
                                        >
                                            {SORT_OPTIONS.map((o) => (
                                                <option key={o.value} value={o.value}>{o.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>

                            {/* Results info */}
                            <p className="mb-5 font-body text-sm text-muted-foreground">
                                Showing <span className="font-semibold text-foreground">{Math.min(visible.length, filtered.length)}</span> of{" "}
                                <span className="font-semibold text-foreground">{filtered.length}</span> products
                                {activeCategory !== "All" && ` in ${activeCategory}`}
                                {search && ` for "${search}"`}
                            </p>

                            {/* Grid */}
                            {filtered.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {visible.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {/* Load More */}
                                    {hasMore && (
                                        <div className="mt-10 flex justify-center">
                                            <button
                                                onClick={() => setPage((p) => p + 1)}
                                                className="flex items-center gap-2 rounded-full border border-border bg-white px-8 py-3 font-body text-sm font-medium text-foreground shadow-sm transition-all hover:bg-[#f5f5f7] hover:shadow-md active:scale-95"
                                            >
                                                Load More Products
                                                <span className="rounded-full bg-[#f5f5f7] px-2 py-0.5 text-xs font-semibold">
                                                    +{Math.min(PAGE_SIZE, filtered.length - visible.length)}
                                                </span>
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f5f5f7]">
                                        <Search className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="font-display text-lg font-semibold text-foreground">No products found</h3>
                                    <p className="font-body text-sm text-muted-foreground">Try a different search or filter</p>
                                    <button
                                        onClick={clearAllFilters}
                                        className="mt-2 rounded-full border border-border px-6 py-2.5 font-body text-sm font-medium transition-colors hover:bg-[#f5f5f7]"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <CartDrawer />
            <WishlistDrawer />
        </div>
    );
}
