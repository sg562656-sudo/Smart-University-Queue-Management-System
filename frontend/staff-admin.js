
// ======================================
// ADMIN DASHBOARD V2.0
// ======================================

// -------------------------------
// Demo Data
// -------------------------------

let requests = [

{
    student:"Rahul Sharma",
    request:"New Student Registration",
    status:"Pending"
},

{
    student:"Priya Singh",
    request:"ID Card Request",
    status:"Pending"
},

{
    student:"Aman Verma",
    request:"Document Verification",
    status:"Pending"
}

];

// -------------------------------
// Page Load
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

    const staffName =
        localStorage.getItem("staffName") || "Administrator";

    document.getElementById("staffName").innerHTML =
        `Welcome, ${staffName}`;

    renderTable();

    updateCards();

    updateClock();

    setInterval(updateClock,1000);

});

// -------------------------------
// Live Clock
// -------------------------------

function updateClock(){

    document.getElementById("clock").innerHTML =
        new Date().toLocaleString();

}

// -------------------------------
// Render Table
// -------------------------------

function renderTable(){

    const table =
        document.getElementById("requestTable");

    table.innerHTML="";

    requests.forEach((item,index)=>{

        table.innerHTML += `

<tr>

<td>${item.student}</td>

<td>${item.request}</td>

<td class="status"
style="color:${item.status==="Verified"?"green":"orange"}">

${item.status}

</td>

<td>

<button

onclick="verifyRequest(${index})"

${item.status==="Verified"?"disabled":""}>

${item.status==="Verified"?"Done":"Verify"}

</button>

</td>

</tr>

`;

    });

}

// -------------------------------
// Statistics
// -------------------------------

function updateCards(){

    const pending =
        requests.filter(r=>r.status==="Pending").length;

    const verified =
        requests.filter(r=>r.status==="Verified").length;

    document.getElementById("pendingCount").innerHTML =
        pending;

    document.getElementById("verifiedCount").innerHTML =
        verified;

}

// -------------------------------
// Verify Request
// -------------------------------

function verifyRequest(index){

    requests[index].status="Verified";

    renderTable();

    updateCards();

    showToast("Request Verified Successfully");

}

// -------------------------------
// Add Demo Request
// -------------------------------

function addRequest(){

    const students=[

        "Neha Sharma",
        "Riya Kapoor",
        "Karan Mehta",
        "Harsh Gupta",
        "Ananya Verma",
        "Vansh Jain"

    ];

    const requestTypes=[

        "New Student Registration",
        "ID Card Request",
        "Document Verification",
        "Address Update",
        "Duplicate ID Card"

    ];

    requests.push({

        student:students[Math.floor(Math.random()*students.length)],

        request:requestTypes[Math.floor(Math.random()*requestTypes.length)],

        status:"Pending"

    });

    renderTable();

    updateCards();

    showToast("New Administrative Request Added");

}

// -------------------------------
// Search
// -------------------------------

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

        row.style.display =
            student.includes(keyword) ||
            request.includes(keyword)
            ? ""
            : "none";

    });

}

// -------------------------------
// Refresh
// -------------------------------

function refreshTable(){

    renderTable();

    updateCards();

    showToast("Dashboard Refreshed");

}

// -------------------------------
// Download Report
// -------------------------------

function downloadReport(){

    showToast("Admin Report Downloaded");

}

// -------------------------------
// Toast
// -------------------------------

function showToast(message){

    const toast =
        document.getElementById("toast");

    document.getElementById("toastMessage").innerHTML =
        "✔ " + message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}

// -------------------------------
// Logout
// -------------------------------

function logout(){

    localStorage.clear();

    window.location.href="login.html";

}
