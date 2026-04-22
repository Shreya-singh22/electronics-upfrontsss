"use client";

import { useStoreContext } from "@/contexts/store-context";
import { Zap, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const Footer = () => {
  const { customization } = useStoreContext();

  const brandName = customization?.footer?.brandName || "VoltTech";
  const brandDescription = customization?.footer?.brandDescription || "Your trusted destination for premium electronics. Authentic products, unbeatable prices.";
  const contactEmail = customization?.footer?.email || "support@volttech.com";
  const contactPhone = customization?.footer?.phone || "1-800-VOLT-TECH";
  const contactAddress = customization?.footer?.address || "San Francisco, CA";

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  return (
    <footer onClick={handleSectionClick} className="border-t border-border bg-secondary/10 pt-16 pb-8 cursor-pointer">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold text-foreground">{brandName}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {brandDescription}
            </p>
            <div className="flex gap-3">
              {["X", "FB", "IG", "YT"].map((s) => (
                <button key={s} className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary text-muted-foreground text-xs font-bold flex items-center justify-center transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {["New Arrivals", "Best Sellers", "Deals & Offers", "Gift Cards", "Student Discount"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2.5">
              {["Help Center", "Track Order", "Returns & Refunds", "Shipping Info", "Warranty"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Stay Connected</h4>
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {contactEmail}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                {contactPhone}
              </div>
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                {contactAddress}
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button className="btn-glow px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">© 2026 {brandName}. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
