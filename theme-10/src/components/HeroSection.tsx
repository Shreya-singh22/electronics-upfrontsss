import heroMacbook from "@/assets/hero-macbook.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useStoreContext } from '@/contexts/store-context';
import Link from "next/link";

const HeroSection = () => {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const headline = customization?.heroSection?.title || "MacBook Air M3";
  const subheadline = customization?.heroSection?.subtitle || "Supercharged for work & creativity. Impossibly thin. Incredibly powerful.";
  const tagText = customization?.heroSection?.tagLine || "Just Launched";

  return (
    <section className="relative overflow-hidden bg-[#fafafa]" onClick={handleSectionClick}>
      <div className="voltix-container relative z-10 flex min-h-[500px] flex-col items-center justify-center py-16 text-center lg:min-h-[600px]">
        <span className="mb-6 inline-block rounded-full border border-black/5 bg-white/50 px-4 py-1 font-body text-[10px] font-bold tracking-[0.2em] text-[#6e6e73] uppercase animate-fade-in">
          {tagText}
        </span>
        <h1 className="mb-4 max-w-4xl font-display text-5xl font-bold tracking-[-0.03em] text-foreground sm:text-6xl lg:text-7xl text-balance animate-fade-in-up">
          {headline}
        </h1>
        <p className="mb-10 max-w-xl font-body text-xl text-[#6e6e73] leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          {subheadline}
        </p>
        <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Link href="/products">
            <Button size="lg" className="h-12 rounded-full px-8 bg-black text-white hover:bg-black/90 font-display font-medium transition-all hover:scale-105 active:scale-95">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#featured">
            <Button size="lg" variant="outline" className="h-12 rounded-full px-8 font-display font-medium border-black/10 text-foreground hover:bg-white transition-all hover:border-black/20 group">
              See Featured <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </a>
        </div>
        <div className="mt-16 relative w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <img
            src={typeof heroMacbook === 'string' ? heroMacbook : (heroMacbook as { src: string }).src}
            alt="MacBook Air M3"
            className="w-full object-contain"
            style={{
              filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.1)) drop-shadow(0 10px 10px rgba(0,0,0,0.05))"
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
