import { Cpu, Battery, Monitor, Wind, VolumeX, Hand, Bluetooth, Camera, PenTool, Sparkles, Heart, MapPin, Droplets, Headphones, Lightbulb, Volume2, Smartphone, Zap, Shield, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  cpu: Cpu, battery: Battery, "battery-full": Battery, monitor: Monitor, wind: Wind,
  "volume-x": VolumeX, hand: Hand, bluetooth: Bluetooth, camera: Camera, "pen-tool": PenTool,
  sparkles: Sparkles, "heart-pulse": Heart, heart: Heart, "map-pin": MapPin, droplets: Droplets,
  headphones: Headphones, "surround-sound": Headphones, lightbulb: Lightbulb, "volume-2": Volume2,
  smartphone: Smartphone, zap: Zap, shield: Shield,
};

interface KeyFeaturesProps {
  features: { title: string; description: string; icon: string }[];
}

const KeyFeatures = ({ features }: KeyFeaturesProps) => {
  return (
    <section className="py-16">
      <div className="voltix-container">
        <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Key Features
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat) => {
            const Icon = iconMap[feat.icon] || Sparkles;
            return (
              <div key={feat.title} className="group flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center transition-all duration-200 hover:border-accent hover:shadow-card-hover">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
