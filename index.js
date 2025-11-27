const express = require("express");
const app = express();
app.use(express.json());
require("./db/mainConnection");
const authRoute = require("./routes/auth");
const userActionsRoute = require("./routes/userActions");
const productRoutes = require("./routes/productRoutes");
const dbSelector = require("./middleware/dbSelector");
app.use("/auth", authRoute);               
app.use("/api", dbSelector, userActionsRoute);
app.use("/products", dbSelector, productRoutes);
app.listen(3000, () =>
  console.log("🚀 Server running on port 3000")
);
