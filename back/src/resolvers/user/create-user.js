import bcrypt from "bcrypt";
import { userModel } from "../../models/user-models.js";

export const createUser = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: body.phone,
    role: body.role || "USER",
    address: body.address,
  });

  res.status(200).json({
    message: "Amjilttai uuslee",
    user: newUser,
  });
};
