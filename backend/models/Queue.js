const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    department: { type: String, enum: ['registrar', 'transport', 'dean', 'canteen'], required: true },
    tokenNumber: { type: String, required: true },
    status: { type: String, enum: ['waiting', 'serving', 'completed', 'cancelled'], default: 'waiting' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Queue", queueSchema);
