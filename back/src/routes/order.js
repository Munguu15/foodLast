import express from "express";
import { createOrder } from "../resolvers/order/create-order.js";
import { getOrderResolver } from "../resolvers/order/get-order.js";

export const orderRouter = express.Router();
orderRouter.get("/", getOrderResolver);
orderRouter.post("/", createOrder);
