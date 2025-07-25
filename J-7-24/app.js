const User = require('./models/User');
const userController = require("./controllers/UsersControllers");
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const main = async () => {
    try {
        // 1. Se connecter à la base de données
        await connectDB();

        // 2. Ajouter un nouvel utilisateur
        const newUser = new User({
            nom: "Diallo",
            prenom: "Mamadou Cire",
            email: "mamadou@example.com",
            age: 30
        });
        await userController.add(newUser);

        // 3. Lire tous les utilisateurs pour vérifier l'ajout
        console.log("\nUtilisateurs après l'ajout:");
        await userController.read();

        // 4. Mettre à jour l'utilisateur
        const updatedData = {
            nom: "Sow",
            prenom: "Ibrahima Dalein",
            age: 40
        };
        await userController.update("mamadou@example.com", updatedData);

        // 5. Lire tous les utilisateurs pour vérifier la mise à jour
        console.log("\nUtilisateurs après la mise à jour:");
        await userController.read();

        

    } catch (error) {
        console.error("Une erreur est survenue dans l'application:", error);
    } finally {
        // 6. Se déconnecter de la base de données
        await mongoose.disconnect();
        console.log("Déconnexion de la base de données.");
    }
};

main();