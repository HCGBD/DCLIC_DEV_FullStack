const mongo = require('mongoose');

async function connectDB (){
    try {
        await mongo.connect ("mongodb://127.0.0.1:27017/myApp")
        console.log("Connexion à la base de données réussie");
        
    } catch (error) {
        console.error("Erreur de connexion à la base de données :", error);
        process.exit(1); // Terminer le processus en cas d'erreur
    }
}

module.exports  = connectDB;