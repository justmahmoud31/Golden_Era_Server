
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../models/user.js";

export const registerUser = async (req, res) => {
  try {
        const {
      firstName,
      lastName,
      email,
      password,
      phone_number,
      addresses = [],
    } = req.body;

    if (!firstName || !lastName || !email || !password || !phone_number) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone_number,
      role: "user",
      addresses,
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
};
