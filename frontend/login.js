let currentRole = "student";

// ==============================
// SELECT ROLE
// ==============================

function selectRole(role) {

    currentRole = role;

    document.querySelectorAll(".role-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(role + "-btn").classList.add("active");
}

// ==============================
// SHOW / HIDE PASSWORD
// ==============================

function togglePassword() {

    const pass = document.getElementById("password");

    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

// ==============================
// LOGIN
// ==============================

document.getElementById("loginForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // ==========================================
    // STAFF LOGIN (Presentation Demo)
    // ==========================================

    if (currentRole === "staff") {

        if (username === "DEAN001" && password === "dean123") {
            window.location.href = "staff-dean.html";
            return;
        }

        if (username === "REGISTRAR001" && password === "registrar123") {
            window.location.href = "staff-registrar.html";
            return;
        }

        if (username === "TRANSPORT001" && password === "transport123") {
            window.location.href = "staff-transport.html";
            return;
        }

        if (username === "ADMIN001" && password === "admin123") {
             window.location.href = "staff-admin.html";

            
            return;
        }

        if (username === "FEE001" && password === "fee123") {
            window.location.href = "staff-fee.html";
            return;
        }

        if (username === "CANTEEN001" && password === "canteen123") {
             window.location.href = "staff-canteen.html";

            return;
        }

        alert("Invalid Staff Credentials");
        return;
    }

    // ==========================================
    // STUDENT LOGIN (Backend)
    // ==========================================

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                roll: username,
                password: password

            })

        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("studentName", data.student.name);
            localStorage.setItem("studentRoll", data.student.roll);
            localStorage.setItem("studentDepartment", data.student.department);
            localStorage.setItem("studentEmail", data.student.email);
            localStorage.setItem("studentYear", data.student.year);

            localStorage.setItem("userRole", "student");
            localStorage.setItem("userName", data.student.name);
            localStorage.setItem("userEmail", data.student.email);

            localStorage.setItem("token", data.token);

            window.location.href = "index.html";

        }

        else {

            alert(data.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to server.");

    }

});