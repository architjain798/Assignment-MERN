const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// Get all users
router.get("/users", authMiddleware, async (req, res) => {
  try {
    // Fetch all users from the database (excluding passwords)
    const users = await User.find({}, { password: 0 });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
