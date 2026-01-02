const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const getTenantDB = require("../db/tenantConnections");
const rootConnector = require("../db/rootConnection");

const loadUsers = async (req, res, next) => {
    try {
        const clientCode = req.body.clientCode;
        if (!clientCode) {
            return res.status(400).json({ error: "Client code missing" });
        }

        const tenantDB = await rootConnector();
        req.clientCode = clientCode;
        req.usersCollection = tenantDB.collection("users");

        next();
    } catch (err) {
        console.error("Middleware error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.use(loadUsers);

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await req.usersCollection.findOne({ username, password });
  //show all users for testing
  const allUsers = await req.usersCollection.find({}).toArray();
  console.log("All users:", allUsers);

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
