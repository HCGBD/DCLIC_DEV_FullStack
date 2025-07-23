const fs = require ('fs');
const path = require('path')
const os  = require('os')

fs.mkdir("./logs",{recursive:true},(err)=>{
    if(err) throw err;
    console.log("Dossier 'logs' créé avec succès.");
    
})




const username = os.userInfo().username;
const osVersion = os.version ? os.version(): 'Inconnu';
const cpus = os.cpus();
const name = os.hostname();
const freeM = os.freemem();
const timeD = os.uptime();


fs.writeFileSync("./logs/rapport.txt",`Utilisater : ${username}\n  
    Version OS : ${osVersion} \n
    CPU  :  ${cpus[0].model} \n
    Nom  : ${name} \n
    Mémoire libre : ${Math.round(freeM / 1024 / 1024)} MB \n
    Temps de fonctionnement : ${Math.floor(timeD / 60)} minutes \n

` )


