let action = null;

const API_URL = "https://api-render-xkka.onrender.com/action"; // à remplacer

function triggerAction(type) {
    action = type;
    updateUI();

    // Envoi à l'API
    sendToAPI(type);

    // Reset après 1 seconde
    setTimeout(() => {
        action = null;
        updateUI();
    }, 1000);
}

function updateUI() {
    document.getElementById("status").innerText = "Action : " + action;
}

function sendToAPI(type) {
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: type })
    })
    .then(res => res.json())
    .then(data => console.log("Réponse API:", data))
    .catch(err => console.error("Erreur API:", err));
}