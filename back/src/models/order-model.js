import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectiD = Schema.ObjectId;

const foodOrderItem = new Schema({
  food: {
    type: ObjectiD,
    ref: "food",
  },
  quantity: Number,
});

const OrderSchema = new Schema({
  id: ObjectiD,
  user: { type: ObjectiD, ref: "user" },
  totalPrice: Number,
  foodOrderItems: [foodOrderItem],
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "CANCELLED"],
    default: "PENDING",
  },

  createAt: { type: Date, requiered: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});
export const orderModel = mongoose.model("order", OrderSchema);
