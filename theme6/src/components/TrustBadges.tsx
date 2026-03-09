import { Truck, ShieldCheck, Zap, Headphones, RefreshCcw } from "lucide-react";

const badges = [
    { icon: Truck, title: "LOGISTICS", desc: "Global Network / Free" },
    { icon: ShieldCheck, title: "SECURITY", desc: "Encrypted Protocol" },
    { icon: Zap, title: "VELOCITY", desc: "Next Day Sync" },
    { icon: RefreshCcw, title: "RECOVERY", desc: "7-Day Rollback" },
    { icon: Headphones, title: "COMM-LINK", desc: "24/7 Live Feed" },
];

export default function TrustBadges() {
    return (
        <section className="py-12 bg-[#020203] border-y border-white/5 relative overflow-hidden z-20">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-wrap justify-center md:justify-around gap-6">
                    {badges.map((b, i) => (
                        <div key={i} className="flex items-center gap-4 group bg-[#050508] border border-white/5 px-6 py-4 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto relative overflow-hidden flex-1 min-w-[200px] max-w-[280px]">
                            {/* Scanning line animation on hover */}
                            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>

                            <div className="relative w-12 h-12 flex items-center justify-center p-2 border border-white/10 text-primary/70 group-hover:text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all bg-black/50">
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <b.icon className="w-6 h-6 z-10" />
                            </div>

                            <div className="flex flex-col">
                                <h5 className="font-mono font-bold text-[13px] text-white tracking-widest uppercase group-hover:glow-text transition-all leading-tight">
                                    {b.title}
                                </h5>
                                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-0.5 group-hover:text-primary/70 transition-colors">
                                    {b.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
