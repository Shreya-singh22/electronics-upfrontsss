"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { products, priceRanges } from "@/data/products";

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const filterType = searchParams.get("filter") || "";
  const categoryParam = searchParams.get("category") || "";

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    if (filterType === "featured") result = result.filter((p) => p.isFeatured);
    if (filterType === "trending") result = result.filter((p) => p.isTrending);
    if (filterType === "new") result = result.filter((p) => p.isNewArrival);

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    return result;
  }, [searchQuery, filterType, selectedCategories, selectedBrands, selectedPriceRange, selectedRating]);

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl text-foreground">
              {searchQuery ? `Results for "${searchQuery}"` : filterType ? `${filterType.charAt(0).toUpperCase() + filterType.slice(1)} Products` : "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} products found</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 h-9 px-4 rounded-lg border border-border text-sm text-foreground hover:bg-secondary transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filter - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-5">
              <ProductFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            </div>
          </aside>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <>
              <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setShowFilters(false)} />
              <div className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-40 p-5 overflow-y-auto lg:hidden">
                <ProductFilter
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">

        <main className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </main>

      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
