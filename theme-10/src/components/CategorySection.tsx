import { Smartphone, Laptop, Headphones, Watch } from "lucide-react";

const categories = [
  { name: "Phones", icon: Smartphone },
  { name: "Laptops", icon: Laptop },
  { name: "Audio", icon: Headphones },
  { name: "Wearables", icon: Watch },
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="voltix-container">
        <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent hover:shadow-card-hover sm:p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <cat.icon className="h-6 w-6" />
              </div>
              <span className="font-display text-sm font-semibold text-foreground">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
