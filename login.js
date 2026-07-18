// login.js - Fixed Role Redirection
let currentRole = 'student';

function selectRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.id === `${role}-btn`) btn.classList.add('active');
  });
}

function togglePassword() {
  const pass = document.getElementById('password');
  pass.type = pass.type === "password" ? "text" : "password";
}

// Users Database
const users = {
  student: {
    "2025CSE001": { password: "student123", name: "Shreya Aggarwal", redirect: "index.html" },
    "2025ECE001": { password: "student123", name: "Priya Singh", redirect: "index.html" }
  },
  staff: {
    "DEAN001": { password: "dean123", name: "Dr. Priya Sharma", redirect: "dean.html" },
    "REG001": { password: "reg123", name: "Mr. Amit Verma", redirect: "registrar.html" },
    "ADMIN001": { password: "admin123", name: "Ms. Neha Gupta", redirect: "index.html" }
  }
};

document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  const user = users[currentRole]?.[username];

  if (user && user.password === password) {
    // Save user data
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userRole', currentRole);
    localStorage.setItem('userId', username);

    alert(`✅ Login Successful!\nWelcome, ${user.name}`);

    // Redirect to correct page
    window.location.href = user.redirect;
  } else {
    alert("❌ Invalid credentials.\n\nTry demo login:\nStudent: 2025CSE001 / student123\nStaff: DEAN001 / dean123");
  }
});