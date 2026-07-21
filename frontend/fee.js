// ==========================================
// SMART UNIVERSITY
// FEE COUNTER
// ==========================================


// ==========================================
// STUDENT DETAILS
// ==========================================

const studentName = localStorage.getItem("studentName");
const studentRoll = localStorage.getItem("studentRoll");
const studentDepartment = localStorage.getItem("studentDepartment");
const studentYear = localStorage.getItem("studentYear");

if(!studentName){

    alert("Please login first.");

    window.location.href="login.html";

}

document.getElementById("welcome").innerHTML =
`Welcome, ${studentName} 👋`;

document.getElementById("studentName").innerHTML =
studentName;

document.getElementById("studentRoll").innerHTML =
`Roll Number : ${studentRoll}`;

document.getElementById("studentDepartment").innerHTML =
`Department : ${studentDepartment}`;

document.getElementById("studentYear").innerHTML =
`Year : ${studentYear}`;


// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock(){

    document.getElementById("clock").innerHTML =
    new Date().toLocaleString();

}

updateClock();

setInterval(updateClock,1000);


// ==========================================
// PAYMENT
// ==========================================

function payNow(){

    const method =
    document.getElementById("paymentMethod").value;

    alert(`✅ Payment Successful using ${method}`);

}

function downloadReceipt(){

    alert("📄 Receipt Download Started (Demo)");

}


// ==========================================
// QUEUE
// ==========================================

let savedToken = localStorage.getItem("feeToken");

if(savedToken){

    document.getElementById("tokenNumber").innerHTML =
    savedToken;

}

function generateToken(){

    const userEmail =
    localStorage.getItem("studentEmail") ||
    "demo@smartuni.edu";

    fetch("http://localhost:5000/api/queue/generate",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            userId:userEmail,

            department:"fee"

        })

    })

    .then(res=>res.json())

    .then(data=>{

        if(data.success){

            document.getElementById("tokenNumber").innerHTML =
            data.token;

            localStorage.setItem("feeToken",data.token);

            alert("🎟 Token Generated : "+data.token);

            fetchQueueStatus();

        }

        else{

            alert(data.message);

        }

    });

}



function fetchQueueStatus(){

    fetch("http://localhost:5000/api/queue/status/fee")

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

function goAdmin(){

    window.location.href="admin.html";

}

function goCanteen(){

    window.location.href="canteen.html";

}


// ==========================================
// LOGOUT
// ==========================================

function logout(){

    if(confirm("Logout?")){

        localStorage.clear();

        window.location.href="login.html";

    }

}


// ==========================================
// PAGE LOAD
// ==========================================

window.onload=function(){

    console.log("Fee Counter Loaded Successfully 💳");

};