"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/contexts/store-context";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StoreProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <CartDrawer />
            {children}
          </CartProvider>
        </StoreProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
