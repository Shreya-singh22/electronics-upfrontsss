import { Star, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
  overallRating: number;
  reviewCount: number;
}

const CustomerReviews = ({ reviews, overallRating, reviewCount }: CustomerReviewsProps) => {
  const { toast } = useToast();
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [localReviews, setLocalReviews] = useState<Review[]>(reviews);

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = localReviews.filter((r) => Math.floor(r.rating) === star).length;
    return { star, count, percentage: localReviews.length > 0 ? (count / localReviews.length) * 100 : 0 };
  });

  const renderStars = (r: number, size = "h-4 w-4") =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`${size} ${i < Math.floor(r) ? "fill-amber-400 text-amber-400" : "text-border"}`} />
    ));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const review: Review = {
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };
    setLocalReviews((prev) => [review, ...prev]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setShowWriteReview(false);
    toast({ title: "Review submitted!", description: "Thank you for your feedback." });
  };

  return (
    <section className="py-16">
      <div className="voltix-container">
        <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Customer Reviews
        </h2>

        <div className="mx-auto max-w-4xl">
          {/* Overview */}
          <div className="mb-10 grid gap-8 rounded-xl border border-border bg-card p-6 sm:grid-cols-2 sm:p-8">
            {/* Left: overall score */}
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <span className="font-display text-5xl font-bold text-foreground">{overallRating}</span>
              <div className="flex gap-1">{renderStars(overallRating, "h-5 w-5")}</div>
              <span className="text-sm text-muted-foreground">Based on {reviewCount} reviews</span>
            </div>

            {/* Right: rating bars */}
            <div className="flex flex-col justify-center gap-2">
              {distribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-3 text-right text-sm font-medium text-foreground">{star}</span>
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <div className="flex-1 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="w-6 text-right text-xs text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Write Review Button */}
          <div className="mb-8 flex justify-center">
            <button
              onClick={() => setShowWriteReview(!showWriteReview)}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-display text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Send className="h-4 w-4" /> Write a Review
            </button>
          </div>

          {/* Write Review Form */}
          {showWriteReview && (
            <form onSubmit={handleSubmitReview} className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-6">
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">Write Your Review</h3>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Your Name</label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="h-10 w-full rounded-lg border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Rating</label>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewReview((p) => ({ ...p, rating: i + 1 }))}
                        className="transition-transform hover:scale-110"
                      >
                        <Star className={`h-7 w-7 ${i < newReview.rating ? "fill-amber-400 text-amber-400" : "text-border"}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Your Review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview((p) => ({ ...p, comment: e.target.value }))}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 font-display text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90">
                    Submit Review
                  </button>
                  <button type="button" onClick={() => setShowWriteReview(false)} className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Review Cards */}
          <div className="flex flex-col gap-4">
            {localReviews.map((review, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-card">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold text-foreground">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-display text-sm font-semibold text-foreground">{review.name}</span>
                      <div className="flex items-center gap-1 mt-0.5">{renderStars(review.rating, "h-3 w-3")}</div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{`"${review.comment}"`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
