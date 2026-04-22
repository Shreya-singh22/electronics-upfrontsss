import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider as CartProvider } from "@/lib/store-context";
import { StoreProvider as OrbitProvider } from "@/contexts/store-context";
import { QueryProvider } from "@/components/QueryProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-display",
});

export const metadata: Metadata = {
    title: "Shop Sparkle",
    description: "Your premium shopping experience",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
                <QueryProvider>
                    <TooltipProvider>
                        <OrbitProvider>
                            <CartProvider>
                                {children}
                                <Toaster />
                                <Sonner />
                            </CartProvider>
                        </OrbitProvider>
                    </TooltipProvider>
                </QueryProvider>
            </body>
        </html>
    );
}
