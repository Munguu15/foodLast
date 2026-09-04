import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectiD = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectiD,
  name: String,
  email: String,
  password: String,
  phone: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  address: String,

  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model("user", UserSchema);
