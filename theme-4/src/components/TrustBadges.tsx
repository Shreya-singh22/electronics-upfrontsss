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
        <section className="py-12 border-y border-border bg-card">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center justify-around gap-8">
                    {badges.map((b, i) => (
                        <div key={i} className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110">
                                <b.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h5 className="font-heading font-bold text-sm text-foreground">{b.title}</h5>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-black">{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
