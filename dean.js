// dean.js - Professional Dean Office
function switchTab(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
}

function callNext() {
  const tokens = ["D-037", "D-038", "D-039", "D-040"];
  const random = tokens[Math.floor(Math.random() * tokens.length)];
  
  document.getElementById('current-token').textContent = random;

  // Notification
  const notif = document.createElement('div');
  notif.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#28a745;color:white;padding:15px 25px;border-radius:12px;z-index:1000;';
  notif.textContent = `Now Serving: ${random}`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

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