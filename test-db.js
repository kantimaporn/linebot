require("dotenv").config();

const db = require("./config/db");

async function testDB() {
  try {
    const res = await db.query("SELECT NOW()");
    console.log("Database connected:", res.rows);
  } catch (err) {
    console.error("DB error:", err);
  }
}

testDB();