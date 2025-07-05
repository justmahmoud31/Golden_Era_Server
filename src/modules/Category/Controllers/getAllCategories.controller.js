import Category from "../../../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const { id, name } = req.query;

    if (id) {
      const category = await Category.findById(id).populate("subcategories");
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json(category);
    }

    // Build the query object
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // case-insensitive search
    }

    const categories = await Category.find(query)
      .sort({ createdAt: -1 })
      .populate("subcategories");

    res.status(200).json({
      message: "Category",
      categories,
    });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({ message: "Error fetching categories" });
  }
};
