import bcrypt from "bcrypt";
import { userModel, serializeUser } from "../../models/user-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const existing = await userModel.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const userCount = await userModel.countDocuments();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    phone,
    address,
    role: userCount === 0 ? "ADMIN" : "USER",
  });

  res.status(201).json({
    message: "Amjilttai uuslee",
    user: serializeUser(newUser),
  });
});
