// ==========================================
// SMART UNIVERSITY QUEUE MANAGEMENT SYSTEM
// TRANSPORT OFFICE
// Version 3.0
// ==========================================

// ==========================================
// STUDENT DETAILS
// ==========================================

const student = {
    name: localStorage.getItem("studentName"),
    roll: localStorage.getItem("studentRoll"),
    department: localStorage.getItem("studentDepartment"),
    year: localStorage.getItem("studentYear"),
    email: localStorage.getItem("studentEmail"),
    route: localStorage.getItem("studentRoute") || "Not Assigned Yet"
};

// Redirect if user isn't logged in
if (!student.name) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// ==========================================
// DISPLAY STUDENT INFORMATION
// ==========================================

document.getElementById("studentName").textContent = student.name;

document.getElementById("studentRoll").textContent =
`Roll Number : ${student.roll}`;

document.getElementById("studentDepartment").textContent =
`Department : ${student.department}`;

document.getElementById("studentRoute").textContent =
`Bus Route : ${student.route}`;

// ==========================================
// GREETING
// ==========================================

function updateGreeting() {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if(hour < 12){
        greeting = "Good Morning";
    }
    else if(hour < 17){
        greeting = "Good Afternoon";
    }

    document.getElementById("welcome").innerHTML =
    `${greeting}, ${student.name} 👋`;

}

updateGreeting();

// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
    now.toLocaleString("en-IN");

}

updateClock();

setInterval(updateClock,1000);

// ==========================================
// NAVIGATION
// ==========================================

function goDashboard(){
    window.location.href="index.html";
}

function goRegistrar(){
    window.location.href="registrar.html";
}

function logout(){

    if(confirm("Logout?")){

        localStorage.clear();

        window.location.href="login.html";

    }

}

// ==========================================
// QUEUE MANAGEMENT
// ==========================================

// Load previously generated token (if any)

let savedToken = localStorage.getItem("transportToken");

if (savedToken) {

    document.getElementById("tokenNumber").textContent = savedToken;

}

// ==========================================
// GENERATE QUEUE TOKEN
// ==========================================

async function generateToken() {

    try {

        const response = await fetch("http://localhost:5000/api/queue/generate", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                userId: student.email,
                department: "transport"

            })

        });

        const data = await response.json();

        if (data.success) {

            document.getElementById("tokenNumber").textContent = data.token;

            localStorage.setItem("transportToken", data.token);

            showToast(`🎟 Token Generated : ${data.token}`);

            fetchQueueStatus();

        }

        else {

            showToast(data.message);

        }

    }

    catch (error) {

        console.error(error);

        showToast("❌ Unable to generate token.");

    }

}

// ==========================================
// FETCH LIVE QUEUE STATUS
// ==========================================

async function fetchQueueStatus() {

    try {

        const response = await fetch("http://localhost:5000/api/queue/status/transport");

        const data = await response.json();

        if (data.success) {

            document.getElementById("currentToken").textContent =
            data.current_token;

            document.getElementById("studentsAhead").textContent =
            data.waiting_count;

            document.getElementById("waitingTime").textContent =
            `${data.waiting_count * 3} Minutes`;

        }

    }

    catch(error){

        console.error("Queue Status Error:", error);

    }

}

// Refresh queue every 5 seconds

fetchQueueStatus();

setInterval(fetchQueueStatus,5000);

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message) {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {
        oldToast.remove();
    }

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);

    setTimeout(() => {
        toast.remove();
    }, 3500);

}

// ==========================================
// APPLICATION HISTORY
// ==========================================

function addHistory(service) {

    const table = document.querySelector(".history-table tbody");

    if (!table) return;

    const row = document.createElement("tr");

    const today = new Date().toLocaleDateString("en-IN");

    row.innerHTML = `
        <td>${today}</td>
        <td>${service}</td>
        <td class="pending">Pending</td>
    `;

    table.prepend(row);

}

// ==========================================
// BUS PASS SERVICES
// ==========================================

function applyPass() {

    addHistory("New Bus Pass");

    showToast("✅ Bus Pass Application Submitted");

}

function renewPass() {

    addHistory("Bus Pass Renewal");

    showToast("♻️ Renewal Request Submitted");

}

function downloadPass() {

    showToast("📄 Download Started");

}

// ==========================================
// OFFICE STATUS
// ==========================================

function officeStatus() {

    const hour = new Date().getHours();

    if (hour >= 9 && hour < 17) {

        showToast("🟢 Transport Office is Open");

    }

    else {

        showToast("🔴 Transport Office is Closed");

    }

}

officeStatus();

// ==========================================
// BUS PASS VALIDITY
// ==========================================

const expiryDate = new Date("December 31, 2026");

const today = new Date();

const daysLeft = Math.ceil(

    (expiryDate - today) / (1000 * 60 * 60 * 24)

);

console.log(`Bus Pass Valid for ${daysLeft} days`);

// ==========================================
// TRANSPORT OFFICE
// FINAL INITIALIZATION
// ==========================================

// Simulate queue movement every 15 seconds
setInterval(() => {

    const currentTokenElement = document.getElementById("currentToken");
    const studentsAheadElement = document.getElementById("studentsAhead");
    const waitingTimeElement = document.getElementById("waitingTime");
    const myTokenElement = document.getElementById("tokenNumber");

    if (
        !currentTokenElement ||
        !studentsAheadElement ||
        !waitingTimeElement ||
        !myTokenElement
    ) {
        return;
    }

    let currentToken = parseInt(
        currentTokenElement.textContent.replace("T-", "")
    );

    let myToken = parseInt(
        myTokenElement.textContent.replace("T-", "")
    );

    if (isNaN(currentToken) || isNaN(myToken)) {
        return;
    }

    if (currentToken < myToken) {

        currentToken++;

        currentTokenElement.textContent = "T-" + currentToken;

        const studentsAhead = Math.max(myToken - currentToken, 0);

        studentsAheadElement.textContent = studentsAhead;

        waitingTimeElement.textContent =
            `${studentsAhead * 3} Minutes`;

    }

    if (currentToken === myToken) {

        showToast("🎉 It's your turn! Please proceed to Counter 2.");

    }

}, 15000);


// ==========================================
// RANDOM TRANSPORT NOTICES
// ==========================================

const transportNotices = [

    "🚌 Route 3 bus will depart 10 minutes late.",

    "📢 Carry your University ID while travelling.",

    "✅ Bus Pass Renewal is now open.",

    "🚍 Route 5 timings have been updated.",

    "🚌 Students are requested to reach the bus stop 10 minutes early."

];

setInterval(() => {

    const randomNotice =
        transportNotices[
            Math.floor(Math.random() * transportNotices.length)
        ];

    console.log(randomNotice);

}, 20000);


// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener("load", () => {

    showToast(`Welcome ${student.name} 🚍`);

    console.log("Transport Office Loaded Successfully");

});


// ==========================================
// VERSION
// ==========================================

console.log("Smart University Queue Management System");
console.log("Transport Office Version 3.0");