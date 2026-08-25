import { orderModel } from "../../models/order-model.js";

export const getOrderResolver = async (req, res) => {
  const orders = await orderModel.find().populate("user").populate("foodOrderItems.food");
  res.json(orders);
}