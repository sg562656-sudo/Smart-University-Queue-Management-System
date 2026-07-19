// =====================================
// SELECT FORM
// =====================================

const registerForm = document.getElementById("registerForm");

// =====================================
// REGISTER EVENT
// =====================================

registerForm.addEventListener("submit", registerStudent);

// =====================================
// REGISTER FUNCTION
// =====================================

async function registerStudent(event){

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    const roll = document.getElementById("roll").value.trim();

    const department = document.getElementById("department").value.trim();

    const year = document.getElementById("year").value;

    if(
        name === "" ||
        email === "" ||
        password === "" ||
        roll === "" ||
        department === "" ||
        year === ""
    ){

        alert("Please fill all the fields.");

        return;

    }

    try {

    const response = await fetch("http://localhost:5000/api/auth/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name,
            email,
            password,
            roll,
            department,
            year

        })

    });

    const data = await response.json();

    if(data.success){

        alert("🎉 Registration Successful!");

        registerForm.reset();

    }

    else{

        alert(data.message);

    }

}

catch(error){

    console.error(error);

    alert("Unable to connect to the server.");

}
}

