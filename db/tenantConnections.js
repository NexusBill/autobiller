const mongoose = require("mongoose");

const connections = {}; // Cache

async function getTenantDB(clientCode) {
  if (!clientCode) throw new Error("Missing clientCode!");

  if (connections[clientCode] && connections[clientCode].readyState === 1) {
    return connections[clientCode];
  }

  console.log(`🔌 Connecting to DB for client: ${clientCode}`);

  const uri = `mongodb+srv://nexus_root:12345@cluster0.i1azw1p.mongodb.net/${clientCode}?retryWrites=true&w=majority&appName=Cluster0`;

  const conn = mongoose.createConnection(uri);

  await new Promise((resolve, reject) => {
    conn.once("connected", () => {
      console.log("✅ Tenant DB connected:", clientCode);
      resolve();
    });

    conn.once("error", (err) => {
      console.log("❌ Tenant DB error:", err);
      reject(err);
    });
  });

  connections[clientCode] = conn;
  return conn;
}

module.exports = getTenantDB;
