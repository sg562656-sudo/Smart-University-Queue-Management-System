// ==========================================
// SMART UNIVERSITY QUEUE MANAGEMENT SYSTEM
// ADMIN OFFICE
// ==========================================

// ==========================================
// STUDENT DETAILS
// ==========================================

const studentName = localStorage.getItem("studentName");
const studentRoll = localStorage.getItem("studentRoll");
const studentDepartment = localStorage.getItem("studentDepartment");

if (!studentName) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// ==========================================
// DISPLAY STUDENT DETAILS
// ==========================================

document.getElementById("welcome").innerHTML =
`Welcome, ${studentName} 👋`;

document.getElementById("studentName").innerHTML =
studentName;

document.getElementById("studentRoll").innerHTML =
`🎓 Roll Number : ${studentRoll}`;

document.getElementById("studentDepartment").innerHTML =
`🏫 Department : ${studentDepartment}`;

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
// ADMIN SERVICES
// ==========================================

function requestService(service){

    addHistory(service);

    showToast(`✅ ${service} Submitted Successfully`);

}

// ==========================================
// REQUEST HISTORY
// ==========================================

function addHistory(service){

    const table =
    document.getElementById("historyBody");

    const row =
    document.createElement("tr");

    const today =
    new Date().toLocaleDateString();

    row.innerHTML = `

    <td>${today}</td>

    <td>${service}</td>

    <td class="pending">

    Pending

    </td>

    `;

    table.prepend(row);

}

// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message){

    const toast =
    document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = message;

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
// QUEUE TOKEN
// ==========================================

let savedToken =
localStorage.getItem("adminToken");

if(savedToken){

    document.getElementById("tokenNumber").innerHTML =
    savedToken;

}

function generateToken(){

    const userEmail =
    localStorage.getItem("studentEmail");

    fetch("http://localhost:5000/api/queue/generate",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            userId:userEmail,

            department:"admin"

        })

    })

    .then(res=>res.json())

    .then(data=>{

        if(data.success){

            document.getElementById("tokenNumber").innerHTML =
            data.token;

            localStorage.setItem(
                "adminToken",
                data.token
            );

            showToast(
                `🎟 Token Generated : ${data.token}`
            );

            fetchQueueStatus();

        }

        else{

            alert(data.message);

        }

    })

    .catch(error=>{

        console.log(error);

    });

}

// ==========================================
// QUEUE STATUS
// ==========================================

function fetchQueueStatus(){

    fetch("http://localhost:5000/api/queue/status/admin")

    .then(res=>res.json())

    .then(data=>{

        if(data.success){

            document.getElementById("currentToken").innerHTML =
            data.current_token;

            document.getElementById("studentsAhead").innerHTML =
            data.waiting_count;

            document.getElementById("waitingTime").innerHTML =
            (data.waiting_count*3)+" Minutes";

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

function goRegistrar(){

    window.location.href="registrar.html";

}

function goDean(){

    window.location.href="dean.html";

}

function goFeeCounter(){

    window.location.href="fee.html";

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
// LIVE OFFICE STATS
// ==========================================

function updateStats(){

document.getElementById("visitorCount").innerHTML=

Math.floor(Math.random()*80)+120;

document.getElementById("queueCount").innerHTML=

Math.floor(Math.random()*15)+5;

document.getElementById("completedCount").innerHTML=

Math.floor(Math.random()*40)+90;

document.getElementById("avgTime").innerHTML=

(Math.floor(Math.random()*8)+8)+" min";

}

updateStats();

setInterval(updateStats,10000);

// ==========================================
// OFFICE STATUS
// ==========================================

function officeStatus(){

const hour=new Date().getHours();

if(hour>=9 && hour<17){

showToast("🟢 Admin Office is Open");

}

else{

showToast("🔴 Admin Office is Closed");

}

}

officeStatus();

// ==========================================
// RANDOM NOTICE
// ==========================================

const adminNotices=[

"📢 ID Card Collection Starts Monday",

"📢 Hostel Forms are Available",

"📢 Leave Applications Open",

"📢 Complaint Cell Working 9 AM - 5 PM"

];

setInterval(()=>{

const random=Math.floor(Math.random()*adminNotices.length);

console.log(adminNotices[random]);

},20000);
// ==========================================
// PAGE LOADED
// ==========================================

window.onload=function(){

    showToast("🏢 Welcome to Admin Office");

    console.log("Admin Office Loaded Successfully");

};