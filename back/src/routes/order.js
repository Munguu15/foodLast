import express from "express";
import { createOrder } from "../resolvers/order/create-order.js";
import { getOrderResolver } from "../resolvers/order/get-order.js";
import { updateOrder } from "../resolvers/order/update-order.js";
import { auth, adminOnly } from "../middleware/auth.js";

export const orderRouter = express.Router();

orderRouter.get("/", auth, getOrderResolver);
orderRouter.post("/", auth, createOrder);
orderRouter.put("/", auth, adminOnly, updateOrder);
