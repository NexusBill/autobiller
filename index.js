const express = require("express");
const app = express();
// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
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
