"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <ArrowLeft className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-heading font-black mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="inline-flex h-12 px-8 rounded-xl bg-primary text-primary-foreground font-bold items-center justify-center hover:opacity-90 transition-opacity">
          Back to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
