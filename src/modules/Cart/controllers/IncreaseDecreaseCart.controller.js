import Cart from "../../../models/cart.js";


export const updateCartItemQuantity = async (req, res) => {
  const userId = req.user.id; // assuming auth middleware adds req.user
  const { productId, action } = req.body;

  if (!["increment", "decrement"].includes(action)) {
    return res.status(400).json({ error: "Invalid action" });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find((item) => item.product.toString() === productId);

    if (!item) return res.status(404).json({ error: "Product not in cart" });

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        // remove the item if quantity drops to 0
        cart.items = cart.items.filter((i) => i.product.toString() !== productId);
      }
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Cart update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
