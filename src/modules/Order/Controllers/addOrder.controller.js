import Cart from "../../../models/cart.js";
import Order from "../../../models/order.js";
import Product from "../../../models/product.js";
import User from "../../../models/user.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address } = req.body;

    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = cart.items.map((item) => {
      const product = item.product;
      let price = product.price;

      if (product.hasName && product.defaultPrice) {
        price += product.defaultPrice;
      }

      return {
        product: product._id,
        name: product.name,
        cover_image: product.cover_images[0],
        price,
        quantity: item.quantity,
      };
    });

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
      address,
    });

    await newOrder.save();

    // Update stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();
      }
    }

    cart.items = [];
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
};
