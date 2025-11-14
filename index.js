const express = require("express");
const app = express();

app.use(express.json());

// Main DB first
require("./db/mainConnection");

// Routes
const authRoute = require("./routes/auth");
const userActionsRoute = require("./routes/userActions");
const productRoutes = require("./routes/productRoutes");

// Middleware
const dbSelector = require("./middleware/dbSelector");

app.use("/auth", authRoute);                // No tenant DB needed
app.use("/api", dbSelector, userActionsRoute);
app.use("/products", dbSelector, productRoutes);

app.listen(3000, () =>
  console.log("🚀 Server running on port 3000")
);
