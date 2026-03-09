import { Zap } from "lucide-react";
import { useStoreContext } from "@/contexts/store-context";

const footerLinks = {
  Shop: ["Phones", "Laptops", "Audio", "Wearables", "Tablets", "Accessories"],
  Support: ["Help Center", "Shipping Info", "Returns & Exchange", "Order Tracking", "Warranty"],
  Company: ["About Voltix", "Careers", "Blog", "Press", "Contact Us"],
};

const Footer = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = () => {
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  const brandName = customization?.brandName || "Voltix";
  const footerDesc = customization?.footer?.description || "Premium electronics at prices that make sense. Your trusted destination for the latest tech.";
  const copyright = customization?.footer?.copyright || `© ${new Date().getFullYear()} ${brandName} Electronics. All rights reserved.`;

  return (
    <footer className="border-t border-border bg-secondary" onClick={handleSectionClick}>
      <div className="voltix-container py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              <span className="font-display text-xl font-bold text-foreground">{brandName}</span>
            </div>
            <p className="mb-6 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
              {footerDesc}
            </p>
            <div className="flex gap-3">
              {["Twitter", "Instagram", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border font-body text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-display text-sm font-bold text-foreground">{title}</h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="voltix-container flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="font-body text-xs text-muted-foreground">{copyright}</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((link) => (
              <a key={link} href="#" className="font-body text-xs text-muted-foreground transition-colors hover:text-foreground">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
