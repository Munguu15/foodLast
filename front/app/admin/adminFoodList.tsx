"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus } from "lucide-react";
import { AdminFoodCard } from "./adminFoodCard";
import { CategoryType } from "./foodMenu";

const UPLOAD_PRESET = "ml_default";
const CLOUD_NAME = "tmnqu3q8";
const API = "http://localhost:8000";

const inputClass =
  "h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10";

export const AdminFoodList = ({
  food,
  getFood,
}: {
  food: CategoryType;
  getFood: () => void;
}) => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const getFoods = async () => {
    const response = await fetch(`${API}/food/${food._id}`);
    const data = await response.json();
    setFoods(data || []);
  };

  const resetForm = () => {
    setFoodName("");
    setFoodPrice("");
    setFoodIngredients("");
    setImgUrl("");
  };

  const createFood = async () => {
    if (!foodName.trim() || !foodPrice) return;
    await fetch(`${API}/food`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodName: foodName.trim(),
        image: imgUrl,
        ingredients: foodIngredients,
        price: Number(foodPrice),
        category: food._id,
      }),
    });

    resetForm();
    setOpen(false);
    getFood();
    getFoods();
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleImgUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) setImgUrl(url);
    } catch (err) {
      console.log("Failed to upload logo: " + err);
    }
    setUploading(false);
  };

  useEffect(() => {
    getFoods();
  }, [food._id]);

  return (
    <section className="p-5 bg-white rounded-2xl w-full shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-semibold tracking-tight">
          {food.categoryName}
        </h2>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[11px] font-medium text-white">
          {food.foodCount || foods.length}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="group min-h-[241px] flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-200 bg-red-50/60 text-red-500 transition hover:border-red-400 hover:bg-red-50">
            <div className="flex size-10 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition group-hover:scale-105">
              <Plus className="size-5" />
            </div>
            <p className="mt-3 text-sm font-medium text-center px-4">
              Add new Dish to {food.categoryName}
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add {food.categoryName}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <input
                className={inputClass}
                type="text"
                placeholder="Food name"
                onChange={(e) => setFoodName(e.target.value)}
                value={foodName}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Price"
                onChange={(e) => setFoodPrice(e.target.value)}
                value={foodPrice}
              />
              <input
                className={inputClass}
                type="text"
                placeholder="Ingredients"
                onChange={(e) => setFoodIngredients(e.target.value)}
                value={foodIngredients}
              />

              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt="Food Image"
                  className="h-40 w-full rounded-xl object-cover"
                />
              ) : uploading ? (
                <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-sm text-neutral-500">
                  Uploading...
                </div>
              ) : (
                <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-neutral-500 transition hover:border-neutral-400 hover:bg-neutral-100">
                  <ImagePlus className="mb-2 size-6" />
                  <span className="text-sm font-medium">Upload image</span>
                  <input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={handleImgUpload}
                  />
                </label>
              )}

              <Button
                className="mt-1 h-10 w-full bg-red-500 text-white hover:bg-red-600"
                onClick={createFood}
                disabled={uploading}
              >
                Add Food
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {foods.map((item: any) => (
          <AdminFoodCard
            key={item._id}
            food={item}
            onChanged={() => {
              getFood();
              getFoods();
            }}
          />
        ))}
      </div>
    </section>
  );
};
