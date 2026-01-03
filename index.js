const express = require("express");
const app = express();const cors = require("cors");
// CORS Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false
  })
);
app.use(express.json());
require("./db/mainConnection");
const authRoute = require("./routes/auth");
const userActionsRoute = require("./routes/userActions");
const productRoutes = require("./routes/productRoutes");
const baseRoutes = require("./routes/baseRoute");
const dbSelector = require("./middleware/dbSelector");
app.use("/auth", authRoute);               
app.use("/api", dbSelector, userActionsRoute);
app.use("/products", productRoutes);
app.use("/base", baseRoutes);
app.use("/brand", require("./routes/brandRoute"));
app.use("/vehicle", require("./routes/vehicleRoute"));

app.listen(3000, () =>
  console.log("🚀 Server running on port 3000")
);
