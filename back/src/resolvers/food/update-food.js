import { foodModel, serializeFood } from "../../models/food-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const updateFood = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Food id is required" });
  }

  const price = Number(req.body.price ?? req.body.foodPrice);
  const image = req.body.image ?? req.body.foodImage;
  const ingredients = req.body.ingredients ?? req.body.foodDescription;

  const updated = await foodModel.findByIdAndUpdate(
    req.body.id,
    {
      foodName: req.body.foodName,
      price,
      foodPrice: price,
      image,
      foodImage: image,
      foodDescription: ingredients,
      category: req.body.category,
      ingredients,
      updatedAt: Date.now(),
    },
    { new: true },
  );

  if (!updated) {
    return res.status(404).json({ message: "Food not found" });
  }

  res.status(200).json(serializeFood(updated));
});
