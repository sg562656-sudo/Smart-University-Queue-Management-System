// canteen.js
const menuItems = [
    { name: "Veg Burger", price: 60, img: "https://source.unsplash.com/random/300x200/?burger" },
    { name: "Paneer Wrap", price: 80, img: "https://source.unsplash.com/random/300x200/?wrap" },
    { name: "Cold Coffee", price: 50, img: "https://source.unsplash.com/random/300x200/?coffee" },
    { name: "French Fries", price: 70, img: "https://source.unsplash.com/random/300x200/?fries" }
];

function loadMenu() {
    const container = document.getElementById('menuGrid');
    container.innerHTML = '';
    
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button class="btn" onclick="addToOrder('${item.name}')">Add to Order</button>
        `;
        container.appendChild(div);
    });
}

function addToOrder(itemName) {
    alert(`✅ ${itemName} added to your order!`);
}

function callNextOrder() {
    const tokens = ["C-084", "C-085", "C-086", "C-087"];
    const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
    document.getElementById('currentToken').textContent = randomToken;
    
    const notif = document.createElement('div');
    notif.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#28a745;color:white;padding:15px 25px;border-radius:12px;';
    notif.textContent = `Now Serving: ${randomToken}`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
}

function switchTab(n) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.getElementById(`tab-${n}`).classList.add('active');
}

function showNotifications() {
    alert("🍔 Canteen Updates:\n\n• Special Offer on Combo Meals\n• Queue wait time ~8 minutes");
}

function logout() {
    window.location.href = "index.html";
}

// Clock
function updateClock() {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'});
}
setInterval(updateClock, 1000);
updateClock();

// Initialize
loadMenu();