import express from "express";
import { createFood } from "../resolvers/food/create-food.js";
import { getFoodResolver } from "../resolvers/food/get-food.js";
import { updateFood } from "../resolvers/food/update-food.js";
import { deleteFoodResolver } from "../resolvers/food/delete-food.js";

export const foodRouter = express.Router();

foodRouter.get("/:categoryId", getFoodResolver);
foodRouter.post("/", createFood);
foodRouter.put("/", updateFood);
foodRouter.delete("/", deleteFoodResolver);
