import Product from "../../../models/product.js";

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err.message });
  }
};