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

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

    // Demo Frontend Login Logic
    if (currentRole === 'staff') {
        if (username === 'DEAN001' && password === 'dean123') {
            localStorage.setItem('userRole', 'staff_dean');
            localStorage.setItem('userName', 'Dean');
            window.location.href = "staff-dean.html";
        } else if (username === 'REGISTRAR001' && password === 'registrar123') {
            localStorage.setItem('userRole', 'staff_registrar');
            localStorage.setItem('userName', 'Registrar');
            window.location.href = "staff-registrar.html";
        } else if (username === 'TRANSPORT001' && password === 'transport123') {
            localStorage.setItem('userRole', 'staff_transport');
            localStorage.setItem('userName', 'Transport Officer');
            window.location.href = "staff-transport.html";
        } else if (username === 'CANTEEN001' && password === 'canteen123') {
            localStorage.setItem('userRole', 'staff_canteen');
            localStorage.setItem('userName', 'Canteen Manager');
            window.location.href = "staff-canteen.html";
        } else {
            alert("❌ Invalid Staff Credentials");
        }
    } else {
        if (username === '2025CSE001' && password === 'student123') {
            localStorage.setItem('studentName', 'Shreya Aggarwal');
            localStorage.setItem('studentRoll', '2025CSE001');
            localStorage.setItem('userRole', 'student');
            localStorage.setItem('userName', 'Shreya Aggarwal');
            window.location.href = "index.html";
        } else {
            alert("❌ Invalid Student Credentials");
        }
    }
});