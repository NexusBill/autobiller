const mongoose = require("mongoose");
const mainDB = require("../db/mainConnection");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  clientCode: { type: String, required: true }
});

// Prevent OverwriteModelError if called multiple times
module.exports = mainDB.models.User || mainDB.model("User", userSchema, "users");
