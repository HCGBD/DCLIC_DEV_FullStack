const User = require('../models/User.js');

/**
 * Ajoute un nouvel utilisateur à la base de données.
 * @param {object} userData - L'objet utilisateur à enregistrer.
 */
async function add(userData) {
    try {
        // 'userData' est déjà une instance du modèle Mongoose depuis app.js
        const savedUser = await userData.save();
      
        console.log("Ajout effectué avec succès !!", savedUser);
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
}



/**
 * Met à jour un utilisateur existant.
 * @param {string} email - L'email de l'utilisateur à mettre à jour.
 * @param {object} user - Un objet contenant les nouvelles données de l'utilisateur.
 */
async function update(email, user) {
    try {

        const updatedUser = await User.findOneAndUpdate({ email: email }, user, { new: true });
        if (updatedUser) {
            console.log("Mise à jour effectuée avec succès:", updatedUser);
        } else {
            console.log("Aucun utilisateur trouvé avec cet email.");
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    }
}

/**
 * Lit tous les utilisateurs de la base de données.
 */
async function read() {
    try {
        const users = await User.find();
        // console.log("Utilisateurs trouvés:", users);
        return users;
    } catch (error) {
        console.error("Erreur lors de la lecture des utilisateurs:", error);
    }

    while (true) {
        console.log("yy");
        
    }
}

/**
 * Supprime un utilisateur par son email.
 * @param {string} email - L'email de l'utilisateur à supprimer.
 */
async function deleteUser(email) {
    try {
        const result = await User.findOneAndDelete({ email: email });
        if (result) {
            console.log("Utilisateur supprimé avec succès:", result);
        } else {
            console.log("Aucun utilisateur trouvé avec cet email pour la suppression.");
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
}

module.exports = {
    add,
    update,
    read,
    deleteUser
};