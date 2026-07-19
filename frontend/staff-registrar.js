document.addEventListener("DOMContentLoaded", () => {
    fetchQueueStatus();
    
    // Simple Clock
    setInterval(() => {
        const now = new Date();
        document.getElementById("clock").innerText = now.toLocaleTimeString();
    }, 1000);
});

let currentTokenNum = 15;
let waitingCountNum = 7;

function fetchQueueStatus() {
    document.getElementById("currentToken").innerText = "R-" + currentTokenNum;
    document.getElementById("waitingCount").innerText = waitingCountNum;
}

function callNextToken() {
    if (waitingCountNum > 0) {
        currentTokenNum++;
        waitingCountNum--;
        alert("Next token called: R-" + currentTokenNum);
        fetchQueueStatus();
    } else {
        alert("No more requests in queue.");
    }
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}

function goTransportStaff() {
    window.location.href = "staff-transport.html";
}
