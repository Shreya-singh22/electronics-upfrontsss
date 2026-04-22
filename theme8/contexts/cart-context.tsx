"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CartItem, Product } from "@/data/products";

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  favoriteCategories: string[];
  toggleFavoriteCategory: (categoryId: string) => void;
  isCategoryFavorite: (categoryId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<StoreContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = window.localStorage.getItem("cart");
        if (saved) {
          const parsed = JSON.parse(saved);
          return Array.isArray(parsed)
            ? parsed.filter((item: any) => item && item.product && typeof item.product.price === 'number')
            : [];
        }
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    return [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist]
  );

  const toggleFavoriteCategory = useCallback((categoryId: string) => {
    setFavoriteCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  const isCategoryFavorite = useCallback(
    (categoryId: string) => favoriteCategories.includes(categoryId),
    [favoriteCategories]
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 0),
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + (item?.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        favoriteCategories,
        toggleFavoriteCategory,
        isCategoryFavorite,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
