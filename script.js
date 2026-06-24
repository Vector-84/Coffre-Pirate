"use strict";

// Enregistrer le service worker pour PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").catch(err => 
    console.log("Service worker registration failed: ", err)
  );
}

// Sélection des éléments
const histoBtn = document.getElementById("histo");
const accBtn = document.getElementById("acc");
const ajouBtn = document.getElementById("ajouter");
const deduiBtn = document.getElementById("deduire");
const mntChamp = document.getElementById("mnt");
const corChamp = document.getElementById("cor");
const sold = document.getElementById("solde");

// Overlay et boîte de confirmation
const raz = document.getElementById("reset");
const overlay = document.getElementById("overlay");
const confirmBox = document.getElementById("confirm-reset");
const confirmBtn = document.getElementById("confirm-btn");
const cancelBtn = document.getElementById("cancel-btn");

// Historique
let historique = JSON.parse(localStorage.getItem("historique")) || [];

// Solde
let solde = Number(localStorage.getItem("solde")) || 0;
if (sold) sold.innerText = "Solde: " + solde + "€";

// Navigation
if (histoBtn) {
  histoBtn.addEventListener("click", () => {
    window.location.href = "historique.html";
  });
}
if (accBtn) {
  accBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Fonction pour ajouter une opération
function ajouterOperation(type) {
  const montant = Number(mntChamp.value);
  const correspondance = corChamp.value.trim();
  if (isNaN(montant) || montant === 0) return;

  // Montant signé
  const montantSigne = type === "ajout" ? montant : -montant;

  // Mise à jour solde
  solde += montantSigne;
  if (sold) sold.innerText = "Solde: " + solde + "€";
  localStorage.setItem("solde", solde);

  // Ajouter à l'historique
  const now = new Date();
  const dateStr = now.toLocaleDateString() + " " + now.toLocaleTimeString();
  historique.push({
    date: dateStr,
    montant: montantSigne,
    correspondance: correspondance || "-"
  });
  localStorage.setItem("historique", JSON.stringify(historique));

  // Reset champs
  mntChamp.value = "";
  corChamp.value = "";
}

// Boutons +
if (ajouBtn) {
  ajouBtn.addEventListener("click", () => ajouterOperation("ajout"));
}

// Boutons -
if (deduiBtn) {
  deduiBtn.addEventListener("click", () => ajouterOperation("deduction"));
}

// Bouton reset
if (raz) {
  raz.addEventListener("click", () => {
    overlay.style.display = "block";
    confirmBox.style.display = "flex";
  });
}

// Confirmer reset
if (confirmBtn) {
  confirmBtn.addEventListener("click", () => {
    solde = 0;
    historique = [];
    if (sold) sold.innerText = "Solde: 0€";
    localStorage.setItem("solde", 0);
    localStorage.setItem("historique", JSON.stringify(historique));

    overlay.style.display = "none";
    confirmBox.style.display = "none";
  });
}

// Annuler reset
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    confirmBox.style.display = "none";
  });
}

// --- Historique page ---
document.addEventListener("DOMContentLoaded", () => {
  const histSection = document.querySelector(".hst");
  const soldeH = document.querySelector("h2");

  // Afficher solde (seulement si h2 n'est pas dans un header)
  if (soldeH && soldeH.parentElement.tagName !== "HEADER") soldeH.innerText = "Solde: " + solde + "€";

  // Afficher historique
  if (histSection && historique.length > 0) {
    histSection.innerHTML = ""; // reset
    historique.slice().reverse().forEach(op => {
      const p = document.createElement("p");
      const icon = op.montant > 0
        ? "💰"  // pièce pour ajout
        : "☠️"; // tête de mort pour retrait
      const signe = op.montant > 0 ? "+" : "";
      p.innerText = `${icon} ${signe}${op.montant}€ | ${op.date} | ${op.correspondance}`;
      histSection.appendChild(p);
    });
  }
});
