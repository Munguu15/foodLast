import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel, serializeUser } from "../../models/user-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await userModel.findOne({ email: email.toLowerCase() });
  if (!user || !user.password) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const hashed = typeof user.password === "string" && user.password.startsWith("$2");
  const matches = hashed
    ? await bcrypt.compare(password, user.password)
    : user.password === password;
  if (!matches) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
  );

  res.status(200).json({
    message: "Amjilttai",
    user: serializeUser(user),
    token,
  });
});
