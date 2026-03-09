"use client";

import { Clock, Zap, Target } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { useState, useEffect } from "react";
import { useStore } from "@/contexts/StoreContext";

export default function DealsOfDay() {
    const { toggleWishlist, isInWishlist } = useStore();
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [soldPercentages, setSoldPercentages] = useState<number[]>([]);
    const dealProducts = products.filter(p => p.originalPrice).slice(0, 4);

    useEffect(() => {
        // Generate random percentages only on the client
        setSoldPercentages(dealProducts.map(() => Math.floor(Math.random() * 40) + 40));
    }, []);

    useEffect(() => {
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
        <section className="py-24 bg-[#030305] relative overflow-hidden border-t border-red-500/10">
            {/* Warning Background Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Header System Alert Style */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 border-l-4 border-red-600 pl-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-red-600 animate-pulse"></div>
                            <span className="text-red-500 font-mono font-bold text-sm tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">
                                SYSTEM ALERT : PRICE DROP
                            </span>
                        </div>
                        <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tighter m-0 leading-none">
                            CRITICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">DEALS.</span>
                        </h2>
                    </div>

                    {/* Countdown Timer */}
                    <div className="flex flex-col items-start md:items-end">
                        <span className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                            <Clock className="w-3 h-3" /> Time Remaining
                        </span>
                        <div className="flex items-center gap-2 font-mono font-bold text-2xl md:text-3xl">
                            <span className="w-14 h-14 flex items-center justify-center bg-black border border-red-500/30 text-red-500 shadow-[inset_0_0_15px_rgba(220,38,38,0.2)]">{timeLeft.hours.toString().padStart(2, '0')}</span>
                            <span className="text-red-500/50 animate-pulse">:</span>
                            <span className="w-14 h-14 flex items-center justify-center bg-black border border-red-500/30 text-red-500 shadow-[inset_0_0_15px_rgba(220,38,38,0.2)]">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                            <span className="text-red-500/50 animate-pulse">:</span>
                            <span className="w-14 h-14 flex items-center justify-center bg-black border border-red-500/30 text-red-500 shadow-[inset_0_0_15px_rgba(220,38,38,0.2)]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dealProducts.map((p, idx) => {
                        const discount = Math.round(((p.originalPrice! - p.price) / p.originalPrice!) * 100);
                        const soldPercentage = soldPercentages[idx] || 0;

                        return (
                            <div key={p.id} className="group relative bg-[#0a0a0f] border border-red-500/20 overflow-hidden transition-all duration-500 hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] flex flex-col h-full">
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/50 z-20 group-hover:border-red-500 group-hover:scale-125 transition-all"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/50 z-20 group-hover:border-red-500 group-hover:scale-125 transition-all"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/50 z-20 group-hover:border-red-500 group-hover:scale-125 transition-all"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/50 z-20 group-hover:border-red-500 group-hover:scale-125 transition-all"></div>

                                <Link href={`/product/${p.id}`} className="block relative flex-1 flex flex-col">

                                    <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-red-600 text-white px-2 py-1 shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                                        <Zap className="w-3 h-3 fill-white animate-pulse" />
                                        <span className="text-[10px] font-mono font-black uppercase tracking-widest leading-none mt-0.5">
                                            -{discount}% DROP
                                        </span>
                                    </div>

                                    <div className="relative aspect-square bg-[#050508] flex items-center justify-center p-8 border-b border-red-500/10 group-hover:bg-red-950/20 transition-colors duration-500">
                                        <img src={p.image} alt={p.name} className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110" />
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-heading font-black text-xl text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2 leading-tight tracking-tight">{p.name}</h3>

                                            <div className="flex items-baseline gap-3 mb-6">
                                                <span className="font-mono font-bold text-2xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">₹{p.price.toLocaleString()}</span>
                                                <span className="font-mono text-sm font-bold text-red-500/50 line-through">₹{p.originalPrice!.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 mt-auto">
                                            <div className="flex justify-between items-end border-b border-red-500/20 pb-1">
                                                <span className="text-[9px] font-mono uppercase tracking-widest text-red-400 flex items-center gap-1">
                                                    <Target className="w-3 h-3" /> Target Reached
                                                </span>
                                                <span className="font-mono text-xs text-white font-bold">{soldPercentage}%</span>
                                            </div>
                                            <div className="w-full h-1 bg-black overflow-hidden border border-red-500/10">
                                                <div
                                                    className="h-full bg-red-600 relative"
                                                    style={{ width: `${soldPercentage}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(p.id);
                                    }}
                                    className={`absolute top-4 right-4 z-30 p-2 border transition-all ${isInWishlist(p.id) ? "bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]" : "bg-black/80 border-white/10 hover:border-red-500/50"}`}
                                >
                                    <Target className={`w-4 h-4 transition-colors ${isInWishlist(p.id) ? "text-red-500" : "text-white/50 group-hover:text-red-400"}`} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
