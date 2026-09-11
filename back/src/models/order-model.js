import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const foodOrderItem = new Schema({
  food: {
    type: ObjectId,
    ref: "food",
  },
  quantity: Number,
});

const OrderSchema = new Schema({
  user: { type: ObjectId, ref: "user" },
  totalPrice: Number,
  foodOrderItems: [foodOrderItem],
  address: String,
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "CANCELLED"],
    default: "PENDING",
  },
  createAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const orderModel = mongoose.model("order", OrderSchema);
