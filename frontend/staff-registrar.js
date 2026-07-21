
// ======================================
// REGISTRAR DASHBOARD V2.0
// ======================================

// -------------------------------
// Demo Data
// -------------------------------

let requests = [

{
    student:"Rahul Sharma",
    request:"Bonafide Certificate",
    status:"Pending"
},

{
    student:"Priya Singh",
    request:"Transcript",
    status:"Pending"
},

{
    student:"Aman Verma",
    request:"Degree Verification",
    status:"Pending"
}

];

// -------------------------------
// Page Load
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

    const staffName =
        localStorage.getItem("staffName") || "Registrar";

    document.getElementById("staffName").innerHTML =
        `Welcome, ${staffName}`;

    renderTable();

    updateCards();

    updateClock();

    setInterval(updateClock,1000);

});

// -------------------------------
// Clock
// -------------------------------

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleString();

}

// -------------------------------
// Render Table
// -------------------------------

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
style="color:${item.status==="Issued"?"green":"orange"}">

${item.status}

</td>

<td>

<button

onclick="issueCertificate(${index})"

${item.status==="Issued"?"disabled":""}>

${item.status==="Issued"?"Done":"Issue"}

</button>

</td>

</tr>

`;

    });

}

// -------------------------------
// Update Cards
// -------------------------------

function updateCards(){

    const pending =
        requests.filter(r=>r.status==="Pending").length;

    const completed =
        requests.filter(r=>r.status==="Issued").length;

    document.getElementById("pendingCount").innerHTML =
        pending;

    document.getElementById("completedCount").innerHTML =
        completed;

}

// -------------------------------
// Issue Certificate
// -------------------------------

function issueCertificate(index){

    requests[index].status = "Issued";

    renderTable();

    updateCards();

    showToast("Certificate Issued Successfully");

}

// -------------------------------
// Add Demo Request
// -------------------------------

function addRequest(){

    const students=[

        "Neha Sharma",

        "Vansh Jain",

        "Riya Kapoor",

        "Karan Mehta",

        "Aditi Verma",

        "Harsh Gupta"

    ];

    const requestTypes=[

        "Migration Certificate",

        "Transcript",

        "Degree Verification",

        "Character Certificate",

        "Bonafide Certificate"

    ];

    const student=
        students[Math.floor(Math.random()*students.length)];

    const request=
        requestTypes[Math.floor(Math.random()*requestTypes.length)];

    requests.push({

        student,

        request,

        status:"Pending"

    });

    renderTable();

    updateCards();

    showToast("New Certificate Request Added");

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

        if(student.includes(keyword) ||
           request.includes(keyword)){

            row.style.display="";

        }

        else{

            row.style.display="none";

        }

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

    showToast("Report Download Started");

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
