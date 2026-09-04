import express from "express";

import { createUser } from "../resolvers/user/create-user.js";
import { getUserResolver } from "../resolvers/user/get-user.js";
import { loginUser } from "../resolvers/user/login-user.js";

export const userRouter = express.Router();

userRouter.get("/", getUserResolver);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
