import { foodModel } from "../../models/food-models.js";

export const createFood = async (req, res) => {
  const newFood = await foodModel.create({
    foodName: req.body.foodName,
    foodPrice: req.body.foodPrice,
    foodDescription: req.body.foodDescription,
    foodImage: req.body.foodImage,
    category: req.body.category,
    ingredients: req.body.ingredients,
  });
  res.status(201).json({
    message: "Amjilttai uuslee",
    data: newFood,
  });
};
