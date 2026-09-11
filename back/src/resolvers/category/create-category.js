import { categoryModel } from "../../models/category-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName?.trim()) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const newCategory = await categoryModel.create({
    categoryName: categoryName.trim(),
  });

  res.status(201).json({
    message: "Amjilttai uuslee",
    category: newCategory,
  });
});
