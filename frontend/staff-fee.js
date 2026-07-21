
// ======================================
// FEE COUNTER DASHBOARD V2.0
// ======================================

// -------------------------------
// Demo Data
// -------------------------------

let requests = [

{
    student:"Rahul Sharma",
    amount:"₹45,000",
    status:"Pending"
},

{
    student:"Priya Singh",
    amount:"₹38,500",
    status:"Pending"
},

{
    student:"Aman Verma",
    amount:"₹27,000",
    status:"Pending"
}

];

// -------------------------------
// Page Load
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

    const staffName =
        localStorage.getItem("staffName") || "Fee Officer";

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

<td>${item.amount}</td>

<td class="status"
style="color:${item.status==="Paid"?"green":"orange"}">

${item.status}

</td>

<td>

<button

onclick="collectFee(${index})"

${item.status==="Paid"?"disabled":""}>

${item.status==="Paid"?"Collected":"Collect"}

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

    const paid =
        requests.filter(r=>r.status==="Paid").length;

    document.getElementById("pendingCount").innerHTML =
        pending;

    document.getElementById("paidCount").innerHTML =
        paid;

}

// -------------------------------
// Collect Fee
// -------------------------------

function collectFee(index){

    requests[index].status="Paid";

    renderTable();

    updateCards();

    showToast("Fee Collected Successfully");

}

// -------------------------------
// Add Demo Payment
// -------------------------------

function addRequest(){

    const students=[

        "Neha Sharma",
        "Karan Mehta",
        "Riya Kapoor",
        "Harsh Gupta",
        "Vansh Jain",
        "Ananya Verma"

    ];

    const amounts=[

        "₹42,000",
        "₹30,500",
        "₹55,000",
        "₹36,200",
        "₹48,000"

    ];

    requests.push({

        student:students[Math.floor(Math.random()*students.length)],

        amount:amounts[Math.floor(Math.random()*amounts.length)],

        status:"Pending"

    });

    renderTable();

    updateCards();

    showToast("New Fee Payment Added");

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

        const amount =
            row.cells[1].innerText.toLowerCase();

        row.style.display =
            student.includes(keyword) ||
            amount.includes(keyword)
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

    showToast("Fee Report Downloaded");

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
