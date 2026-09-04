import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user-models.js";

export const loginUser = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user || !user.password) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const hashed = typeof user.password === "string" && user.password.startsWith("$2");
  const matches = hashed
    ? await bcrypt.compare(req.body.password, user.password)
    : user.password === req.body.password;
  if (!matches) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "nomnom-secret");
  const safeUser = user.toObject();
  delete safeUser.password;

  res.status(200).json({
    message: "Amjilttai",
    user: safeUser,
    token,
  });
};
