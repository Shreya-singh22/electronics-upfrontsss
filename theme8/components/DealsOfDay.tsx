"use client";

import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCarousel from "@/components/ProductCarousel";

export default function DealsOfDay() {
    const dealProducts = products.filter(p => p.originalPrice).slice(0, 8);

    return (
        <section className="py-16 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,255,0,0.05),transparent_50%)] pointer-events-none"></div>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 md:mb-10 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                            <Flame className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <h2 className="font-heading font-black text-2xl md:text-3xl text-foreground">Deals of the Day</h2>
                            <p className="text-sm md:text-base text-muted-foreground mt-1">Don't miss out on these amazing offers</p>
                        </div>
                    </div>

                    <Link href="/products?filter=deals" className="text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-2 group">
                        View All Deals <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <ProductCarousel products={dealProducts} />
            </div>
        </section>
    );
}
