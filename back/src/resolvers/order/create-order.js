import { orderModel } from "../../models/order-model.js";

export const createOrder = async (req, res) => {
    const newOrder = await orderModel.create({
        user: req.body.user,
        totalPrice: req.body.totalPrice,
        foodOrderItems: req.body.foodOrderItems,
        status: req.body.status,
    });
    res.status(200).json({
        message: "Amjilttai uuslee",
        order: newOrder,
    });
};