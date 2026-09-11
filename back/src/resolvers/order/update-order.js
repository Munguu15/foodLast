import { orderModel } from "../../models/order-model.js";
import { asyncHandler } from "../../middleware/error.js";

export const updateOrder = asyncHandler(async (req, res) => {
  if (!req.body.id || !req.body.status) {
    return res.status(400).json({ message: "Order id and status are required" });
  }

  const updated = await orderModel.findByIdAndUpdate(
    req.body.id,
    { status: req.body.status, updatedAt: Date.now() },
    { new: true },
  );

  if (!updated) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json(updated);
});
