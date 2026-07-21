
// ======================================
// CANTEEN DASHBOARD V2.0
// ======================================

// -------------------------------
// Demo Data
// -------------------------------

let requests = [

{
    student:"Rahul Sharma",
    order:"Burger + Coke",
    status:"Preparing"
},

{
    student:"Priya Singh",
    order:"Pizza",
    status:"Preparing"
},

{
    student:"Aman Verma",
    order:"Sandwich + Juice",
    status:"Preparing"
}

];

// -------------------------------
// Page Load
// -------------------------------

document.addEventListener("DOMContentLoaded",()=>{

    const staffName =
        localStorage.getItem("staffName") || "Canteen Staff";

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

<td>${item.order}</td>

<td class="status"
style="color:${item.status==="Completed"?"green":"orange"}">

${item.status}

</td>

<td>

<button

onclick="completeOrder(${index})"

${item.status==="Completed"?"disabled":""}>

${item.status==="Completed"?"Done":"Complete"}

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
        requests.filter(r=>r.status==="Preparing").length;

    const completed =
        requests.filter(r=>r.status==="Completed").length;

    document.getElementById("pendingCount").innerHTML =
        pending;

    document.getElementById("completedCount").innerHTML =
        completed;

}

// -------------------------------
// Complete Order
// -------------------------------

function completeOrder(index){

    requests[index].status="Completed";

    renderTable();

    updateCards();

    showToast("Order Completed");

}

// -------------------------------
// Add Demo Order
// -------------------------------

function addRequest(){

    const students=[

        "Neha Sharma",
        "Riya Kapoor",
        "Harsh Gupta",
        "Karan Mehta",
        "Vansh Jain",
        "Ananya Verma"

    ];

    const foods=[

        "Burger",
        "Pizza",
        "Cold Coffee",
        "Pasta",
        "Momos",
        "Veg Thali",
        "Sandwich",
        "French Fries",
        "Juice",
        "Noodles"

    ];

    const food =
        foods[Math.floor(Math.random()*foods.length)];

    requests.push({

        student:
        students[Math.floor(Math.random()*students.length)],

        order:food,

        status:"Preparing"

    });

    renderTable();

    updateCards();

    showToast("New Food Order Added");

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

        const order =
            row.cells[1].innerText.toLowerCase();

        row.style.display =
            student.includes(keyword) ||
            order.includes(keyword)
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

    showToast("Sales Report Downloaded");

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
