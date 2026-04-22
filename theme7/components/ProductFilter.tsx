import { categories } from "@/data/products";
import { brands, priceRanges, ratingFilters } from "@/data/products";
import { Star, X } from "lucide-react";

interface ProductFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedPriceRange: number | null;
  setSelectedPriceRange: (idx: number | null) => void;
  selectedRating: number | null;
  setSelectedRating: (rating: number | null) => void;
  onClose?: () => void;
}

export default function ProductFilter({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedRating,
  setSelectedRating,
  onClose,
}: ProductFilterProps) {
  const toggleCategory = (id: string) => {
    setSelectedCategories(
      selectedCategories.includes(id)
        ? selectedCategories.filter((c) => c !== id)
        : [...selectedCategories, id]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  const hasFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || selectedPriceRange !== null || selectedRating !== null;

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    setSelectedRating(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-bold text-foreground">Filters</h3>
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-primary hover:underline">
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-1 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {cat.icon} {cat.name}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === idx}
                onChange={() => setSelectedPriceRange(selectedPriceRange === idx ? null : idx)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Rating</h4>
        <div className="space-y-2">
          {ratingFilters.map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(selectedRating === rating ? null : rating)}
                className="text-primary focus:ring-primary"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
