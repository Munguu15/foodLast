import { categoryModel } from "../../models/category-models.js";

export const updateCategory = async (req, res) => {
  const updateCategory = await categoryModel.findByIdAndUpdate(req.body.id, {
    categoryName: req.body.categoryName,
  });
  res.status(201).json(updateCategory);
};
