import Product from "../../../models/product.js";
import Category from "../../../models/Category.js";

export const getProducts = async (req, res) => {
  try {
    const {
      name,
      id,
      category,
      subCategory,
      categoryName,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (id) query._id = id;
    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;

    // 🆕 Filter by category name
    if (categoryName) {
      const foundCategory = await Category.findOne({
        name: { $regex: new RegExp(categoryName, "i") },
      });

      if (foundCategory) {
        query.category = foundCategory._id;
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    res.status(200).json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
