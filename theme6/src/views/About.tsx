"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import { Cpu, Zap, Shield } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
                <section className="relative py-24 overflow-hidden border-b border-border bg-secondary/20">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tighter">
                                Setting the Pulse of <span className="text-primary italic">Technology.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                At ElectroPulse, we don't just sell gadgets. We provide the tools that empower your digital life, focusing on premium performance, sleek design, and cutting-edge innovation.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="py-32">
                    <div className="container mx-auto px-4">
                        <h2 className="font-heading font-black text-4xl md:text-5xl mb-8">Engineering a Better Future</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                            {[
                                { icon: Zap, title: "Pure Performance", desc: "Every product in our catalog undergoes rigorous testing for speed and reliability." },
                                { icon: Shield, title: "Trust & Transparency", desc: "No hidden specs. We provide full transparency on what's inside the box." },
                                { icon: Cpu, title: "Innovation Driven", desc: "We prioritize products that push the boundaries of what's possible today." }
                            ].map((value) => (
                                <div key={value.title} className="p-8 rounded-3xl bg-secondary/30">
                                    <value.icon className="w-12 h-12 text-primary mb-6" />
                                    <h4 className="font-heading font-bold text-xl mb-4">{value.title}</h4>
                                    <p className="text-muted-foreground">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="pb-32">
                    <TrustBadges />
                </section>
            </main>
            <Footer />
        </div>
    );
}
