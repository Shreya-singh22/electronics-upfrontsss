"use client";

import { Zap, Truck, Shield, Headphones } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Truck, title: "Free Shipping", desc: "On orders above $150" },
  { icon: Shield, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: Zap, title: "Fast Delivery", desc: "2-5 business days" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated help center" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16">
      <div className="container mx-auto px-4">
        {/* Features Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-16 border-b border-white/10">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-4 bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-primary/50 transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <f.icon className="w-6 h-6 text-white group-hover:text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-base text-white">{f.title}</p>
                <p className="text-sm text-white/60 mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6 lg:pr-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-tight text-white">Cedar</span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest leading-none">Electronics</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Your destination for the most advanced gadgets and electronics. We set the pulse of modern technology.
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
            <h4 className="font-heading font-bold text-lg text-white mb-6">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 h-12 px-4 rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
              />
              <button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 font-medium">© 2026 Cedar Electronics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Visa", "Mastercard", "Paypal"].map((p) => (
              <span key={p} className="text-xs text-white/40 font-bold tracking-wider uppercase">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
