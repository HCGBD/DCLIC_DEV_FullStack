const mongo = require('mongoose');
const connectDB = require ("./db/db.js");
const user = require('./models/Users.js')

connectDB();

async function createUser (){
    try {
        const newUser  = new user ({
            nom:"Diallo",
            prenom:"Mamadou Cire",
            email:"mamadou@example.com",
            age: 30
        })

        const saveUser  =  await newUser.save();
        console.log("Utilisateur créé avec succès :", saveUser);
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        
    }
}

async function main () {
    await connectDB();
    await createUser();
    await mongo.disconnect();
}

main();
