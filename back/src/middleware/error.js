export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const errorHandler = (err, _req, res, _next) => {
  if (err.code === 11000) {
    return res.status(409).json({ message: "Email already exists" });
  }
  res.status(500).json({ message: err.message || "Server error" });
};
