import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { categoryRouter } from "./routes/category.js";
import { userRouter } from "./routes/user.js";
import { foodRouter } from "./routes/food.js";
import { orderRouter } from "./routes/order.js";
import { errorHandler } from "./middleware/error.js";

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/categories", categoryRouter);
app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);
app.use(errorHandler);

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("MONGODB_URI and JWT_SECRET must be set in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected"))
  .catch((err) => {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
