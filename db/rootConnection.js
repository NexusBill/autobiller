const mongoose = require("mongoose");


async function getTenantDB() {

 

  console.log(`🔌 Connecting root`);

  const uri = `mongodb+srv://nexus_root:Nexus1234@cluster0.i1azw1p.mongodb.net/auto_root?retryWrites=true&w=majority&appName=Cluster0`;

  const conn = mongoose.createConnection(uri);

  await new Promise((resolve, reject) => {
    conn.once("connected", () => {
      console.log("✅ Root DB connected");
      resolve();
    });

    conn.once("error", (err) => {
      console.log("❌ Root DB error:", err);
      reject(err);
    });
  });

  return conn;
}

module.exports = getTenantDB;
