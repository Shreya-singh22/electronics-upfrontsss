import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStoreContext } from "@/contexts/store-context";

export default function HeroSection() {
  const { customization } = useStoreContext();
  const [activeSlide, setActiveSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  const defaultSlides = [
    {
      subtitle: "Premium Audio Experience",
      title1: "Pure Sound,",
      title2: "Pure Joy",
      desc: "Experience zero-latency wireless audio with industry-leading noise cancellation. Now with 40% off for early birds.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=800&fit=crop",
      link: "/product/1",
      tag: "Trending"
    },
    {
      subtitle: "Productivity Redefined",
      title1: "Smart Work,",
      title2: "Ultra Fast",
      desc: "The new UltraBook Pro arrives with M3 Max equivalent power and a stunning 4K OLED display. Elevate your workflow.",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=800&fit=crop",
      link: "/product/2",
      tag: "New Arrival"
    }
  ];

  const slides = customization?.heroSection?.slides || defaultSlides;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(timer);
    };
  }, [slides.length]);

  const slide = slides[activeSlide] || slides[0];

  const handleSectionClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.parent !== window) {
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  return (
    <section
      className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden bg-card border-b border-border"
      onClick={handleSectionClick}
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent lg:via-background/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 md:mb-6 animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{slide.tag}</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-[1.1] mb-6">
            <span className="block">{slide.title1}</span>
            <span className="brand-gradient-text block">{slide.title2}</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-xl mb-8 md:text-10 max-w-xl leading-relaxed">
            {slide.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link
              to={slide.link}
              className="inline-flex items-center gap-3 h-12 md:h-14 px-8 md:px-10 rounded-2xl brand-gradient text-primary-foreground font-bold text-base md:text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Sale Badge & Timer */}
            <div className="flex items-center gap-3 md:gap-4 p-2 pl-3 md:pl-4 pr-5 md:pr-6 rounded-2xl bg-secondary/80 backdrop-blur-md border border-border shadow-xl scale-90 md:scale-100 origin-left">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-destructive flex items-center justify-center text-white font-black text-[10px] md:text-xs rotate-[-15deg] shadow-lg">
                  50%<br />OFF
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Ends in:</span>
                <div className="flex items-center gap-1.5 md:gap-2 font-mono font-bold text-foreground">
                  <span className="p-0.5 md:p-1 rounded bg-card min-w-[20px] md:min-w-[24px] text-center text-sm md:text-base">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-primary">:</span>
                  <span className="p-0.5 md:p-1 rounded bg-card min-w-[20px] md:min-w-[24px] text-center text-sm md:text-base">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="text-primary">:</span>
                  <span className="p-0.5 md:p-1 rounded bg-card min-w-[20px] md:min-w-[24px] text-center text-sm md:text-base">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`h-2 transition-all duration-500 rounded-full ${i === activeSlide ? "w-8 md:w-12 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
