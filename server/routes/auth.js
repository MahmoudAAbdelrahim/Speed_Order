const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ تحديث بيانات المستخدم
router.put("/api/users/:id", async (req, res) => {
  try {
    const { name, phone, email, image } = req.body;
    const userId = req.params.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone, email, image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        email: updatedUser.email,
        image: updatedUser.image,
      },
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error while updating user" });
  }
});

// ✅ تسجيل مستخدم جديد
router.post("/api/users", async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !email || !password) {
    return res.status(400).json({ message: "All fields required." });
  }

  try {
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, phone, email, password: hashedPassword });

    res.status(201).json({
      message: "User created",
      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        image: newUser.image || "",
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server error while creating user" });
  }
});

// ✅ تسجيل الدخول
router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        image: user.image || "",
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
