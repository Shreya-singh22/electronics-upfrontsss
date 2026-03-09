import { Star, Terminal } from "lucide-react";

const reviews = [
    {
        name: "Subject A-77",
        role: "Netrunner",
        content: "The neural interlink on these headphones is unmatched. Background noise cancellation operates at 99.9% efficiency. A necessary upgrade.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=aman"
    },
    {
        name: "Operator P-9",
        role: "Systems Architect",
        content: "Hardware delivery was executed with zero latency. Installation was plug-and-play. Optimal performance observed across all sectors.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=priya"
    },
    {
        name: "Unit R-42",
        role: "Combat Protocol",
        content: "Display core output is functioning beyond specified parameters. Contrast ratios are exceptional. Commendable support matrix.",
        rating: 4,
        avatar: "https://i.pravatar.cc/150?u=rahul"
    }
];

export default function ReviewsSection() {
    return (
        <section className="py-24 bg-[#030305] overflow-hidden relative border-t border-accent/10">
            {/* Background elements */}
            <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-[100%] pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-[100%] pointer-events-none"></div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(188,19,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(188,19,254,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 relative">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Terminal className="w-5 h-5 text-accent animate-pulse" />
                        <span className="text-accent font-mono font-bold text-xs tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(188,19,254,0.8)]">
                            USER TELEMETRY DATA
                        </span>
                    </div>
                    <h2 className="font-heading font-black text-5xl md:text-6xl text-white uppercase tracking-tighter m-0 leading-tight">
                        FIELD <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">REPORTS.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {reviews.map((r, i) => (
                        <div key={i} className="group relative bg-[#0a0a0f] border border-accent/20 p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-accent hover:shadow-[0_0_30px_rgba(188,19,254,0.15)] hover:-translate-y-2">

                            {/* Decorative corner markers */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/50 group-hover:border-accent transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent/50 group-hover:border-accent transition-colors"></div>

                            {/* Scanline decoration */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-accent/20 group-hover:bg-accent shadow-[0_0_10px_rgba(188,19,254,0.5)] transition-all duration-500"></div>

                            <div>
                                <div className="flex justify-between items-start mb-6 border-b border-accent/20 pb-4">
                                    <div className="flex gap-1.5">
                                        {[...Array(5)].map((_, idx) => (
                                            <Star key={idx} className={`w-3.5 h-3.5 ${idx < r.rating ? "fill-accent text-accent drop-shadow-[0_0_5px_rgba(188,19,254,0.8)]" : "text-white/10"}`} />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-mono text-accent/50 group-hover:text-accent uppercase tracking-widest">
                                        LOG #{i + 1}489
                                    </span>
                                </div>
                                <p className="text-sm md:text-base text-gray-400 font-mono leading-relaxed mb-8 relative z-10 group-hover:text-gray-300 transition-colors">
                                    &gt; {r.content}
                                    <span className="inline-block w-2 h-4 bg-accent/50 ml-1 animate-pulse"></span>
                                </p>
                            </div>

                            <div className="flex items-center gap-4 relative z-10 bg-black/40 border border-white/5 p-3">
                                <div className="relative">
                                    <div className="absolute inset-0 border border-accent rounded-full animate-[spin_4s_linear_infinite] opacity-50"></div>
                                    <img src={r.avatar} alt={r.name} className="relative w-12 h-12 rounded-full filter grayscale contrast-125 group-hover:grayscale-0 transition-all z-10" />
                                </div>
                                <div>
                                    <h4 className="font-mono font-bold text-white text-sm tracking-widest group-hover:text-accent transition-all uppercase">{r.name}</h4>
                                    <p className="text-[10px] text-accent/80 font-mono tracking-widest uppercase mt-0.5">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
