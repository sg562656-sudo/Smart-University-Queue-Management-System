const { findStudentByRoll } = require("../models/studentModel");

const getProfile = async (req, res) => {

    try {

        const { roll } = req.params;

        const student = await findStudentByRoll(roll);

        if (student.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Student not found."
            });

        }

        res.json({

            success: true,

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

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Server Error"

        });

    }

};

module.exports = {

    getProfile

};