const Student = require("../models/Student");
const bcrypt = require("bcrypt");

// Register Student
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

        // Check if all fields are filled
        if (
            !name ||
            !email ||
            !password ||
            !roll ||
            !department ||
            !year
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        // Check if email already exists
        Student.findByEmail(email, async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database Error"
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            // Encrypt Password
            const hashedPassword = await bcrypt.hash(password, 10);

            const student = {
                name,
                email,
                password: hashedPassword,
                roll,
                department,
                year
            };

            Student.createStudent(student, (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: "Registration Failed"
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Student Registered Successfully!"
                });

            });

        });

    }

    catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    register
};