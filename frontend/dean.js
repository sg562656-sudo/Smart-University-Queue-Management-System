// dean.js - Professional Dean Office
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
}

function generateToken() {
  const userEmail = localStorage.getItem("userEmail") || "demo@smartuni.edu";
  fetch("http://localhost:5000/api/queue/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userEmail, department: "dean" })
  })
  .then(res => res.json())
  .then(data => {
      if (data.success) {
          document.getElementById('myToken').textContent = data.token;
          alert(`🎟 New Token Generated: ${data.token}`);
          fetchQueueStatus();
      } else {
          alert(data.message);
      }
  })
  .catch(err => console.error("Error generating token:", err));
}

function fetchQueueStatus() {
  fetch("http://localhost:5000/api/queue/status/dean")
  .then(res => res.json())
  .then(data => {
      if (data.success) {
          document.getElementById("current-token").innerHTML = data.current_token;
      }
  });
}

setInterval(() => {
  fetchQueueStatus();
}, 5000);

function handleAppointment(e) {
  e.preventDefault();
  alert("✅ Appointment Request Submitted Successfully!\n\nThe student will be notified once approved.");
}

function showNotifications() {
  alert("📢 Dean Office Notifications:\n\n• 5 new appointment requests pending\n• Student D-042 waiting since 12 minutes\n• Scholarship request approved");
}

// Live Clock
function updateClock() {
  const clock = document.getElementById('clock');
  if (clock) clock.textContent = new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  switchTab(0);
});