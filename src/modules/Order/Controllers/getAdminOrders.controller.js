import Order from "../../../models/order.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "firstName lastName email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};