// registrar.js
// Role Check
const userRole = localStorage.getItem('userRole');
const userName = localStorage.getItem('userName');

if (!userRole) {
  alert("Please login first!");
  window.location.href = "login.html";
}

document.getElementById('welcome').textContent = `Welcome, ${userName || 'Student'}`;

// Student Info
document.getElementById('studentName').textContent = userName || "Shreya Aggarwal";
document.getElementById('studentRoll').textContent = "🎓 Roll No: 2025CSE001";
document.getElementById('studentDepartment').textContent = "🏫 Department: Computer Science";

// Clock
function updateClock() {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// Functions
function requestService(service) {
  alert(`✅ ${service} request submitted successfully!\n\nYou will be notified when processed.`);
}

function generateToken() {
  const token = "R-" + Math.floor(100 + Math.random() * 900);
  document.getElementById('tokenNumber').textContent = token;
  alert(`🎟 New Token Generated: ${token}`);
}

function goDashboard() { window.location.href = "index.html"; }
function goTransport() { window.location.href = "transport.html"; }
function goDean() { window.location.href = "dean.html"; }
function goCanteen() { window.location.href = "canteen.html"; }

function logout() {
  if (confirm("Logout?")) {
    localStorage.clear();
    window.location.href = "login.html";
  }
}