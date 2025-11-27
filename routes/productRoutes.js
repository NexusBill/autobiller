const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await req.db.Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const products = await req.db.Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
