import { foodModel, serializeFood } from "../../models/food-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const createFood = asyncHandler(async (req, res) => {
  const { foodName, category } = req.body;
  if (!foodName || !category) {
    return res.status(400).json({ message: "Food name and category are required" });
  }

  const price = Number(req.body.price ?? req.body.foodPrice);
  const image = req.body.image ?? req.body.foodImage;
  const ingredients = req.body.ingredients ?? req.body.foodDescription;

  const newFood = await foodModel.create({
    foodName,
    price,
    foodPrice: price,
    image,
    foodImage: image,
    foodDescription: ingredients,
    category,
    ingredients,
  });

  res.status(201).json({
    message: "Amjilttai uuslee",
    data: serializeFood(newFood),
  });
});
