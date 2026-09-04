import { foodModel, serializeFood } from "../../models/food-models.js";

export const updateFood = async (req, res) => {
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

  res.status(200).json(updated ? serializeFood(updated) : updated);
};
