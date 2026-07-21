
// ======================================
// STAFF DEAN DASHBOARD
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    
// ================================
// DEMO REQUEST DATA
// ================================

let requests = [

{
    student:"Rahul Sharma",
    request:"Leave Approval",
    status:"Pending"
},

{
    student:"Shreya Aggarwal",
    request:"Scholarship Recommendation",
    status:"Pending"
},

{
    student:"Priya Singh",
    request:"Dean Appointment",
    status:"Pending"
}

];

document.addEventListener("DOMContentLoaded",()=>{

    const staffName =
        localStorage.getItem("staffName") || "Dean";

    document.getElementById("staffName").innerHTML =
        `Welcome, ${staffName}`;

    renderTable();

    updateClock();

    setInterval(updateClock,1000);

});



    // Welcome Name
    const staffName =
        localStorage.getItem("staffName") || "Dean";

    document.getElementById("staffName").innerHTML =
        `Welcome, ${staffName}`;

    // Live Clock
    updateClock();

    setInterval(updateClock,1000);

});

// ======================================
// LIVE CLOCK
// ======================================

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleString();

}


// ======================================
// LOAD REQUEST TABLE
// ======================================

function renderTable(){

    const table =
        document.getElementById("requestTable");

    table.innerHTML = "";

    requests.forEach((item,index)=>{

        table.innerHTML += `

<tr>

<td>${item.student}</td>

<td>${item.request}</td>

<td class="status"
style="color:${item.status==="Approved"?"green":"orange"}">

${item.status}

</td>

<td>

<button
onclick="approveRequest(${index})"

${item.status==="Approved"?"disabled":""}>

${item.status==="Approved"?"Done":"Approve"}

</button>

</td>

</tr>

`;

    });

}


// ======================================
// QUICK ACTIONS
// ======================================


// ======================================
// APPROVE REQUEST
// ======================================

function approveRequest(button){

    const row = button.parentElement.parentElement;

    const status = row.querySelector(".status");

    // Prevent approving twice
    if(status.innerHTML === "Approved"){
        return;
    }

    // Change Status
    status.innerHTML = "Approved";

    status.style.color = "green";

    // Update Button
    button.innerHTML = "Done";

    button.disabled = true;

    button.style.background = "#999";

    // Update Statistics
    const approvalCard =
        document.getElementById("approvals");

    let pending =
        parseInt(approvalCard.innerHTML);

    if(pending > 0){

        approvalCard.innerHTML = pending - 1;

    }

    // Success Message
    showToast("Request Approved Successfully!");
}

// ======================================
// QUICK ACTION BUTTONS
// ======================================


function approveRequest(index){

    requests[index].status = "Approved";

    renderTable();

    let pending =
        requests.filter(r=>r.status==="Pending").length;

    document.getElementById("approvals").innerHTML =
        pending;

    showToast("Request Approved Successfully!");

}



function viewAppointments(){

    alert("Today's appointments loaded.");

}

function facultyMeeting(){

    alert("Faculty meeting schedule opened.");

}

function viewReports(){

    alert("Academic report generated.");

}

// ======================================
// TOAST NOTIFICATION
// ======================================

function showToast(message){

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.innerHTML = "✔ " + message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}


// ======================================
// ADD DEMO REQUEST
// ======================================

function addRequest(){

    const students = [

        "Aman Verma",

        "Riya Kapoor",

        "Karan Mehta",

        "Sneha Gupta",

        "Arjun Singh",

        "Neha Sharma",

        "Vansh Jain"

    ];

    const requestTypes = [

        "Leave Approval",

        "Dean Appointment",

        "Scholarship Recommendation",

        "Internship Permission",

        "Project Approval"

    ];

    const student =
        students[Math.floor(Math.random()*students.length)];

    const request =
        requestTypes[Math.floor(Math.random()*requestTypes.length)];

    requests.push({

        student:student,

        request:request,

        status:"Pending"

    });

    renderTable();

    document.getElementById("approvals").innerHTML =
        requests.filter(r=>r.status==="Pending").length;

    showToast("New Request Received");

}


// ======================================
// LOGOUT
// ======================================

function logout(){

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if(confirmLogout){

        localStorage.clear();

        window.location.href = "login.html";

    }

}


// ======================================
// SEARCH REQUEST
// ======================================

function searchRequest(){

    const keyword =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("#requestTable tr");

    rows.forEach(row=>{

        const student =
            row.cells[0].innerText.toLowerCase();

        const request =
            row.cells[1].innerText.toLowerCase();

        if(

            student.includes(keyword)

            ||

            request.includes(keyword)

        ){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

    });

}
