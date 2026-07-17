// ===============================
// SMART UNIVERSITY DASHBOARD
// script.js
// ===============================

// -------------------------------
// Student Details
// -------------------------------

// Get data from localStorage

let studentName = localStorage.getItem("studentName") || "Shreya Aggarwal";
let studentRoll = localStorage.getItem("studentRoll") || "2025CSE001";
let studentDepartment = localStorage.getItem("studentDepartment") || "Computer Science & Engineering (Data Science)";
let studentEmail = localStorage.getItem("studentEmail") || "shreya@gmail.com";

// Display on Dashboard

document.getElementById("studentName").innerHTML = studentName;

document.getElementById("studentRoll").innerHTML = "🎓 Roll No : " + studentRoll;

document.getElementById("studentDepartment").innerHTML = "🏫 Department : " + studentDepartment;

document.getElementById("studentEmail").innerHTML = "📧 Email : " + studentEmail;


// -------------------------------
// Greeting
// -------------------------------

let hour = new Date().getHours();

let greeting = "";

if(hour < 12){

    greeting = "☀ Good Morning";

}

else if(hour < 17){

    greeting = "🌤 Good Afternoon";

}

else{

    greeting = "🌙 Good Evening";

}

document.getElementById("welcome").innerHTML =
greeting + ", <b>" + studentName + "</b>";


// -------------------------------
// Live Clock
// -------------------------------

function updateClock(){

    let now = new Date();

    let options = {

        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'

    };

    let date = now.toLocaleDateString("en-IN",options);

    let time = now.toLocaleTimeString();

    document.getElementById("clock").innerHTML =
    "📅 " + date + " | ⏰ " + time;

}

setInterval(updateClock,1000);

updateClock();


// -------------------------------
// Dashboard Statistics
// -------------------------------

function randomStats(){

    let cards = document.querySelectorAll(".card h2");

    cards[0].innerHTML = Math.floor(Math.random()*100)+100;

    cards[1].innerHTML = Math.floor(Math.random()*30)+10;

    cards[2].innerHTML = Math.floor(Math.random()*100)+50;

    cards[3].innerHTML = Math.floor(Math.random()*15)+5 + " min";

}

randomStats();


// -------------------------------
// Notification Bell
// -------------------------------

document.querySelector(".notify").addEventListener("click",function(){

    alert(

`📢 Latest Notifications

🚌 Bus Route No. 5 Updated

📄 Transcript Collection Starts Monday

🎓 Degree Verification Every Friday

💰 Fee Counter Timings Updated

Have a Great Day 😊`

);

});


// -------------------------------
// Module Navigation
// -------------------------------

function goTransport(){

    window.location.href="transport.html";

}

function goRegistrar(){

    window.location.href="registrar.html";

}


// -------------------------------
// Future Modules
// -------------------------------

let modules=document.querySelectorAll(".module");

modules.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        card.style.transform="translateY(-8px)";

    });

    card.addEventListener("mouseleave",function(){

        card.style.transform="translateY(0px)";

    });

});


// -------------------------------
// Logout
// -------------------------------

function logout(){

    let confirmLogout=confirm("Do you want to Logout?");

    if(confirmLogout){

        window.location.href="login.html";

    }

}


// -------------------------------
// Console Message
// -------------------------------

console.log("Smart University Queue Management System Loaded Successfully.");

// ===============================
// QUICK ACTIONS
// ===============================

function generateToken(){

    alert("🎟 Queue Token feature will be connected with the database.");

}

function busPass(){

    window.location.href="transport.html";

}

function certificateRequest(){

    window.location.href="registrar.html";

}

function trackRequest(){

    alert("📋 Track Request feature will be available after backend integration.");

}