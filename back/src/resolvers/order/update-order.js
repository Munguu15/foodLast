import { orderModel } from "../../models/order-model.js";

export const updateOrder = async (req, res) => {
  const updated = await orderModel.findByIdAndUpdate(
    req.body.id,
    { status: req.body.status, updatedAt: Date.now() },
    { new: true },
  );
  res.status(200).json(updated);
};
