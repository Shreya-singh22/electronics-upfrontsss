import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "@/index.css";
import { Providers } from "./providers";
import { StoreProvider } from "@/contexts/store-context";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-display",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-body",
});

export const metadata: Metadata = {
    title: "Voltix | Premium Commerce",
    description: "Futuristic and premium ecommerce experience",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${spaceGrotesk.variable} ${dmSans.variable} min-h-screen bg-background font-body antialiased selection:bg-accent/20 selection:text-accent`} suppressHydrationWarning>
                <StoreProvider>
                    <Providers>{children}</Providers>
                </StoreProvider>
            </body>
        </html>
    );
}
