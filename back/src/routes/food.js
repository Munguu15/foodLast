import express from "express";
import { createFood } from "../resolvers/food/create-food.js";
import { getFoodResolver } from "../resolvers/food/get-food.js";

export const foodRouter = express.Router();

foodRouter.get("/", getFoodResolver);
foodRouter.post("/", createFood);
