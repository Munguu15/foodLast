"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "../../_components/header";
import { Footer } from "../../_components/footer";
import { useCart } from "../../_components/cart-context";
import { FoodType } from "../../_components/foodCard";
import { apiFetch } from "@/lib/api";

type FoodDetail = FoodType & {
  category?: { categoryName?: string };
};

export default function FoodDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { addItem } = useCart();
  const [food, setFood] = useState<FoodDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const res = await apiFetch(`/food/item/${id}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.message || "Food not found");
          return;
        }
        setFood(data);
      } catch {
        setError("Could not load food. Is the backend running?");
      }
    };
    load();
  }, [id]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#404040] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 pb-10 pt-24 sm:px-6">
        <Link href="/#menu" className="mb-6 text-sm text-zinc-300 hover:text-white">
          ← Back to menu
        </Link>
        {error ? (
          <p className="text-sm text-red-400">{error}</p>
        ) : !food ? (
          <p className="text-sm text-zinc-400">Loading...</p>
        ) : (
          <div className="overflow-hidden rounded-3xl bg-white text-zinc-900 shadow-sm">
            <img
              src={food.image || "/images/foodList3.png"}
              alt={food.foodName}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="flex flex-col gap-4 p-6">
              {food.category?.categoryName && (
                <p className="text-xs font-medium text-red-500">
                  {food.category.categoryName}
                </p>
              )}
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl font-bold">{food.foodName}</h1>
                <span className="text-xl font-semibold">${food.price}</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600">
                {food.ingredients || "No ingredients listed."}
              </p>
              <button
                type="button"
                onClick={() => addItem(food)}
                className="mt-2 h-11 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600"
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
