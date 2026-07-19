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
  const userEmail = localStorage.getItem("userEmail") || "demo@smartuni.edu";
  fetch("http://localhost:5000/api/queue/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userEmail, department: "registrar" })
  })
  .then(res => res.json())
  .then(data => {
      if (data.success) {
          document.getElementById('tokenNumber').textContent = data.token;
          alert(`🎟 New Token Generated: ${data.token}`);
          fetchQueueStatus();
      } else {
          alert(data.message);
      }
  })
  .catch(err => console.error("Error generating token:", err));
}

function fetchQueueStatus() {
  fetch("http://localhost:5000/api/queue/status/registrar")
  .then(res => res.json())
  .then(data => {
      if (data.success) {
          document.getElementById("currentToken").innerHTML = data.current_token;
          document.getElementById("studentsAhead").innerHTML = data.waiting_count;
          document.getElementById("waitingTime").innerHTML = (data.waiting_count * 3) + " Minutes";
      }
  });
}

setInterval(() => {
  fetchQueueStatus();
}, 5000);


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