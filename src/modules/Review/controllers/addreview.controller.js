import Review from "../../../models/Review.js";

export const addReview = async (req, res) => {
  const { product, comment, rate } = req.body;
  const user = req.user._id;

  if (!product || !comment || !rate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existing = await Review.findOne({ product, user });
    if (existing) {
      return res.status(400).json({ message: "You have already reviewed this product." });
    }

    const review = await Review.create({ product, comment, rate, user });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};