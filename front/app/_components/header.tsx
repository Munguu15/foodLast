"use client";

import { MapPin, Minus, Plus, ShoppingCart, Trash2, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCart } from "./cart-context";

const API = "http://localhost:8000";

export const Header = () => {
  const { items, totalCount, totalPrice, changeQty, removeItem, clear } =
    useCart();
  const [open, setOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const checkout = async () => {
    if (items.length === 0) return;
    const stored =
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem("nomnom-user");
    const user = stored ? JSON.parse(stored) : null;
    await fetch(`${API}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user?._id,
        totalPrice,
        foodOrderItems: items.map((item) => ({
          food: item._id,
          quantity: item.quantity,
        })),
        status: "PENDING",
      }),
    });
    clear();
    setCheckoutMessage("Order placed.");
  };

  return (
    <header className="w-full bg-[#18181B] text-white py-3 px-6 md:px-12 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className=" p-4 rounded-full flex items-center justify-center ">
            <img
              src="/images/NomnomLogo.png"
              width={52}
              height={42}
              alt="Nomnom"
              className="w-8 h-8 object-contain absolute "
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[11px]  tracking-tight">NomNom</span>
            <span className="text-[8px] font-medium text-zinc-400 mt-0.5">
              Swift delivery
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 bg-white text-red-500 hover:bg-gray-100 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition"
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Delivery address</span>
          </button>

          <Dialog
            open={open}
            onOpenChange={(next) => {
              setOpen(next);
              if (!next) setCheckoutMessage("");
            }}
          >
            <DialogTrigger
              aria-label="Shopping Cart"
              className="relative bg-white text-zinc-800 hover:bg-gray-100 p-2 rounded-full shadow-sm transition flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalCount}
                </span>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md text-zinc-900">
              <h2 className="font-semibold text-lg">Your cart</h2>
              {items.length === 0 ? (
                <p className="text-sm text-gray-500">
                  {checkoutMessage || "Cart is empty."}
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 border-b pb-3"
                    >
                      <img
                        src={item.image || "/images/foodList3.png"}
                        alt={item.foodName}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.foodName}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="p-1 rounded-full border"
                          onClick={() => changeQty(item._id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="p-1 rounded-full border"
                          onClick={() => changeQty(item._id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          className="p-1 text-red-500"
                          onClick={() => removeItem(item._id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                  <button
                    type="button"
                    className="h-10 rounded-lg bg-red-500 text-white text-sm font-medium"
                    onClick={checkout}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Link
            href="/login"
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
