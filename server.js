const express = require("express");
const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Smart University Backend is Running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});