const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    findStudentByEmail,
    findStudentByRoll,
    createStudent
} = require("../models/studentModel");

// ==============================
// REGISTER STUDENT
// ==============================

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            roll,
            department,
            year
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !roll
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        const existingUser = await findStudentByEmail(email);

        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createStudent(
            name,
            email,
            hashedPassword,
            roll,
            department,
            year
        );

        res.status(201).json({
            success: true,
            message: "Registration Successful"
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ==============================
// LOGIN STUDENT
// ==============================

const login = async (req, res) => {
        console.log("LOGIN REQUEST RECEIVED");

    try {

        const { roll, password } = req.body;

        if (!roll || !password) {

            return res.status(400).json({

                success: false,

                message: "Please enter Roll Number and Password."

            });

        }

        const student = await findStudentByRoll(roll);

        if (student.length === 0) {

            return res.status(404).json({

                success: false,

                message: "Student not found."

            });

        }

        const isMatch = await bcrypt.compare(
            password,
            student[0].password
        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Incorrect Password."

            });

        }

        const token = jwt.sign(

            {
                id: student[0].id,
                roll: student[0].roll
            },

            process.env.JWT_SECRET || "secret_key",

            {
                expiresIn: "1d"
            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            student: {

                id: student[0].id,
                name: student[0].name,
                email: student[0].email,
                roll: student[0].roll,
                department: student[0].department,
                year: student[0].year

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {

    register,
    login

};