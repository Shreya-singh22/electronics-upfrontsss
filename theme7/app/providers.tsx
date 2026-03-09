"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/contexts/store-context";
import { CartProvider } from "@/contexts/cart-context";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <StoreProvider>
                    <CartProvider>{children}</CartProvider>
                </StoreProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}
