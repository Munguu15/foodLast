import { foodModel, serializeFood } from "../../models/food-models.js";

export const getFoodResolver = async (req, res) => {
  const foods = await foodModel
    .find({ category: req.params.categoryId })
    .populate("category");

  res.json(foods.map(serializeFood));
};
