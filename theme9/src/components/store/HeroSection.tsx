"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroDevices from "@/assets/hero-devices.png";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20 };
  const imgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const imgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden"
    >
      {/* Animated glow orbs */}
      <motion.div
        className="hero-glow animate-glow-pulse top-1/4 left-1/4"
        style={{ x: glowX, y: glowY }}
      />
      <motion.div
        className="hero-glow animate-glow-pulse top-1/2 right-1/4"
        style={{ x: glowX, y: glowY, animationDelay: "2s" } as any}
      />
      <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-primary/5 blur-[100px] animate-glow-pulse" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
            >
              <Sparkles className="h-4 w-4" />
              New Arrivals — Up to 30% Off
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            >
              Next-Gen Tech,{" "}
              <span className="text-gradient">Delivered</span> to You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg"
            >
              Discover the latest electronics from top brands. Premium quality, unbeatable prices, fast shipping.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-glow inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-lg shadow-glow"
              >
                Shop Now
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold text-lg border border-border hover:border-primary/30 hover:bg-muted transition-all"
              >
                Browse Products
              </button>
            </motion.div>
          </div>

          {/* Right - Hero Image with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Layered glows behind product */}
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-primary/8 blur-[100px]"
              style={{ x: glowX, y: glowY }}
            />
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-primary/15 blur-[60px] animate-glow-pulse"
              style={{ x: glowX, y: glowY }}
            />
            <div className="absolute w-40 h-40 rounded-full bg-primary/20 blur-[40px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

            {/* Floating product image */}
            <motion.img
              src={heroDevices.src}
              alt="Premium electronics - laptop and headphones"
              className="relative z-10 w-full max-w-lg drop-shadow-2xl"
              style={{ x: imgX, y: imgY }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 18}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
