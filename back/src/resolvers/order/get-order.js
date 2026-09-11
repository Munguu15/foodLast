import { orderModel } from "../../models/order-model.js";
import { asyncHandler } from "../../middleware/error.js";

export const getOrderResolver = asyncHandler(async (req, res) => {
  const filter = req.user.role === "ADMIN" ? {} : { user: req.user.id };
  const orders = await orderModel
    .find(filter)
    .populate("user", "-password")
    .populate("foodOrderItems.food");
  res.json(orders);
});
