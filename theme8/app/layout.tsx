import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

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
                    <main className="flex-1">
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    )
}
