import { Zap, Truck, Shield, Headphones, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import { useStoreContext } from "@/contexts/store-context";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Zap, title: "Fast Delivery", desc: "2-5 business days" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help center" },
];

export default function Footer() {
  const { customization } = useStoreContext();

  const brandName = customization?.brand?.name || "ELECTROPULSE";
  const brandTagline = customization?.brand?.tagline || "Technology";
  const brandLogo = customization?.brand?.logo || "/logo.png";
  const copyrightText = customization?.brand?.copyright || `© ${new Date().getFullYear()} ${brandName} Electronics. All rights reserved.`;

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  return (
    <footer className="bg-card border-t border-border" onClick={handleSectionClick}>
      {/* Features Bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/20 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <f.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-heading font-bold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-card border border-border">
              <img src={brandLogo} alt={`${brandName} Logo`} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl text-foreground tracking-tighter uppercase">{brandName}</span>
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] leading-none">{brandTagline}</span>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Your destination for the most advanced gadgets and electronics. We set the pulse of modern technology.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholder */}
            {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
              <div key={social} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <span className="sr-only">{social}</span>
                <div className="w-4 h-4 border-2 border-current rounded-sm opacity-50" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-bold text-foreground mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {["About Us", "Contact Us", "Affiliates", "Privacy Policy", "Terms of Service"].map((item) => (
              <li key={item}>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-foreground mb-6">Support</h4>
          <ul className="space-y-4">
            {["Order Tracking", "Return Policy", "Delivery Info", "FAQs", "Support Center"].map((item) => (
              <li key={item}>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-foreground mb-6">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 h-10 px-4 rounded-lg bg-secondary text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-bold">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground italic tracking-widest uppercase text-[10px] font-black">Experience Tech. Feel the Pulse.</p>
          <p className="text-sm text-muted-foreground font-medium">{copyrightText}</p>
          <div className="flex items-center gap-4 grayscale opacity-50">
            {/* Payment Icons Placeholder */}
            {["Visa", "Mastercard", "UPI", "PayPal"].map((p) => (
              <span key={p} className="text-[10px] font-bold tracking-tighter uppercase">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
