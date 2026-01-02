//const mongoose = require("mongoose");

const uri = "mongodb+srv://nexus_root:Nexus1234@cluster0.i1azw1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoose = require("mongoose");

mongoose.connect(uri)
  .then(() => console.log("🌐 Main DB connected"))
  .catch(err => console.log("❌ Main DB error:", err));

module.exports = mongoose;
