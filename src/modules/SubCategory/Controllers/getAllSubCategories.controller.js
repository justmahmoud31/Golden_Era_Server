import SubCategory from "../../../models/SubCategory.js";

export const getAllSubCategories = async (req, res) => {
  try {
    const { id, category } = req.query;

    const query = {};
    if (id) query._id = id;
    if (category) query.category = category;

    const subcategories = await SubCategory.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
        message : "SubCategory",
        subcategories
    });
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    res.status(500).json({ message: "Error fetching subcategories" });
  }
};