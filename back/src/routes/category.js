import express from "express";
import { getCategoryResolver } from "../resolvers/category/get-category.js";
import { createCategory } from "../resolvers/category/create-category.js";
import { deleteCategoryResolver } from "../resolvers/category/delete-category.js";
import { updateCategory } from "../resolvers/category/update-category.js";
import { auth, adminOnly } from "../middleware/auth.js";

export const categoryRouter = express.Router();

categoryRouter.get("/", getCategoryResolver);
categoryRouter.post("/", auth, adminOnly, createCategory);
categoryRouter.delete("/", auth, adminOnly, deleteCategoryResolver);
categoryRouter.put("/", auth, adminOnly, updateCategory);
