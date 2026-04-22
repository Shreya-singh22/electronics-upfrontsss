import { Zap, Truck, Shield, Headphones } from "lucide-react";
import Link from "next/link";
import { useStoreContext } from "@/contexts/store-context";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders above $150" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Zap, title: "Fast Delivery", desc: "2-5 business days" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help center" },
];

export default function Footer() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  const brandName = customization?.brand?.name || "SoundWave";
  const brandDescription = customization?.brand?.description || "Your destination for the most advanced gadgets and electronics. We set the parallel of modern sound.";
  const brandLogo = customization?.brand?.logo || "/logo.png";

  return (
    <footer onClick={handleSectionClick} className="bg-black text-white pt-16 border-t border-white/5 relative overflow-hidden cursor-pointer">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16 border-b border-white/5">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-5 bg-secondary/30 backdrop-blur-md rounded-3xl p-7 border border-white/5 hover:border-primary/50 transition-all duration-300 group cursor-default">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-inner">
                <f.icon className="w-7 h-7 text-white/80 group-hover:text-black transition-colors" />
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-white group-hover:text-primary transition-colors">{f.title}</p>
                <p className="text-sm text-white/40 mt-1 font-medium">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6 lg:pr-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                <img src={brandLogo} alt={`${brandName} Logo`} className="w-full h-full object-contain invert" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl tracking-tighter text-primary uppercase whitespace-nowrap">{brandName}</span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.4em] leading-none">{customization?.brand?.tagline || "Parallel sound"}</span>
              </div>
            </Link>
            <p className="text-white/50 text-base leading-relaxed font-medium">
              {brandDescription}
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Contact Us", "Affiliates", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-6">Support</h4>
            <ul className="space-y-3">
              {["Order Tracking", "Return Policy", "Delivery Info", "FAQs", "Support Center"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-primary transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-lg text-white mb-6 uppercase tracking-widest">Newsletter</h4>
            <p className="text-base text-white/40 mb-6 leading-relaxed font-medium">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full h-14 px-5 rounded-2xl bg-white/5 text-white placeholder:text-white/20 border border-white/10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm font-medium"
              />
              <button className="w-full h-14 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-black text-sm font-bold transition-all shadow-[0_10px_20px_rgba(212,255,0,0.1)] hover:shadow-[0_10px_20px_rgba(212,255,0,0.2)] active:scale-[0.98]">
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-black">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/30 font-semibold tracking-wide uppercase">© 2026 {brandName}. All rights reserved.</p>
          <div className="flex items-center gap-8">
            {["Visa", "Mastercard", "Paypal"].map((p) => (
              <span key={p} className="text-[10px] text-white/20 font-black tracking-[0.2em] uppercase hover:text-white/40 transition-colors cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
