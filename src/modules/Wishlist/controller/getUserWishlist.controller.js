import User from "../../../models/user.js";

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("wishlist");
        res.json({
            Message: "Success",
            user
        });
    } catch (error) {
        res.status(500).json({
            "Error": error
        })
    }
};