const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const queueRoutes = require("./routes/queueRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend"))); // Serve frontend files

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/queue", queueRoutes);

// Home Route (serve index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`✅ File-based Database Active`);
});