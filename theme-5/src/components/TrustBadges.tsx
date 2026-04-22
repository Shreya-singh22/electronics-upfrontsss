import { Truck, ShieldCheck, Zap, Headphones, RefreshCcw } from "lucide-react";

const badges = [
    { icon: Truck, title: "Free Shipping", desc: "Above ₹999" },
    { icon: ShieldCheck, title: "Secure Pay", desc: "100% Protected" },
    { icon: Zap, title: "Next Day", desc: "Select Cities" },
    { icon: RefreshCcw, title: "Easy Return", desc: "7 Days Policy" },
    { icon: Headphones, title: "24/7 Support", desc: "Always Online" },
];

export default function TrustBadges() {
    return (
        <section className="py-16 bg-[#050505] border-y border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 blur-[130px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-wrap justify-center md:justify-around gap-8 md:gap-4">
                    {badges.map((b, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 group w-36 text-center">
                            <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group-hover:-translate-y-2 group-hover:border-blue-500/50">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <b.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500 relative z-10 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            </div>
                            <div>
                                <h5 className="font-heading font-extrabold text-sm text-gray-100 mb-1 tracking-wide">{b.title}</h5>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold group-hover:text-blue-400 transition-colors">{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
