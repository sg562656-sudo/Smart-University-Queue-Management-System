const pool = require("./config/mysql");

async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("✅ MySQL Connected Successfully!");

        connection.release();
    } catch (err) {
        console.error("❌ Connection Failed:");
        console.error(err.message);
    }
}

testConnection();