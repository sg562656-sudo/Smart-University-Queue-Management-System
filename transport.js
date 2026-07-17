// ==========================================
// SMART UNIVERSITY QUEUE MANAGEMENT SYSTEM
// TRANSPORT OFFICE
// ==========================================

// ==========================================
// STUDENT DETAILS FROM LOGIN
// ==========================================

const studentName = localStorage.getItem("studentName");
const studentRoll = localStorage.getItem("studentRoll");
const studentDepartment = localStorage.getItem("studentDepartment");
const studentYear = localStorage.getItem("studentYear");
const studentRoute = localStorage.getItem("studentRoute");

// If user directly opens transport page
if (!studentName) {

    alert("Please login first.");

    window.location.href = "login.html";
}

// Display Student Information

document.getElementById("welcome").innerHTML =
`Welcome, ${studentName} 👋`;

document.getElementById("studentName").innerHTML =
studentName;

document.getElementById("studentRoll").innerHTML =
`Roll Number : ${studentRoll}`;

document.getElementById("studentDepartment").innerHTML =
`Department : ${studentDepartment}`;

document.getElementById("studentRoute").innerHTML =
`Bus Route : ${studentRoute}`;



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
// BUS PASS BUTTONS
// ==========================================

function applyPass(){

    alert("✅ Bus Pass Application Submitted Successfully!");

}

function renewPass(){

    alert("♻️ Bus Pass Renewal Request Submitted!");

}

function downloadPass(){

    alert("📄 Download Started (Demo)");

}



// ==========================================
// NAVIGATION
// ==========================================

function goDashboard(){

    window.location.href="index.html";

}

function goRegistrar(){

    window.location.href="registrar.html";

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

console.log("Transport Office Loaded Successfully");s

// ==========================================
// QUEUE TOKEN MANAGEMENT
// ==========================================

// Load saved token if available
let savedToken = localStorage.getItem("transportToken");

if(savedToken){

    document.getElementById("tokenNumber").innerHTML = savedToken;

}

// Generate New Token
function generateToken(){

    const token = "T-" + Math.floor(100 + Math.random() * 900);

    document.getElementById("tokenNumber").innerHTML = token;

    localStorage.setItem("transportToken", token);

    let students = Math.floor(Math.random() * 10) + 1;

    let waiting = students * 3;

    document.getElementById("studentsAhead").innerHTML = students;

    document.getElementById("waitingTime").innerHTML =
    waiting + " Minutes";

    alert("🎟 Queue Token Generated Successfully!");
}



// ==========================================
// LIVE QUEUE SIMULATION
// ==========================================

let current = 95;

setInterval(function(){

    current++;

    if(current > 999){

        current = 95;

    }

    document.getElementById("currentToken").innerHTML =
    "T-" + current;

},10000);



// ==========================================
// STUDENTS AHEAD COUNTER
// ==========================================

setInterval(function(){

    let value =
    parseInt(document.getElementById("studentsAhead").innerHTML);

    if(value > 0){

        value--;

        document.getElementById("studentsAhead").innerHTML = value;

        document.getElementById("waitingTime").innerHTML =
        value * 3 + " Minutes";

    }

},15000);



// ==========================================
// APPLICATION HISTORY
// ==========================================

function addHistory(service){

    const table =
    document.querySelector(".history-table tbody");

    const row = document.createElement("tr");

    const today = new Date().toLocaleDateString();

    row.innerHTML = `

    <td>${today}</td>

    <td>${service}</td>

    <td class="pending">Pending</td>

    `;

    table.prepend(row);

}



// ==========================================
// UPDATE BUTTON FUNCTIONS
// ==========================================

function applyPass(){

    addHistory("New Bus Pass");

    alert("✅ Bus Pass Application Submitted!");

}



function renewPass(){

    addHistory("Bus Pass Renewal");

    alert("♻️ Renewal Request Submitted!");

}



function downloadPass(){

    alert("📄 Bus Pass Download Started (Demo)");

}



// ==========================================
// PAGE LOADED
// ==========================================

window.onload = function(){

    console.log("Transport Office Ready 🚍");

};

// ==========================================
// TRANSPORT OFFICE - PART 3
// Premium Features
// ==========================================


// ==========================================
// TOAST NOTIFICATION
// ==========================================

function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

    setTimeout(()=>{

        toast.remove();

    },3500);

}



// ==========================================
// UPDATE BUTTONS
// ==========================================

function applyPass(){

    addHistory("New Bus Pass");

    showToast("✅ Bus Pass Application Submitted Successfully");

}



function renewPass(){

    addHistory("Bus Pass Renewal");

    showToast("♻️ Renewal Request Submitted");

}



function downloadPass(){

    showToast("📄 Download Started...");

}



// ==========================================
// OFFICE STATUS
// ==========================================

function officeStatus(){

    const hour=new Date().getHours();

    if(hour>=9 && hour<17){

        showToast("🟢 Transport Office is Open");

    }

    else{

        showToast("🔴 Transport Office is Currently Closed");

    }

}

officeStatus();



// ==========================================
// BUS PASS VALIDITY
// ==========================================

const expiryDate=new Date("December 31, 2026");

const today=new Date();

const diff=Math.ceil(

(expiryDate-today)/(1000*60*60*24)

);

console.log("Bus Pass Valid for",diff,"days");



// ==========================================
// GREETING
// ==========================================

function greeting(){

    const hour=new Date().getHours();

    let msg="";

    if(hour<12){

        msg="Good Morning";

    }

    else if(hour<17){

        msg="Good Afternoon";

    }

    else{

        msg="Good Evening";

    }

    document.getElementById("welcome").innerHTML=

    `${msg}, ${studentName} 👋`;

}

greeting();



// ==========================================
// SIMULATE TOKEN CALL
// ==========================================

setInterval(()=>{

let current=parseInt(

document.getElementById("currentToken")

.innerHTML.replace("T-","")

);

let myToken=parseInt(

document.getElementById("tokenNumber")

.innerHTML.replace("T-","")

);

if(current===myToken){

showToast("🎉 It's Your Turn! Please Proceed to Counter 2.");

}

},5000);



// ==========================================
// RANDOM NOTICE UPDATE
// ==========================================

const notices=[

"🚌 Route 3 Bus will depart 10 minutes late.",

"📢 Carry your University ID while travelling.",

"✅ New Bus Pass Applications are Open.",

"🚍 Route 5 timings updated from tomorrow."

];

setInterval(()=>{

const random=

Math.floor(Math.random()*notices.length);

console.log(notices[random]);

},20000);



// ==========================================
// PAGE LOADED
// ==========================================

window.addEventListener("load",()=>{

showToast("Welcome to Transport Office 🚍");

});

console.log("Transport Office Version 2 Loaded");