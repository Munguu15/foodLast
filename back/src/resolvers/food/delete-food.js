import { foodModel } from "../../models/food-models.js";

export const deleteFoodResolver = async (req, res) => {
  const deleteFood = await foodModel.findByIdAndDelete(req.body.id);
  res.status(200).json(deleteFood);
};
