import { userModel, serializeUser } from "../../models/user-models.js";
import { asyncHandler } from "../../middleware/error.js";

export const getUserResolver = asyncHandler(async (_req, res) => {
  const users = await userModel.find().select("-password");
  res.json(users);
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(serializeUser(user));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, phone, address } = req.body;
  const updated = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      ...(name !== undefined && { name }),
      ...(phone !== undefined && { phone }),
      ...(address !== undefined && { address }),
      updatedAt: Date.now(),
    },
    { new: true },
  );

  if (!updated) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(serializeUser(updated));
});
