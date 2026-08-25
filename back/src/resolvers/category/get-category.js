import { categoryModel } from "../../models/category-models.js";
import { foodModel } from "../../models/food-models.js";

export const getCategoryResolver = async (req, res) => {
  const catergory = await categoryModel.find();

  const result = await Promise.all(
    categories.map(async (category) => {
      const foodcount = await foodModel.countDocuments({
        category: category.id,
      });
      return {
        ...category.toObject(),
        foodCount,
      };
    }),
  );

  const allFoodcount = await foodModel.countDocuments();
  res.status(200).json({
    categories: result,
    allFoodcount,
  });
};
