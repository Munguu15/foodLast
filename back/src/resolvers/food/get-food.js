import mongoose from "mongoose";
import { foodModel, serializeFood } from "../../models/food-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const getFoodResolver = asyncHandler(async (req, res) => {
  const foods = await foodModel
    .find({ category: req.params.categoryId })
    .populate("category");

  res.json(foods.map(serializeFood));
});

export const getAllFoodResolver = asyncHandler(async (_req, res) => {
  const foods = await foodModel.find().populate("category");
  res.json(foods.map(serializeFood));
});

export const getFoodByIdResolver = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Food not found" });
  }

  const food = await foodModel.findById(req.params.id).populate("category");
  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }
  res.json(serializeFood(food));
});
