const os = require("os");

console.log("👤 Utilisateur :", os.userInfo().username);
console.log("💻 Nom de la machine :", os.hostname());
console.log("🧠 Plateforme :", os.platform());
console.log("📦 Architecture CPU :", os.arch());
console.log("🕓 Uptime (minutes) :", Math.floor(os.uptime() / 60));
console.log("📁 Home directory :", os.homedir());
console.log("💾 Mémoire totale (MB) :", Math.round(os.totalmem() / 1024 / 1024));
console.log("💾 Mémoire libre (MB) :", Math.round(os.freemem() / 1024 / 1024));

const cpus = os.cpus();
console.log("🔢 Nombre de CPU :", cpus.length);
console.log("⚙️ Modèle CPU :", cpus[0].model);
