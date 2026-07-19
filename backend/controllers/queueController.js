const { readDB, writeDB } = require("../config/db");

const generateToken = (req, res) => {
    try {
        const { userId, department } = req.body;

        if (!department) {
            return res.status(400).json({ success: false, message: "Missing department field" });
        }

        const prefixMap = {
            'registrar': 'R',
            'transport': 'T',
            'dean': 'D',
            'canteen': 'C'
        };
        const prefix = prefixMap[department] || 'Q';

        const db = readDB();

        // Get count for today to generate next number
        const todayStr = new Date().toISOString().split('T')[0];
        const count = db.queues.filter(q => q.department === department && q.createdAt.startsWith(todayStr)).length;

        const nextNumber = count + 1;
        const tokenNumber = `${prefix}-${nextNumber.toString().padStart(3, '0')}`;

        const newQueue = {
            id: Date.now().toString(),
            userId,
            department,
            tokenNumber,
            status: 'waiting',
            createdAt: new Date().toISOString()
        };

        db.queues.push(newQueue);
        writeDB(db);

        res.status(201).json({ success: true, token: tokenNumber });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const getQueueStatus = (req, res) => {
    try {
        const { department } = req.params;
        const db = readDB();

        const servingQueue = db.queues.find(q => q.department === department && q.status === 'serving');
        const waitingCount = db.queues.filter(q => q.department === department && q.status === 'waiting').length;

        res.status(200).json({
            success: true,
            current_token: servingQueue ? servingQueue.tokenNumber : 'None',
            waiting_count: waitingCount
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const nextToken = (req, res) => {
    try {
        const { department } = req.body;
        const db = readDB();

        // Complete current serving token
        db.queues.forEach(q => {
            if (q.department === department && q.status === 'serving') {
                q.status = 'completed';
            }
        });

        // Find next waiting token (sorted implicitly by push order / id)
        const nextQueue = db.queues.find(q => q.department === department && q.status === 'waiting');

        if (!nextQueue) {
            writeDB(db); // Save completions
            return res.status(200).json({ success: true, message: "Queue is empty", next_token: 'None' });
        }

        nextQueue.status = 'serving';
        writeDB(db);

        res.status(200).json({ success: true, next_token: nextQueue.tokenNumber });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { generateToken, getQueueStatus, nextToken };
