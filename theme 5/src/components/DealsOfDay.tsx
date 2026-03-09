import { Clock, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { useStoreContext } from "@/contexts/store-context";

export default function DealsOfDay() {
    const { toggleWishlist, isInWishlist } = useCart();
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        if (typeof window !== "undefined" && window.parent !== window) {
            e.stopPropagation();
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'dealsOfDay' }, '*');
        }
    };

    const sectionTitle = customization?.dealsOfDay?.title || "Flash Deals";
    const sectionSubtitle = customization?.dealsOfDay?.subtitle || "Hurry Up! Offers end soon.";
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const dealProducts = products.filter(p => p.originalPrice).slice(0, 4);

    useEffect(() => {
        // ... (keep useEffect code)
        const timer = setInterval(() => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setHours(24, 0, 0, 0);
            const diff = tomorrow.getTime() - now.getTime();

            setTimeLeft({
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / 1000 / 60) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-20 bg-[#050505] relative overflow-hidden cursor-pointer" onClick={handleSectionClick}>
            <div className="absolute top-1/2 left-0 w-full h-[300px] bg-red-900/5 -translate-y-1/2 blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                            <Zap className="w-7 h-7 text-white animate-pulse" />
                        </div>
                        <div>
                            <h2 className="font-heading font-black text-3xl md:text-4xl text-white tracking-tight">{sectionTitle}</h2>
                            <p className="text-red-400 font-medium">{sectionSubtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div className="flex items-center gap-2 font-mono font-bold text-lg md:text-xl">
                            <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-black border border-white/10 text-white shadow-inner">{timeLeft.hours.toString().padStart(2, '0')}</span>
                            <span className="text-red-500 animate-pulse">:</span>
                            <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-black border border-white/10 text-white shadow-inner">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                            <span className="text-red-500 animate-pulse">:</span>
                            <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-black border border-white/10 text-white shadow-inner">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dealProducts.map((p) => {
                        const discount = Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100);
                        const soldPercentage = Math.floor(Math.random() * 40) + 40; // Simulated sold percentage

                        return (
                            <div key={p.id} className="relative group">
                                <Link to={`/product/${p.id}`} className="block bg-[#0a0a0a] rounded-[2rem] border border-white/5 p-6 hover:border-red-500/30 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                                    {/* Glowing accent on hover */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                        SALE -{discount}%
                                    </div>

                                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-black mb-6 border border-white/5 flex items-center justify-center p-4">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <img src={p.image} alt={p.name} className="relative z-10 w-full h-full object-contain filter drop-shadow-xl transition-transform duration-700 group-hover:scale-110" />
                                    </div>

                                    <h3 className="font-heading font-black text-xl text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-1">{p.name}</h3>

                                    <div className="flex flex-wrap items-baseline gap-3 mb-6">
                                        <span className="text-3xl font-black text-white">₹{p.price.toLocaleString()}</span>
                                        <span className="text-sm font-bold text-gray-500 line-through">₹{p.originalPrice!.toLocaleString()}</span>
                                    </div>

                                    <div className="space-y-3 bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="flex justify-between text-xs font-bold font-mono">
                                            <span className="text-red-400">🔥 Fast Selling</span>
                                            <span className="text-gray-400">{soldPercentage}% Claimed</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5 shadow-inner">
                                            <div
                                                className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full relative"
                                                style={{ width: `${soldPercentage}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/30 animate-[pulse_2s_ease-in-out_infinite]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(p.id);
                                    }}
                                    className={`absolute top-6 right-6 w-12 h-12 rounded-full backdrop-blur-xl flex items-center justify-center shadow-lg border z-20 transition-all duration-300 overflow-hidden group/btn ${isInWishlist(p.id) ? "bg-red-500/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.4)]" : "bg-black/40 border-white/10 hover:bg-white/10 hover:border-white/30"}`}
                                >
                                    <Heart className={`w-6 h-6 transition-colors ${isInWishlist(p.id) ? "fill-red-500 text-red-500 scale-110 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "text-white group-hover/btn:text-red-400"}`} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
