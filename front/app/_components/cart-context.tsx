"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { FoodType } from "./foodCard";

export type CartItem = FoodType & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addItem: (food: FoodType, quantity?: number) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, quantity: number) => void;
  clear: () => void;
  totalCount: number;
  totalPrice: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addItem = (food: FoodType, quantity = 1) => {
    const amount = Math.max(1, quantity);
    setItems((prev) => {
      const existing = prev.find((item) => item._id === food._id);
      if (existing) {
        return prev.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + amount }
            : item,
        );
      }
      return [...prev, { ...food, quantity: amount }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const changeQty = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  const clear = () => setItems([]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      changeQty,
      clear,
      totalCount,
      totalPrice,
      cartOpen,
      setCartOpen,
    }),
    [items, totalCount, totalPrice, cartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
