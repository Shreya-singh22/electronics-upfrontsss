import { Star, Quote } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

const reviews = [
    {
        name: "Aman Sharma",
        role: "Tech Enthusiast",
        content: "The Pure Sound headphones are incredible. The noise cancellation is on par with the best brands out there, but at half the price!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=aman"
    },
    {
        name: "Priya Patel",
        role: "Graphic Designer",
        content: "Found my perfect work companion here. The ordering process was seamless and delivery was surprisingly fast. Highly recommend!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=priya"
    },
    {
        name: "Rahul Mehra",
        role: "Gamer",
        content: "PureJoy has the best collection of gadgets. The 4K TV I bought is a beast. Great customer support too.",
        rating: 4,
        avatar: "https://i.pravatar.cc/150?u=rahul"
    }
];

export default function ReviewsSection() {
    const { customization } = useStoreContext();

    const handleSectionClick = (e: React.MouseEvent) => {
        if (typeof window !== "undefined" && window.parent !== window) {
            e.stopPropagation();
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'reviewsSection' }, '*');
        }
    };

    const sectionTitle = customization?.reviewsSection?.title || "What Our Users Say";
    const sectionSubtitle = customization?.reviewsSection?.subtitle || "\"Because your reality deserves an upgrade.\"";

    return (
        <section className="py-24 bg-[#050505] overflow-hidden relative cursor-pointer" onClick={handleSectionClick}>
            <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-purple-500">
                <Quote className="w-80 h-80 rotate-180" />
            </div>
            {/* Background elements */}
            <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    <h2 className="font-heading font-black text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                        {sectionTitle}
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl italic font-light tracking-wide">
                        {sectionSubtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {reviews.map((r, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-3 relative group backdrop-blur-xl">
                            {/* Decorative top border glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="absolute -top-6 -right-6 text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-500">
                                <Quote className="w-24 h-24" />
                            </div>

                            <div className="flex gap-1.5 mb-8 relative z-10">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${idx < r.rating ? "fill-purple-500 text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "text-white/10"}`} style={{ transitionDelay: `${idx * 50}ms` }} />
                                ))}
                            </div>

                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-light relative z-10">
                                "{r.content}"
                            </p>

                            <div className="flex items-center gap-5 relative z-10">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                                    <img src={r.avatar} alt={r.name} className="relative w-14 h-14 rounded-full border-2 border-purple-500/30 group-hover:border-purple-500 transition-colors z-10" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-white text-lg tracking-wide group-hover:text-purple-300 transition-colors">{r.name}</h4>
                                    <p className="text-xs text-purple-400 uppercase tracking-widest font-black opacity-80 mt-1">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
