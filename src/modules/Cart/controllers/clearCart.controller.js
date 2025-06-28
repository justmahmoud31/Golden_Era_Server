import Cart from "../../../models/cart.js";

export const clearCart = async (req, res) => {
  const userId = req.user._id;
  await Cart.findOneAndUpdate({ user: userId }, { items: [] });
  res.status(200).json({ message: "Cart cleared" });
};