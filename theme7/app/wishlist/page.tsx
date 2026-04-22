"use client";


import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/cart-context";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-heading font-bold text-2xl text-foreground mb-2">My Wishlist</h1>
        <p className="text-sm text-muted-foreground mb-8">{wishlistProducts.length} items</p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
            <Link href="/products" className="text-primary hover:underline text-sm mt-2 inline-block">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
