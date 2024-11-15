// controllers/orderController.js
import Order from "../models/Order.js";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
