"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomizationProvider } from "@/contexts/store-context";
import { StoreProvider } from "@/contexts/StoreContext";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                <CustomizationProvider>
                    <StoreProvider>
                        {children}
                    </StoreProvider>
                </CustomizationProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
