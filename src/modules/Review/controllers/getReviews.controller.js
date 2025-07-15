import Review from "../../../models/Review.js";
export const getReviews = async (req, res) => {
  const { product, user } = req.query;

  const filter = {};
  if (product) filter.product = product;
  if (user) filter.user = user;

  try {
    const reviews = await Review.find(filter)
      .populate("user", "firstName lastName") // only show user name
      

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};