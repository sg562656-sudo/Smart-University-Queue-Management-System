// ===========================================
// SMART UNIVERSITY QUEUE MANAGEMENT SYSTEM
// Dashboard Script - FINAL VERSION
// ===========================================

// ------------------------------
// Student Details from LocalStorage
// ------------------------------

const studentName = localStorage.getItem("studentName") || "Shreya Aggarwal";
const studentRoll = localStorage.getItem("studentRoll") || "2025CSE001";
const studentDepartment = localStorage.getItem("studentDepartment") || 
                         "Computer Science & Engineering (Data Science)";
const studentEmail = localStorage.getItem("studentEmail") || "shreya@gmail.com";

// ------------------------------
// Display Student Information
// ------------------------------

const nameElement = document.getElementById("studentName");
const rollElement = document.getElementById("studentRoll");
const deptElement = document.getElementById("studentDepartment");
const emailElement = document.getElementById("studentEmail");

if (nameElement) nameElement.textContent = studentName;
if (rollElement) rollElement.innerHTML = `🎓 Roll No : ${studentRoll}`;
if (deptElement) deptElement.innerHTML = `🏫 Department : ${studentDepartment}`;
if (emailElement) emailElement.innerHTML = `📧 Email : ${studentEmail}`;

// ------------------------------
// Dynamic Greeting
// ------------------------------

function updateGreeting() {
  const hour = new Date().getHours();
  let greeting = "";

  if (hour < 12) greeting = "☀ Good Morning";
  else if (hour < 17) greeting = "🌤 Good Afternoon";
  else greeting = "🌙 Good Evening";

  const welcomeEl = document.getElementById("welcome");
  if (welcomeEl) {
    welcomeEl.innerHTML = `${greeting}, <b>${studentName}</b>`;
  }
}

updateGreeting();

// ------------------------------
// Live Clock
// ------------------------------

function updateClock() {
  const now = new Date();
  const dateOptions = { 
    weekday: "long", 
    year: "numeric", 
    month: "long", 
    day: "numeric" 
  };

  const date = now.toLocaleDateString("en-IN", dateOptions);
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const clockEl = document.getElementById("clock");
  if (clockEl) {
    clockEl.innerHTML = `📅 ${date} | ⏰ ${time}`;
  }
}

setInterval(updateClock, 1000);
updateClock();

// ------------------------------
// Dashboard Statistics (Live Update)
// ------------------------------

function updateStats() {
  const cards = document.querySelectorAll(".card h2");
  if (cards.length >= 4) {
    cards[0].textContent = Math.floor(Math.random() * 80) + 100;   // Visitors
    cards[1].textContent = Math.floor(Math.random() * 25) + 8;     // Current Queue
    cards[2].textContent = Math.floor(Math.random() * 60) + 80;    // Completed
    cards[3].textContent = Math.floor(Math.random() * 12) + 6 + " min"; // Avg Wait
  }
}

updateStats();
setInterval(updateStats, 10000); // Refresh every 10 seconds

// ------------------------------
// Notification Bell
// ------------------------------

const notifyBtn = document.querySelector(".notify");
if (notifyBtn) {
  notifyBtn.addEventListener("click", function () {
    alert(`📢 SMART UNIVERSITY NOTIFICATIONS\n
🚌 Bus Route No. 5 Updated
📄 Transcript Collection Starts Monday
🎓 Degree Verification Every Friday
🍽️ Canteen Special Combo Offer Today!
👔 Dean Office Appointments Open
💰 Fee Counter Open Till 5 PM

Have a Great Day! 😊`);
  });
}

// ------------------------------
// Navigation Functions
// ------------------------------

function goTransport() {
  window.location.href = "transport.html";
}

function goRegistrar() {
  window.location.href = "registrar.html";
}

function goDean() {
  window.location.href = "dean.html";
}

function goCanteen() {
  window.location.href = "canteen.html";
}

// ------------------------------
// Quick Actions
// ------------------------------

function generateToken() {
  alert("🎟 Your Queue Token has been generated!\n\nToken ID: Q-" + Math.floor(1000 + Math.random() * 9000));
}

function busPass() {
  goTransport();
}

function certificateRequest() {
  goRegistrar();
}

function trackRequest() {
  alert("📋 Request Tracking System\n\nThis feature is connected to backend.\nCheck Registrar or Dean Office.");
}

// ------------------------------
// Module Hover Effects
// ------------------------------

document.querySelectorAll(".module").forEach(module => {
  module.addEventListener("mouseenter", () => {
    module.style.transform = "translateY(-8px)";
    module.style.boxShadow = "0 15px 30px rgba(13, 110, 253, 0.2)";
  });

  module.addEventListener("mouseleave", () => {
    module.style.transform = "translateY(0)";
    module.style.boxShadow = "";
  });
});

// ------------------------------
// Logout Function
// ------------------------------

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.clear();
    window.location.href = "login.html";
  }
}

// ------------------------------
// Console Message
// ------------------------------

console.log("✅ Smart University Queue Management System Dashboard Loaded Successfully!");
console.log("Current User:", studentName);