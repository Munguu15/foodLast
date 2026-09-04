import express from "express";
import { createOrder } from "../resolvers/order/create-order.js";
import { getOrderResolver } from "../resolvers/order/get-order.js";
import { updateOrder } from "../resolvers/order/update-order.js";

export const orderRouter = express.Router();
orderRouter.get("/", getOrderResolver);
orderRouter.post("/", createOrder);
orderRouter.put("/", updateOrder);
