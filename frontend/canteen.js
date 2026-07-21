// ==========================================
// SMART UNIVERSITY QUEUE MANAGEMENT SYSTEM
// CANTEEN OFFICE
// PART 1
// ==========================================


// ==========================================
// LOGIN CHECK
// ==========================================

const studentName =
    localStorage.getItem("studentName");

const studentRoll =
    localStorage.getItem("studentRoll");

const studentDepartment =
    localStorage.getItem("studentDepartment");

const studentEmail =
    localStorage.getItem("studentEmail");

if(!studentName){

    alert("Please login first.");

    window.location.href="login.html";

}


// ==========================================
// DISPLAY STUDENT DETAILS
// ==========================================

document.getElementById("welcome").innerHTML =
`Welcome, ${studentName} 👋`;

document.getElementById("studentName").innerHTML =
studentName;

document.getElementById("studentRoll").innerHTML =
`Roll Number : ${studentRoll}`;

document.getElementById("studentDepartment").innerHTML =
`Department : ${studentDepartment}`;


// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
    now.toLocaleString();

}

updateClock();

setInterval(updateClock,1000);


// ==========================================
// CART
// ==========================================

let cart=[];

let total=0;


// ==========================================
// ADD ITEM
// ==========================================

function addToCart(name,price){

    cart.push({

        name,
        price

    });

    total += price;

    updateCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart(){

    const list =
    document.getElementById("cartItems");

    const totalBox =
    document.getElementById("cartTotal");

    list.innerHTML="";

    cart.forEach(item=>{

        const li=document.createElement("li");

        li.innerHTML=
        `${item.name} - ₹${item.price}`;

        list.appendChild(li);

    });

    totalBox.innerHTML=
    `₹${total}`;

}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart(){

    cart=[];

    total=0;

    updateCart();

}


// ==========================================
// QUEUE TOKEN
// ==========================================

function generateToken(){

fetch("http://localhost:5000/api/queue/generate",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

userId:studentEmail,

department:"canteen"

})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

document.getElementById("tokenNumber").innerHTML=
data.token;

localStorage.setItem(

"canteenToken",

data.token

);

alert(

"Token Generated : "+data.token

);

fetchQueueStatus();

}

else{

alert(data.message);

}

})

.catch(err=>{

console.log(err);

});

}


// ==========================================
// FETCH QUEUE STATUS
// ==========================================

function fetchQueueStatus(){

fetch(

"http://localhost:5000/api/queue/status/canteen"

)

.then(res=>res.json())

.then(data=>{

if(data.success){

document.getElementById(

"currentToken"

).innerHTML=

data.current_token;

document.getElementById(

"studentsAhead"

).innerHTML=

data.waiting_count;

document.getElementById(

"waitingTime"

).innerHTML=

(data.waiting_count*3)+" Minutes";

}

});

}


// ==========================================
// AUTO REFRESH QUEUE
// ==========================================

fetchQueueStatus();

setInterval(fetchQueueStatus,5000);


// ==========================================
// NAVIGATION
// ==========================================

function goDashboard(){

window.location.href="index.html";

}

function goTransport(){

window.location.href="transport.html";

}

function goRegistrar(){

window.location.href="registrar.html";

}

function goDean(){

window.location.href="dean.html";

}


// ==========================================
// LOGOUT
// ==========================================

function logout(){

if(confirm("Logout?")){

localStorage.clear();

window.location.href="login.html";

}

}

console.log("Canteen Part 1 Loaded");

// ==========================================
// CANTEEN PART 2
// ==========================================


// ==========================================
// PLACE ORDER
// ==========================================

function placeOrder(){

    if(cart.length===0){

        alert("🛒 Please add at least one item.");

        return;

    }

    generateToken();

    document.getElementById("orderStatus").innerHTML =
    "👨‍🍳 Preparing Your Order...";

    showToast("✅ Order Placed Successfully!");

    localStorage.setItem("canteenCart",JSON.stringify(cart));

    localStorage.setItem("canteenTotal",total);

    setTimeout(()=>{

        document.getElementById("orderStatus").innerHTML =
        "🍽️ Order Ready for Pickup";

        showToast("🍔 Your Order is Ready!");

    },10000);

    setTimeout(()=>{

        document.getElementById("orderStatus").innerHTML =
        "✅ Order Collected";

        showToast("Thank You! Visit Again 😊");

        clearCart();

    },18000);

}


// ==========================================
// LOAD PREVIOUS CART
// ==========================================

const savedCart =
localStorage.getItem("canteenCart");

const savedTotal =
localStorage.getItem("canteenTotal");

if(savedCart){

    cart = JSON.parse(savedCart);

    total = Number(savedTotal);

    updateCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart(){

    const list =
    document.getElementById("cartItems");

    list.innerHTML="";

    if(cart.length===0){

        list.innerHTML="<li>No items added.</li>";

        document.getElementById("cartTotal").innerHTML="0";

        localStorage.removeItem("canteenCart");

        localStorage.removeItem("canteenTotal");

        return;

    }

    cart.forEach(item=>{

        const li=document.createElement("li");

        li.innerHTML=
        `${item.name} - ₹${item.price}`;

        list.appendChild(li);

    });

    document.getElementById("cartTotal").innerHTML=total;

    localStorage.setItem(

        "canteenCart",

        JSON.stringify(cart)

    );

    localStorage.setItem(

        "canteenTotal",

        total

    );

}


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message){

    const toast=document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

    setTimeout(()=>{

        toast.remove();

    },3500);

}


// ==========================================
// RANDOM SPECIAL OFFER
// ==========================================

const offers=[

"🍕 Buy 1 Pizza Get Coke Free",

"☕ Coffee at ₹49 Today",

"🍔 Burger Combo ₹149",

"🥤 Cold Coffee Flat 25% OFF",

"🍟 Free Fries on Orders Above ₹250"

];

setInterval(()=>{

    const random=

    Math.floor(Math.random()*offers.length);

    console.log(

        "Offer :",

        offers[random]

    );

},20000);


// ==========================================
// PAGE LOADED
// ==========================================

window.addEventListener("load",()=>{

    showToast("🍴 Welcome to Smart University Canteen");

});

