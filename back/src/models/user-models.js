import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  address: String,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model("user", UserSchema);

export const serializeUser = (user) => {
  const doc = user.toObject ? user.toObject() : { ...user };
  delete doc.password;
  return doc;
};
