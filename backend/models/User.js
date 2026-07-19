const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'staff_registrar', 'staff_transport', 'staff_dean', 'staff_canteen'], default: 'student' },
    roll: { type: String },
    department: { type: String },
    year: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);