import { categoryModel } from "../../models/category-models.js";

export const createCategory = async (req, res) => {
  const newCategory = await categoryModel.create({
    categoryName: req.body.categoryName,
  });
  res.status(201).json({
    message: "Amjilttai uuslee",
  });
};
