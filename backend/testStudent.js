const {
    findStudentByEmail
} = require("./models/studentModel");

async function test() {

    const student = await findStudentByEmail(
        "abc@gmail.com"
    );

    console.log(student);

}

test();