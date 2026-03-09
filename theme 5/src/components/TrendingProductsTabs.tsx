import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function TrendingProductsTabs() {
    const [activeTab, setActiveTab] = useState("home-appliances");

    // For demonstration, we'll just split existing products into two categories or 
    // show "No Product Found" for one if we don't have enough data.
    const homeAppliances = products.filter(p => p.category === "Appliances" || p.category === "Home");
    const electronicGadgets = products.filter(p => !homeAppliances.includes(p));

    return (
        <section className="container mx-auto px-4 py-12 text-center">
            <div className="mb-2">
                <span className="text-[#3b82f6] font-medium text-[13px] tracking-[0.1em] uppercase">
                    NEW COLLECTION
                </span>
            </div>

            <div className="flex flex-col items-center justify-center mb-10">
                <div className="relative inline-block mt-2">
                    <h2 className="font-heading font-extrabold text-[32px] md:text-[36px] text-[#222] m-0 uppercase relative z-10 px-2 leading-tight">
                        TRENDING PRODUCTS
                    </h2>
                    <div className="absolute bottom-1 left-[-15px] right-[-15px] h-[4px] bg-[#bfdbfe] z-[-1]"></div>
                </div>
            </div>

            <Tabs defaultValue="home-appliances" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="justify-center mb-8 bg-transparent gap-6 md:gap-10 h-auto border-none p-0">
                    <TabsTrigger
                        value="home-appliances"
                        className="data-[state=active]:text-[#3b82f6] data-[state=active]:border-b-[3px] data-[state=active]:border-[#3b82f6] data-[state=active]:bg-transparent rounded-none px-0 pb-2 text-[14px] md:text-[15px] font-bold uppercase text-[#777] hover:text-[#222] transition-colors shadow-none border-b-[3px] border-transparent"
                    >
                        HOME APPLIANCES
                    </TabsTrigger>
                    <TabsTrigger
                        value="electronic-gadgets"
                        className="data-[state=active]:text-[#3b82f6] data-[state=active]:border-b-[3px] data-[state=active]:border-[#3b82f6] data-[state=active]:bg-transparent rounded-none px-0 pb-2 text-[14px] md:text-[15px] font-bold uppercase text-[#777] hover:text-[#222] transition-colors shadow-none border-b-[3px] border-transparent"
                    >
                        ELECTRONIC GADGETS
                    </TabsTrigger>
                </TabsList>

                <div className="bg-[#f8f9fa] py-24 rounded-sm min-h-[350px] flex items-center justify-center">
                    <TabsContent value="home-appliances" className="w-full mt-0">
                        {homeAppliances.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
                                {homeAppliances.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center w-full">
                                <h3 className="text-[22px] font-bold text-[#444]">No Product Found</h3>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="electronic-gadgets" className="w-full mt-0">
                        {electronicGadgets.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
                                {electronicGadgets.slice(0, 4).map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center w-full">
                                <h3 className="text-[22px] font-bold text-[#444]">No Product Found</h3>
                            </div>
                        )}
                    </TabsContent>
                </div>
            </Tabs>

        </section>
    );
}
