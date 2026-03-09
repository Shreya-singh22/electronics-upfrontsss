import { Clock, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import { useStore } from "@/contexts/StoreContext";

export default function DealsOfDay() {
    const { toggleWishlist, isInWishlist } = useStore();
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const dealProducts = products.filter(p => p.originalPrice).slice(0, 4);

    // ... (keep useEffect code)

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                {/* ... (keep header code) */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dealProducts.map((p) => {
                        const discount = Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100);
                        return (
                            <div key={p.id} className="relative group">
                                <Link to={`/product/${p.id}`} className="block bg-card rounded-3xl border border-border p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-destructive text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        SALE -{discount}%
                                    </div>
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-secondary mb-6">
                                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-2xl font-black text-foreground">₹{p.price.toLocaleString()}</span>
                                        <span className="text-sm text-muted-foreground line-through opacity-50">₹{p.originalPrice!.toLocaleString()}</span>
                                    </div>

                                    <div className="space-y-2">
                                        {/* ... progress bar code */}
                                    </div>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(p.id);
                                    }}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm z-20"
                                >
                                    <Heart className={`w-5 h-5 transition-colors ${isInWishlist(p.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
