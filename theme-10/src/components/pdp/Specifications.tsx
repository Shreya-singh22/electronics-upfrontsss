import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SpecificationsProps {
  specs: { label: string; value: string }[];
}

const Specifications = ({ specs }: SpecificationsProps) => {
  const [expanded, setExpanded] = useState(false);
  const visibleSpecs = expanded ? specs : specs.slice(0, 5);

  return (
    <section className="py-16 bg-secondary">
      <div className="voltix-container">
        <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Specifications
        </h2>
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-border bg-card">
          {visibleSpecs.map((spec, i) => (
            <div key={spec.label} className={`flex items-center justify-between px-6 py-4 ${i !== visibleSpecs.length - 1 ? "border-b border-border" : ""}`}>
              <span className="text-sm font-medium text-muted-foreground">{spec.label}</span>
              <span className="font-display text-sm font-semibold text-foreground">{spec.value}</span>
            </div>
          ))}
          {specs.length > 5 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex w-full items-center justify-center gap-2 border-t border-border py-3 text-sm font-medium text-accent transition-colors hover:bg-secondary"
            >
              {expanded ? "Show Less" : `Show All (${specs.length})`}
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Specifications;
