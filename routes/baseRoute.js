const express = require("express");
const jwt = require("jsonwebtoken");
const getTenantDB = require("../db/tenantConnections");
const router = express.Router();
const loadUsers = async (req, res, next) => {
    try {
         let token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Missing token" });

    token = token.replace("Bearer ", "");
    const decoded = jwt.verify(token, "kavi@12345"); 

    const clientCode = decoded.clientCode;
        const tenantDB = await getTenantDB(clientCode);
        req.baseCollection = tenantDB.collection("base");
        next();
    } catch (err) {
        console.error("Middleware error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

router.use(loadUsers);
router.get("/", async (req, res) => {
  try {
    const base = await req.baseCollection.find({}).toArray();
    res.json(base);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const result = await req.baseCollection.insertOne(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
