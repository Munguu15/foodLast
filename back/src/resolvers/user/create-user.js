import { userModel } from "../../models/user-models.js";

export const createUser = async (req, res) => {
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    role: req.body.role,
    address: req.body.address,
  });
  res.status(200).json({
    message: "Amjilttai uuslee",
    user: newUser,
  });
};
