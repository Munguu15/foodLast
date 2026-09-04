"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AdminFoodList } from "./adminFoodList";

export type CategoryType = {
  categoryName: string;
  _id: string;
  foodCount: number;
};

const API = "http://localhost:8000";

export const FoodMenu = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [totalFoods, setTotalFoods] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [selectedId, setSelectedId] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const getCategory = async () => {
    const res = await fetch(`${API}/categories`);
    const data = await res.json();
    setCategories(data.categories || []);
    setTotalFoods(data.allFoodCount || 0);
  };

  const createCategory = async () => {
    if (!categoryName.trim()) return;
    await fetch(`${API}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryName: categoryName.trim() }),
    });
    setCategoryName("");
    setDialogOpen(false);
    getCategory();
  };

  useEffect(() => {
    getCategory();
  }, []);

  const visibleCategories =
    selectedId === "all"
      ? categories
      : categories.filter((category) => category._id === selectedId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 bg-white rounded-2xl p-6 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dishes category
        </h1>

        <div className="flex flex-wrap gap-2 items-center">
          <button
            type="button"
            onClick={() => setSelectedId("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedId === "all"
                ? "border border-red-400"
                : "border border-gray-200"
            }`}
          >
            All dishes{" "}
            <span className="text-white bg-black rounded-full px-2.5 py-1 font-semibold text-sm ml-1">
              {totalFoods}
            </span>
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category._id}
              onClick={() => setSelectedId(category._id)}
              className={`border text-[14px] text-black rounded-full flex items-center gap-2 font-medium px-4 py-2 ${
                selectedId === category._id
                  ? "border-red-400"
                  : "border-gray-200"
              }`}
            >
              {category.categoryName}
              <div className="text-white bg-black rounded-full px-2.5 py-1 font-semibold text-sm">
                {category.foodCount || 0}
              </div>
            </button>
          ))}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
              <div className="flex items-center justify-center h-8 w-8 bg-red-500 text-white text-2xl rounded-full">
                +
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-lg">Add category</h2>
                <input
                  className="h-10 w-full rounded-lg border border-neutral-200 px-3 text-sm"
                  placeholder="Category name"
                  onChange={(e) => setCategoryName(e.target.value)}
                  value={categoryName}
                />
                <button
                  type="button"
                  className="h-10 rounded-lg bg-black text-white text-sm"
                  onClick={() => createCategory()}
                >
                  Add category
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {visibleCategories.map((category) => (
        <AdminFoodList
          key={category._id}
          food={category}
          getFood={() => getCategory()}
        />
      ))}
    </div>
  );
};
