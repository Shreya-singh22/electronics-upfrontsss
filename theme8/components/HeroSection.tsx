"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCustomizationContext } from "@/contexts/store-context";

export default function HeroSection() {
  const { customization } = useCustomizationContext();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  return (
    <section
      className="relative w-full bg-background pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden"
      onClick={handleSectionClick}
    >
      {/* Cursor Glow Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-0 lg:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 255, 0, 0.03), transparent 40%)`
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-8 tracking-tight">
              Immerse yourself <br />
              <span className="text-white">in a </span>
              <span className="brand-gradient-text">symphony</span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Welcome to SoundWave, the parallel of music and sound. Find the best audio gadget for all of your needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Link
                href="/products"
                className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-primary text-black font-bold text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:shadow-[0_0_40px_rgba(212,255,0,0.6)] group relative overflow-hidden"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <button className="flex items-center gap-3 text-white font-semibold hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1 group-hover:border-l-primary" />
                </div>
                Listen video
              </button>
            </div>
          </motion.div>

          {/* Right Column - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative w-full flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              {/* Animated Ripples */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border border-primary/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 2],
                    opacity: [0.5, 0.2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.3,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Floating Headphone Image */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-20 w-full flex justify-center"
              >
                <img
                  src="/soundwave-hero.png"
                  alt="Premium SoundWave Headphones"
                  className="w-4/5 h-auto object-contain drop-shadow-[0_0_50px_rgba(212,255,0,0.2)]"
                />
              </motion.div>

              {/* Sound Wave Decorator */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center gap-1 opacity-20">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{
                      height: [10, 40, 10],
                    }}
                    transition={{
                      duration: 0.5 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
