// ==========================================
// SMART UNIVERSITY QUEUE MANAGEMENT SYSTEM
// REGISTRAR OFFICE
// ==========================================

// ==========================================
// STUDENT DETAILS
// ==========================================

const student = {

    name: localStorage.getItem("studentName") || "Student",

    roll: localStorage.getItem("studentRoll") || "N/A",

    department: localStorage.getItem("studentDepartment") || "Computer Science",

    email: localStorage.getItem("studentEmail") || "student@smartuni.edu"

};

// Redirect if not logged in
if (!localStorage.getItem("userRole")) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// Display student information
document.getElementById("welcome").innerHTML =
`Welcome, ${student.name} 👋`;

document.getElementById("studentName").innerHTML =
student.name;

document.getElementById("studentRoll").innerHTML =
`🎓 Roll Number : ${student.roll}`;

document.getElementById("studentDepartment").innerHTML =
`🏫 Department : ${student.department}`;


// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
    now.toLocaleString();

}

updateClock();

setInterval(updateClock,1000);


// ==========================================
// TOAST
// ==========================================

function showToast(message){

    const old=document.querySelector(".toast");

    if(old) old.remove();

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>toast.classList.add("show"),100);

    setTimeout(()=>toast.classList.remove("show"),3000);

    setTimeout(()=>toast.remove(),3500);

}


// ==========================================
// REQUEST HISTORY
// ==========================================

function addHistory(service){

    const table=document.querySelector(".history-table tbody");

    if(!table) return;

    const row=document.createElement("tr");

    row.innerHTML=`

        <td>${new Date().toLocaleDateString()}</td>

        <td>${service}</td>

        <td class="pending">Pending</td>

    `;

    table.prepend(row);

}


// ==========================================
// REGISTRAR SERVICES
// ==========================================

function requestService(service){

    addHistory(service);

    showToast(`✅ ${service} Request Submitted`);

}


// ==========================================
// TOKEN GENERATION
// ==========================================

function generateToken(){

    fetch("http://localhost:5000/api/queue/generate",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            userId:student.email,

            department:"registrar"

        })

    })

    .then(res=>res.json())

    .then(data=>{

        if(data.success){

            document.getElementById("tokenNumber").innerHTML=data.token;

            localStorage.setItem("registrarToken",data.token);

            showToast(`🎟 Token Generated : ${data.token}`);

            fetchQueueStatus();

        }

    });

}


// ==========================================
// QUEUE STATUS
// ==========================================

function fetchQueueStatus(){

    fetch("http://localhost:5000/api/queue/status/registrar")

    .then(res=>res.json())

    .then(data=>{

        if(data.success){

            document.getElementById("currentToken").innerHTML=data.current_token;

            document.getElementById("studentsAhead").innerHTML=data.waiting_count;

            document.getElementById("waitingTime").innerHTML=

            `${data.waiting_count*3} Minutes`;

        }

    });

}

fetchQueueStatus();

setInterval(fetchQueueStatus,5000);


// ==========================================
// NAVIGATION
// ==========================================

function goDashboard(){

    window.location.href="index.html";

}

function goTransport(){

    window.location.href="transport.html";

}

function goDean(){

    window.location.href="dean.html";

}

function goCanteen(){

    window.location.href="canteen.html";

}


// ==========================================
// LOGOUT
// ==========================================

function logout(){

    if(confirm("Are you sure you want to logout?")){

        localStorage.clear();

        window.location.href="login.html";

    }

}


// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener("load",()=>{

    showToast("Welcome to Registrar Office 📄");

});

console.log("Registrar Office Loaded Successfully");