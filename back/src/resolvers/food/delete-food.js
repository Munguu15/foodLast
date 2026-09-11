import { foodModel } from "../../models/food-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const deleteFoodResolver = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Food id is required" });
  }

  const deleted = await foodModel.findByIdAndDelete(req.body.id);
  if (!deleted) {
    return res.status(404).json({ message: "Food not found" });
  }

  res.status(200).json(deleted);
});
