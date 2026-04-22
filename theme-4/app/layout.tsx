import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "@/index.css";
import { Providers } from "./providers";
import { StoreProvider } from "@/contexts/store-context";
import { CartProvider } from "@/contexts/cart-context";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Aura Electronics | Premium Store",
  description: "Modern electronics and gadget store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-background font-body antialiased`} suppressHydrationWarning>
        <StoreProvider>
          <CartProvider>
            <Providers>{children}</Providers>
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
