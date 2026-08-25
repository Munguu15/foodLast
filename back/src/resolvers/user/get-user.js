import { userModel } from "../../models/user-models.js";

export const getUserResolver = async (req, res) => {
  const users = await userModel.find();
  res.json(users);
};
