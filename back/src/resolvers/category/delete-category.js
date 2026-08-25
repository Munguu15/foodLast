import { categoryModel } from "../../models/category-models.js";

export const deleteCategoryResolver = async (req, res) => {
  const deleteCategory = await categoryModel.findByIdAndDelete(req.body.id);
  res.status(201).json(deleteCategory);
};
