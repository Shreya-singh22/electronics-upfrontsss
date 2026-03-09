"use client";

import { useStore, getImageSrc } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, CreditCard, Truck, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
    const { cart, cartTotal } = useStore();
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const formatPrice = (p: number) => "₹" + p.toLocaleString("en-IN");
    const shipping = 0;
    const tax = cartTotal * 0.18;
    const total = cartTotal + shipping + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            toast({
                title: "Order Placed!",
                description: "Your futuristic gear is on its way.",
            });
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex flex-1 items-center justify-center p-6">
                    <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
                        <div className="flex justify-center">
                            <div className="h-24 w-24 rounded-full bg-accent/20 flex items-center justify-center">
                                <CheckCircle2 className="h-12 w-12 text-accent" />
                            </div>
                        </div>
                        <h1 className="font-display text-3xl font-bold text-foreground">Order Confirmed!</h1>
                        <p className="text-muted-foreground">
                            Thank you for choosing Voltix. Your order has been placed successfully and will be delivered shortly.
                        </p>
                        <Button onClick={() => router.push("/")} className="w-full bg-primary text-primary-foreground py-6 text-lg font-display">
                            Continue Shopping
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="flex min-h-screen flex-col bg-background">
                <Header />
                <main className="flex flex-1 items-center justify-center p-6">
                    <div className="text-center space-y-4">
                        <h1 className="font-display text-2xl font-bold">Your cart is empty</h1>
                        <Button onClick={() => router.push("/")} variant="outline">
                            Go back to shopping
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1 py-12">
                <div className="voltix-container">
                    <h1 className="mb-10 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Checkout
                    </h1>

                    <div className="grid gap-12 lg:grid-cols-12">
                        {/* Checkout Form */}
                        <div className="lg:col-span-7 space-y-10">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-foreground font-display text-xl font-semibold">
                                    <Truck className="h-5 w-5 text-accent" />
                                    <h2>Shipping Information</h2>
                                </div>
                                <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="John" required className="bg-secondary/50 border-border" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="Doe" required className="bg-secondary/50 border-border" />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" placeholder="123 Cyberpunk St." required className="bg-secondary/50 border-border" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="Neo-Delhi" required className="bg-secondary/50 border-border" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" placeholder="110001" required className="bg-secondary/50 border-border" />
                                    </div>
                                    <div className="sm:col-span-2 space-y-2">
                                        <Label htmlFor="email">Email address</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" required className="bg-secondary/50 border-border" />
                                    </div>
                                </form>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-foreground font-display text-xl font-semibold">
                                    <CreditCard className="h-5 w-5 text-accent" />
                                    <h2>Payment Method</h2>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-accent bg-accent/5 text-foreground transition-all">
                                        <span className="font-semibold">Credit Card</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border bg-background text-muted-foreground hover:border-accent/50 transition-all">
                                        <span className="font-semibold">UPI</span>
                                    </button>
                                    <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-border bg-background text-muted-foreground hover:border-accent/50 transition-all">
                                        <span className="font-semibold">Net Banking</span>
                                    </button>
                                </div>
                                <div className="space-y-4 p-6 rounded-2xl border border-border bg-secondary/30">
                                    <div className="space-y-2">
                                        <Label htmlFor="card">Card Number</Label>
                                        <Input id="card" placeholder="•••• •••• •••• ••••" required className="bg-background border-border" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="expiry">Expiry Date</Label>
                                            <Input id="expiry" placeholder="MM/YY" required className="bg-background border-border" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input id="cvv" placeholder="•••" required className="bg-background border-border" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ShieldCheck className="h-4 w-4" />
                                <span>Your payment information is encrypted and secure.</span>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24 space-y-6 rounded-3xl border border-border bg-card p-8 shadow-hero">
                                <h2 className="font-display text-xl font-bold text-foreground">Order Summary</h2>

                                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                                                <img src={getImageSrc(item.image)} alt={item.name} className="h-full w-full object-contain p-2" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="truncate text-sm font-semibold">{item.name}</h4>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="font-display text-sm font-bold">{formatPrice(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 pt-6 border-t border-border">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="text-foreground">{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-accent font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">GST (18%)</span>
                                        <span className="text-foreground">{formatPrice(tax)}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 border-t border-border">
                                        <span className="font-display text-lg font-bold">Total</span>
                                        <span className="font-display text-xl font-bold text-accent">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <Button
                                    form="checkout-form"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary text-primary-foreground py-7 text-lg font-display font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                                >
                                    {isSubmitting ? "Processing..." : "Place Order"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
