import { categoryModel } from "../../models/category-models.js";
import { foodModel } from "../../models/food-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const getCategoryResolver = asyncHandler(async (_req, res) => {
  const categories = await categoryModel.find();

  const result = await Promise.all(
    categories.map(async (category) => {
      const foodCount = await foodModel.countDocuments({
        category: category._id,
      });
      return {
        ...category.toObject(),
        foodCount,
      };
    }),
  );

  const allFoodCount = await foodModel.countDocuments();
  res.status(200).json({
    categories: result,
    allFoodCount,
    allFoodcount: allFoodCount,
  });
});
