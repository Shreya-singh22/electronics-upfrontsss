import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useStoreContext } from "@/contexts/store-context";

export default function HeroSection() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const title = customization?.heroSection?.title || "BEYOND REALITY";
  const subtitle = customization?.heroSection?.subtitle || "Immerse yourself in next-generation technology. Crafted for those who demand ultimate performance and unparalleled aesthetics.";
  const ctaText = customization?.heroSection?.ctaText || "Enter Store";
  const image = customization?.heroSection?.image || "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&fit=crop&bg=transparent";

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030305] pt-24 pb-16 cursor-pointer"
      onClick={handleSectionClick}
    >
      {/* Deep Space Background / Glowing Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] mix-blend-screen opacity-50 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] mix-blend-screen opacity-40 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-[pulse_6s_ease-in-out_infinite]" />

        {/* Dynamic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_60%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-10 lg:mt-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-panel border border-primary/40 mb-8 shadow-[0_0_20px_rgba(0,243,255,0.2)] animate-fade-in">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="text-xs md:text-sm font-bold text-white uppercase tracking-[0.2em] glow-text">
            {customization?.heroSection?.badge || "The Future Is Here"}
          </span>
        </div>

        {/* Massive Typography */}
        <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-[100px] text-white leading-[0.9] mb-6 tracking-tighter mix-blend-plus-lighter animate-slide-in-right">
          <span className="block drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] uppercase">
            {title.split(' ')[0]}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent drop-shadow-[0_0_30px_rgba(0,243,255,0.5)] uppercase">
            {title.split(' ').slice(1).join(' ') || "REALITY."}
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl font-light tracking-wide animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-20 md:mb-32 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center h-16 px-10 bg-primary/10 text-white font-bold text-lg rounded-full overflow-hidden neon-border backdrop-blur-md hover:bg-primary/20 hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-3 group-hover:glow-text">
              {ctaText}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </Link>
          <Link
            href="/about"
            className="group inline-flex items-center justify-center h-16 px-10 text-gray-300 font-bold text-lg rounded-full hover:text-white transition-colors hover:bg-white/5"
          >
            {customization?.heroSection?.secondaryCtaText || "View Specs"}
          </Link>
        </div>

        {/* Floating Huge Centerpiece Image */}
        <div className="relative w-full max-w-5xl mx-auto z-20 mt-10 animate-[bounce_8s_ease-in-out_infinite]">
          {/* A cool glowing platform placeholder underneath */}
          <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[40px] bg-primary/30 blur-[40px] rounded-[100%] pointer-events-none"></div>

          <img
            src={image}
            alt="Hero Visual"
            className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-h-[500px]"
          />

          {/* Floating UI Elements (Tech Specs) */}
          {customization?.heroSection?.features?.map((feature: any, i: number) => (
            <div key={i} className={`hidden md:flex absolute ${i === 0 ? 'top-[20%] left-[-5%]' : 'bottom-[30%] right-[-5%]'} px-5 py-3 glass-panel rounded-xl items-center gap-3 border border-primary/20 shadow-[0_0_25px_rgba(0,243,255,0.15)] animate-[bounce_6s_ease-in-out_infinite_${i}s]`}>
              {i === 1 && (
                <div className="w-12 h-12 rounded-full border border-accent/50 flex items-center justify-center bg-black/50 text-accent font-mono text-sm">
                  <span className="animate-pulse">{feature.value || "100%"}</span>
                </div>
              )}
              <div className={i === 0 ? "text-right" : "text-left"}>
                <div className="text-white font-black text-lg">{feature.title}</div>
                <div className="text-primary text-xs uppercase tracking-widest">{feature.desc}</div>
              </div>
              {i === 0 && (
                <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center bg-black/50 text-primary">
                  <div className="w-6 h-6 bg-primary rounded-full animate-ping opacity-50"></div>
                </div>
              )}
            </div>
          )) || (
              <>
                <div className="hidden md:flex absolute top-[20%] left-[-5%] px-5 py-3 glass-panel rounded-xl items-center gap-3 border border-primary/20 shadow-[0_0_25px_rgba(0,243,255,0.15)] animate-[bounce_6s_ease-in-out_infinite_1s]">
                  <div className="text-right">
                    <div className="text-white font-black text-lg">Spatial Audio</div>
                    <div className="text-primary text-xs uppercase tracking-widest">360° Sound</div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center bg-black/50 text-primary">
                    <div className="w-6 h-6 bg-primary rounded-full animate-ping opacity-50"></div>
                  </div>
                </div>

                <div className="hidden md:flex absolute bottom-[30%] right-[-5%] px-5 py-3 glass-panel rounded-xl items-center gap-3 border border-accent/20 shadow-[0_0_25px_rgba(188,19,254,0.15)] animate-[bounce_7s_ease-in-out_infinite_2s]">
                  <div className="w-12 h-12 rounded-full border border-accent/50 flex items-center justify-center bg-black/50 text-accent font-mono text-sm">
                    <span className="animate-pulse">100%</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-black text-lg">Quantum Battery</div>
                    <div className="text-accent text-xs uppercase tracking-widest">Never Stops</div>
                  </div>
                </div>
              </>
            )}
        </div>

      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
