import SubCategory from "../../../models/SubCategory.js";

export const createSubCategory = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required." });
    }

    const subcategory = await SubCategory.create({ name, description, category });
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(500).json({ message: "Error creating subcategory" });
  }
};