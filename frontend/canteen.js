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

function getOrders() {
    return JSON.parse(localStorage.getItem('canteenOrders')) || [];
}

function saveOrders(orders) {
    localStorage.setItem('canteenOrders', JSON.stringify(orders));
}

function addToOrder(itemName) {
    const studentName = localStorage.getItem('studentName') || 'Student';
    const rollNo = localStorage.getItem('studentRoll') || 'DemoRoll';
    
    let orders = getOrders();
    const orderId = 'C-' + (100 + orders.length + 1);
    
    const newOrder = {
        id: orderId,
        studentName: studentName,
        rollNo: rollNo,
        item: itemName,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        status: 'Waiting'
    };
    
    orders.push(newOrder);
    saveOrders(orders);
    
    document.getElementById('myToken').textContent = orderId;
    alert(`✅ ${itemName} added to your order!\nYour token is ${orderId}`);
    fetchQueueStatus();
}

function fetchQueueStatus() {
    let orders = getOrders();
    
    // Live Queue Tab
    const waitingOrders = orders.filter(o => o.status === 'Waiting');
    const waitingList = document.getElementById('waitingList');
    if (waitingList) {
        waitingList.innerHTML = '';
        waitingOrders.forEach(o => {
            const li = document.createElement('li');
            li.textContent = `${o.id} - ${o.item} (${o.studentName})`;
            waitingList.appendChild(li);
        });
    }
    
    // Currently Serving (finding the last Served or first Waiting)
    const servedOrders = orders.filter(o => o.status === 'Served' || o.status === 'Ready');
    const currentlyServing = servedOrders.length > 0 ? servedOrders[servedOrders.length - 1].id : 'None';
    const currentTokenEl = document.getElementById("currentToken");
    if (currentTokenEl) currentTokenEl.innerHTML = currentlyServing;
    
    // My Orders Tab
    const rollNo = localStorage.getItem('studentRoll') || 'DemoRoll';
    const myOrders = orders.filter(o => o.rollNo === rollNo);
    const ordersBody = document.getElementById('ordersBody');
    if (ordersBody) {
        ordersBody.innerHTML = '';
        myOrders.reverse().forEach(o => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${o.id}</td>
                <td>${o.item}</td>
                <td>${o.time}</td>
                <td><strong style="color: ${o.status === 'Waiting' ? 'orange' : 'green'}">${o.status}</strong></td>
            `;
            ordersBody.appendChild(tr);
        });
    }
}

setInterval(() => {
  fetchQueueStatus();
}, 2000);


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