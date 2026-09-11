"use client";

import { MapPin, ShoppingCart, Trash2, User } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "./cart-context";
import { apiFetch, getStoredUser } from "@/lib/api";

type OrderItem = {
  quantity: number;
  food?: { foodName?: string; image?: string; price?: number };
};

type OrderType = {
  _id: string;
  totalPrice: number;
  status: string;
  createAt?: string;
  foodOrderItems?: OrderItem[];
};

export const Header = () => {
  const {
    items,
    totalCount,
    totalPrice,
    changeQty,
    removeItem,
    clear,
    cartOpen,
    setCartOpen,
  } = useCart();
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [address, setAddress] = useState("");
  const [panelTab, setPanelTab] = useState<"cart" | "order">("cart");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [user, setUser] = useState<{ _id?: string; address?: string } | null>(
    null,
  );

  const shipping = 0;
  const grandTotal = totalPrice + shipping;

  useEffect(() => {
    const stored = getStoredUser();
    setUser(stored);
    if (stored?.address) setAddress(stored.address);
  }, []);

  useEffect(() => {
    if (!cartOpen || panelTab !== "order" || !getStoredUser()) return;
    const load = async () => {
      const res = await apiFetch("/order");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };
    load();
  }, [cartOpen, panelTab]);

  const checkout = async () => {
    if (items.length === 0) return;
    if (!getStoredUser()) {
      setCheckoutMessage("Please log in to checkout.");
      return;
    }

    const res = await apiFetch("/order", {
      method: "POST",
      body: JSON.stringify({
        totalPrice,
        address,
        foodOrderItems: items.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        })),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setCheckoutMessage(data.message || "Checkout failed.");
      return;
    }

    if (address) {
      const updated = await apiFetch("/user", {
        method: "PUT",
        body: JSON.stringify({ address }),
      });
      if (updated.ok) {
        const saved = await updated.json();
        window.localStorage.setItem("nomnom-user", JSON.stringify(saved));
        setUser(saved);
      }
    }

    clear();
    setCheckoutMessage("Order placed.");
    setPanelTab("order");
  };

  return (
    <header className="w-full bg-[#18181B] text-white py-3 px-6 md:px-12 border-b border-zinc-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <img
              src="/images/NomnomLogo.png"
              width={52}
              height={42}
              alt="Nomnom"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[11px] tracking-tight">NomNom</span>
            <span className="text-[8px] font-medium text-zinc-400 mt-0.5">
              Swift delivery
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 bg-white text-red-500 hover:bg-gray-100 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span className="max-w-[140px] truncate">
              {address || "Delivery address"}
            </span>
          </button>

          <Sheet
            open={cartOpen}
            onOpenChange={(next) => {
              setCartOpen(next);
              if (!next) {
                setCheckoutMessage("");
                setPanelTab("cart");
              }
            }}
          >
            <SheetTrigger
              aria-label="Shopping Cart"
              className="relative bg-white text-zinc-800 hover:bg-gray-100 p-2 rounded-full shadow-sm transition flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full gap-3 bg-[#F4F4F5] p-4 text-zinc-900 sm:max-w-[440px]"
            >
              <SheetHeader className="p-0 pr-8">
                <SheetTitle className="flex items-center gap-2 text-[15px] font-semibold">
                  <ShoppingCart className="h-4 w-4" />
                  Order detail
                </SheetTitle>
              </SheetHeader>

              <div className="flex rounded-full bg-white p-1 text-sm font-medium">
                <button
                  type="button"
                  onClick={() => setPanelTab("cart")}
                  className={`h-9 flex-1 rounded-full ${
                    panelTab === "cart"
                      ? "bg-red-500 text-white"
                      : "text-zinc-500"
                  }`}
                >
                  Cart
                </button>
                <button
                  type="button"
                  onClick={() => setPanelTab("order")}
                  className={`h-9 flex-1 rounded-full ${
                    panelTab === "order"
                      ? "bg-red-500 text-white"
                      : "text-zinc-500"
                  }`}
                >
                  Order
                </button>
              </div>

              {panelTab === "cart" ? (
                <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-sm font-semibold">My cart</h3>
                    {items.length === 0 ? (
                      <p className="text-sm text-gray-500">
                        {checkoutMessage || "Cart is empty."}
                      </p>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {items.map((item) => (
                          <div key={item._id} className="flex gap-3">
                            <img
                              src={item.image || "/images/foodList3.png"}
                              alt={item.foodName}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-red-500">
                                    {item.foodName}
                                  </p>
                                  <p className="line-clamp-2 text-[11px] text-zinc-400">
                                    {item.ingredients}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  className="text-red-400"
                                  onClick={() => removeItem(item._id)}
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-3 text-sm">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      changeQty(item._id, item.quantity - 1)
                                    }
                                  >
                                    −
                                  </button>
                                  <span>{item.quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      changeQty(item._id, item.quantity + 1)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="text-sm font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <h3 className="mb-3 text-sm font-semibold">
                      Delivery location
                    </h3>
                    <input
                      className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm outline-none placeholder:text-zinc-400"
                      placeholder="Please enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
                  {orders.length === 0 ? (
                    <div className="rounded-2xl bg-white p-4 text-sm text-gray-500 shadow-sm">
                      No orders yet.
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order._id}
                        className="rounded-2xl bg-white p-4 text-sm shadow-sm"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium">{order.status}</span>
                          <span className="font-semibold">
                            ${order.totalPrice}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                          {(order.foodOrderItems || [])
                            .map(
                              (item) =>
                                `${item.food?.foodName || "Food"} x${item.quantity}`,
                            )
                            .join(", ")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {panelTab === "cart" && (
                <div className="mt-auto rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="mb-3 text-sm font-semibold">Payment info</h3>
                  <div className="space-y-2 text-sm text-zinc-500">
                    <div className="flex justify-between">
                      <span>Items</span>
                      <span className="text-zinc-900">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-zinc-900">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between border-t pt-3 text-zinc-900">
                      <span>Total</span>
                      <span className="font-semibold">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {checkoutMessage && items.length === 0 && (
                    <p className="mt-2 text-xs text-green-600">
                      {checkoutMessage}
                    </p>
                  )}
                  {checkoutMessage && items.length > 0 && (
                    <p className="mt-2 text-xs text-red-500">{checkoutMessage}</p>
                  )}
                  <button
                    type="button"
                    className="mt-4 h-11 w-full rounded-full bg-red-500 text-sm font-medium text-white hover:bg-red-600"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </SheetContent>
          </Sheet>

          <Link
            href={
              user
                ? (user as { role?: string }).role === "ADMIN"
                  ? "/admin"
                  : "/login"
                : "/login"
            }
            aria-label="User Profile"
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-sm transition flex items-center justify-center"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
