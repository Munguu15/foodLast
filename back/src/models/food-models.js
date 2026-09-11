import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const FoodSchema = new Schema({
  foodName: { type: String, required: true },
  price: Number,
  foodPrice: Number,
  image: String,
  foodImage: String,
  foodDescription: String,
  category: {
    type: ObjectId,
    ref: "Category",
  },
  ingredients: Schema.Types.Mixed,
  createAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const foodModel = mongoose.model("food", FoodSchema);

export const serializeFood = (food) => {
  const doc = food.toObject ? food.toObject() : food;
  const ingredients = Array.isArray(doc.ingredients)
    ? doc.ingredients.join(", ")
    : doc.ingredients || "";

  return {
    ...doc,
    price: doc.price ?? doc.foodPrice ?? 0,
    image: doc.image || doc.foodImage || "",
    ingredients,
  };
};
