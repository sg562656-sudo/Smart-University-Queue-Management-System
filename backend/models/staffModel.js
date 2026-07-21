const db = require("../config/mysql");

const findStaffByEmployeeId = async (employeeId) => {

    const [rows] = await db.execute(
        "SELECT * FROM staff WHERE employee_id = ?",
        [employeeId]
    );

    return rows;
};

module.exports = {
    findStaffByEmployeeId
};