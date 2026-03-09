import { Truck, Headphones, BadgeDollarSign, Tag } from "lucide-react";

const badges = [
    { icon: Truck, title: "Free Shipping", desc: "Free Shipping on All Order", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Headphones, title: "Support 24/7", desc: "Support 24 hours a day", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: BadgeDollarSign, title: "Money return", desc: "Back guarantee under 5 days", color: "text-green-600", bg: "bg-green-50" },
    { icon: Tag, title: "Order Discount", desc: "On every order over $150", color: "text-purple-500", bg: "bg-purple-50" },
];

export default function TrustBadges() {
    return (
        <section className="relative z-20 px-4 -mt-16 md:-mt-24 mb-16">
            <div className="container mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 flex flex-wrap items-center justify-between gap-8 border border-gray-100/50">
                    {badges.map((b, i) => (
                        <div key={i} className="flex-1 min-w-[200px] flex items-center justify-center lg:justify-start gap-4 group">
                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:-rotate-3 ${b.bg} ${b.color}`}>
                                <b.icon className="w-7 h-7 md:w-8 md:h-8" />
                            </div>
                            <div>
                                <h5 className="font-heading font-bold text-base md:text-lg text-gray-900">{b.title}</h5>
                                <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">{b.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
