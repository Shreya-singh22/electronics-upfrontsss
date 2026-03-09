"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | StaticImageData;
  category: string;
  badge?: string;
}

export const getImageSrc = (image: string | StaticImageData) => {
  return typeof image === 'string' ? image : image.src;
};

export interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: string) => boolean;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  moveToCartFromWishlist: (product: Product) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  }, [removeFromCart]);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => prev.find((i) => i.id === product.id) ? prev.filter((i) => i.id !== product.id) : [...prev, product]);
  }, []);

  const isInWishlist = useCallback((id: string) => wishlist.some((i) => i.id === id), [wishlist]);

  const moveToCartFromWishlist = useCallback((product: Product) => {
    addToCart(product);
    setWishlist((prev) => prev.filter((i) => i.id !== product.id));
  }, [addToCart]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, isInWishlist, cartCount, cartTotal, isCartOpen, setIsCartOpen, isWishlistOpen, setIsWishlistOpen, moveToCartFromWishlist }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};
