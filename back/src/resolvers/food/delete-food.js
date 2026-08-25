export const deleteFoodResolver = async (req, res) => {
  const deleteFood = await foodModel.findByIdAndDelete(req.body.id);
  res.status(201).json(deleteFood);
};