// ======================================
// SMART UNIVERSITY QUEUE MANAGEMENT SYSTEM
// LOGIN PAGE
// ======================================

// ------------------------------
// Demo Student Database
// ------------------------------

const students = [

{
    roll:"2025CSE001",
    password:"student123",
    name:"Shreya Aggarwal",
    department:"Computer Science & Engineering (Data Science)",
    year:"Second Year",
    email:"shreya@gmail.com",
    phone:"9876543210",
    route:"Route 5"
},

{
    roll:"2025CSE002",
    password:"student123",
    name:"Rahul Sharma",
    department:"Computer Science & Engineering (AI & ML)",
    year:"Second Year",
    email:"rahul@gmail.com",
    phone:"9876543201",
    route:"Route 2"
},

{
    roll:"2025ECE001",
    password:"student123",
    name:"Priya Singh",
    department:"Electronics & Communication",
    year:"Third Year",
    email:"priya@gmail.com",
    phone:"9876543202",
    route:"Route 1"
}

];

// ------------------------------
// Password Show / Hide
// ------------------------------

const password=document.getElementById("password");

const toggle=document.getElementById("togglePassword");

toggle.addEventListener("click",()=>{

    if(password.type==="password"){

        password.type="text";

        toggle.innerHTML='<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        password.type="password";

        toggle.innerHTML='<i class="fa-solid fa-eye"></i>';

    }

});

// ------------------------------
// Login Validation
// ------------------------------

document.getElementById("loginForm").addEventListener("submit",function(e){

    e.preventDefault();

    let roll=document.getElementById("roll").value.trim();

    let pass=document.getElementById("password").value.trim();

    const student=students.find(s=>s.roll===roll && s.password===pass);

    if(student){

        // Save student details

        localStorage.setItem("studentName",student.name);
        localStorage.setItem("studentRoll",student.roll);
        localStorage.setItem("studentDepartment",student.department);
        localStorage.setItem("studentYear",student.year);
        localStorage.setItem("studentEmail",student.email);
        localStorage.setItem("studentPhone",student.phone);
        localStorage.setItem("studentRoute",student.route);

        // Loading effect

        const btn=document.querySelector("button");

        btn.innerHTML="Logging In...";

        btn.disabled=true;

        setTimeout(()=>{

            alert("Welcome " + student.name + " 🎉");

            window.location.href="index.html";

        },1500);

    }

    else{

        alert("❌ Invalid Roll Number or Password");

    }

});

// ------------------------------
// Enter Key Support
// ------------------------------

document.addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        document.getElementById("loginForm").requestSubmit();

    }

});

// ------------------------------
// Console
// ------------------------------

console.log("Login Page Loaded Successfully");