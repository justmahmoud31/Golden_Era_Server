import User from "../../../models/user.js";

export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );
    res.status(200).json({ message: "User promoted to admin", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user role" });
  }
};