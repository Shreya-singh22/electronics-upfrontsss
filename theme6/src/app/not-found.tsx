"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-6xl font-heading font-black mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">Oops! Page not found.</p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity"
                >
                    <MoveLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </main>
            <Footer />
        </div>
    );
}
