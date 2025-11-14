// models/product.js
const mongoose = require("mongoose");

module.exports = (conn) => {
  const productSchema = new mongoose.Schema({
    id: Number,
    Cat_Id: String,
    Product_Id: String,
    Name: String,
    HSN_Code: String,
    Part_No: String,
    MRP: Number,
    base: String,
    brand: String,
    vehicle: String,
    gst: Number
  }, { collection: "products" });

  return conn.model("Product", productSchema);
};
