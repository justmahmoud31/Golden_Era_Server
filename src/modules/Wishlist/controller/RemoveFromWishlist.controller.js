import User from "../../../models/user.js";

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(id => id && id.toString() !== productId);
    await user.save();

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
