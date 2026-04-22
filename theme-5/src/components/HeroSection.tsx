"use client";

import { ArrowRight, Activity, Battery } from "lucide-react";
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

  const badgeText = customization?.heroSection?.badge || "Next-Gen Wearables";
  const title1 = customization?.heroSection?.title1 || "Redefine";
  const title2 = customization?.heroSection?.title2 || "Your Reality.";
  const subtitle = customization?.heroSection?.subtitle || "Experience the pinnacle of innovation. Unprecedented performance, limitless possibilities, wrapped beautifully around your wrist.";
  const ctaText = customization?.heroSection?.ctaText || "Explore Collection";
  const heroImage = customization?.heroSection?.image || "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=1000&fit=crop&bg=transparent";

  const feature1Title = customization?.heroSection?.feature1?.title || "Heart Rate";
  const feature1Sub = customization?.heroSection?.feature1?.subtitle || "Real-time stats";
  const feature2Title = customization?.heroSection?.feature2?.title || "Battery Life";
  const feature2Sub = customization?.heroSection?.feature2?.subtitle || "Up up to 7 days";

  return (
    <section
      className="relative min-h-[600px] lg:min-h-[800px] flex items-center overflow-hidden bg-[#050505] border-b border-white/10"
      onClick={handleSectionClick}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated glowing orbs */}
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[150px] mix-blend-screen animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-60" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="lg:col-span-6 px-4 lg:px-8 relative z-20">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 mb-8 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                {badgeText}
              </span>
            </div>

            <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-white leading-[1.1] mb-6 tracking-tight">
              <span className="block drop-shadow-md">{title1}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]">{title2}</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-lg font-light">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link
                href="/products"
                className="group relative inline-flex items-center justify-center h-14 px-8 bg-white hover:bg-gray-100 text-black font-bold text-base transition-all rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </Link>

              <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-[#050505]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-[#050505]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-[#050505]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop" alt="User" />
                </div>
                <span>Over 10k+ <br />Happy Users</span>
              </div>
            </div>
          </div>

          {/* Right Image Container - Floating 3D setup */}
          <div className="lg:col-span-6 relative flex justify-center items-center h-full min-h-[500px]">
            {/* Background glowing rings */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-white/5 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full border border-blue-500/10 animate-[spin_15s_linear_infinite_reverse]"></div>
            </div>

            {/* The Product Image Container with continuous float */}
            <div className="relative w-full max-w-lg mx-auto z-10 animate-[bounce_6s_ease-in-out_infinite]">
              <img
                src={heroImage}
                alt="Hero Product"
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.4)] mix-blend-screen scale-[1.05]"
              />

              {/* Floating feature glass cards */}
              <div className="absolute top-[15%] -left-4 md:-left-12 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-3 animate-[bounce_5s_ease-in-out_infinite_0.5s]">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{feature1Title}</div>
                  <div className="text-blue-400 text-xs">{feature1Sub}</div>
                </div>
              </div>

              <div className="absolute bottom-[25%] -right-4 md:-right-12 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-3 animate-[bounce_7s_ease-in-out_infinite_1s]">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Battery className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{feature2Title}</div>
                  <div className="text-purple-400 text-xs">{feature2Sub}</div>
                </div>
              </div>

            </div>

            {/* Ground shadow for the floating object */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-8 bg-blue-900/40 rounded-full blur-[30px] scale-x-150 animate-[pulse_6s_ease-in-out_infinite]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
