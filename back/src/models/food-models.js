import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectiD = Schema.ObjectId;

const FoodScehema = new Schema({
  id: ObjectiD,
  foodName: String,
  foodPrice: Number,
  foodDescription: String,
  foodImage: String,
  category: {
    type: ObjectiD,
    ref: "Category",
  },
  ingredients: [String],

  createAt: { type: Date, requiered: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});
export const foodModel = mongoose.model("food", FoodScehema);
