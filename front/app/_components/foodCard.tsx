"use client";

import { Plus } from "lucide-react";
import { useCart } from "./cart-context";

export type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const FoodCard = ({ food }: { food: FoodType }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col w-full shadow-sm">
      <div className="relative w-full h-36 bg-gray-100">
        <img
          src={food.image || "/images/foodList3.png"}
          alt={food.foodName}
          className="w-full h-full object-cover"
        />
        <button
          type="button"
          aria-label="Add item"
          onClick={() => addItem(food)}
          className="absolute bottom-2 right-2 bg-gray-50 text-red-500 rounded-full p-2 shadow-md transition-all flex items-center justify-center hover:bg-white"
        >
          <Plus className="w-4 h-4 text-red-500" />
        </button>
      </div>
      <div className="p-3 flex flex-col justify-between bg-white">
        <div className="flex justify-between items-center mb-1 gap-2">
          <h3 className="font-bold text-red-500 text-xs truncate">
            {food.foodName}
          </h3>
          <span className="font-bold text-gray-900 text-xs">${food.price}</span>
        </div>
        <p className="text-[10px] text-gray-900 line-clamp-2">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};
