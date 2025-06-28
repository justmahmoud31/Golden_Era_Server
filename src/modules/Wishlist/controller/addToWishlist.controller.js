import User from "../../../models/user.js";
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
    }
    await user.save();
    res.json({
      message: "Successfully",
      user
    });
  } catch (error) {
    res.status(500).json({
      Error: "error",
      error
    })
  }
};