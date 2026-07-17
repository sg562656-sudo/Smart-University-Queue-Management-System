const db = require("../config/db");

// Find student by email
const findByEmail = (email, callback) => {

    const sql = "SELECT * FROM students WHERE email = ?";

    db.query(sql, [email], callback);

};

// Insert new student
const createStudent = (student, callback) => {

    const sql = `
        INSERT INTO students
        (name, email, password, roll, department, year)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            student.name,
            student.email,
            student.password,
            student.roll,
            student.department,
            student.year
        ],
        callback
    );

};

module.exports = {
    findByEmail,
    createStudent
};