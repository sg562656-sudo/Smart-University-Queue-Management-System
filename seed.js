const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'backend/data/db.json');

async function seed() {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const db = {
        users: [
            {
                id: "1",
                name: "Demo Student",
                email: "student@smartuni.edu",
                password: hashedPassword,
                role: "student",
                roll: "2026CS01",
                department: "Computer Science",
                year: "1st",
                createdAt: new Date().toISOString()
            },
            {
                id: "2",
                name: "Transport Staff",
                email: "transport@smartuni.edu",
                password: hashedPassword,
                role: "staff_transport",
                roll: null, department: null, year: null,
                createdAt: new Date().toISOString()
            },
            {
                id: "3",
                name: "Registrar Staff",
                email: "registrar@smartuni.edu",
                password: hashedPassword,
                role: "staff_registrar",
                roll: null, department: null, year: null,
                createdAt: new Date().toISOString()
            },
            {
                id: "4",
                name: "Dean Staff",
                email: "dean@smartuni.edu",
                password: hashedPassword,
                role: "staff_dean",
                roll: null, department: null, year: null,
                createdAt: new Date().toISOString()
            },
            {
                id: "5",
                name: "Canteen Staff",
                email: "canteen@smartuni.edu",
                password: hashedPassword,
                role: "staff_canteen",
                roll: null, department: null, year: null,
                createdAt: new Date().toISOString()
            }
        ],
        queues: []
    };
    
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    console.log("Database seeded successfully with demo accounts.");
}

seed();
