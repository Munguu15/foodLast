import { foodModel, serializeFood } from "../../models/food-models.js";

export const createFood = async (req, res) => {
  const price = Number(req.body.price ?? req.body.foodPrice);
  const image = req.body.image ?? req.body.foodImage;
  const ingredients = req.body.ingredients ?? req.body.foodDescription;

  const newFood = await foodModel.create({
    foodName: req.body.foodName,
    price,
    foodPrice: price,
    image,
    foodImage: image,
    foodDescription: ingredients,
    category: req.body.category,
    ingredients,
  });

  res.status(201).json({
    message: "Amjilttai uuslee",
    data: serializeFood(newFood),
  });
};
