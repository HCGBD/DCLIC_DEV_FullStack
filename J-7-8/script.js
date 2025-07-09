// Validation Inscription
function validerInscription() {
    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const mdp = document.getElementById("mdp").value;
    const confirmerMdp = document.getElementById("confirmerMdp").value;

    // Réinitialiser les messages d'erreur
    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

    let isValid = true;

    // Validation Nom (min 3 caractères)
    if (nom.length < 3) {
        document.querySelector("#nom + .error-message").style.display = "block";
        isValid = false;
    }

    // Validation Prénom (min 3 caractères)
    if (prenom.length < 3) {
        document.querySelector("#prenom + .error-message").style.display = "block";
        isValid = false;
    }

    // Validation Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        document.querySelector("#email + .error-message").style.display = "block";
        isValid = false;
    }

    // Validation Mot de passe (8 caractères)
    if (mdp.length < 8) {
        document.querySelector("#mdp + .error-message").style.display = "block";
        isValid = false;
    }

    // Confirmation Mot de passe
    if (mdp !== confirmerMdp) {
        document.querySelector("#confirmerMdp + .error-message").style.display = "block";
        isValid = false;
    }

    if (isValid) {
        showNotification("Inscription réussie !")
        // Redirection vers la page de connexion
        setTimeout(()=>{
            window.location.href = "connexion.html";
        },3000)
    }

    return false;
}

// Validation Connexion (simplifiée)
function validerConnexion() {
    const email = document.getElementById("email").value.trim();
    const mdp = document.getElementById("mdp").value;

    document.querySelectorAll(".error-message").forEach(el => el.style.display = "none");

    let isValid = true;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        document.querySelector("#email + .error-message").style.display = "block";
        isValid = false;
    }

    if (mdp.length < 8) {
        document.querySelector("#mdp + .error-message").style.display = "block";
        isValid = false;
    }

    if (isValid) {
       showNotification("Connexion réussie !")


       setTimeout(()=>{
            window.location.href = "index.html";
       },3000)
    }

    return false; // Empêche l'envoi du formulaire (pour la démo)
}

function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}