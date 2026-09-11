"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FoodType } from "./adminFoodCard";
import { useEffect, useState } from "react";
import { CategoryType } from "./foodMenu";
import { Pencil, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const EditFood = ({
  food,
  onChanged,
}: {
  food: FoodType;
  onChanged: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(food.foodName);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [price, setPrice] = useState(food.price);
  const [editCategory, setEditCategory] = useState(
    food.category?._id || "",
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [imgUrl, setImgUrl] = useState(food.image);
  const [uploading, setUploading] = useState(false);

  const getCategory = async () => {
    const res = await apiFetch(`/categories`);
    const data = await res.json();
    setCategories(data.categories || []);
  };

  const editFood = async () => {
    await apiFetch(`/food`, {
      method: "PUT",
      body: JSON.stringify({
        id: food._id,
        foodName: editingFood,
        ingredients,
        price,
        category: editCategory,
        image: imgUrl,
      }),
    });
    setOpen(false);
    onChanged();
  };

  const deleteFood = async () => {
    await apiFetch(`/food`, {
      method: "DELETE",
      body: JSON.stringify({ id: food._id }),
    });
    setOpen(false);
    onChanged();
  };

  const handleImgUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setImgUrl(url);
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-9 h-9 bg-white rounded-full absolute z-10 bottom-2 right-2 flex items-center justify-center shadow">
        <Pencil className="w-4 h-4 text-red-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div className="flex flex-col w-full max-h-[600px] overflow-y-auto bg-white rounded-lg gap-3">
          <div className="font-bold text-2xl">Dishes info</div>
          <div className="flex gap-4 py-3 items-center">
            <div className="w-28 text-xs text-gray-400 shrink-0">Dish name</div>
            <input
              className="h-10 w-full rounded-lg border px-3 text-sm"
              value={editingFood}
              onChange={(event) => setEditingFood(event.target.value)}
            />
          </div>
          <div className="flex gap-4 py-3 items-center">
            <div className="w-28 text-xs text-gray-400 shrink-0">
              Dish category
            </div>
            <select
              className="h-10 w-full rounded-lg border px-3 text-sm"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 py-3">
            <div className="w-28 text-xs text-gray-400 shrink-0">
              Ingredients
            </div>
            <textarea
              className="min-h-20 w-full rounded-lg border px-3 py-2 text-sm"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="flex gap-4 py-3 items-center">
            <div className="w-28 text-xs text-gray-400 shrink-0">Price</div>
            <input
              className="h-10 w-full rounded-lg border px-3 text-sm"
              value={price}
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-4 py-3">
            <div className="w-28 text-xs text-gray-400 shrink-0">Image</div>
            <div className="flex w-full flex-col gap-2">
              {uploading ? (
                <p className="text-sm text-gray-400">Uploading...</p>
              ) : (
                imgUrl && (
                  <img
                    src={imgUrl}
                    alt={editingFood}
                    className="h-32 w-full rounded-lg object-cover"
                  />
                )
              )}
              <input type="file" accept="image/*" onChange={handleImgUpload} />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              type="button"
              className="text-red-500 p-2"
              onClick={deleteFood}
              aria-label="Delete dish"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="bg-black text-white px-4 py-2.5 rounded-lg text-sm"
              onClick={editFood}
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
