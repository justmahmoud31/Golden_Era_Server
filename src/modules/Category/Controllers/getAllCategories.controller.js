import Category from "../../../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const category = await Category.findById(id).populate("subcategories");
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json(category);
    }

    const categories = await Category.find()
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
