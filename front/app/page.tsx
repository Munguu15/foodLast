"use client";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { FoodList } from "./_components/foodList";
import { Footer } from "./_components/footer";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
export type CategoryType = {
  _id: string;
  categoryName: string;
  foodCount: number;
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    const response = await apiFetch("/categories");
    const data = await response.json();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#404040] text-white pt-16">
      <Header />
      <div className="w-full flex-1">
        <Hero />
        <main
          id="menu"
          className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6"
        >
          {categories.map((category) => (
            <FoodList key={category._id} category={category} />
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
}
