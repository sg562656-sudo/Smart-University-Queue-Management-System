document.addEventListener("DOMContentLoaded", () => {
    fetchQueueStatus();
    
    // Simple Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById("clock").innerText = now.toLocaleTimeString();
    }, 1000);
});

let currentTokenNum = 8;
let waitingCountNum = 4;

function fetchQueueStatus() {
    document.getElementById("currentToken").innerText = "T-" + currentTokenNum;
    document.getElementById("waitingCount").innerText = waitingCountNum;
}

function callNextToken() {
    if (waitingCountNum > 0) {
        currentTokenNum++;
        waitingCountNum--;
        alert("Next token called: T-" + currentTokenNum);
        fetchQueueStatus();
    } else {
        alert("No more requests in queue.");
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

function goRegistrarStaff() {
    window.location.href = "staff-registrar.html";
}
