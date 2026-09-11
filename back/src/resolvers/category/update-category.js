import { categoryModel } from "../../models/category-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const updateCategory = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: "Category id is required" });
  }

  const updated = await categoryModel.findByIdAndUpdate(
    req.body.id,
    {
      categoryName: req.body.categoryName,
      updatedAt: Date.now(),
    },
    { new: true },
  );

  if (!updated) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.status(200).json(updated);
});
