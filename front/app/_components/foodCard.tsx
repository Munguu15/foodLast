"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useCart } from "./cart-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const FoodCard = ({ food }: { food: FoodType }) => {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    addItem(food, qty);
    setQty(1);
    setOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col w-full shadow-sm">
      <div className="relative w-full h-36 bg-gray-100">
        <Link href={`/food/${food._id}`} className="block h-full w-full">
          <img
            src={food.image || "/images/foodList3.png"}
            alt={food.foodName}
            className="w-full h-full object-cover"
          />
        </Link>
        <Dialog
          open={open}
          onOpenChange={(next) => {
            setOpen(next);
            if (!next) setQty(1);
          }}
        >
          <DialogTrigger
            aria-label="Add item"
            className="absolute bottom-2 right-2 z-10 bg-gray-50 text-red-500 rounded-full p-2 shadow-md transition-all flex items-center justify-center hover:bg-white"
          >
            <Plus className="w-4 h-4 text-red-500" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-md text-zinc-900">
            <DialogHeader>
              <DialogTitle>{food.foodName}</DialogTitle>
            </DialogHeader>
            <img
              src={food.image || "/images/foodList3.png"}
              alt={food.foodName}
              className="h-40 w-full rounded-xl object-cover"
            />
            <p className="text-sm text-zinc-600">
              {food.ingredients || "No ingredients listed."}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-semibold">${food.price * qty}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full border p-1"
                  onClick={() => setQty((n) => Math.max(1, n - 1))}
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-sm">{qty}</span>
                <button
                  type="button"
                  className="rounded-full border p-1"
                  onClick={() => setQty((n) => n + 1)}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={addToCart}
              className="h-10 w-full rounded-lg bg-red-500 text-sm font-medium text-white hover:bg-red-600"
            >
              Add to cart
            </button>
          </DialogContent>
        </Dialog>
      </div>
      <Link
        href={`/food/${food._id}`}
        className="p-3 flex flex-col justify-between bg-white"
      >
        <div className="flex justify-between items-center mb-1 gap-2">
          <h3 className="font-bold text-red-500 text-xs truncate">
            {food.foodName}
          </h3>
          <span className="font-bold text-gray-900 text-xs">${food.price}</span>
        </div>
        <p className="text-[10px] text-gray-900 line-clamp-2">
          {food.ingredients}
        </p>
      </Link>
    </div>
  );
};
