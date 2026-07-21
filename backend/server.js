const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const queueRoutes = require("./routes/queueRoutes");
const studentRoutes = require("./routes/studentRoutes");
const staffRoutes = require("./routes/staffRoutes");
console.log("✅ Staff Routes Loaded");

const app = express();

const PORT = process.env.PORT || 5000;

// --------------------
// Middleware
// --------------------

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend")));


// --------------------
// Routes
// --------------------

app.use("/api/auth", authRoutes);

app.use("/api/queue", queueRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/staff", staffRoutes);

// --------------------
// Home Route
// --------------------

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});

// --------------------
// Start Server
// --------------------

app.listen(PORT, () => {

    console.log("=================================");

    console.log("🚀 Smart University Server Started");

    console.log(`🌐 http://localhost:${PORT}`);

    console.log("✅ Express Running");

    console.log("✅ MySQL Connected");

    console.log("=================================");

});