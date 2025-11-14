const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.json({ error: "Invalid credentials" });

  const token = jwt.sign(
    {
      userId: user._id,
      clientCode: user.clientCode
    },
    "kavi@12345",
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
