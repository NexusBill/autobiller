const express = require("express");
const router = express.Router();
const User = require("../models/user");

// ✅ Create User (POST /users)
router.post("/users", async (req, res) => {
  const { username, password, clientCode } = req.body;

  try {
    const newUser = new User({ username, password, clientCode });
    await newUser.save();
    res.json({ message: "User Created Successfully", user: newUser });
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Users (GET /users)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update User (PUT /users/:id)
router.put("/users/:id", async (req, res) => {
  const { username, password, clientCode } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password, clientCode },
      { new: true }
    );

    res.json({ message: "User Updated Successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete User (DELETE /users/:id) — optional
router.delete("/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
