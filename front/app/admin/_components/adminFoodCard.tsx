import { EditFood } from "./editFood";
import { CategoryType } from "./foodMenu";

export type FoodType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  _id: string;
  category: CategoryType;
};

export const AdminFoodCard = ({
  food,
  onChanged,
}: {
  food: FoodType;
  onChanged: () => void;
}) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm flex flex-col gap-3 p-4">
      <div className="relative">
        <img
          src={food.image || "/images/foodList3.png"}
          alt={food.foodName}
          className="h-32 w-full object-cover rounded-lg"
        />
        <EditFood food={food} onChanged={onChanged} />
      </div>

      <div>
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-red-500">{food.foodName}</p>
          <p className="shrink-0 text-sm font-semibold">${food.price}</p>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};
