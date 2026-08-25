import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectiD = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectiD,
  name: String,
  email: String,
  password: String,
  phone: String,

  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model("user", UserSchema);
