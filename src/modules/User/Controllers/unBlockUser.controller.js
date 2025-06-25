import User from "../../../models/user.js";

export const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );
    res.status(200).json({ message: "User unblocked", user });
  } catch (err) {
    res.status(500).json({ message: "Error unblocking user" });
  }
};