const pool = require("../config/mysql");

// Find student by roll number
const findStudentByRoll = async (roll) => {

    const [rows] = await pool.query(
        "SELECT * FROM students WHERE roll = ?",
        [roll]
    );

    return rows;
};

// Find student by email
const findStudentByEmail = async (email) => {

    const [rows] = await pool.query(
        "SELECT * FROM students WHERE email = ?",
        [email]
    );

    return rows;
};

// Create student
const createStudent = async (
    name,
    email,
    password,
    roll,
    department,
    year
) => {

    const [result] = await pool.query(

        `INSERT INTO students
        (name,email,password,roll,department,year)
        VALUES (?,?,?,?,?,?)`,

        [name,email,password,roll,department,year]

    );

    return result;

};

module.exports = {

    findStudentByRoll,
    findStudentByEmail,
    createStudent

};