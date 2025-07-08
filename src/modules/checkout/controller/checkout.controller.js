import Cart from "../../../models/cart.js";
import User from "../../../models/user.js";


export const getCheckoutSummary = async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated via middleware

    // Fetch user's cart with populated product fields
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart is empty." });
    }

    // Get user details including addresses
    const user = await User.findById(userId).select("addresses");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);

    return res.status(200).json({
      cart: {
        items: cart.items.map((item) => ({
          product: {
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.cover_images?.[0] || null,
          },
          quantity: item.quantity,
          subtotal: item.quantity * item.product.price,
        })),
        total,
      },
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Server error during checkout." });
  }
};
