import Category from "../../../models/Category.js";

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating category" });
  }
};
