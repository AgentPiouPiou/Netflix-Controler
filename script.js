const API = "https://api-render-xkka.onrender.com";

let SESSION = null;
let socket;

/* LOGIN */
function login() {
    const password = document.getElementById("password").value;

    fetch(API + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.session) {
            SESSION = data.session;
            localStorage.setItem("session", SESSION);

            document.getElementById("login").classList.add("hidden");
            document.getElementById("app").classList.remove("hidden");

            initSocket();
        } else {
            alert("Mot de passe incorrect");
        }
    });
}

/* AUTO LOGIN */
window.onload = () => {
    const saved = localStorage.getItem("session");
    if (saved) {
        SESSION = saved;
        document.getElementById("login").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");
        initSocket();
    }
};

function initSocket() {
    socket = io(API);

    socket.on("connect", () => {
        document.getElementById("statusDot").style.background = "green";
    });
}

/* SEND ACTION */
function send(action) {
    navigator.vibrate(50);

    fetch(API + "/action", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-SESSION": SESSION
        },
        body: JSON.stringify({ action })
    });
}

/* DARK MODE */
function toggleTheme() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark"));
}

if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
}