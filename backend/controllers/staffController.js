const { findStaffByEmployeeId } = require("../models/staffModel");

const loginStaff = async (req, res) => {

    try {

        const { employeeId, password } = req.body;

        const staff = await findStaffByEmployeeId(employeeId);

        if (staff.length === 0) {

            return res.json({
                success: false,
                message: "Invalid Employee ID"
            });

        }

        if (staff[0].password !== password) {

            return res.json({
                success: false,
                message: "Incorrect Password"
            });

        }

        res.json({

            success: true,

            staff: {

                id: staff[0].id,
                name: staff[0].name,
                employee_id: staff[0].employee_id,
                email: staff[0].email,
                department: staff[0].department,
                role: staff[0].role

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

    loginStaff

};