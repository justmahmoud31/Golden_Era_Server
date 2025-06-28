import Cart from "../../../models/cart.js";

export const getCart = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  res.json(cart);
};