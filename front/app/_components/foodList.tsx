"use client";
import { useEffect, useState } from "react";
import { FoodCard, FoodType } from "./foodCard";
import { CategoryType } from "../page";

export const FoodList = ({ category }: { category: CategoryType }) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getFoods = async () => {
    const response = await fetch(`http://localhost:8000/food/${category._id}`);
    const data = await response.json();

    setFoods(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    getFoods();
  }, []);

  return (
    <section className="">
      <p className="mb-4 text-[13px] font-semibold text-white text-left mt-6">
        {category.categoryName}
      </p>
      <div className="grid grid-cols-3 gap-4 max-sm:  max-sm:gap-3 ">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
};
