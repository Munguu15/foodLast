import { orderModel } from "../../models/order-model.js";
import { asyncHandler } from "../../middleware/error.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { totalPrice, foodOrderItems, address } = req.body;

  if (!Array.isArray(foodOrderItems) || foodOrderItems.length === 0) {
    return res.status(400).json({ message: "Order items are required" });
  }

  const newOrder = await orderModel.create({
    user: req.user.id,
    totalPrice,
    foodOrderItems,
    address: address || "",
    status: "PENDING",
  });

  res.status(201).json({
    message: "Amjilttai uuslee",
    order: newOrder,
  });
});
