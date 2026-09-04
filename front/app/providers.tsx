"use client";

import { CartProvider } from "./_components/cart-context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};
