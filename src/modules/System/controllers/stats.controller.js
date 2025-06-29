
import Product from '../../../models/product.js';
import Category from '../../../models/Category.js';
import Order from '../../../models/order.js';
import User from '../../../models/user.js';

export const getStats = async (req, res) => {
  try {
    const [productCount, categoryCount, orderCount, userCount] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
    ]);

    const stats = {
      products: productCount,
      categories: categoryCount,
      orders: orderCount,
      users: userCount,
    };

    res.status(200).json({
      message: "Stats retrieved successfully",
      stats,
    });
  } catch (error) {
    console.error("Stats retrieval error:", error);
    res.status(500).json({ message: "Failed to retrieve stats" });
  }
};
