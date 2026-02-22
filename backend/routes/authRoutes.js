const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({
      email,
      password,
      role: "admin"
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    res.json({
      message: "Admin login successful",
      admin
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
