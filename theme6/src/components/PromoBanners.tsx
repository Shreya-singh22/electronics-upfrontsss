import Link from "next/link";
import { ArrowRight, Zap, Shield } from "lucide-react";

export default function PromoBanners() {
    return (
        <section className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Banner 1 - Cyberpunk Vibe */}
                <div className="relative overflow-hidden glass-panel rounded-[2.5rem] p-8 md:p-12 min-h-[400px] flex flex-col justify-end group transition-all duration-700 hover:shadow-[0_0_40px_rgba(0,243,255,0.3)] hover:-translate-y-2 border border-white/5 hover:border-primary/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&fit=crop"
                        alt="Cyber Setup"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen scale-100 group-hover:scale-110 transition-transform duration-1000"
                    />

                    <div className="relative z-20 w-full max-w-md">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/50 mb-6 backdrop-blur-md">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-primary uppercase tracking-widest glow-text">Next-Gen Rigs</span>
                        </div>
                        <h3 className="font-heading font-black text-4xl md:text-5xl text-white mb-4 leading-none tracking-tight">
                            Build Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Cyber Hub.</span>
                        </h3>
                        <p className="text-gray-400 font-light mb-8">Equip your battle station with raw, unfiltered power. Designed for the elite.</p>
                        <Link href="/products" className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors group/link">
                            Equip Now <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Banner 2 - Clean Futuristic */}
                <div className="relative overflow-hidden glass-panel rounded-[2.5rem] p-8 md:p-12 min-h-[400px] flex flex-col justify-end group transition-all duration-700 hover:shadow-[0_0_40px_rgba(188,19,254,0.3)] hover:-translate-y-2 border border-white/5 hover:border-accent/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/80 to-transparent z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=1000&fit=crop"
                        alt="Secure Device"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen scale-100 group-hover:scale-110 transition-transform duration-1000"
                    />

                    <div className="relative z-20 w-full max-w-md">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/50 mb-6 backdrop-blur-md">
                            <Shield className="w-4 h-4 text-accent" />
                            <span className="text-xs font-bold text-accent uppercase tracking-widest glow-text-purple">Impenetrable</span>
                        </div>
                        <h3 className="font-heading font-black text-4xl md:text-5xl text-white mb-4 leading-none tracking-tight">
                            Absolute <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Security.</span>
                        </h3>
                        <p className="text-gray-400 font-light mb-8">Military-grade encryption integrated into beautifully crafted hardware.</p>
                        <Link href="/products" className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest hover:text-accent transition-colors group/link">
                            Secure It <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}
