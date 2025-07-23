const file = require("fs");

// file.writeFileSync("fic.txt","Bonjour je suis avec Nodes.js pour devenir un dev pro");

// console.log("Le fichier fic.txt a été créé avec succès !");

// const contains = file.readFileSync("fic.txt","utf8");

// console.log(contains);

// file.appendFileSync("fic.txt"," \n Je suis un dev pro \n Je suis un expert !");

// // delete
// const dirContain = file.readdirSync("../../DCLIC_DEV_FullStack","utf-8")

// // console.log(dirContain);

file.writeFile("fic.txt","lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem",(err)=>{
    if(err) throw err;
    console.log("Le fichier fic.txt a été modifié avec succès !");
});

