import User from "../../../models/user.js";

export const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );
    res.status(200).json({ message: "User blocked", user });
  } catch (err) {
    res.status(500).json({ message: "Error blocking user" });
  }
};