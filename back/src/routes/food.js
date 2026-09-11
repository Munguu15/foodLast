import express from "express";
import { createFood } from "../resolvers/food/create-food.js";
import {
  getFoodResolver,
  getAllFoodResolver,
  getFoodByIdResolver,
} from "../resolvers/food/get-food.js";
import { updateFood } from "../resolvers/food/update-food.js";
import { deleteFoodResolver } from "../resolvers/food/delete-food.js";
import { auth, adminOnly } from "../middleware/auth.js";

export const foodRouter = express.Router();

foodRouter.get("/", getAllFoodResolver);
foodRouter.get("/item/:id", getFoodByIdResolver);
foodRouter.get("/:categoryId", getFoodResolver);
foodRouter.post("/", auth, adminOnly, createFood);
foodRouter.put("/", auth, adminOnly, updateFood);
foodRouter.delete("/", auth, adminOnly, deleteFoodResolver);
