import User from "../../../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const { role, blocked } = req.query;

    const query = {};
    if (role) query.role = role;
    if (blocked !== undefined) query.isBlocked = blocked === "true";

    const users = await User.find(query).select("-password");
    res.status(200).json({
      Message: "Users",
      users
    });
  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};