import express from "express";
import { createUser } from "../resolvers/user/create-user.js";
import { getUserResolver, getMe, updateUser } from "../resolvers/user/get-user.js";
import { loginUser } from "../resolvers/user/login-user.js";
import { auth, adminOnly } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", auth, getMe);
userRouter.put("/", auth, updateUser);
userRouter.get("/", auth, adminOnly, getUserResolver);
