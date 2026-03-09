"use client";

import { useState, useEffect, useMemo, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Heart, ShoppingCart, Star, Minus, Plus, Truck, Shield,
    RotateCcw, Check, ChevronRight, Zap
} from "lucide-react";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store-context";
import { toast } from "sonner";
import ProductCard from "@/components/store/ProductCard";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WishlistDrawer from "@/components/store/WishlistDrawer";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;
    const router = useRouter();
    const { addToCart, toggleWishlist, isInWishlist } = useStore();

    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const product = products.find((p) => p.id === Number(id));
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [showStickyBar, setShowStickyBar] = useState(false);

    const images = product?.images || (product ? [product.image] : []);
    const wishlisted = product ? isInWishlist(product.id) : false;

    const relatedProducts = useMemo(
        () => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4),
        [product]
    );

    // Initialize variants
    useEffect(() => {
        if (product?.variants) {
            const initial: Record<string, string> = {};
            product.variants.forEach((v) => {
                initial[v.type] = v.options[0];
            });
            setSelectedVariants(initial);
        }
    }, [product]);

    // Sticky bar on scroll
    useEffect(() => {
        const handleScroll = () => setShowStickyBar(window.scrollY > 500);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
                    <button onClick={() => router.push("/")} className="text-primary hover:underline">
                        Go back home
                    </button>
                </div>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const ratingBreakdown = [
        { stars: 5, percent: 80 },
        { stars: 4, percent: 15 },
        { stars: 3, percent: 5 },
        { stars: 2, percent: 0 },
        { stars: 1, percent: 0 },
    ];

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedVariants);
        toast.success(`${product.name} added to cart`);
    };

    const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setZoomPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar
                onCartOpen={() => setCartOpen(true)}
                onWishlistOpen={() => setWishlistOpen(true)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-24 pb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span>{product.category}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
                </div>
            </div>

            {/* Main Product Section */}
            <div className="container mx-auto px-4 pb-16">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* LEFT: Image Gallery */}
                    <div className="flex gap-4">
                        {/* Vertical Thumbnails */}
                        <div className="flex flex-col gap-3">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${selectedImage === i
                                            ? "border-primary shadow-glow"
                                            : "border-border hover:border-primary/30"
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image with Zoom */}
                        <motion.div
                            className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-secondary cursor-crosshair"
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                            onMouseMove={handleImageZoom}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    style={
                                        isZoomed
                                            ? {
                                                transform: "scale(2)",
                                                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                                transition: "transform-origin 0.1s ease",
                                            }
                                            : {}
                                    }
                                />
                            </AnimatePresence>
                            {product.badge && (
                                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase shadow-glow">
                                    {product.badge}
                                </span>
                            )}
                        </motion.div>
                    </div>

                    {/* RIGHT: Product Details */}
                    <div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            {/* Category */}
                            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">{product.category}</p>

                            {/* Title */}
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-5">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
                                        />
                                    ))}
                                </div>
                                <span className="font-semibold text-foreground">{product.rating}</span>
                                <span className="text-muted-foreground text-sm">({product.reviews.toLocaleString("en-IN")} reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="font-display text-4xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                                        <span className="text-sm font-bold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-lg">
                                            {discount}% OFF
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

                            {/* Key Features */}
                            {product.features && (
                                <div className="mb-6">
                                    <h3 className="font-display font-semibold text-foreground mb-3">Key Features</h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                                                <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Variants */}
                            {product.variants?.map((variant) => (
                                <div key={variant.type} className="mb-5">
                                    <h3 className="font-display text-sm font-semibold text-foreground mb-2.5">
                                        {variant.type}: <span className="text-primary">{selectedVariants[variant.type]}</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {variant.options.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.type]: opt }))}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedVariants[variant.type] === opt
                                                        ? "border-primary bg-primary/10 text-primary shadow-glow"
                                                        : "border-border bg-secondary text-secondary-foreground hover:border-primary/30"
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Stock Status */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-sm font-medium text-green-400">In Stock — Ready to Ship</span>
                            </div>

                            {/* Quantity + Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 hover:bg-secondary transition-colors"
                                    >
                                        <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-5 py-3 font-semibold text-foreground min-w-[50px] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 hover:bg-secondary transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </div>
                                <motion.button
                                    onClick={handleAddToCart}
                                    whileTap={{ scale: 0.97 }}
                                    className="btn-glow flex-1 flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-lg shadow-glow"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Add to Cart
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-foreground text-background font-semibold text-lg hover:opacity-90 transition-opacity"
                                >
                                    <Zap className="h-5 w-5" />
                                    Buy Now
                                </motion.button>
                            </div>

                            {/* Wishlist */}
                            <button
                                onClick={() => {
                                    toggleWishlist(product);
                                    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
                                }}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
                            >
                                <Heart className={`h-4 w-4 ${wishlisted ? "fill-primary text-primary" : ""}`} />
                                {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                            </button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
                                {[
                                    { icon: Truck, label: "Free Delivery" },
                                    { icon: Shield, label: "1 Year Warranty" },
                                    { icon: RotateCcw, label: "7 Day Returns" },
                                ].map((badge) => (
                                    <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
                                        <badge.icon className="h-5 w-5 text-primary" />
                                        <span className="text-xs text-muted-foreground font-medium">{badge.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Info */}
                            <div className="mt-6 p-4 rounded-xl border border-border">
                                <h4 className="font-display font-semibold text-foreground text-sm mb-3">Delivery Information</h4>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free delivery by <span className="text-foreground font-medium">Mar 12–14</span></p>
                                    <p className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Cash on Delivery available</p>
                                    <p className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-primary" /> Easy 7-day return policy</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Reviews Section */}
                {product.customerReviews && product.customerReviews.length > 0 && (
                    <section className="mt-20">
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                            Customer <span className="text-gradient">Reviews</span>
                        </h2>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Rating Summary */}
                            <div className="bg-gradient-card rounded-2xl border border-border p-6">
                                <div className="text-center mb-6">
                                    <div className="font-display text-5xl font-bold text-foreground mb-2">{product.rating}</div>
                                    <div className="flex justify-center gap-1 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{product.reviews.toLocaleString("en-IN")} reviews</p>
                                </div>
                                <div className="space-y-2">
                                    {ratingBreakdown.map((r) => (
                                        <div key={r.stars} className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground w-4">{r.stars}★</span>
                                            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${r.percent}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: 0.1 }}
                                                    className="h-full bg-primary rounded-full"
                                                />
                                            </div>
                                            <span className="text-xs text-muted-foreground w-8">{r.percent}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Individual Reviews */}
                            <div className="lg:col-span-2 space-y-4">
                                {product.customerReviews.map((review, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-gradient-card rounded-xl border border-border p-5"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                                                    <p className="text-xs text-muted-foreground">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {Array.from({ length: 5 }).map((_, j) => (
                                                    <Star key={j} className={`h-3.5 w-3.5 ${j < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">"{review.comment}"</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20">
                        <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                            You May Also <span className="text-gradient">Like</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Sticky Add to Cart Bar */}
            <AnimatePresence>
                {showStickyBar && (
                    <motion.div
                        initial={{ y: 80 }}
                        animate={{ y: 0 }}
                        exit={{ y: 80 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-border"
                    >
                        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                                    <p className="text-sm font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</p>
                                </div>
                            </div>
                            <motion.button
                                onClick={handleAddToCart}
                                whileTap={{ scale: 0.97 }}
                                className="btn-glow shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-glow"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Add to Cart
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Footer />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
        </div>
    );
}
