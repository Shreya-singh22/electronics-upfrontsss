"use client";

"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Activity } from "lucide-react";

import { useStoreContext } from "@/contexts/store-context";

export default function TrendingProductsTabs() {
    const { customization } = useStoreContext();
    const [activeTab, setActiveTab] = useState("home-appliances");

    const homeAppliances = products.filter(p => p.category === "Appliances" || p.category === "Home");
    const electronicGadgets = products.filter(p => !homeAppliances.includes(p));

    const handleSectionClick = (e: React.MouseEvent) => {
        if (typeof window !== "undefined" && window.parent !== window) {
            e.stopPropagation();
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'trendingTabs' }, '*');
        }
    };

    const alertText = customization?.trendingTabs?.alertText || "LIVE METRICS";
    const title = customization?.trendingTabs?.title || "TRENDING HARDWARE.";

    return (
        <section className="container mx-auto px-4 py-20 md:py-32 relative z-10 cursor-pointer" onClick={handleSectionClick}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5 text-primary animate-pulse" />
                        <span className="text-primary font-mono font-bold text-xs tracking-widest uppercase glow-text">
                            {alertText}
                        </span>
                    </div>
                    <h2 className="font-heading font-black text-5xl md:text-7xl text-white uppercase tracking-tighter m-0 leading-tight">
                        {title.split(' ')[0]} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{title.split(' ').slice(1).join(' ') || "HARDWARE."}</span>
                    </h2>
                </div>
            </div>

            <Tabs defaultValue="home-appliances" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="justify-start mb-10 bg-transparent gap-8 h-auto border-b border-white/10 w-full p-0">
                    <TabsTrigger
                        value="home-appliances"
                        className="data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-0 pb-4 text-sm font-mono font-bold uppercase text-gray-500 hover:text-white transition-all shadow-none border-b-2 border-transparent data-[state=active]:glow-text tracking-widest"
                    >
                        SYS.APPLIANCES
                    </TabsTrigger>
                    <TabsTrigger
                        value="electronic-gadgets"
                        className="data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:bg-transparent rounded-none px-0 pb-4 text-sm font-mono font-bold uppercase text-gray-500 hover:text-white transition-all shadow-none border-b-2 border-transparent data-[state=active]:drop-shadow-[0_0_10px_rgba(188,19,254,0.8)] tracking-widest"
                    >
                        SYS.GADGETS
                    </TabsTrigger>
                </TabsList>

                <div className="relative">
                    {/* Corner accent for the grid area */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-white/20 pointer-events-none"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-white/20 pointer-events-none"></div>

                    <TabsContent value="home-appliances" className="w-full mt-0 focus-visible:outline-none focus-visible:ring-0">
                        {homeAppliances.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {homeAppliances.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center w-full py-20 border border-white/5 bg-black/20">
                                <h3 className="text-xl font-mono text-gray-500 tracking-widest uppercase">NO DATA DETECTED</h3>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="electronic-gadgets" className="w-full mt-0 focus-visible:outline-none focus-visible:ring-0">
                        {electronicGadgets.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {electronicGadgets.slice(0, 4).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center w-full py-20 border border-white/5 bg-black/20">
                                <h3 className="text-xl font-mono text-gray-500 tracking-widest uppercase">NO DATA DETECTED</h3>
                            </div>
                        )}
                    </TabsContent>
                </div>
            </Tabs>
        </section>
    );
}
