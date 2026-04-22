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

    const sectionTitle = customization?.reviewsSection?.title || "What Our Clients Say";
    const sectionSubtitle = customization?.reviewsSection?.subtitle || "\"Because your joy is our ultimate gadget.\"";

    const handleSectionClick = (e: React.MouseEvent) => {
        if (typeof window !== "undefined" && window.parent !== window) {
            e.stopPropagation();
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'reviewsSection' }, '*');
        }
    };

    return (
        <section className="py-24 bg-secondary/50 overflow-hidden relative" onClick={handleSectionClick}>
            <div className="absolute top-0 right-0 p-20 opacity-5">
                <Quote className="w-64 h-64 rotate-180" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-heading font-black text-4xl md:text-5xl text-foreground mb-4">{sectionTitle}</h2>
                    <p className="text-muted-foreground text-lg italic">{sectionSubtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((r, i) => (
                        <div key={i} className="p-10 rounded-[40px] bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group">
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? "fill-primary text-primary" : "text-border"}`} />
                                ))}
                            </div>
                            <p className="text-lg text-foreground leading-relaxed mb-8">"{r.content}"</p>
                            <div className="flex items-center gap-4">
                                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full ring-2 ring-primary/20" />
                                <div>
                                    <h4 className="font-heading font-bold text-foreground">{r.name}</h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">{r.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
