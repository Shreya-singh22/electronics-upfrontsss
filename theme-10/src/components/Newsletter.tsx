import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Subscribed!", description: "You'll receive our latest deals and updates." });
      setEmail("");
    }
  };

  return (
    <section className="bg-primary py-16">
      <div className="voltix-container text-center">
        <h2 className="mb-3 font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
          Stay in the Loop
        </h2>
        <p className="mb-8 font-body text-sm text-primary-foreground/70">
          Get exclusive deals, new arrivals, and tech news delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-11 flex-1 rounded-lg border border-primary-foreground/20 bg-primary-foreground/10 px-4 font-body text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
          <button
            type="submit"
            className="flex h-11 items-center gap-2 rounded-lg bg-accent px-6 font-display text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Subscribe <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
