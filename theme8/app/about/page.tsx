"use client";

import TrustBadges from "@/components/TrustBadges";
import { Cpu, Zap, Shield, Users, Award, Target } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-background text-foreground">


            <main>
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden border-b border-border bg-secondary/20">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-3xl">
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-6 inline-block">
                                Our Story
                            </span>
                            <h1 className="font-heading font-black text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tighter">
                                Setting the Pulse of <span className="text-primary italic">Technology.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                At ElectroPulse, we don't just sell gadgets. We provide the tools that empower your digital life, focusing on premium performance, sleek design, and cutting-edge innovation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-20 border-b border-border">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { label: "Happy Clients", value: "50k+" },
                                { label: "Premium Products", value: "1.2k+" },
                                { label: "Tech Experts", value: "150+" },
                                { label: "Countries Served", value: "25+" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center group">
                                    <p className="text-4xl md:text-5xl font-heading font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-32">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
                            <div className="flex-1">
                                <h2 className="font-heading font-black text-4xl md:text-5xl mb-8">Engineering a Better Future</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    Founded in 2024, ElectroPulse was born from a simple observation: technology is moving faster than ever, but the soul of electronics—quality and passion—is often left behind.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { icon: Zap, title: "Pure Performance", desc: "Every product in our catalog undergoes rigorous testing for speed and reliability." },
                                        { icon: Shield, title: "Trust & Transparency", desc: "No hidden specs. We provide full transparency on what's inside the box." },
                                        { icon: Cpu, title: "Innovation Driven", desc: "We prioritize products that push the boundaries of what's possible today." }
                                    ].map((value) => (
                                        <div key={value.title} className="flex gap-6">
                                            <div className="w-12 h-12 shrink-0 rounded-2xl brand-gradient flex items-center justify-center text-primary-foreground shadow-lg">
                                                <value.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-heading font-bold text-xl mb-1">{value.title}</h4>
                                                <p className="text-muted-foreground">{value.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 w-full aspect-square rounded-[60px] bg-secondary overflow-hidden shadow-2xl relative border-8 border-white">
                                <img
                                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1000"
                                    alt="Technology exploration"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 cursor-crosshair"
                                />
                                <div className="absolute inset-0 brand-gradient opacity-20 mix-blend-overlay" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pb-32">
                    <TrustBadges />
                </section>
            </main>


        </div>
    );
}
