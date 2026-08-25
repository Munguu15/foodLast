import { foodModel } from "../../models/food-models.js";

export const getFoodResolver = async (req, res) => {
  const foods = await foodModel.find().populate("category");
  res.json(foods);
};
