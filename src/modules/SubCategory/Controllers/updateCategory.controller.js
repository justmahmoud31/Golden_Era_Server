import SubCategory from "../../../models/SubCategory.js";

export const updateSubCategory = async (req, res) => {
  try {
    const { name, description, category } = req.body;

    const updated = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, description, category },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating subcategory" });
  }
};