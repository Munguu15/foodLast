import { categoryModel } from "../../models/category-models.js";
import { foodModel } from "../../models/food-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const deleteCategoryResolver = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Category id is required" });
  }

  const deleted = await categoryModel.findByIdAndDelete(req.body.id);
  if (!deleted) {
    return res.status(404).json({ message: "Category not found" });
  }

  await foodModel.deleteMany({ category: req.body.id });
  res.status(200).json(deleted);
});
