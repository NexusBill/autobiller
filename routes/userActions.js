const express = require("express");
const router = express.Router();

router.get("/products", async (req, res) => {
  const Product = req.db.model(
    "Product",
    new require("mongoose").Schema({ name: String, price: Number }),
    "products"
  );
  
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
