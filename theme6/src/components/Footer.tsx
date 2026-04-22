import { Zap, Shield, Headphones, MonitorDot, Radio, MapPin, Terminal } from "lucide-react";
import Link from "next/link";
import { useStoreContext } from "@/contexts/store-context";

export default function Footer() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'footer' }, '*');
    }
  };

  const brandName = customization?.brand?.name || "CORE";
  const brandSuffix = "SYS";
  const description = customization?.footer?.description || "Establishing direct neural link to the most advanced hardware supply line. Connectivity optimal.";

  return (
    <footer
      className="bg-[#020203] border-t-2 border-primary/30 relative overflow-hidden font-mono cursor-pointer"
      onClick={handleSectionClick}
    >
      {/* Power line decorative */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_rgba(0,243,255,0.8)]"></div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand & System Status */}
          <div className="space-y-6 relative border-r border-white/5 pr-8">
            <Link href="/" className="flex items-center gap-3 relative z-10 group">
              <div className="w-12 h-12 flex items-center justify-center border border-primary/50 bg-black/60 shadow-[0_0_15px_rgba(0,243,255,0.2)] group-hover:bg-primary/10 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                <Zap className="w-6 h-6 text-primary relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-2xl text-white tracking-widest leading-none group-hover:glow-text transition-all uppercase">{brandName}<span className="text-primary">{brandSuffix}</span></span>
                <span className="text-[9px] text-primary/70 font-bold uppercase tracking-[0.3em] mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary animate-pulse rounded-full"></span> Online
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-bold">
              {description}
            </p>

            {/* Server Status Module */}
            <div className="mt-8 bg-black/40 border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3 text-[10px] uppercase text-gray-500">
                <span>Network Nodes</span>
                <span className="text-primary/80">99.9% Up</span>
              </div>
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex-1 h-8 bg-black border border-white/5 relative overflow-hidden group hover:border-primary/50 cursor-crosshair">
                    <div className={`absolute bottom-0 left-0 w-full bg-primary/20 group-hover:bg-primary/50 transition-all ${i % 2 === 0 ? "h-[60%]" : "h-[80%]"}`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Directory */}
          <div className="lg:pl-8">
            <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2 text-sm border-b border-white/10 pb-4">
              <MonitorDot className="w-4 h-4 text-primary" /> Directory
            </h4>
            <ul className="space-y-3">
              {["Hardware Specs", "Quantum Comm", "Affiliate Nodes", "Security Protocol", "Terms of Operation"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-3 group">
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Protocol */}
          <div className="lg:pl-8">
            <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2 text-sm border-b border-white/10 pb-4">
              <Shield className="w-4 h-4 text-primary" /> Support Systems
            </h4>
            <ul className="space-y-3">
              {["Object Tracking", "Return Sequence", "Logistics Map", "Knowledge Base", "Comm Center"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-xs text-gray-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-3 group">
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comms */}
          <div className="border-l border-white/5 pl-8">
            <h4 className="font-bold text-white mb-6 uppercase tracking-[0.2em] flex items-center gap-2 text-sm border-b border-white/10 pb-4">
              <Radio className="w-4 h-4 text-primary" /> Secure Comms
            </h4>
            <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest">Establish a secure link to receive encrypted deal intel and priority drops.</p>

            <form className="relative flex mb-6">
              <input
                type="email"
                placeholder="INPUT ID_STRING"
                className="flex-1 h-12 px-4 bg-black/60 border border-white/20 text-xs text-white placeholder:text-gray-700 focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all uppercase tracking-widest"
              />
              <button type="button" className="h-12 px-6 bg-primary/10 border-y border-r border-primary text-primary text-xs font-bold hover:bg-primary hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </button>
            </form>

            <div className="flex gap-3">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="w-10 h-10 border border-white/10 bg-black/40 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all cursor-pointer group">
                  <div className="w-3 h-3 bg-white/20 group-hover:bg-primary/50 rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Version */}
      <div className="border-t border-white/5 bg-[#010102] relative z-10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-primary/50 text-[10px] uppercase font-bold tracking-widest">
            <MapPin className="w-3 h-3" /> SEC_SECTOR: 7G
          </div>
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            BUILD_VER 9.2.1 // © 2026 CoreSys Technologies.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[9px] text-gray-700 font-bold tracking-[0.2em] border border-gray-800 px-2 py-1">ALPHA_NODE</span>
            <span className="text-[9px] text-gray-700 font-bold tracking-[0.2em] border border-gray-800 px-2 py-1">SECURE_LINK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
