import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { categoryRouter } from "./routes/category.js";
import { userRouter } from "./routes/user.js";
import { foodRouter } from "./routes/food.js";
import { orderRouter } from "./routes/order.js";
const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/categories", categoryRouter);
app.use("/user", userRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);

mongoose
  .connect(
    "mongodb+srv://amynga80_db_user:qkgYYzHFUqkOuwzr@cluster0.76rfmru.mongodb.net/",
  )
  .then(() => console.log("Connected"));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
