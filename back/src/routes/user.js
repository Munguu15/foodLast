import express from "express";

import { createUser } from "../resolvers/user/create-user.js";
import { getUserResolver } from "../resolvers/user/get-user.js";

export const userRouter = express.Router();

userRouter.get("/", getUserResolver);
userRouter.post("/", createUser);
