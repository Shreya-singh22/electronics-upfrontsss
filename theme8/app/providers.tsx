"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomizationProvider } from "@/contexts/store-context";
import { StoreProvider } from "@/contexts/StoreContext";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <CustomizationProvider>
                    <StoreProvider>{children}</StoreProvider>
                </CustomizationProvider>
            </TooltipProvider>
        </QueryClientProvider>
    );
}
