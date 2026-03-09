import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartDrawer from "@/components/CartDrawer"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' })

export const metadata: Metadata = {
    title: 'Cedar Electronics Dashboard',
    description: 'Next gen electronics store',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen flex flex-col w-full overflow-x-hidden relative`}>
                <Providers>
                    <Header />
                    <CartDrawer />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                    <Toaster />
                    <Sonner />
                </Providers>
            </body>
        </html>
    )
}
