// Éléments du DOM
const passwordOutput = document.getElementById('password-output');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lengthSlider = document.getElementById('length-slider');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const strengthBar = document.getElementById('strength-bar');
const notification = document.getElementById('notification');

// Caractères possibles
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Mettre à jour la valeur de la longueur
lengthValue.textContent = lengthSlider.value
lengthSlider.addEventListener('input', function() {
    lengthValue.textContent = this.value;
});


// Générer un mot de passe
function generatePassword() {
    let length = parseInt(lengthSlider.value);
    let chars = '';

    if (uppercaseCheckbox.checked) chars += uppercaseChars;
    if (lowercaseCheckbox.checked) chars += lowercaseChars;
    if (numbersCheckbox.checked) chars += numberChars;
    if (symbolsCheckbox.checked) chars += symbolChars;

    if (!chars) {
        showNotification('Veuillez sélectionner au moins une option');
        return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    updateStrengthMeter(password);
    return password;
}

// Mettre à jour l'indicateur de force
function updateStrengthMeter(password) {
    let strength = 0;

    // Longueur
    if (password.length > 11) strength += 2;
    else if (password.length > 7) strength += 1;

    // Diversité des caractères
    let diversity = 0;
    if (password.match(/[A-Z]/)) diversity++;
    if (password.match(/[a-z]/)) diversity++;
    if (password.match(/[0-9]/)) diversity++;
    if (password.match(/[^A-Za-z0-9]/)) diversity++;

    strength += diversity;

    // Couleur en fonction de la force
    let width = strength * 25;
    if (width > 100) width = 100;

    let color;
    if (strength <= 2) color = '#e63946'; // Rouge
    else if (strength <= 4) color = '#f4a261'; // Orange
    else color = '#2a9d8f'; // Vert

    strengthBar.style.width = width + '%';
    strengthBar.style.backgroundColor = color;
}

// Afficher une notification
function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
    }, 2000);
}

// Copier le mot de passe
copyBtn.addEventListener('click', () => {
    if (!passwordOutput.textContent || passwordOutput.textContent === '') return;

    navigator.clipboard.writeText(passwordOutput.textContent)
        .then(() => showNotification('Mot de passe copié!'))
        .catch(err => showNotification('Échec de la copie'));
});

// Bouton de génération
generateBtn.addEventListener('click', () => {
    const password = generatePassword();
    if (password) {
        passwordOutput.textContent = password;
    }
});

