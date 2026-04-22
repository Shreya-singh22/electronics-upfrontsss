"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import ProductImageGallery from "@/components/pdp/ProductImageGallery";
import ProductInfo from "@/components/pdp/ProductInfo";
import KeyFeatures from "@/components/pdp/KeyFeatures";
import Specifications from "@/components/pdp/Specifications";
import CustomerReviews from "@/components/pdp/CustomerReviews";
import StickyAddToCart from "@/components/pdp/StickyAddToCart";
import ProductGrid from "@/components/ProductGrid";
import { productDetails, allProducts } from "@/data/products";
import type { ProductDetail } from "@/data/products";
import { getImageSrc } from "@/context/StoreContext";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const [showStickyBar, setShowStickyBar] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    const detail: ProductDetail | undefined = id ? productDetails[id] : undefined;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setShowStickyBar(rect.bottom < 0);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!detail) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <div className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <h1 className="mb-4 font-display text-2xl font-bold text-foreground">Product Not Found</h1>
                        <button onClick={() => router.push("/")} className="text-sm font-medium text-accent hover:underline">Go back to home</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const related = allProducts.filter((p) => p.category === detail.category && p.id !== detail.id).slice(0, 4);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">
                <section ref={heroRef} className="py-8 sm:py-12">
                    <div className="voltix-container">
                        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                            <button onClick={() => router.push("/")} className="hover:text-foreground transition-colors">Home</button>
                            <span>/</span>
                            <span>{detail.category}</span>
                            <span>/</span>
                            <span className="text-foreground">{detail.name}</span>
                        </nav>

                        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                            <ProductImageGallery images={detail.gallery} productName={detail.name} />
                            <ProductInfo
                                product={detail}
                                rating={detail.rating}
                                reviewCount={detail.reviewCount}
                                highlights={detail.highlights}
                                variants={detail.variants}
                            />
                        </div>
                    </div>
                </section>

                <KeyFeatures features={detail.features} />
                <Specifications specs={detail.specs} />

                <section className="py-16">
                    <div className="voltix-container">
                        <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Designed for Excellence
                        </h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {detail.gallery.map((img, i) => (
                                <div key={i} className="overflow-hidden rounded-2xl bg-secondary">
                                    <img src={getImageSrc(img)} alt={`${detail.name} showcase ${i + 1}`} className="h-64 w-full object-contain p-8 transition-transform duration-500 hover:scale-105" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <CustomerReviews reviews={detail.reviews} overallRating={detail.rating} reviewCount={detail.reviewCount} />

                {related.length > 0 && (
                    <div className="bg-secondary">
                        <ProductGrid title="You May Also Like" products={related} />
                    </div>
                )}
            </main>

            <Footer />
            <CartDrawer />
            <WishlistDrawer />
            <StickyAddToCart product={detail} visible={showStickyBar} />
        </div>
    );
}
