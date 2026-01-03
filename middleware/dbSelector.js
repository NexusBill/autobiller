// middleware/dbSelector.js
const jwt = require("jsonwebtoken");
const getTenantDB = require("../db/tenantConnections");
const productModel = require("../models/productModel");

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Missing token" });

    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, "kavi@12345"); //

    const clientCode = decoded.clientCode;
    if (!clientCode) return res.status(400).json({ error: "clientCode missing" });

    const tenantDB = await getTenantDB(clientCode);

  

    next();
  } catch (err) {
    console.log("❌ dbSelector error:", err);
    return res.status(500).json({ error: err.message });
  }
};
